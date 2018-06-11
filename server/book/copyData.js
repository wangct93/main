/**
 * Created by Administrator on 2017/11/28.
 */



let wt = require('wt-sutil');
let fs = require('fs');
let bqg = require('./biquge');
let ld = require('./lingdian');
let path = require('path');
let bookMysql = require('./mysql');
let cloudConfig = require('../../config/cloud.json');
const request = require('request');
const {cloud,mysql,crypto} = wt;
cloud.setUserInfo(cloudConfig);
mysql.setConfig({
    database:'book'
});

const insertLen = 1;
let tempList = [];


start();


function start(){
    mysql.query('select max(ldId) num from book',data => {
        let num = data[0].num || 0;
        let queue = new wt.Queue({
            getItem(){
                return num++;
            },
            execFunc,
            limit:1
        });
        queue.start();
    },err => {
        console.log(err);
    });
}




function execFunc(num,cb){
    console.log('开始下载：' + num);
    ld.getInfo(num,book =>{
        console.log('           获取书籍信息成功：' + num);
        if(book){
            book.ldId = num;
            book.imgCloudKey = crypto.encrypt(book.name);
            tempList.push(book);
            if(tempList.length >= insertLen){
                let books = tempList.slice(0);
                tempList = [];
                bookMysql.insertBooks(books,data => {
                    console.log('           插入书籍信息成功：' + num);
                    let bookId = data.insertId;
                    let imgList = [];
                    let chapterList = [];
                    books.forEach((book,i) => {
                        let {list = []} = book;
                        list.forEach((chapter,index) => {
                            chapter.bookId = bookId + i;
                            chapter.index = index;
                            chapterList.push(chapter);
                        });
                        imgList.push(book);
                    });
                    let insertLen = 100;
                    let queue = new wt.Queue({
                        list:chapterList,
                        getItem(){
                            let result = this.list.splice(0,insertLen);
                            return result.length ? result : undefined;
                        },
                        execFunc(chapterList,cb){
                            bookMysql.insertChapters(chapterList,cb,cb);
                        },
                        success(data){
                            console.log('           插入章节信息成功：' + num);
                            cb();
                        }
                    });
                    queue.start();
                },cb);
            }
        }else{
            cb();
        }
    });
}








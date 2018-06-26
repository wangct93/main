/**
 * Created by wangct on 2018/6/21.
 */

const wt = require('wt-sutil');
const request = require('request');
const path = require('path');
const clb = require('./clb');
const clbc = require('./clbc');
const clyh = require('./clyh');
const mysql = require('./mysql');
const fs = require('fs');

let numPath = path.resolve(__dirname,'temp/yhnum.txt');

//https://www.ciliba.me/detail/465b464e0a66916251fa7b0f49387094a6eb1999.html


start();

function start(){
    fs.readFile(numPath,(err,data) => {
        if(err){
            console.log(err);
        }else{
            let num = +data.toString();
            let queue = new wt.Queue({
                getItem(){
                    return ++num;
                },
                execFunc(num,cb){
                    console.log('开始页数：' + num);
                    clyh.getData(num,(err,data) => {
                        if(err){
                            console.log(err);
                            cb();
                        }else if(data.length){
                            console.log('                     成功获取磁力信息：' + num);
                            mysql.insert(data,(err,data) => {
                                console.log('                 插入数据库成功：' + num);
                                fs.writeFile(numPath,num,cb)
                            });
                        }else{
                            cb();
                        }
                    });
                },
                limit:1
            });
            queue.start();
        }
    })
}













//磁力吧

// clb.getList(num,(list = []) => {
//     if(list.length){
//         console.log('                 成功获取列表：' + num);
//         let queue = new wt.Queue({
//             list,
//             execFunc(item,cb){
//                 let {name,remote} = item;
//                 clb.getClAddr(remote,addr => {
//                     cb({
//                         name,
//                         addr
//                     });
//                 });
//             },
//             success(list){
//                 console.log('                 成功获取磁力信息：' + num);
//                 mysql.insert(list,(err,data) => {
//                     console.log('                 插入数据库成功：' + num);
//                     fs.writeFile(numPath,num,cb)
//                 });
//             },
//             limit:1
//         });
//         queue.start();
//     }else{
//         console.log(list);
//         cb();
//     }
// });

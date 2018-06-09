/**
 * Created by Administrator on 2017/12/13.
 */

let wt = require('wt-sutil');
const {mysql} = wt;
let fs = require('fs');


module.exports = {
    insertBooks,
    insertChapters
};



function insertBooks(books,cb,eb){
    let time = new Date().toFormatString();
    inset('book(name,author,type,intro,state,imgSrc,imgCloudKey,time,ldId)',books,book => {
        errFilter(book);
        let {name = '',author = '',type = '',intro = '',imgSrc = '',state = 0,imgCloudKey = '',ldId} = book;
        return `('${name}','${author}','${type}','${intro}',${state},'${imgSrc}','${imgCloudKey}','${time}',${ldId})`;
    },cb,eb);
}


function insertChapters(chapters,cb,eb){
    let time = new Date().toFormatString();
    inset('chapter(name,url,bookId,time,cindex)',chapters,chapter => {
        errFilter(chapter);
        let {name,url,bookId,index} = chapter;
        return `('${name}','${url}',${bookId},'${time}',${index})`;
    },cb,eb);
}

function errFilter(data){
    for(let name in data){
        if(data.hasOwnProperty(name) && wt.isString(data[name])){
            data[name] = data[name].replace(/"/g,'“');
        }
    }
}



function inset(sql,data,formatFunc,cb,eb){
    if(!wt.isArray(data)){
        data = [data];
    }
    let insertDataStr = data.map(formatFunc).join(',');
    mysql.query(`insert into ${sql} values ${insertDataStr}`,cb,eb);
}
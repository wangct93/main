/**
 * Created by Administrator on 2018/6/7.
 */


const wt = require('wt-sutil');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');

let url = 'http://www.00ksw.org/html/0/529/212488.html';

function test(url,cb){
    request(url).on('error',cb).pipe(iconv.decodeStream('gbk')).collect((err,body) => {
        if(err){
            cb(err);
        }else{
            cb(null,parseTextHtml(body));
        }
    });
}

const parseTextHtml = html => {
    let $ = cheerio.load(html);
    let $content = $('#articlecontent');
    return $content.length ? $content.text() : '';
};

// test(url,(err,data) => {
//     if(err){
//         console.log(err);
//     }else{
//         fs.writeFile('test/1.txt',data,(err,data) => {
//             console.log(err,data);
//         });
//         fs.writeFile('test/2.txt',data.replace(/^[\s\n]+|[\s\n]+$/g,'').replace(/[\s\n]+/g,'\n'),(err,data) => {
//             console.log(err,data);
//         });
//     }
// });

let {Cache} = wt;
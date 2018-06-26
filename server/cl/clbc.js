/**
 * Created by wangct on 2018/6/21.
 */

const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


let tempPath = path.resolve(__dirname,'temp/temp.html');
let clPath = path.resolve(__dirname,'temp/clbc.html');

let keyword = '福利';

let urlKey = encodeURIComponent(keyword);


const clbc= {
    getData(num,cb){
        request(`http://www.btbaocai.cc/search/${urlKey}/?c=&s=create_time&p=${num}`,(err,res,body) => {
            if(err){
                fs.writeFile(tempPath,err,() => {});
                cb(err);
            }else{
                cb(null,this.parseHtml(body));
            }
        })
    },
    parseHtml(html){
        let $ = cheerio.load(html);
        let ary = [];
        $('.x-item .title').each((i,a) => {
            let $a = $(a);
            ary.push({
                name:$a.text(),
                addr:'magnet:?xt=urn:btih:' + $a.attr('href').replace(/^[\s\S]*[\\\/]/g,'')
            });
        });
        return ary;
    }
};
module.exports = clbc;
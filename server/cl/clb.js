/**
 * Created by wangct on 2018/6/21.
 */

const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


let tempPath = path.resolve(__dirname,'temp/temp.html');
let clPath = path.resolve(__dirname,'temp/cl.html');

let keyword = '无码';

let urlKey = encodeURIComponent(keyword);


const clb = {
    getList(num,cb){
        request(`https://www.ciliba.me/s/${urlKey}_rel_${num}.html`,(err,res,body) => {
            if(err){
                fs.writeFile(tempPath,err,() => {});
                cb();
            }else{
                cb(this.parseListHtml(body));
            }
        })
    },
    parseListHtml(html){
        let $ = cheerio.load(html);
        let ary = [];
        $('.search-item').each((i,elem) => {
            let $a = $(elem).find('h3 a');
            ary.push({
                name:$a.text(),
                remote:$a.attr('href')
            });
        });
        return ary;
    },
    getClAddr(remote,cb){
        request(remote,(err,res,body) => {
            if(err){
                fs.writeFile(clPath,err,() => {});
                cb();
            }else{
                cb(this.parseClHtml(body));
            }
        })
    },
    parseClHtml(html){
        let $ = cheerio.load(html);
        return $('#m_link').html();
    }
};
module.exports = clb;
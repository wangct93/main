/**
 * Created by wangct on 2018/6/21.
 */

const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


let tempPath = path.resolve(__dirname,'temp/temp.html');
let clyhPath = path.resolve(__dirname,'temp/clbc.html');

let keyword = '福利';

let urlKey = encodeURIComponent(keyword);


const clbc= {
    getData(num,cb){
        request(`https://www.yinhecili.com/zdolists/56aP5Yip/1-1-1-${num}.html`,(err,res,body) => {
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
        $('.item').each((i,item) => {
            let $item = $(item);
            let $a = $item.find('dt a');
            let $addr = $item.find('.search_img_magnet').next();
            ary.push({
                name:$a.text(),
                addr:$addr.attr('href').split('&')[0]
            });
        });
        return ary;
    }
};
module.exports = clbc;
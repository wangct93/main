/**
 * Created by Administrator on 2017/12/26.
 */



const wt = require('wt-sutil');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const url = require('url');
const fs = require('fs');
const request = require('request');
const path = require('path');
const outPath = path.resolve(__dirname,'temp/a.html');

const Lingdian = {
    host:'http://www.00ksw.org',
    getInfo(num,cb){
        let remoteAddr = this.host + '/html/' + Math.floor(num / 1000) +'/' + num + '/';
        console.log('           发起请求：' + num);
        request({
            url:remoteAddr,
            timeout:60000
        }).on('error',(err => {
            console.log(err);
            console.log('           请求失败：' + num);
            cb();
        })).pipe(iconv.decodeStream('gbk')).collect((err,body) => {
            if(err){
                console.log('           请求失败：' + num);
                cb();
            }else{
                console.log('           请求成功：' + num);
                // fs.writeFile(outPath,body);
                cb(this.parseInfoHtml(body,remoteAddr));
            }
        });
    },
    parseInfoHtml(html,remoteAddr){
        let $ = cheerio.load(html);
        let $top = $('.ymdz');
        let $info = $('.introduce');
        if($top.length && $info.length){
            let name = $info.find('h1').text();
            let author = $info.find('.bq').children().eq(1).text().split('：')[1];
            let state = $info.find('.bq').children().eq(2).text().split('：')[1] === '完结' ? 1 : 0;
            let type = $top.text().split('>')[1].trim();
            let intro = $info.find('.jj').text();
            let fmUrl = $info.prev().find('img').attr('src');
            let list = [];
            $('.ml_list li').each(function(i,li){
                let $a = $(li).find('a');
                if($a.length){
                    list.push({
                        name:$a.text(),
                        url:remoteAddr + $a.attr('href')
                    });
                }
            });
            return {
                name,
                author,
                type,
                intro,
                list,
                fmUrl,
                state
            };
        }
    },
    getText(remoteAddr,cb){
        request(remoteAddr).on('error',(err => {
            console.log(err);
            cb();
        })).pipe(iconv.decodeStream('gbk')).collect((err,body) => {
            if(err){
                console.log(err);
                cb('');
            }else{
                cb(this.parseTextHtml(body,remoteAddr));
            }
        });
    },
    parseTextHtml(html){
        let $ = cheerio.load(html);
        let $content = $('#articlecontent');
        return $content.length ? $content.text() : '';
    }
};

module.exports = Lingdian;
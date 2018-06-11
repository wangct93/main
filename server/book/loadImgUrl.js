/**
 * Created by wangct on 2018/6/10.
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

start();


function start(){
    mysql.query('select max(id) id from book where imgState = 1',data => {
        let num = data[0].id || 1;
        let queue = new wt.Queue({
            getItem(){
                return ++num;
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
    console.log('开始上传序号：' + num);
    mysql.query('select imgUrl,imgCloudKey from book where id = ' + num,data => {
        if(data.length){
            console.log('            图片地址获取成功：' + num);
            let {imgUrl,imgCloudKey} = data[0];
            let re = /^http/;
            if(!re.test(imgUrl)){
                imgUrl = 'https://img.1200ksw.com' + imgUrl;
            }
            let rs = request({
                url:imgUrl,
                timeout:20000
            }).on('error',err => {
                console.log(err);
                console.log('            图片信息获取失败：' + num);
                // cb();
            });
            cloud.putFile({
                Key:'book/' + imgCloudKey,
                Body:rs
            },(err,data) => {
                if(err){
                    console.log('            图片上传失败：' + num);
                    cb();
                }else{
                    console.log('            图片上传成功：' + num);
                    mysql.query('update book set imgState = 1 where id = ' + num,data => {
                        console.log('            数据库标记成功：' + num);
                        cb();
                    },err => {
                        console.log(err);
                        console.log('            数据库标记失败：' + num);
                        cb();
                    });
                }
            });
        }else{
            console.log('            抄不到该数据：' + num);
            cb();
        }
    },err => {
        console.log(err);
        console.log('数据获取失败：' + num);
        cb();
    });
}





// execFunc(1,() => {
//     console.log('success');
// });


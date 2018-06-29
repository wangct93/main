/**
 * Created by Administrator on 2018/6/14.
 */
const wt = require('wt-sutil');
const fs = require('fs');
const ld = require('./lingdian');
const path = require('path');
const cloudConfig = require('../../config/cloud.json');
const mysqlConfig = require('../../config/mysql.json');
const request = require('request');
const {cloud,mysql,crypto} = wt;
cloud.setUserInfo(cloudConfig);
mysql.setConfig(mysqlConfig);


const numPath = path.resolve(__dirname,'temp/num.txt');

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
                execFunc:save,
                interval:1000,
                limit:5
            });
            queue.start();
        }
    });
}

function save(id,cb){
    console.log('当前序号：' + id);
    mysql.query('select name,bookId,cIndex,url from chapter where id = ' + id,data => {
        console.log('                     获取数据库信息成功:' + id);
        if(data.length){
            let {name,bookId,cIndex,url,cloudKey} = data[0];
            if(cloudKey){
                console.log('                     该地址已保存:' + id);
                cb();
            }else{
                console.log('                     开始获取文件:' + id);
                ld.getText(url,data => {
                    if(data){
                        console.log('                     获取文件成功:' + id);
                        data = data.replace(/^[\s\n]+|[\s\n]+$/g,'').replace(/[\s\n]+/g,'\n');
                        let key = crypto.encrypt(name + '_' + bookId + '_' + cIndex);
                        cloud.putFile({
                            Key:'chapter/' + key,
                            Body:data
                        },(err,data) => {
                            if(err){
                                console.log('                     文件上传失败:' + id);
                                console.log(err);
                                cb();
                            }else{
                                mysql.query(`update chapter set cloudKey = '${key}' where id = ${id}`,data => {
                                    console.log('                     cloudKey设置成功:' + id);
                                    fs.writeFile(numPath,id,cb);
                                },err => {
                                    console.log('                     cloudKey设置失败:' + id);
                                    console.log(err.message);
                                    cb();
                                });
                            }
                        });
                    }else{
                        console.log('                     获取文件失败:' + id);
                        cb();
                    }
                });
            }
        }else{
            cb();
        }
    });
}


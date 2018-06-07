/**
 * Created by Administrator on 2017/12/14.
 */

const wt = require('wt-sutil');
const {cloud,mysql,crypto} = wt;
const bqg = require('./biquge');
const ld = require('./lingdian');
const cloudConfig = require('../../config/cloud.json');
cloud.setUserInfo(wt.clone(cloudConfig,['SecretId','SecretKey']));
module.exports = {
    getToal,        //获取小说列表
    getInfo,        //获取小说信息
    getChapterInfo,   //获取章节信息
    getList,
    getChapterList,
    getChapterListTotal
};
function getToal(params,cb,eb){
    mysql.query(`select count(id) total from book ${getWhereSql(params)}`,data => {
        cb(data[0].total);
    },eb);
}

function getList(params,cb,eb){
    let {start,limit = 10,sortField,sortDesc} = params;
    mysql.query(`select id,name,author,intro,type,state,fmImg,clickHits,zanHits,date_format(time,"%Y-%m-%d %H:%i:%s") time from book ${getWhereSql(params)} ${sortField ? `order by ${sortField} ${sortDesc ? 'desc' : ''}` : ''} ${!wt.isUndefined(start) ? `limit ${start},${limit}` : ''}`,cb,eb);
}

function getInfo(bookId,cb,eb){
    mysql.query(`select * from book where id = ${bookId}`,data =>{
        cb(data[0]);
    },eb);
}

function getChapterListTotal(params,cb,eb){
    mysql.query(`select count(id) total from chapter where bookId=${params.id}`,data => {
        cb(data[0].total);
    },eb);
}

function getChapterList(params,cb,eb){
    let {id,start,limit = 10} = params;
    mysql.query(`select * from chapter where bookId=${id} ${wt.isUndefined(start) ? '' : `limit ${start},${limit}`}`,cb,eb);
}

function getChapterInfo(chapterId,cb,eb){
    mysql.query('select * from chapter where id=' + chapterId,(rows) => {
        if(rows.length){
            let info = rows[0];
            let {id,url,bookId,chapterIndex,cloudKey,name} = info;
            let p1 = new Promise((cb,eb) => {
                let tIndex = chapterIndex + 1;
                mysql.query(`select id from chapter where chapterIndex = ${tIndex} and bookId = ${bookId}`,(rows)=>{
                    cb(rows[0] && rows[0].id);
                },eb);
            });
            let p2 = new Promise((cb,eb) => {
                let tIndex = chapterIndex - 1;
                if(tIndex < 0){
                    cb();
                }else{
                    mysql.query(`select id from chapter where chapterIndex = ${tIndex} and bookId = ${bookId}`,(rows)=>{
                        cb(rows[0] && rows[0].id);
                    },eb);
                }
            });
            let p3 = new Promise((cb,eb) => {
                if(cloudKey){
                    cloud.getFile({
                        Key:cloudKey
                    },(err,data) => {
                        if(err){
                            eb()
                        }else{
                            cb(data.Body.toString());
                        }
                    });
                }else{
                    ld.getText(url,data => {
                        cb(data);
                        let Key = 'chapter/' + crypto.encrypt(name + '_' + bookId + '_' + chapterIndex);
                        cloud.putFile({
                            Key,
                            Body:data
                        },(err,data) => {
                            if(err){
                                console.log(err);
                            }else{
                                mysql.query(`update chapter set cloudKey='${Key}' where id=${id}`,data => {
                                    console.log('插入choudKey成功，chapterId：' + id);
                                },err => {
                                    console.log(err);
                                });
                            }
                        });
                    });
                }
            });
            Promise.all([p1,p2,p3]).then((result) => {
                info.nextChapterId = result[0];
                info.prevChapterId = result[1];
                info.text = result[2];
                cb(info);
            },eb);
        }else{
            cb();
        }
    },eb);
}

const getWhereSql = params => {
    let {keyword,type} = params;
    let result = [];
    if(keyword){
        result.push(`name like "%${keyword}%"`);
    }
    if(type){
        result.push(`type like "%${type}%"`);
    }
    return result.length ? 'where ' + result.join(' and ') : '';
};
/**
 * Created by wangct on 2018/6/21.
 */

const wt = require('wt-sutil');

const {mysql} = wt;

module.exports = {
    insert
};

function insert(data,cb){
    if(!wt.isArray(data)){
        data = [data];
    }
    let dataSql = data.map(({name = '',addr = ''}) => `("${name.replace(/\"/g,'“')}","${addr.replace(/\"/g,'“')}")`).join(',');
    mysql.query('insert into clb(name,addr) values' + dataSql,data => {
        cb(null,data)
    },cb);
}
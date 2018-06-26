/**
 * Created by Administrator on 2018/6/7.
 */


const wt = require('wt-sutil');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const {cloud} = wt;
const cloudConfig = require('../config/cloud.json');
cloud.setUserInfo(cloudConfig);

const crypto = require('crypto');

let md5 = crypto.createHash('md5');

md5.update('1123');

console.log(md5.digest('hex'));






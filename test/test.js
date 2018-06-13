/**
 * Created by Administrator on 2018/6/7.
 */


const wt = require('wt-sutil');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const {cloud,crypto} = wt;
const cloudConfig = require('../config/cloud.json');
cloud.setUserInfo(cloudConfig);

let key = 'chapter/fa0c791ba7bda5767d28c9f47a8ddcf5';







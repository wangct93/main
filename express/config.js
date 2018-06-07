/**
 * Created by Administrator on 2017/9/4.
 */

const wt = require('wt-sutil');
let config = require('../config/server.json');
let defaultConfig = {
    port:8888
};

module.exports = wt.extend(defaultConfig,config);
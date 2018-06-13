/**
 * Created by Administrator on 2018/6/13.
 */

const wt = require('wt-sutil');
const {cloud} = wt;
let cloudConfig = require('../config/cloud.json');
cloud.setUserInfo(cloudConfig);

const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/getFile',(req,res) => {
    let {query} = req;
    let {key} = query;
    cloud.getFile({
        Key:key
    },(err,data) => {
        if(err){
            console.log(err);
            res.sendStatus(404);
        }else{
            res.send(data.Body);
        }
    });
});
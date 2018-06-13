/**
 * Created by Administrator on 2018/6/5.
 */
const express = require('express');

const router = express.Router();
const config = require('../config/server.json');
module.exports = router;
const Book = require('../server/book');
const wt = require('wt-sutil');



router.post('/getList',(req,res) => {
    let {body} = req;
    let tPro = new Promise((cb,eb) => {
        Book.getToal(body,cb,eb);
    });
    let listPro = new Promise((cb,eb) => {
        Book.getList(body,cb,eb);
    });
    Promise.all([tPro,listPro]).then(result =>{
        let list = result[1];
        list.forEach(setImgSrc);
        res.send({
            total:result[0],
            list:result[1]
        });
    },err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/getInfo',(req,res) => {
    let {id} = req.body;
    Book.getInfo(id,data => {
        setImgSrc(data);
        res.send(data);
    },err => {
        console.log(err);
        res.sendStatus(500);
    })
});

router.post('/getChapterList',(req,res) => {
    let {body} = req;
    let tPro = new Promise((cb,eb) => {
        Book.getChapterListTotal(body,cb,eb);
    });
    let listPro = new Promise((cb,eb) => {
        Book.getChapterList(body,cb,eb);
    });
    Promise.all([tPro,listPro]).then(result =>{
        res.send({
            total:result[0],
            list:result[1]
        });
    },err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/getInfoAndChapterList',(req,res) => {
    let {body} = req;
    let infoPro = new Promise((cb,eb) => {
        Book.getInfo(body.id,cb,eb);
    });
    let listPro = new Promise((cb,eb) => {
        Book.getChapterList(body,cb,eb);
    });
    Promise.all([infoPro,listPro]).then(result =>{
        let info = result[0];
        setImgSrc(info);
        res.send({
            info,
            list:result[1]
        });
    },err => {
        console.log(err);
        res.sendStatus(500);
    });
});
router.post('/getChapterInfo',(req,res) => {
    let {id = ''} = req.body;
    Book.getChapterInfo(id,data => {
        res.send(data);
    },err => {
        console.log(err);
        res.sendStatus(500);
    });
});


const setImgSrc = (book = {}) => {
    let {name,imgSrc} = book;
    if(!imgSrc){
        imgSrc = wt.crypto.encrypt(name);
    }
    book.imgSrc = `http://${wt.getLocalIp()}:${config.port}/cloud/getFile?key=book/${imgSrc}`;
};
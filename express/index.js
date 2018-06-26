/**
 * Created by Administrator on 2018/1/3.
 */




const express = require('express');
const wt = require('wt-sutil');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config');
const mysqlConfig = require('../config/mysql.json');
let {port} = config;

const bookRouter = require('../router/book');
const cloudRouter = require('../router/cloud_tx');

const {mysql} = wt;
mysql.setConfig(mysqlConfig);

setAppOption();

app.use('/book',bookRouter);
app.use('/cloud',cloudRouter);

app.listen(port,'0.0.0.0',() => {
    console.log('the server is started on port ' + port + '!');
});


function setAppOption(){
    let {staticDir,html} = config;
    if(!wt.isArray(staticDir)){
        staticDir = [staticDir];
    }
    staticDir.forEach(item => {
        app.use('/static',express.static(path.resolve(__dirname,'..',item)));
    });
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret:'wangct',
        name:'ssid',
        cookie:{
            maxAge:6000,
            secret:true
        },
        resave:false,
        saveUninitialized:true
    }));
    app.use('/',(req,res,next) => {
        console.log('请求地址：' + req.url);
        allowOrigin(req,res);
        if(req.url === '/'){
            res.redirect(`http://${req.headers.host}/${html}`);
        }else{
            next();
        }
    });
    app.get('/favicon.ico',(req,res) => {
        res.send(null);
    });
    app.set('views',path.resolve(__dirname,'../templates/ejs'));
    app.set('view engine','ejs');
}




function allowOrigin(req,res){
    let {allowAddress = '*'} = config;
    let clientIp = wt.getClientIp(req);
    if(clientIp === '127.0.0.1'){
        res.set('Access-Control-Allow-Origin','*');
    }else if(allowAddress){
        if(!wt.isArray(allowAddress)){
            allowAddress = [allowAddress];
        }
        console.log(clientIp);
        console.log(req);
        if(allowAddress.indexOf(clientIp) !== -1){
            res.set('Access-Control-Allow-Origin',clientIp);
        }
    }
}

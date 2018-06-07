/**
 * Created by Administrator on 2018/1/3.
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const config = require('./config');
const wt = require('wt-sutil');


const app = express();
const port = config.port || 8888;

const bookRouter = require('../router/book');


/**
 * 设置模版引擎
 */
app.set('views',path.resolve(__dirname,'../templates/ejs'));
app.set('view engine','ejs');

/**
 * 静态资源处理
 * @type {*|Array}
 */
let staticName = config.staticName || [];
if(!wt.isArray(staticName)){
    staticName = [staticName];
}
staticName.forEach(name => {
    app.use('/' + name,express.static(name));
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

/***********************/
app.use('/',(req,res,next) => {
    console.log('请求地址：' + req.url);
    allowOrigin(req,res);
    if(req.url === '/'){
        res.redirect(`http://${wt.getLocalIp()}:${config.port}/${config.index}`);
    }else{
        next();
    }
});

app.use('/book',bookRouter);

app.get('/favicon.ico',(req,res) => {
    res.send(null);
});

app.listen(port,() =>{
    console.log('the server is started on port '+ port +'!');
});


function allowOrigin(req,res){
    let {allowAddress = '*'} = config;
    if(allowAddress){
        if(!wt.isArray(allowAddress)){
            allowAddress = [allowAddress];
        }
        let cAddr = req.headers.origin;
        if(allowAddress[0] === '*' || allowAddress.indexOf(cAddr) !== -1){
            res.set('Access-Control-Allow-Origin',cAddr);
        }
    }
}
/**
 * Created by Administrator on 2018/6/7.
 */

// const wt = require('wt-sutil');
// const {cloud} = wt;
// cloud.setUserInfo({
//     SecretId:'AKIDLZcq7ISryvhJl1rC3iCUaUDrOSybol4C',
//     SecretKey:'44sX1LZcVJxWvwra8ZptlRvHyYyDgy99'
// });

const fs = require('fs');
const crypto = require('crypto');
const filePath = './test/a.txt';
const string = 'some clear text data';
const pwd = 'a password';
const type = 'aes192';

let cip = crypto.createCipher(type,pwd);
let jmStr = cip.update(string, 'utf8', 'hex');
jmStr += cip.final('hex');

fs.writeFile(filePath,jmStr,(err,data) => {
    console.log(err);
    console.log(111);
    console.log(data);
});



const decipher = crypto.createDecipher(type,pwd);
let decrypted = decipher.update(jmStr, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);

/**
 * Created by Administrator on 2018/5/14.
 */


import wt from 'wt-butil';

export const renderTextHtml = (text = '') => {
    return '<p>' + text.replace(/^\s*\n*\s*|\s*\n*\s*$/g,'').replace(/[\s\n]+/g,'</p><p>') + '</p>';
};

export const parseUrl = (url = '') => {
    let data = {};
    url.split('&').forEach(item => {
        let [name,value] = item.split('=');
        if(name){
            data[name] = value;
        }
    });
    return data;
};

export const stringifyUrl = (data = {}) => {
    let ary = [];
    wt.forEach(data,(value,name) => {
        ary.push(name + '=' + value);
    });
    return ary.join('&');
};

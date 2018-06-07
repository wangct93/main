/**
 * Created by Administrator on 2018/5/14.
 */




export const renderTextHtml = (text = '') => {
    return '<p>' + text.replace(/^\s*\n*\s*|\s*\n*\s*$/g,'').replace(/[\s\n]+/g,'</p><p>') + '</p>';
};
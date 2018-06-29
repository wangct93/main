/**
 * Created by Administrator on 2018/6/6.
 */
let basePath = '';
basePath = 'http://172.16.66.14:8000';
export default {
    bookList:basePath + '/book/getList',
    bookInfo:basePath + '/book/getInfo',
    chapterList:basePath + '/book/getChapterList',
    bookInfoAndChapterList:basePath + '/book/getInfoAndChapterList',
    chapterInfo:basePath + '/book/getChapterInfo'
};
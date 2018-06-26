/**
 * Created by Administrator on 2018/6/6.
 */
// let basePath = 'http://localhost:8000';
let basePath = '';
export default {
    bookList:basePath + '/book/getList',
    bookInfo:basePath + '/book/getInfo',
    chapterList:basePath + '/book/getChapterList',
    bookInfoAndChapterList:basePath + '/book/getInfoAndChapterList',
    chapterInfo:basePath + '/book/getChapterInfo'
};
/**
 * Created by Administrator on 2018/6/8.
 */
import Urls from '../config/paths';


export const getInfo = (params,cb,eb) => {
    ajaxRequest(Urls.bookInfo,params,cb,eb);
};

export const getList = (params,cb,eb) => {
    ajaxRequest(Urls.bookList,params,cb,eb);
};

export const getChapterInfo = (params,cb,eb) => {
    ajaxRequest(Urls.chapterInfo,params,cb,eb);
};

export const getChapterList = (params,cb,eb) => {
    ajaxRequest(Urls.chapterList,params,cb,eb);
};

export const getInfoAndChapterList = (params,cb,eb) => {
    ajaxRequest(Urls.bookInfoAndChapterList,params,cb,eb);
};



const ajaxRequest = (url,params,cb,eb) => {
    $.ajax({
        url,
        type:'post',
        data:params,
        success:cb,
        error:eb
    });
};
/**
 * Created by Administrator on 2018/3/7.
 */



export const loadData = params => {
    return {
        type:'loadChapterList',
        params
    }
};

export const loadInfo = params => {
    return {
        type:'chapterListLoadBookInfo',
        params
    }
};

export const loadChapterInfo = id => {
    return {
        type:'loadChapterInfo',
        id
    }
};

export const init = () => {
    return {
        type:'initChapterState'
    }
};
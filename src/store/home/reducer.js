/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Urls from '../paths';

let defaultState = {
    nav:[
        {
            text:'排行',
            path:'/rank'
        },
        {
            text:'分类',
            path:'/classify'
        },
        {
            text:'完本',
            path:'/finish'
        },
        {
            text:'书架',
            path:'/myBook'
        }
    ],
    qt:[
        {
            id:1,
            imgSrc:undefined,
            name:'测试书名1',
            author:'测试作者1',
            intro:'测试简介1'
        },
        {
            id:2,
            imgSrc:undefined,
            name:'测试书名2',
            author:'测试作者2',
            intro:'测试简介2'
        },
        {
            id:3,
            imgSrc:undefined,
            name:'测试书名3',
            author:'测试作者3',
            intro:'测试简介3'
        }
    ]
};

export let homeData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    getHotData(state,action){
        state.loadingHot = true;
        getList({
            sortField:'zanHits',
            sortDesc:true,
            start:0,
            limit:10
        },data => {
            dispatch({
                type:'getHotDataEnd',
                data:data.list
            });
        });
    },
    getHotDataEnd(state,action){
        wt.extend(state,{
            hotData:action.data,
            loadingHot:false
        });
    },
    getXHData(state,action){
        state.loadingXH = true;
        getList({
            sortField:'zanHits',
            sortDesc:true,
            start:0,
            limit:10,
            type:'玄幻'
        },data => {
            dispatch({
                type:'getXHDataEnd',
                data:data.list
            });
        });
    },
    getXHDataEnd(state,action){
        wt.extend(state,{
            xhData:action.data,
            loadingXH:false
        });
    },
    getDSData(state,action){
        state.loadingDS = true;
        getList({
            sortField:'zanHits',
            sortDesc:true,
            start:0,
            limit:10,
            type:'都市'
        },data => {
            dispatch({
                type:'getDSDataEnd',
                data:data.list
            });
        });
    },
    getDSDataEnd(state,action){
        wt.extend(state,{
            dsData:action.data,
            loadingDS:false
        });
    }
};


const getList = (params,cb) => {
    $.ajax({
        url:Urls.getList,
        type:'post',
        data:params,
        success:cb,
        error(){
            cb()
        }
    });
};

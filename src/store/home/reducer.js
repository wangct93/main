/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import {getList} from '../../ajax/book';
import LangCn from '@/json/langCn.json';
import wt from 'wt-butil';


let defaultState = {
    nav:[
        {
            text:LangCn.rank,
            path:'/list/type=rank'
        },
        {
            text:LangCn.finish,
            path:'/list/type=finish'
        },
        {
            text:LangCn.xh,
            path:'/list/type=xh'
        },
        {
            text:LangCn.ds,
            path:'/list/type=ds'
        },
        {
            text:'书架',
            path:'/myBook'
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
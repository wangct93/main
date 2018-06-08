/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import {getInfo,getChapterList,getChapterInfo} from '../../ajax/book';
let defaultState = {

};

export let chapterData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    chapterListLoadBookInfo(state,action){
        state.loadingInfo = true;
        getInfo(action.params,data => {
            dispatch({
                type:'chapterListLoadBookInfoEnd',
                data
            });
        });

    },
    chapterListLoadBookInfoEnd(state,action){
        wt.extend(state,{
            loadingInfo:false,
            info:action.data
        });
    },
    loadChapterList(state,action){
        state.loadingChapterList = true;
        getChapterList(action.params,data => {
            dispatch({
                type:'loadChapterListEnd',
                data
            });
        });
    },
    loadChapterListEnd(state,action){
        state.loadingChapterList = false;
        wt.extend(state,action.data);
    },
    loadChapterInfo(state,action){
        state.loadingChapterInfo = true;
        getChapterInfo({id:action.id},data => {
            dispatch({
                type:'loadChapterInfoEnd',
                data
            });
        });
    },
    loadChapterInfoEnd(state,action){
        state.loadingChapterInfo = false;
        let data = wt.getValue(state,'data',[]);
        data.push(action.data);
    },
    initChapterState(state,action){
        wt.extend(state,{
            data:[]
        });
    }
};
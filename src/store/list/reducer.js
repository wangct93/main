/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Urls from '../paths';
let defaultState = {
};

export let listData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    searchBookList(state,action){
        state.loadingSearch = true;
        getList(action.params,data => {
            dispatch({
                type:'searchBookListEnd',
                data
            });
        })
    },
    searchBookListEnd(state,action){
        let {data} = action;
        wt.extend(state,{
            loadingSearch:false,
            data:data.list,
            total:data.total
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

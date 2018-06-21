/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
import {getList} from '../../ajax/book';
import LangCn from '@/json/langCn.json';
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
    loadBookList(state,action){
        state.loading = true;
        let {type,start,limit,keyword} = action.params;
        let params;
        switch(type){
            case 'finish':
                params = {
                    state:1
                };
                break;
            case 'search':
                params = {
                    keyword
                };
                break;
            default:
                if(LangCn[type]){
                    params = {
                        type:LangCn[type]
                    };
                }
        }
        getList(wt.extend({
            start,
            limit,
            sortField:'zanHits',
            sortDesc:true
        },params),data => {
            dispatch({
                type:'loadBookListEnd',
                data
            });
        })
    },
    loadBookListEnd(state,action){
        let {data} = action;
        wt.extend(state,{
            loading:false,
            data:data.list,
            total:data.total
        });
    }
};

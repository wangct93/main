/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import {getInfoAndChapterList} from '../../ajax/book';
let defaultState = {

};

export let bookData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    loadBookInfo(state,action){
        state.loading = true;
        getInfoAndChapterList({id:action.id},data => {
            dispatch({
                type:'loadBookInfoEnd',
                data
            });
        });
    },
    loadBookInfoEnd(state,action){
        state.loading = false;
        wt.extend(state,action.data);
    }
};
/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    newlyChapterList:[
        {
            id:1,
            name:'第一章 打上大大'
        },
        {
            id:2,
            name:'第二章 打上大大'
        },
        {
            id:3,
            name:'第三章 打上大大'
        }
    ]
};

const Urls = {
    bookInfo:'json/book.json'
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
        let {id} = action;
        setTimeout(() => {
            $.ajax({
                url:Urls.bookInfo,
                success(data){
                    let book = data.filter(item => +item.id === +id)[0];
                    dispatch({
                        type:'loadBookInfoEnd',
                        data:book
                    });
                }
            });
        },500);
    },
    loadBookInfoEnd(state,action){
        state.loading = false;
        state.info = action.data;
    }
};
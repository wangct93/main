/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
import Home from '../../views/home';
import Login from '../../views/login';
import List from '../../views/list';
import Book from '../../views/book';
import Chapter,{ChapterListView} from '../../views/chapter';
let defaultState = {
    list:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/list/:paramsStr',
            component:List
        },
        {
            path:'/book/:id',
            component:Book
        },
        {
            path:'/chapterList/:id',
            component:ChapterListView
        },
        {
            path:'/chapter/:id',
            component:Chapter,
            footer:false
        }
    ]
};

export let routerData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {

};

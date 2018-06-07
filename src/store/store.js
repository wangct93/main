/**
 * Created by Administrator on 2018/3/7.
 */
import {createStore,combineReducers} from 'redux';
const wt = require('@util/browse');
import * as router from './router/reducer';
import * as home from './home/reducer';
import * as list from './list/reducer';
import * as book from './book/reducer';
import * as chapter from './chapter/reducer';
let fn = combineReducers(wt.extend({},router,home,list,book,chapter));
export let store = createStore((state,action) => {
    console.log('store接收操作：' + action.type);
    return fn(state,action);
});
window.store = store;
export default store;

export const dispatch = (action) =>{
    store.dispatch(action);
};

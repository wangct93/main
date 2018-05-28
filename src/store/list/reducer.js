/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    total:110,
    data:[
        {
            id:1,
            imgSrc:undefined,
            name:'测试书名1',
            author:'测试作者1',
            type:'科幻',
            intro:'测试简介1',
            state:0,
            newlyId:22,
            newlyName:'最新章节测试23'
        },
        {
            id:2,
            imgSrc:undefined,
            name:'测试书名2',
            author:'测试作者2',
            type:'科幻',
            intro:'测试简介2',
            state:1,
            newlyId:212,
            newlyName:'最新章节测试123'
        },
        {
            id:3,
            imgSrc:undefined,
            name:'测试书名3',
            author:'测试作者3',
            type:'玄幻',
            intro:'测试简介3',
            state:1,
            newlyId:222,
            newlyName:'最新章节测试22223'
        }
    ]
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

};

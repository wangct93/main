import './less/index.less';
import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import store from './store/store';
import {Provider} from 'react-redux';
import wt from 'wt-butil';

import RouterIndex from './routers';


/**
 * 注册服务器，加快编译速度
 */
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();


render(<Provider store={store}>
    <RouterIndex/>
</Provider>, document.getElementById('container'));





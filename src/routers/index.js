/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';


import RouterSwitch from '../components/routerSwitch';

export default connect(state => state.routerData)(({list}) => {
    return <HashRouter>
        <React.Fragment>
            <RouterSwitch data={list} />
        </React.Fragment>
    </HashRouter>
})
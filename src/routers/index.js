/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';

import {BackTop} from 'antd';
import {SwitchRouter} from 'wt-reacts';

export default connect(state => state.routerData)(({list}) => {
    return <HashRouter>
        <React.Fragment>
            <SwitchRouter data={list} />
            <BackTop visibilityHeight={200} target={() => $('#container')[0]}/>
        </React.Fragment>
    </HashRouter>
});





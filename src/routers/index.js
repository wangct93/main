/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';
import PathToRegexp from 'path-to-regexp';

import {BackTop} from 'antd';

import RouterSwitch from '@util/components/routerSwitch';
import Footer from '../views/footer';

export default connect(state => state.routerData)(({list}) => {
    return <HashRouter>
        <React.Fragment>
            <RouterSwitch data={list} />
            <BackTop visibilityHeight={200} target={() => $('#container')[0]}/>
            <FooterView data={list} />
        </React.Fragment>
    </HashRouter>
});


const FooterView = props => {
    let {data = []} = props;
    let pathname = location.hash.substr(1);
    let {footer = true} = data.filter(item => PathToRegexp(item.path).test(pathname))[0] || {};
    return footer ? <Footer/> : ''
};






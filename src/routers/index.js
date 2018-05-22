/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';


import RouterSwitch from '../components/routerSwitch';

import Footer from '../views/footer';
import Login from '../views/login';

import {setDefaultPath} from '../computes/compute';


export default connect(state => state)(({routerData,userData}) => {
    let {list,footerList,defaultPath} = routerData;
    let {info} = userData;
    list = info ? list : [
        {
            path:'/login',
            component:Login
        }
    ];
    list = setDefaultPath(list,defaultPath);
    return <HashRouter>
        <React.Fragment>
            <RouterSwitch data={list} />
            <FooterView data={footerList}/>
        </React.Fragment>
    </HashRouter>
})



const FooterView = withRouter(props => {
    let {location,data} = props;
    let {pathname} = location;
    let hasFooter = data.some(item => item.path === pathname);
    return hasFooter ? <Footer data={data}/> : '';
});
/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default props => {
    return <div className="footer">
        <p>&copy;wangct，all rights reserved</p>
        <p>如有问题，请及时联系本人</p>
    </div>
}
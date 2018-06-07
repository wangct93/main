/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input,Pagination,Rate,Button} from 'antd';
import wt from 'wt-butil';

import Header from '../header';

import * as actions from '@/store/book/action';
import {renderTextHtml} from '@/computes/compute';

const {Search} = Input;


export default props => {
    return <div className="fit">
        123
    </div>
}

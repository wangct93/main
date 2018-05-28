/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default class Header extends Component{
    render(){
        let {children = [],back = true,home = true} = this.props;
        if(!wt.isArray(children)){
            children = [children];
        }
        if(back){
            children.push(<Icon key={children.length} onClick={() => {history.back()}} type="left"/>);
        }
        if(home){
            children.push(<Link to="/home" key={children.length}><Icon type="home"/></Link>);
        }
        return <div className="header">{children}</div>
    }
}
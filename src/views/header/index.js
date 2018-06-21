/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';
import wt from 'wt-butil';

export default class Header extends Component{
    render(){
        let {children = [],back = true,home = true} = this.props;
        if(!wt.isArray(children)){
            children = [children];
        }
        if(back){
            children.push(<Icon key={children.length} onClick={this.back.bind(this)} type="left"/>);
        }
        if(home){
            children.push(<Link to="/home" key={children.length}><Icon type="home"/></Link>);
        }
        return <div className="header">{children}</div>
    }
    back(){
        let {back} = this.props;
        if(back){
            location.hash = back;
        }else{
            history.back();
        }
    }
}
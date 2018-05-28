/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input} from 'antd';

import * as actions from '@/store/home/action';

import Img from '@/components/img';


const {Search} = Input;

class Home extends Component{
    render(){
        let {nav = [],qt = []} = this.props;
        return <div className="home-container">
            <div className="header">
                <Link to="/login">
                    <Icon type="user" />
                    <span>登录</span>
                </Link>
            </div>
            <nav className="nav-box">
                {
                    nav.map((item,i) => {
                        let {path,text} = item;
                        return <Link key={i} to={path}>{text}</Link>
                    })
                }
            </nav>
            <div className="search-box">
                <Search placeholder="请输入书名或作者姓名" enterButton/>
            </div>
            <ImgTextBox title="站长强推" data={qt} />
            <HomeBox title="玄幻" data={qt} />
        </div>
    }
}


class ImgTextBox extends Component{
    render(){
        let {title,data = []} = this.props;
        return <div className="img-text-box">
            <div className="box-header">{title}</div>
            <ul className="home-list img-text-list">
                {
                    data.map((item,i) => {
                        let {id,imgSrc = 'img/1.jpg',name,author,intro} = item;
                        return <li key={i}>
                            <Link to={`/book/${id}`}>
                                <div className="img-box-fit">
                                    <Img src={imgSrc}/>
                                </div>
                                <div className="text-box">
                                    <h3 className="text-name">{name}</h3>
                                    <p className="text-author">作者：{author}</p>
                                    <p className="text-intro">简介：{intro}</p>
                                </div>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

class HomeBox extends Component{
    render(){
        let {title,data = []} = this.props;
        return <div className="home-box">
            <div className="box-header">{title}</div>
            <ul className="home-list line-list">
                {
                    data.map((item,i) => {
                        let {id,type = '奇幻玄幻',name,author,intro} = item;
                        return <li key={i}>
                            <Link to={`/book/${id}`}>
                                <span className="text-type">[{type}]</span>
                                <span className="text-name">{name}</span>
                                <span className="text-author">{author}</span>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}


export default connect(state => state.homeData,actions)(Home);
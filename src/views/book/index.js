/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input,Pagination,Rate,Button} from 'antd';
import {Img,Loading} from 'wt-reacts';

import Header from '../header';

import * as actions from '@/store/book/action';
import {renderTextHtml} from '@/computes/compute';

const {Search} = Input;

class Book extends Component{
    render(){
        let {info = {},loading,newlyChapterList = [],list = []} = this.props;
        let {id,name,imgSrc,author,intro,type,score = 4.5,state} = info;
        return <div className="book-container">
            <Loading show={loading} />
            <Header>{name}</Header>
            <div className="info-box">
                <Img src={imgSrc}/>
                <div className="text-box">
                    <p className="">作者：{author}</p>
                    <p className="">类型：{type}</p>
                    <p className="">状态：{state ? '完结' : '连载中'}</p>
                    <div className="score-line">评分：<Rate allowHalf value={score} /></div>
                    <div className="btn-box">
                        <Link to={`/chapter/${list.length ? list[0].id : ''}`}>
                            <Button type="primary">开始阅读</Button>
                        </Link>
                        <Link to={`/chapterList/${id}`}>
                            <Button type="primary">章节列表</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-intro" dangerouslySetInnerHTML={{__html:renderTextHtml(intro)}}/>
            <div className="list-header">
                <span>最新章节</span>
                <span>更新</span>
            </div>
            <ChapterList data={list.slice(-10).reverse()} />
        </div>
    }
    componentWillMount(){
        let {loadInfo,match} = this.props;
        loadInfo(match.params.id);
    }
}


export class ChapterList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="chapter-list">
            {
                data.map((item,i) => {
                    let {id,name} = item;
                    return <li key={i}>
                        <Link to={`/chapter/${id}`} >{name}</Link>
                    </li>
                })
            }
        </ul>
    }
}


export default connect(state => state.bookData,actions)(Book);
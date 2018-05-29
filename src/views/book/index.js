/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input,Pagination,Rate,Button} from 'antd';

import Header from '../header';
import Img from '@util/components/img';
import Loading from '@util/components/loading';

import * as actions from '@/store/book/action';
import {renderTextHtml} from '@/computes/compute';

const {Search} = Input;

class Book extends Component{
    render(){
        let {info = {},loading,newlyChapterList = []} = this.props;
        let {name,imgSrc,author,intro,type,score,state} = info;
        return <div className="book-container">
            <Loading show={loading} />
            <Header>{name}</Header>
            <div className="info-box">
                <Img src={imgSrc}/>
                <div className="text-box">
                    <p className="">作者：{author}</p>
                    <p className="">类型：{type}</p>
                    <p className="">状态：{state ? '完结' : '连载中'}</p>
                    <div className="score-line">评分：<Rate allowHalf value={score} count={5} /></div>
                    <div className="btn-box">
                        <Button type="primary">开始阅读</Button>
                    </div>
                </div>
            </div>
            <div className="text-intro">{renderTextHtml(intro)}</div>
            <div className="list-header">
                <span>最新章节</span>
                <span>更新</span>
            </div>
            <ChapterList data={newlyChapterList} />
        </div>
    }
    componentWillMount(){
        let {loadInfo,match} = this.props;
        loadInfo(match.params.id);
    }
}


class ChapterList extends Component{
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
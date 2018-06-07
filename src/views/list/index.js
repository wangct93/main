/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input,Pagination} from 'antd';

import Header from '../header';
import Img from '@util/components/img';

import * as actions from '@/store/list/action';

const {Search} = Input;

class View extends Component{
    render(){
        let {total = 0,data = []} = this.props;
        let {pageNum = 1,pageSize = 10,keyword} = this.state || {};
        return <div className="list-container">
            <Header>搜索结果</Header>
            <div className="search-box">
                <Search value={keyword} onChange={this.searchChange.bind(this)} onSearch={this.searchEvent}/>
            </div>
            <ul className="result-list">
                {
                    data.map((item,i) => {
                        let {id,imgSrc,name,author,type,intro,state,newlyName,newlyId} = item;
                        let orderNum = (pageNum - 1) * pageSize + i + 1;
                        return <li key={i} onClick={this.toBook.bind(this,item)}>
                            <div className={`sort-num sort-num-${orderNum}`}>{orderNum}</div>
                            <Img src={imgSrc} />
                            <div className="text-box">
                                <h3>{name}</h3>
                                <p>{type} | 作者：{author}</p>
                                <p>{state ? '完结' : '连载中'} | 更新：<span className="hand-text" onClick={this.toNewly.bind(this,item)}>{author}</span></p>
                                <p>{intro}</p>
                            </div>
                        </li>
                    })
                }
            </ul>
            <div className="paging-box">
                <Pagination onChange={this.pageChange.bind(this)} simple current={pageNum} total={total}/>
            </div>
        </div>
    }
    componentWillUpdate(props){
        let {keyword} = props.match.params;
        if(keyword !== this.props.match.params.keyword){
            this.search({
                pageNum:1,
                keyword
            });
        }
    }
    componentWillMount(){
        this.pageChange(1);
    }
    pageChange(pageNum,pageSize = 10){
        this.search({
            pageSize,
            pageNum,
            keyword:this.props.match.params.keyword
        });
    }
    search(params){
        let {pageNum,pageSize = 10} = params;
        this.props.search(wt.extend(params,{
            start:(pageNum - 1) * pageSize,
            limit:pageSize
        }));
        this.setState(params);
    }
    toBook(book){
        let {history} = this.props;
        history.push('/book/' + book.id);
    }
    toNewly(book,e){
        let {history} = this.props;
        history.push('/chapter/' + book.id + '/' + book.newlyId);
        e.stopPropagation();
    }
    searchChange(v){
        this.setState({
            keyword:v.target.value
        });
    }

    searchEvent(value){
        location.hash = '/search/' + value;
    }
}


export default connect(state => state.listData,actions)(View);
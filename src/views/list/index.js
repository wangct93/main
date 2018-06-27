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
import Footer from '../footer';
import {Img} from 'wt-reacts';
import wt from 'wt-butil';

import * as actions from '@/store/list/action';

import LangCn from '@/json/langCn.json';
import {parseUrl,stringifyUrl} from '../../computes/compute';

const {Search} = Input;

class View extends Component{
    render(){
        let {total = 0,data = [],match} = this.props;
        let {keyword,pageNum = 1,type,pageSize = 10} = this.state || {};
        return <div className="list-container">
            <Header>{LangCn[type]}</Header>
            {
                type === 'search' ? <div className="search-box">
                    <Search value={keyword} onChange={this.searchChange.bind(this)} onSearch={this.searchEvent.bind(this)}/>
                </div> : ''
            }
            <ul className="result-list">
                {
                    data.map((item,i) => {
                        let {imgSrc,name,author,type,intro,state,newlyName,newlyId} = item;
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
                <Pagination pageSize={pageSize} onChange={this.pageChange.bind(this)} simple current={+pageNum} total={+total}/>
            </div>
            <Footer />
        </div>
    }
    componentWillUpdate(props){
        let newParams = parseUrl(props.match.params.paramsStr);
        let oldParams = parseUrl(this.props.match.params.paramsStr);
        if(!wt.equal(newParams,oldParams)){
            this.loadBookList(newParams);
        }
    }
    componentWillMount(){
        this.loadBookList(parseUrl(this.props.match.params.paramsStr));
    }
    loadBookList(params){
        let {type,pg:pageNum = 1,keyword,size:pageSize = 10} = params;
        this.setState({
            type,
            keyword,
            pageNum,
            pageSize
        });
        this.props.load({
            type,
            keyword,
            start:(pageNum - 1) * pageSize,
            limit:pageSize
        });
    }
    pageChange(pageNum,pageSize){
        this.changeUrl({
            pg:pageNum
        });
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
        this.changeUrl({
            keyword:value,
            pg:1
        });
    }
    changeUrl(params){
        let {match,history} = this.props;
        let urlParams = wt.extend(parseUrl(match.params.paramsStr),params);
        history.push('/list/' + stringifyUrl(urlParams));
    }
}


export default connect(state => state.listData,actions)(View);
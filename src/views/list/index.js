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
        return <div className="list-container">
            <Header>搜索结果</Header>
            <div className="search-box">
                <Search />
            </div>
            <ul className="result-list">
                {
                    data.map((item,i) => {
                        let {id,imgSrc,name,author,type,intro,state,newlyName,newlyId} = item;
                        return <li key={i} onClick={this.toBook.bind(this,item)}>
                            <div className={`sort-num sort-num-${i + 1}`}>{i + 1}</div>
                            <div className="img-box-fit">
                                <Img src={imgSrc} />
                            </div>
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
                <Pagination total={total} size="small"/>
            </div>
        </div>
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
}


export default connect(state => state.listData)(View);
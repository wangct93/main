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

import * as actions from '@/store/chapter/action';
import {renderTextHtml} from '@/computes/compute';
import {ChapterList} from '../book';

const {Search} = Input;

let PageSize = 30;

class ChapterListPage extends Component{
    render(){
        let {info = {},loadingChapterList = true,list = [],total} = this.props;
        let {name} = info;
        let {pageNum = 1,pageSize = PageSize} = this.state || {};
        return <div className="chapter-list-container">
            <Loading show={loadingChapterList} />
            <Header>{name}</Header>
            <ChapterList data={list} />
            <Pagination onChange={this.pageChange.bind(this)} pageSize={pageSize} simple current={pageNum} total={total}/>
        </div>
    }
    componentWillUpdate(props){
        let {id} = props.match.params;
        if(id !== this.props.match.params.id){
            this.loadData({
                pageNum:1,
                id
            });
            this.props.loadInfo({id});
        }
    }
    componentWillMount(){
        this.pageChange(1);
        this.props.loadInfo({
            id:this.props.match.params.id
        });
    }
    pageChange(pageNum,pageSize){
        this.loadData({
            pageSize,
            pageNum,
            id:this.props.match.params.id
        });
    }
    loadData(params){
        let {pageNum,pageSize = PageSize} = params;
        this.props.loadData(wt.extend(params,{
            start:(pageNum - 1) * pageSize,
            limit:pageSize
        }));
        this.setState(params);
    }
}

class ChapterDetail extends Component{
    render(){
        let {data = [],history} = this.props;
        let {name,nextChapterId,prevChapterId,bookId} = data[data.length - 1] || {};
        let {showBtns} = this.state || {};
        return <div className="chapter-container" ref="container">
            <div className={`chapter-header ${showBtns ? '' : 'hide-i'}`}>
                <Icon type="left" onClick={() => {
                    history.goBack();
                }}/>
                <Link to={`/home`}>
                    <Icon type="home" />
                </Link>
                <span>{name}</span>
            </div>
            <div className={`chapter-footer ${showBtns ? '' : 'hide-i'}`}>
                <Icon type="left" onClick={this.toChapter.bind(this,prevChapterId)} />
                <Icon type="right" onClick={this.toChapter.bind(this,nextChapterId)} />
                <span onClick={() => {
                    history.push('/chapterList/' + bookId)
                }}>目录</span>
            </div>
            <div onClick={this.click.bind(this)}>
                <ChapterDetailList data={data} />
            </div>
            {
                data.length ? '' : <Loading show />
            }
            <div className="load-more-box" ref="moreBox">
                {
                    data.length ? nextChapterId ? <Loading show message="正在获取下一章节的内容" /> : '当前为最新章节' : ''
                }
            </div>
        </div>
    }
    componentWillUpdate(props){
        let {id} = props.match.params;
        if(id !== this.props.match.params.id){
            this.props.loadChapterInfo(id);
        }
    }
    componentWillMount(){
        let {match,loadChapterInfo} = this.props;
        loadChapterInfo(match.params.id);
    }
    componentDidMount(){
        let {container,moreBox} = this.refs;
        let {$} = wt;
        $(container).bind('scroll',e => {
            let {loadingChapterInfo,data = [],history} = this.props;
            let {nextChapterId} = data[data.length - 1] || {};
            let $box = $(container);
            let $moreBox = $(moreBox);
            if(!loadingChapterInfo && nextChapterId && $moreBox.getRect().top < $box.getRect().bottom + 200){
                history.push('/chapter/' + nextChapterId);
            }
        });
    }
    componentWillUnmount(){
        this.initState();
    }
    toChapter(id){
        if(id){
            this.initState();
            this.props.history.push('/chapter/' + id);
        }
    }
    initState(){
        this.setState({
            showBtns:false
        });
        this.props.init();
    }
    click(){
        let {showBtns} = this.state || {};
        this.setState({
            showBtns:!showBtns
        });
    }
}

class ChapterDetailList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="detail-list">
            {
                data.map((item,i) => {
                    let {name,text} = item;
                    return <li key={i}>
                        <h2>{name}</h2>
                        <div className="content" dangerouslySetInnerHTML={{__html:renderTextHtml(text)}}/>
                    </li>
                })
            }
        </ul>
    }
}


export const ChapterListView =  connect(state => state.chapterData,actions)(ChapterListPage);
export default connect(state => state.chapterData,actions)(ChapterDetail);
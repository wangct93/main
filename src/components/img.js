/**
 * Created by Administrator on 2018/5/28.
 */
import React, {Component} from 'react';
const wt = require('@util');
import {Spin} from 'antd';

const queue = new wt.Queue({
    execFunc(item,cb){
        if(item.unmount){
            cb();
        }else{
            item.finish = cb;
            item.setState({
                status:'start'
            });
        }
    }
});


export default class Img extends Component{
    render(){
        let {full = true,src = errorSrc} = this.props;
        let {status} = this.state || {};
        let loading = status !== 'finish';
        return <Spin spinning={loading}>
            <div className={`img-box-${full ? 'full' : 'auto'} pos-rel`}>
                <img ref="img" src={status ? src : null} onError={this.load.bind(this)} onLoad={this.load.bind(this)}/>
            </div>
        </Spin>
    }
    componentWillUnmount(){
        this.unmount = true;
    }
    componentDidMount(){
        queue.addItem(this);
        queue.start();
    }
    error(){
        this.refs.img.src = errorSrc;
    }
    load(){
        this.finish();
        this.setState({
            status:'finish'
        });
        delete this.finish;
    }
}

let errorSrc = 'img/1.jpg';

export const setErrorSrc = src => {
    errorSrc = src;
};
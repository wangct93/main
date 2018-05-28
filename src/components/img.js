/**
 * Created by Administrator on 2018/5/28.
 */
import React, {Component} from 'react';
const wt = require('@util');

const queue = new wt.Queue({
    execFunc(item,cb){
        let img = item.refs.img;
        if(img){
            let {src = ''} = item.props;
            item.loadFunc = cb;
            img.src = src;
        }else{
            cb();
        }
    }
});


export default class Img extends Component{
    render(){
        return <img ref="img" onError={this.load.bind(this)} onLoad={this.load.bind(this)}/>
    }
    componentDidMount(){
        queue.addItem(this);
        queue.start();
    }
    error(){
        this.refs.img.src = errorSrc;
    }
    load(){
        wt.execFunc(this.loadFunc);
        wt.execFunc(this.props.onLoad);
        delete this.loadFunc;
    }
}

let errorSrc = 'img/1.jpg';

export const setErrorSrc = src => {
    errorSrc = src;
};
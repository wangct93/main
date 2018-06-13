/**
 * Created by Administrator on 2018/5/11.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Form,Input,Icon,Button,Checkbox,Modal} from 'antd';

const FormItem = Form.Item;

import {Loading} from 'wt-reacts';

import * as actions from '@/store/login/action';


class LoginBox extends Component{
    render(){
        let {loadingLogin,alertInfo,login,clearAlerInfo,info,history} = this.props;
        return <div className="page-flex login-container">
            <div className="body">
                <Loading show={loadingLogin} message="登录中......"/>
                <FormView login={login} />
                <Modal title="提示" visible={!!alertInfo} footer={<Button onClick={() => {
                    clearAlerInfo();
                }}>确定</Button>}>{alertInfo}</Modal>
            </div>
        </div>
    }
}

class Box extends Component{
    render(){
        let {getFieldDecorator} = this.props.form;
        let {yzmTimeout = 0} = this.state || {};
        return <Form onSubmit={this.click.bind(this)}>
            <FormItem>
                {getFieldDecorator('name',{
                    rules:[
                        {
                            required:true,
                            message:'请输入用户名'
                        }
                    ]
                })(
                    <Input size="large" prefix={<Icon type="user" />} placeholder="输入用户名" />
                )}
            </FormItem>
            <FormItem required={true}>
                {getFieldDecorator('pwd',{
                    rules:[
                        {
                            validator:(rule,value,cb) => {
                                let {yzmTimeout} = this.state || {};
                                let message;
                                if(!yzmTimeout){
                                    message = '请发送验证！';
                                }else if(!value){
                                    message = '请输入验证码！';
                                }
                                cb(message);
                            }
                        }
                    ]
                })(
                    <Input size="large" addonAfter={<Button onClick={this.sendYzm.bind(this)} disabled={yzmTimeout} size="large">{yzmTimeout ? `已发送（${yzmTimeout}）` : '发送验证码'}</Button>} prefix={<Icon type="key" />} placeholder="输入验证码" />
                )}
            </FormItem>
            <Button size="large" type="primary" htmlType="submit">登录</Button>
        </Form>
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    click(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }
    sendYzm(){
        this.setState({
            yzmTimeout:60
        });
        let timer = setInterval(() => {
            let {yzmTimeout} = this.state || {};
            yzmTimeout--;
            this.setState({
                yzmTimeout
            });
            if(yzmTimeout === 0){
                clearInterval(timer);
            }
        },1000);
        this.timer = timer;
    }
    componentDidMount(){
        this.props.login({
            name:'admin',
            pwd:'1234'
        });
    }
}

const FormView = Form.create()(Box);

export default connect(state => state,actions)(LoginBox)
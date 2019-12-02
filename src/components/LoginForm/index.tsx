import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './LoginForm.css';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';


export interface LoginFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
}

export interface LoginValue {
    username: string;
    password: string;
};

const LoginForm = (props: LoginFormProps) => {
    const { getFieldDecorator } = props.form;
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        props.form.validateFields((err: any, values: LoginValue) => {
            if (!err) {
                console.log('Received values of form: ', values);
              }
        });
    }

    return (
        <Form onSubmit={handleSubmit} className='login-form'>
            <div  className='logo'>
                <img
                    src=''
                    width='165'
                    height='62'
                    alt=''
                />
            </div>
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                })(
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                    />,
                )}
            </Form.Item>
            <div id="register-form-bottom">
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>记住密码</Checkbox>)
                    }
                    <Link className="login-form-forgot" to='/forget'>
                        忘记密码
                    </Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <span className='register-button'>
                        没有账号？
                        <Link to='/register'>注册</Link>
                    </span>
                </Form.Item>
            </div>
        </Form>
    );
};

export default Form.create({ name: 'normal_login' })(LoginForm);
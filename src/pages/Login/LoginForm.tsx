import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';


export interface LoginFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
}

export interface LoginValue {
    email: string;
    password: string;
};

const LoginForm = (props: LoginFormProps) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // api
        console.log("login")
    }

    return (
        <Form onSubmit={handleSubmit} className='login-form'>
            <div className='logo'>
                <img
                    src=''
                    width='165'
                    height='62'
                    alt=''
                />
            </div>
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ],
                })(
                    <Input
                        prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='邮箱'
                    />
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
            <div style={{ clear: "both" }}>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>记住密码</Checkbox>)
                    }
                    <Link style={{ float: "right" }} to='/forget'>
                        忘记密码
                    </Link>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        登录
                    </Button>
                    <span style={{ float: "right" }}>
                        没有账号？
                        <Link to='/register'>注册</Link>
                    </span>
                </Form.Item>
            </div>
        </Form>
    );
};

export default Form.create({ name: 'normal_login' })(LoginForm);
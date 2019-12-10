import React, { useState, useEffect, FormEvent, FocusEvent } from 'react';
import useRouter from 'use-react-router';

import { Form, Input, Icon, Button, message, Card } from 'antd';

import useUser from '../../models/userModel';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';


export interface PwChangerProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface PwChangerValue {
    oldPassword: string;
    password: string;
    confirm: string;
}

const PwChanger = (props: PwChangerProps) => {
    const user = useUser();
    const [confirmDirty, setConfirmDirty] = useState(false);



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        const code: string = form.getFieldValue('verifycode');

        props.form.validateFieldsAndScroll((err: any, values: PwChangerValue) => {
            if (!err) {
                const param = {
                    username: user.id,
                    old_password: values.oldPassword,
                    new_password: values.password,
                };
            }
        });
    };

    const { getFieldDecorator } = props.form;

    const validateToNextPassword = (rule: any, value: any, callback: () => void) => {
        const form = props.form;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    const compareToFirstPassword = (rule: any, value: any, callback: { (arg0: string): void; (): void; }) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    const handleConfirmBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    const renderForm = () => (
        <Form onSubmit={handleSubmit} className='user-data-form'>
            <Form.Item
                label="旧密码"
                hasFeedback
            >
                {getFieldDecorator('oldPassword', {
                    rules: [{
                        required: true,
                        message: '请输入旧密码!',
                    }, {
                        validator: validateToNextPassword,
                    },
                    ],
                })(
                    <Input.Password
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='旧密码'
                    />
                )}
            </Form.Item>
            <Form.Item
                label="新密码"
                hasFeedback
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        message: '请输入新密码!',
                    }, {
                        validator: validateToNextPassword,
                    },
                    ],
                })(
                    <Input.Password
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='新密码'
                    />
                )}
            </Form.Item>
            <Form.Item
                label="确认新密码"
                hasFeedback
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true,
                        message: '请确认新密码!',
                    }, {
                        validator: compareToFirstPassword,
                    }],
                })(
                    <Input.Password
                        onBlur={handleConfirmBlur}
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='确认新密码'
                    />
                )}
            </Form.Item>
            <Form.Item className="change-password-button-wrapper">
                <Button className="change-password-button" type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            {renderForm()}
        </div>
    )
}

export default Form.create({ name: 'change-password' })(PwChanger);

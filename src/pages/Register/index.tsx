import React from 'react';
import useRouter from 'use-react-router';
import useUserModel from '../../models/userModel';

import { message } from 'antd';
import RegisterForm from './RegisterForm';

import './Register.css';

enum errCode {
    UNAVAILABLE = 0,
    REPEATED_EMAIL = 1,
};

export default () => {
    const { error, clearError, token } = useUserModel();
    const { history } = useRouter();

    React.useEffect(() => {
        if (token !== '') {
            message.success('注册成功！');
            history.push('/');
        }
    }, [token]);

    React.useEffect(() => {
        switch (error) {
            case errCode.UNAVAILABLE: {
                message.error('服务不可用，请稍后再试');
                break;
            }
            case errCode.REPEATED_EMAIL: {
                message.error('该邮箱已被注册');
                break;
            }
        }
        clearError();
    }, [error])

    return (
        <div className='register-root'>
            <RegisterForm />
        </div>
    );
};

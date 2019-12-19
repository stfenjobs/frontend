import React from 'react';
import useUserModel from '../../models/userModel';
import useRouter from 'use-react-router';
import img from "../../img/bg1.jpg"
import { message } from 'antd';
import LoginForm from './LoginForm';

import './Login.css';


enum errCode {
    UNAVAILABLE = 0,
    USER_NOT_EXIST = 1,
    WRONG_PASSWD = 2,
};

export default () => {
    const { token, error, clearError } = useUserModel();
    const { history } = useRouter();

    React.useEffect(() => {
        if (token !== '') {
            message.success('登录成功！');
            history.push('/');
        }
    }, [token]);

    React.useEffect(() => {
        switch (error) {
            case errCode.UNAVAILABLE: {
                message.error('服务不可用，请稍后再试');
                break;
            }
            case errCode.USER_NOT_EXIST: {
                message.error('用户不存在');
                break;
            }
            case errCode.WRONG_PASSWD: {
                message.error('密码错误');
                break;
            }
        }
        clearError();
    }, [error]);

    return (
        <div className='login-root'>
            <img className='login-root' style={{position: "absolute"}} src={require("../../img/bg1.jpg")} alt={"bg"}/>
            <LoginForm />
        </div>
    );
};

import React from 'react';
import useUserModel from '../../../models/userModel';

import { message } from 'antd';
import Form from './PwChangerForm';


enum errType {
    SERVICE_UNAVAILABLE = 100,
    WRONG_PASSWD = 101,
    SERVICE_REFUSED = 102,
    TOKEN_EXPIRED = 103,
}

export default () => {
    const { error, clearError, logout, token } = useUserModel();

    React.useEffect(() => {
        switch (error) {
            case errType.SERVICE_UNAVAILABLE: {
                message.error('服务不可用');
                break;
            }
            case errType.SERVICE_REFUSED: {
                message.error('登录状态异常')
                logout(token);
                break;
            }
            case errType.WRONG_PASSWD: {
                message.error('原密码错误');
                break;
            }
            case errType.TOKEN_EXPIRED: {
                message.error('登录过期');
                logout(token);
                break;
            }
        }

        clearError();
    }, [error]);

    return (
        <Form />
    );
};
import React from 'react';
import useRouter from 'use-react-router';
import useUserModel from '../../../models/userModel';
import useService from '../services';

import { Result, Button, message } from 'antd';
import CertificationForm from './CertificationForm';


enum errType {
    SERVICE_UNAVAILABLE = 200,
    INCOMPLELTE = 201,
    SERVICE_REFUSED = 202,
    TOKEN_EXPIRED = 203,
};

export default () => {
    const { history } = useRouter();
    const { eid, error, clearError, logout, token } = useUserModel();
    const { editable, onEdit } = useService();

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
            case errType.INCOMPLELTE: {
                message.error('填写的信息不完整');
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

    const renderResult = () => {
        if (editable)
            return <CertificationForm />;

        switch (eid) {
            case '-1':
                return (
                    <Result
                        title='认证信息审核中'
                        subTitle='我们已经收到您的认证信息，并会尽快给您回复'
                        style={{
                            padding: '17.15rem 0',
                        }}
                    />
                );
            case '':
                return <CertificationForm />;
            default:
                return (
                    <Result
                        title='您已完成专家认证'
                        status='success'
                        extra={[
                            <Button
                                type='primary'
                                onClick={() => history.push(`/experts/${eid}`)}
                            >
                                前往专家主页
                            </Button>,
                            <Button
                                onClick={() => onEdit()}
                            >
                                修改认证信息
                            </Button>
                        ]}
                        style={{
                            padding: '15.85rem 0'
                        }}
                    />
                )
        }
    };

    return renderResult();
};

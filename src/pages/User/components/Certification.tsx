import React from 'react';
import useRouter from 'use-react-router';
import useUserModel from '../../../models/userModel';
import useService from '../services';

import { Result, Button } from 'antd';
import CertificationForm from './CertificationForm';


export default () => {
    const { history } = useRouter();
    const { eid } = useUserModel();
    const { editable, onEdit } = useService();

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

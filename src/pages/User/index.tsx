import React from 'react';
import useUserModel from '../../models/userModel';
import useService from './services';
import useRouter from 'use-react-router';

import { message } from 'antd';
import TabPanel from './TabPanel';
import UserCard from './components/UserCard';

import './User.css';

export default () => {
    const { token } = useUserModel();
    const { history } = useRouter();
    useService();

    React.useEffect(() => {
        // check if login?
        if (token === '') {
            message.info('请先登录');
            history.push('/login');
        }
    }, [token]);

    return (
        <div
            style={{
                marginTop: "0.7rem",
                padding: "0 12%",
            }}
        >
            <TabPanel />
            <UserCard />
        </div>
    );
};
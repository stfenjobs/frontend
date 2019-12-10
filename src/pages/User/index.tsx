import React from 'react';
// import useUserModel from '../../models/userModel';
import useService from './services';

import TabPanel from './TabPanel';
import UserCard from './UserCard';

import './User.css';

export default () => {
    // const { avatar, username, eid } = useUserModel();
    useService();

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
import React from 'react';

import TabPanel from './TabPanel';
import UserCard from './UserCard';

import './User.css';

const url = 'https://avatars3.githubusercontent.com/u/37368558?s=400&u=2cee58569e7ab9446e77ef3ad76362fb598a019f&v=4';


export default () => {
    return (
        <div
            style={{
                marginTop: "0.7rem",
                padding: "0 12%",
            }}
        >
            <TabPanel />
            <UserCard
                userAvatar={url}
                userName='zx555'
                userEmail='czr.cn.525@gmail.com'
            />
        </div>
    );
};
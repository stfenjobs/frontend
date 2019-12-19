import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {Divider, Layout} from 'antd';
import Navigator from '../components/Navigator';
import Router from './Router';

import './App.css';


export default () => {
    return (
        <BrowserRouter>
            <Layout>
                <Layout.Header>
                    <Navigator />
                </Layout.Header>
                <Divider style={{width: '100%', margin: 0}}/>
                <Layout.Content>
                    <Router />
                </Layout.Content>
                {/* <Layout.Footer style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    color: '#aaaaaa'
                }}>
                    <span>
                        Copyright (c) 2019 wwthh😁. All rights reserved.
                    </span>
                </Layout.Footer> */}
            </Layout>
        </BrowserRouter>
    );
};
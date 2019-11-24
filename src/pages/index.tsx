import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from 'antd';
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
                    <Layout.Content>
                        <Router />
                    </Layout.Content>
                    <Layout.Footer>
                        <span>窝窝头一块钱四个嘿嘿</span>
                    </Layout.Footer>
                </Layout>
        </BrowserRouter>
    );
};
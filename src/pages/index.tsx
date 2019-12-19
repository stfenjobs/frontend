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
                <Divider
                    style={{width: '100%', margin: 0, height: "1px", backgroundColor: "var(--color-brown)", top: 0}}/>
                <Layout.Content>
                    <Router />
                </Layout.Content>
                <Layout.Footer style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    color: '#aaaaaa',
                    marginTop: "auto",
                    zIndex: -3,
                    bottom: "0",
                    background: "fixed",
                    left: 0,
                    position: "fixed",
                    right: 0
                }}>
                    <span style={{textAlign: "center"}}>
                        Copyright (c) 2019 wwthh😁. All rights reserved.
                    </span>
                </Layout.Footer>
            </Layout>
        </BrowserRouter>
    );
};
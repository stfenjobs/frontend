import React, {useState} from 'react';
import {Input, Layout, message} from 'antd';
import useUserModel from '../../models/userModel';
import './search.css'
import useRouter from 'use-react-router';
import {trim} from "../../utils";
import qs from "qs";
import Recommend from "./Recommend";


const bgImg = require('../../img/625dec77cb49482c9b6f838764f10c21.jpeg')
const {Search} = Input;
const {Header, Footer, Content} = Layout;


export default () => {
    const {id, token} = useUserModel();
    const {history, location} = useRouter();

    const onSearch = (key: string) => {
        if (trim(key) === '') {
            message.config({top: 75});
            message.error('搜索内容不能为空');
            return;
        }

        const url = '/search?' + qs.stringify({q: key, type: 'expert'});
        history.push(url);
    };

    let contentStyle = {
        backgroundImage: "url(" + bgImg + ")",
        backgroundPosition: "auto",
        overflow: 'hidden',
    };

    return (
        <div style={{width: '80%', margin: '2% 10%'}}>
            {/*<img src={img}  style={{}}/>*/}
            <Layout>
                <Layout>
                    <Content style={contentStyle} id={"content"}>
                        <div className='bg'>
                            <Search
                                placeholder="search"
                                allowClear
                                onSearch={value => onSearch(value)}
                                maxLength={1080}
                                minLength={400}
                                height={'20%'}
                                id={"search"}
                            />
                        </div>
                    </Content>
                    <Footer style={{paddingLeft: 0, paddingRight: 0}}>
                        <div style={{height: '300px'}}>
                            <Recommend/>
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

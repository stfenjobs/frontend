import React, {useState} from 'react';
import {Input, Layout, message, Select} from 'antd';
import useUserModel from '../../models/userModel';
import './search.css'
import useRouter from 'use-react-router';
import {trim} from "../../utils";
import qs from "qs";
import Recommend from "./Recommend";


const bgImg = require('../../img/test.jpeg');
const {Search} = Input;
const {Footer, Content} = Layout;
const {Option} = Select;
const InputGroup = Input.Group;

export default () => {
    const {id, token} = useUserModel();
    const {history} = useRouter();
    const [qType, setQType] = useState('expert');

    const onSearch = (key: string) => {
        if (trim(key) === '') {
            message.config({top: 75});
            message.error('搜索内容不能为空');
            return;
        }

        const url = '/search?' + qs.stringify({q: key, type: qType});
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
                            <InputGroup className={"group"}>
                                <Select className={"sel"}
                                        dropdownClassName={"drop"}
                                        size={"large"}
                                        value={qType}
                                        onChange={(value: string) => setQType(value)}
                                >
                                    <Option value="expert">专家</Option>
                                    <Option value="paper">资源</Option>
                                </Select>
                                <Search
                                    placeholder="search"
                                    allowClear
                                    onSearch={value => onSearch(value)}
                                    size={"large"}
                                    id={'search'}
                                />
                            </InputGroup>
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

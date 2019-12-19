import React, {CSSProperties, useState} from 'react';
import {Button, Divider, Input, Layout, message, Select, Tag} from 'antd';
import useUserModel from '../../models/userModel';
import './search.css'
import useRouter from 'use-react-router';
import {trim} from "../../utils";
import qs from "qs";
import Recommend from "./Recommend";
import CountCard from "./CountCard"
import RecommendCard from "../Query/RecommendCard";

const {CheckableTag} = Tag;
const {Search} = Input;
const {Footer, Content, Header} = Layout;

export default () => {
    const {id, token} = useUserModel();
    const {history} = useRouter();
    const [qType, setQType] = useState('expert');
    const onSearch = (key: string, event: any) => {
        if (event.target == event.currentTarget && event.type == "click") return;
        if (trim(key) === '') {
            message.config({top: 75});
            message.error('搜索内容不能为空');
            return;
        }

        const url = '/search?' + qs.stringify({q: key, type: qType});
        history.push(url);
    };

    const style: CSSProperties = {
        border: 0,
        borderRadius: 0,
        fontStyle: "inherit"
    };

    return (
        <div>
            {/*<img src={img}  style={{}}/>*/}
            <Layout>
                <Layout>
                    <Content id={"content"}>
                        <div className={"bg"}>
                            <img src={require("../../img/logi.png")}
                                 style={{width: "65%", color: "white", marginTop: "-2%"}} alt={"logo"}/>
                            <div className={"searchGroup"}>
                                <CheckableTag
                                    className={"bt"}
                                    style={style}
                                    key={"expert"}
                                    checked={qType == "expert"}
                                    onChange={() => setQType("expert")}
                                > 专家</CheckableTag>
                                <CheckableTag
                                    className={"bt"}
                                    style={style}
                                    key={"paper"}
                                    checked={qType == "paper"}
                                    onChange={() => setQType("paper")}
                                > 论文</CheckableTag>
                                {/*<Button className={"bt"} style={style} onSelect={() => setQType("paper")}> 论文</Button>*/}
                            </div>
                            <Search
                                placeholder="search"
                                allowClear
                                onSearch={(value, event) => onSearch(value, event)}
                                size={"large"}
                                id={'search'}
                            />
                        </div>
                        <CountCard/>
                    </Content>
                    <span className={"boldTitle"}
                          style={{fontWeight: "bold", width: "100%"}}>FIRE · KNOWLEDGE · LIFE</span>
                    <Footer className={"foot"}>
                        <div style={{height: "30rem"}}>
                            <Recommend/>
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

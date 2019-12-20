import React from 'react';

import {Tabs, Icon, Card} from 'antd';
import PurchaseList from './components/PurchaseList';
import PwChanger from './components/PwChanger';
// import Certification from './components/Certification';
import StarList from "./starList";
import useUserModel from "../../models/userModel";

const {TabPane} = Tabs;

export default () => {
    const {token, id, getFavorite} = useUserModel();
    const onTabChange = (key: string) => {
        if (key == "starList")
            getFavorite(token, id);
    };

    return (
        <Card style={{width: "70%", marginTop: "1.2rem", paddingLeft: "3rem", paddingRight: '3rem'}}>
            <Tabs
                defaultActiveKey='purchase-record'
                animated={{
                    inkBar: true,
                    tabPane: false,
                }}
                onChange={onTabChange}
                style={{
                    paddingTop: '1.5%',
                }}
            >
                <TabPane
                    tab={
                        <span>
                        <Icon type="shopping"/>
                        增值服务
                    </span>
                    }
                    key='purchase-record'
                >
                    <PurchaseList/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                        <Icon type="security-scan"/>
                        修改密码
                    </span>
                    }
                    key='password'
                >
                    <PwChanger/>
                </TabPane>
                {/* <TabPane
                tab={
                    <span>
                        <Icon type="schedule" />
                        专家认证
                    </span>
                }
                key='expert'
            >
                <Certification />
            </TabPane> */}
                <TabPane
                    tab={
                        <span>
                        <Icon type="schedule"/>
                        收藏列表
                    </span>
                    }
                    key='starList'
                >
                    <StarList/>
                </TabPane>
            </Tabs>
        </Card>
    );
}
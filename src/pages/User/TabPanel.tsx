import React from 'react';

import { Tabs, Icon } from 'antd';
import PurchaseList from './components/PurchaseList';
import PwChanger from './components/PwChanger';
import Certification from './components/Certification';
import StarList from "./starList";
import useService from "./services";
import useUserModel from "../../models/userModel";
const { TabPane } = Tabs;

export default () => {
    const {token, id} = useUserModel();
    const {getFavorite} = useService();
    const onTabChange = (key: string) => {
        console.log(key);
        if (key == "starList")
            getFavorite(token, id);
    };

    return (
        <Tabs
            defaultActiveKey='purchase-record'
            animated={{
                inkBar: true,
                tabPane: false,
            }}
            onChange={onTabChange}
            type='card'
            style={{
                paddingTop: '1.5%',
                paddingRight: "25%"
            }}
        >
            <TabPane
                tab={
                    <span>
                        <Icon type="shopping" />
                        增值服务
                    </span>
                }
                key='purchase-record'
            >
                <PurchaseList />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <Icon type="security-scan" />
                        修改密码
                    </span>
                }
                key='password'
            >
                <PwChanger />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <Icon type="schedule" />
                        专家认证
                    </span>
                }
                key='expert'
            >
                <Certification />
            </TabPane>
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
    );
}
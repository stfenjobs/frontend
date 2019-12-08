import React from 'react';

import { Tabs, Icon } from 'antd';
const { TabPane } = Tabs;


export interface TabPanelProps {

};

export default (props: TabPanelProps) => {
    const onTabChange = (key: string) => {
        console.log(key);
    }

    return (
        <Tabs
            defaultActiveKey='purchase-record'
            animated={{
                inkBar: true,
                tabPane: false,
            }}
            onChange={onTabChange}
            style={{
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
                <div>增值服务</div>
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
                <div>修改密码</div>
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
                <div>专家认证</div>
            </TabPane>
        </Tabs>
    );
}
import React from 'react';
import { Tabs} from 'antd';

import './TypeCard.css'

const { TabPane } = Tabs;

export interface TypeCardProps {
    setTab: (tab: string) => void;
}

function TypeCard(props: TypeCardProps){
    return (
        <div className='TypeCard'>
            <Tabs onChange={e=>props.setTab(e)} type="card">
                <TabPane tab="摘要" key="1"></TabPane>
                <TabPane tab="相关" key="2"></TabPane>
                <TabPane tab="引用" key="3"></TabPane>
            </Tabs>
        </div>
    );
};

export default TypeCard;

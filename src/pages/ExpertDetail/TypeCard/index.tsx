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
                <TabPane tab="论文" key="1"></TabPane>
                <TabPane tab="专利" key="2"></TabPane>
            </Tabs>
        </div>
    );
};

export default TypeCard;

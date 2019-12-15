import React, { useState, useEffect } from 'react';
import { Tabs, Tag, List, Typography, Skeleton } from 'antd';
import ExpertResult from '../ExpertResult'
import PapperResult from '../PapperResult'
import './TypeCard.css'
import useService from '../services'
import qs from 'qs';
import { QueryParam } from '../../../types';
import {IExpert} from '../../../types';
import useRouter from 'use-react-router'

const { TabPane } = Tabs;

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: false };

  handleChange = (checked: any) => {
    this.setState({ checked: checked });
  };

  render() {
    return (
        <div className="checkable-tag">
            <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
        </div>
    );
  }
}

class HTag extends React.Component{
    state = { checked: 0 };

  handleHChange = (checked: any) => {
    if(this.state.checked!==1) this.setState({ checked: 1 });
    else this.setState({checked: 0})
  };

  handlePChange = (checked: any) => {
    if(this.state.checked!==2) this.setState({ checked: 2 });
    else this.setState({checked: 0})
  };

  render() {
    return (
      <div>
          <CheckableTag  {...this.props} checked={this.state.checked === 1} onChange={this.handleHChange}>H因子</CheckableTag>
          <CheckableTag  {...this.props} checked={this.state.checked === 2} onChange={this.handlePChange}>论文数</CheckableTag>
      </div>
      
        );
  }
}
function checkTag(tag: { t: string, w: number }){
    return tag.t.length <= 15
}


export interface TypeCardProps {
    setTab: (tab: string) => void;
    tab: string;
}

function TypeCard(props: TypeCardProps){

    const {experts, loading} = useService();
    const { location } = useRouter();

    const expertData = [
        <div className='condition'>
            <div className='condition-left'>认证:</div>
            <div className='condition-right'>
                <MyTag>认证</MyTag>
                <MyTag>未认证</MyTag>
            </div>
        </div>,
        <div className='condition'>
            <div className='condition-left'>单位:</div>
            <div className='condition-right'>
                <MyTag>高校</MyTag>
                <MyTag>科研所</MyTag>
            </div>
        </div>,
        <div className='condition'>
            <div className='condition-left'>领域:</div>
            <div className='condition-right'>
            {experts.map((item: IExpert) => (
                item.tags !== null && item.tags.length > 0 && item.tags[0].t.length <= 25 &&
                    <MyTag>{item.tags[0].t}</MyTag>
            ))}
            </div>
        </div>,
        <div className='condition'>
        <div className='condition-left'>排序:</div>
        <div className='condition-right'>
            <HTag></HTag>    
        </div>
    </div>,
    ];

    const sourceData = [
        <div className='condition'>
            <div className='condition-left'>领域:</div>
            <div className='condition-right'>
            {experts.map((item: IExpert) => (
                item.tags !== null &&
                item.tags.filter(checkTag).slice(0,item.tags.length >= 5 ? 5:item.tags.length).map((tag: { t: string, w: number }) => (
                    <MyTag>{tag.t}</MyTag>
                )) 
            ))}
            </div>
        </div>
    ]

    return (
        <div className='TypeCard'>
            <Tabs activeKey={props.tab} onChange={e=>props.setTab(e)} type="card">
                <TabPane tab="专家" key="1">
                <Skeleton loading={loading}>
                    <div>
                        <List
                            size="small"
                            bordered
                            dataSource={expertData}
                            renderItem={item => 
                            <List.Item>{item}</List.Item>
                        }
                        />
                    </div>
                    </Skeleton>
                </TabPane>
                <TabPane tab="资源" key="2">
                <Skeleton loading={loading}>
                    <div>
                        <List
                            size="small"
                            bordered
                            dataSource={sourceData}
                            renderItem={item => 
                            <List.Item>{item}</List.Item>}
                        />
                    </div>
                </Skeleton>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TypeCard;

import React from 'react';
import { Tabs, Tag, List, Typography } from 'antd';
import './TypeCard.css'

const { TabPane } = Tabs;

function callback(key: string) {
    console.log(key);
}

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: false };

  handleChange = (checked: any) => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
    );
  }
}

const fields = ['计算机','数学','生物']
const filedsTag = fields.map((item) => <MyTag>{item}</MyTag>);

const expertData = [
    <div className='condition'>
        <div className='condition-left'>认证情况:</div>
        <div className='condition-right'>
            <MyTag>认证</MyTag>
            <MyTag>未认证</MyTag>
        </div>
    </div>,
    <div className='condition'>
        <div className='condition-left'>工作单位:</div>
        <div className='condition-right'>
            <MyTag>高校</MyTag>
            <MyTag>科研所</MyTag>
        </div>
    </div>,
    <div className='condition'>
        <div className='condition-left'>领域:</div>
        <div className='condition-right'>
        {filedsTag}
        </div>
    </div>
];

const sourceData = [
    <div className='condition'>
        <div className='condition-left'>领域:</div>
        <div className='condition-right'>
        {filedsTag}
        </div>
    </div>
]

function TypeCard(){
    return (
        <div className='TypeCard'>
            <Tabs onChange={callback} type="card">
                <TabPane tab="专家" key="1">
                    <div>
                        <List
                            size="small"
                            bordered
                            dataSource={expertData}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                </TabPane>
                <TabPane tab="资源" key="2">
                    <div>
                        <List
                            size="small"
                            bordered
                            dataSource={sourceData}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TypeCard;
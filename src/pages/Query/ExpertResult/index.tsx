import React from 'react';
import './ExpertResult.css'

import { Tag, List, Avatar, Icon } from 'antd';

const data = [1024,2048];
const filed = ['计算机视觉','深度学习','人工智能'];
const filedTag = filed.map((item) =>
    <Tag><a href='www.baidu.com'>{item}</a></Tag>,
)

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Fei-Fei Li`,
    avatar: 'https://avatarcdn.aminer.cn/upload/avatar/265/1157/1241/53f4d81cdabfaef64977b5bf.jpg!160',
    description:
      <div className='decription'>
        <span className='paper-num'>论文数：</span>
        <span className='num'>{data[0]}</span>
        <span className='split'></span>
        <span className='use-num'>被引数：</span>
        <span className='num'>{data[1]}</span>
        <div><Icon type="bank" />Stanfod University</div>
        <div><Icon type="user" />Associate Professor</div>
      </div>,
    content:
      filedTag,
  });
}


function ExpertResult(){
    return(
        <div className='result'>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
                }}
                dataSource={listData}
                renderItem={(item:any) => (
                    <div className='result-item'>
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={100} src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    </div>
                )}
            />
        </div>
    )
}

export default ExpertResult;

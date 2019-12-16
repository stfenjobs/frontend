import React from 'react';

import { Tag, List, Icon } from 'antd';

const data = [1024,2048];
const filed = ['计算机视觉','深度学习','人工智能'];
const filedTag = filed.map((item) =>
    <Tag><a href='www.baidu.com'>{item}</a></Tag>,
)

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `计算机网络`,
    description:
      <div style={{
          width: "30%",
          overflow: "hidden"
      }}>
        <span style={{
            width: "30%",
            overflow: "hidden"
        }}>被引数：</span>
        
        <span style={{
            color: "#3c80bc",
            fontWeight: 500
        }}>{data[1]}</span>
        <div><Icon type="bank" />Stanfod University</div>
        <div><Icon type="user" />Associate Professor</div>
      </div>,
    content:
      filedTag,
  });
}


function PaperResult(){
    return(
        <div style={{margin: "1% 0 1% 1%"}}>
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
                    <div style={{
                        borderBottom: "1px solid rgb(213, 213, 213)",
                    }}>
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
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

export default PaperResult;

import React from 'react';
import useService from '../../services';

import { Link } from 'react-router-dom';
import { Button, Tag, Tabs, Skeleton } from 'antd';

export default () => {
    const { paper, loading } = useService();

    return (
        <div>
            <Skeleton active loading={loading}>
                <div>
                    <span style={{ fontSize: '1.5rem' }}>
                        {paper.title}
                    </span>
                    <span style={{ color: 'rgba(0, 0, 0, 0.6)', paddingLeft: '0.5rem' }}>
                        {paper.year}
                    </span>
                    <span
                        style={{
                            float: 'right',
                            paddingTop: '0.5rem'
                        }}
                    >
                        <Button
                            type='primary'
                        >
                            预览
                        </Button>
                    </span>
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {paper.authors.map((value: { name: string, org: string, id: string | null }, index: number) => (
                        <span>
                            {value.id ? <Link to='/experts/1'>{value.name}</Link>: <span>{value.name}</span>}
                            {index !== paper.authors.length - 1 && <span>{', '}</span>}
                        </span>
                    ))}
                </div>
                <div>
                    {`${paper.venue.raw}, 第 ${paper.volume} 卷, 第 ${paper.issue} 卷`}
                </div>
                <div style={{paddingTop:'0.5rem'}}>
                    {paper.keywords.map((value: string) => (
                        <span><Tag color='blue'>{value}</Tag></span>
                    ))}
                </div>
            </Skeleton>
            <Tabs style={{ paddingTop: '1rem' }}>
                <Tabs.TabPane tab="摘要" key='abstract'>
                    <Skeleton active loading={loading}>
                        {paper.summary}
                    </Skeleton>
                </Tabs.TabPane>
                <Tabs.TabPane tab='引用' key='ref'>
                    <Skeleton active loading={loading}>
                        <div style={{ textAlign: 'center' }}>
                            暂无数据
                        </div>
                    </Skeleton>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
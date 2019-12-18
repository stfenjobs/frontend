import React from 'react';
import useService from '../../services';
import useUserModel from '../../../../models/userModel';
import useRouter from 'use-react-router';

import { Link } from 'react-router-dom';
import { Button, Tag, Tabs, Skeleton, message } from 'antd';


enum errType {
    UNAVALIABLE = 0,
    ID_NOT_EXIST = 1,
};

export interface DetailProps {
    id: string;
};

export default (props: DetailProps) => {
    const { paper, serviceLoading, getPaper, error, clearErr } = useService();
    const { history } = useRouter();
    const { token } = useUserModel();

    React.useEffect(() => {
        getPaper(token, props.id);
    }, []);

    React.useEffect(() => {
        switch (error) {
            case errType.UNAVALIABLE: {
                message.error('服务不可用，请稍后再试');
                clearErr();
                history.push('/');
                return;
            }
            case errType.ID_NOT_EXIST: {
                message.error('不存在的页面');
                clearErr();
                history.push('/papers/not-found');
                return;
            }
        }
    }, [error])

    return (
        <div>
            <Skeleton active loading={serviceLoading}>
                <div>
                    <span style={{ fontSize: '1.5rem' }}>
                        {paper.title}
                    </span>
                    <span style={{ color: 'rgba(0, 0, 0, 0.6)', paddingLeft: '0.5rem' }}>
                        {paper.year}
                    </span>
                    {
                        paper.pdf && paper.urls &&
                        <span
                            style={{
                                float: 'right',
                                paddingTop: '0.5rem'
                            }}
                        >
                            <Button
                                type='primary'
                                onClick={() => window.open(paper.pdf ? paper.pdf : paper.urls[0])}
                            >
                                预览
                            </Button>
                        </span>
                    }
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
                <Tabs.TabPane tab="摘要" key='abstract' style={{ paddingTop: '1rem' }}>
                    <Skeleton active loading={serviceLoading}>
                        {
                            paper.abstract === null || paper.abstract === '' ?
                            <div style={{ textAlign: 'center' }}>
                                暂无数据
                            </div> :
                            <div>{paper.abstract}</div>
                        }
                    </Skeleton>
                </Tabs.TabPane>
                <Tabs.TabPane tab='引用' key='ref' style={{ paddingTop: '1rem' }}>
                    <Skeleton active loading={serviceLoading}>
                        <div style={{ textAlign: 'center' }}>
                            暂无数据
                        </div>
                    </Skeleton>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
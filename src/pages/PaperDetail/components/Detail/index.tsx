import React from 'react';
import useService from '../../services';
import useUserModel from '../../../../models/userModel';
import useRouter from 'use-react-router';

import { Link } from 'react-router-dom';
import { Button, Tag, Tabs, Skeleton, message, Typography } from 'antd';


enum errType {
    UNAVALIABLE = 0,
    ID_NOT_EXIST = 1,
};

export interface DetailProps {
    id: string;
};

export default (props: DetailProps) => {
    const { paper, serviceLoading, getPaper, error, clearErr } = useService();
    const { history, location } = useRouter();
    const { token } = useUserModel();

    React.useEffect(() => {
        getPaper(token, props.id);
    }, [location]);

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

    const {Paragraph} = Typography;

    return (
        <div>
            <Skeleton active loading={serviceLoading}>
                <div>
                    <span style={{fontSize: '2rem', fontWeight: "bold"}}>
                        {paper.title}
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
                <div style={{paddingTop: '0.5rem', fontSize: "medium"}}>
                    Year : {paper.year}
                    <br/> {paper.venue.raw} {paper.volume ? ` 第 ${paper.volume.replace(",", '')} 期 ` : ''}{paper.issue ? `第 ${paper.issue} 卷` : ''}
                </div>
                <div style={{paddingTop: '0.5rem', marginBottom: "0.5rem", fontSize: "large", fontWeight: "bold"}}>
                    Authors：
                    <div>
                        <Paragraph ellipsis={{rows:1, expandable: true}}>
                            {
                                paper.authors
                                .slice(0, paper.authors.length > 15 ? 15 : paper.authors.length)
                                .map((value: { name: string, org: string, id: string | null }, index: number) => (
                                    <span>
                                        {value.id ? <Link to={`/experts/${value.id}`}>{value.name}</Link>: <span>{value.name}</span>}
                                        {index !== (paper.authors.length > 15 ? 14 : paper.authors.length - 1) && <span>{', '}</span>}
                                    </span>
                                ))
                            }
                        </Paragraph>
                    </div>
                </div>
                <div>
                    <Paragraph ellipsis={{rows:1, expandable: true}}>
                        {
                            paper.keywords
                            .slice(0, paper.keywords.length > 15 ? 15 : paper.keywords.length)
                            .map((value: string) => (
                                <span><Tag style={{marginTop: '0.6rem'}} color='blue'>{value}</Tag></span>
                            ))
                        }
                    </Paragraph>
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
                                <div style={{
                                    fontSize: "large",
                                    textAlign: "justify",
                                    whiteSpace: "normal",
                                    textIndent: "2em"
                                }}>{paper.abstract}</div>
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
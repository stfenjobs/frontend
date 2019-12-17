import React from 'react';
import useService from '../services';
import useUserModel from '../../../models/userModel';
import useRouter from 'use-react-router';
import { IPaperListItem } from '../../../types/response'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Avatar, Tag, Icon, List, message, Skeleton } from 'antd';
import ExpertResult from '../../Query/PapperResult';



const name = 'Young さま'
const field = ['工業デザイン', '写真撮影'];
const fieldTag = field.map((item) =>
    <Tag><a href='http://www.instagram.com'>{item}</a></Tag>
)
const organization = 'Guangzhou Academy of Fine Arts';
const isCertificated = true;
const certificationColor = 'green';
const nonCertificationColor = 'red';
const mail = 'khunkin@gmail.com';
const avatar = 'https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/67195095_481191759124959_5957380830821418586_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_cat=103&oh=505d6393c21b0f33e616e12065c71f1a&oe=5E74CC67';
const avatarSize = 135;

const data = [1024, 2048];
const filed = ['计算机视觉', '深度学习', '人工智能'];
const filedTag = filed.map((item) =>
    <Tag><a href='www.baidu.com'>{item}</a></Tag>,
)

function checkTag(author: { name: string, org: string, id: string }) {
    return true;
}

enum errType {
    UNAVALIABLE = 0,
    ID_NOT_EXIST = 1,
};

export interface DetailProps {
    id: string;
};

export default (props: DetailProps) => {
    const { expert, getExpert, loading, error, clearErr, publications, pubsTotal, getExpertsPublication } = useService();
    const { history } = useRouter();
    const { token } = useUserModel();

    React.useEffect(() => {
        getExpert(token, props.id);
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
    }, [error]);


    return (
        <div>
            <div
                style={{
                    marginLeft: '1%',
                    marginTop: '1%',
                    padding: '2%',
                    backgroundColor: 'white'
                }}
                className="personalAttribute"
            >
                <Row gutter={20}>
                    <Col span={5} style={{ minWidth: "200px" }}>
                        <Avatar size={avatarSize} src={avatar} style={{ marginTop: "1.1rem" }} />
                    </Col>
                    <Col >
                        <div
                            style={{
                                marginTop: '1rem',
                                lineHeight: '30px',
                            }}
                        >
                            <div style={{ marginBottom: '1rem' }} >
                                <span style={{ fontSize: '2em' }} >
                                    {expert.name} &ensp; 
                                </span>
                                <span style={{ paddingBottom: "1rem" }}>
                                    <Tag color={expert.isCertification ? certificationColor : nonCertificationColor}>
                                        {expert.isCertification ? '已认证' : '未认证'}
                                    </Tag>
                                </span>
                            </div>
                            <div> <Icon type='bank' style={{ marginRight: "0.5rem" }} /> {expert.orgs} </div>
                            {/* <div> <Icon type='mail' style={{marginRight:"0.5rem"}} /> {expert.mail} </div> */}
                            <div> <Icon type='tag' style={{ marginRight: "0.5rem" }} />

                                {expert.tags.map((item) => (
                                        <Tag>{item.t}</Tag>
                                ))}
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>

            <Card
                title={
                    <div>
                        <span style={{ fontSize: "1.5rem" }}>
                            论文
                        </span>
                        <span style={{
                            paddingLeft: "1%",
                            fontSize: "0.8rem",
                            color: "grey"
                        }}>
                            合計<span> {pubsTotal} </span>件の論文
                        </span>
                    </div>
                }
                className='query-left-typecard'
                bordered={false}
                headStyle={{
                    paddingLeft: "1%",
                }}
                bodyStyle={{
                    padding: "1%",
                }}
            >
                <div style={{ margin: "1% 0 1% 1%" }}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log("Page: " + page);
                                getExpertsPublication(
                                    token,
                                    {
                                        page: page,
                                        size: 10,
                                        domain: "author",
                                        key: expert.name,
                                        sort: "n_citation",
                                        direction: true,
                                        free: true,
                                    }
                                );
                                console.log("publication:", publications);
                            },
                            pageSize: 10,
                            total: pubsTotal,
                        }}
                        dataSource={ publications.map((paper: IPaperListItem) => ({
                            href: '/papers/1',
                            title: paper.title,
                            description:
                                <div style={{ width: "30%", overflow: "hidden" }}>
                                    <div>
                                        <span style={{ width: "30%", overflow: "hidden" }}>
                                            发表年份
                                        </span>

                                        <span style={{ color: "#3c80bc", fontWeight: 500 }}>
                                            {paper.year}
                                        </span>
                                    </div>
                                    <div>
                                        {`P ${paper.page_start} - ${paper.page_end}, 第 ${paper.volume} 卷, 第 ${paper.issue} 卷`}
                                    </div>
                                </div>,
                            content:
                                paper.authors.filter(checkTag).slice(0, paper.authors.length >= 5 ? 5 : paper.authors.length).map((author: { name: string, org: string, id: string }) => (
                                    <span>
                                        {author.id ? <Link to='/experts/1'>{author.name}</Link> : <span>{author.name}</span>}
                                    </span>
                                ))
                            }))
                        }
                        renderItem={(item: any) => (
                            <div style={{ borderBottom: "1px solid rgb(213, 213, 213)", }}>
                                <List.Item key={item.title} >
                                    <Skeleton loading={loading}>
                                        <List.Item.Meta
                                            title={<a href={item.href}>{item.title}</a>}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </Skeleton>
                                </List.Item>
                            </div>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
}
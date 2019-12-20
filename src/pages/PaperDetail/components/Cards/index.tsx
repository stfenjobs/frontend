import React from 'react';
import useService from '../../services';
import useUserModel from '../../../../models/userModel';
// import useRouter from 'use-react-router';

import { Affix, Card, Button, Rate, Divider, message, List, Skeleton } from 'antd';
import { IFavorite } from '../../../../types';
import {IPaperListItem} from '../../../../types/response';


enum errType {
    SERVICE_UNAVAILABLE = 0,
    BAD_PARAM = 1,
    SERVICE_REFUSED = 2,
    TOKEN_EXPIRED = 3,
}

export default (props: { id: string, style: any }) => {
    const { paper, commend, serviceLoading } = useService();
    const {
        token, id, favorite, addFavorite, removeFavorite, loading, error, clearError, logout, getFavorite
    } = useUserModel();

    React.useEffect(() => {
        getFavorite(token, id);
    }, []);

    React.useEffect(() => {
        switch (error) {
            case errType.SERVICE_UNAVAILABLE: {
                message.error('服务不可用');
                break;
            }
            case errType.SERVICE_REFUSED: {
                message.error('登录状态异常')
                logout(token);
                break;
            }
            case errType.BAD_PARAM: {
                message.error('请求参数错误');
                break;
            }
            case errType.TOKEN_EXPIRED: {
                message.error('登录过期');
                logout(token);
                break;
            }
        }

        clearError();
    }, [error])

    return (
        <Affix offsetTop={10} style={{...props.style, width: '27%'}}>
            <div>
                <Card title='论文' loading={serviceLoading || loading}>
                    <div style={{ paddingLeft: '0.5rem' }}>
                        {
                            favorite !== undefined && favorite.map((item: IFavorite) => item.id).includes(props.id) ?
                            <Button
                                style={{width: '6rem'}}
                                onClick={() => removeFavorite(token, id, props.id)}
                                loading={loading}
                            >
                                已收藏
                            </Button> :
                            <Button
                                style={{width: '6rem'}}
                                onClick={() => addFavorite(token, id, props.id, paper.title)}
                                loading={loading}
                            >
                                收藏
                            </Button>
                        }
                        <span style={{ paddingLeft: '1rem' }}>
                            <Button style={{width: '6rem'}}>购买</Button>
                        </span>
                    </div>
                    <Divider />
                    <div style={{ paddingLeft: '0.5rem' }}>
                        <span>您的评价：</span>
                        <Rate allowHalf defaultValue={2.5} />
                    </div>
                    <Divider />
                    <span style={{ paddingLeft: '0.5rem' }}>
                        <span>{`被引用量: ${paper.n_citation}`}</span>
                        <Divider type='vertical' />
                        <span>生成引用</span>
                    </span>
                </Card>
                <div style={{paddingTop: '1rem'}}>
                    <Card title='相关论文' loading={serviceLoading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={commend}
                            renderItem={
                                (item: IPaperListItem) => (
                                    <List.Item>
                                        <Skeleton loading={serviceLoading}>
                                            <List.Item.Meta
                                                title={<a href={`/papers/${item.id}`}>{item.title}</a>}
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )
                            }
                        />
                    </Card>
                </div>
            </div>
        </Affix>
    );
};
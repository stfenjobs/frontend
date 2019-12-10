import React from 'react';
import useRouter from 'use-react-router';
import useService from './services';

import { Empty, Button, List, Skeleton } from 'antd';


export interface PurchaseListProps { };

export default () => {
    const { history } = useRouter();
    const { records, loading } = useService();

    return (
        <div>
            {
                records.length === 0 ?
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                        height: '3rem',
                    }}
                    description={
                        <span style={{ color: 'black' }}>
                            还没有交易记录，快开始你的剁手秀
                        </span>
                    }
                    style={{
                        padding: '25% 0'
                    }}
                >
                    <Button type='primary' onClick={() => history.push('/')}>
                        探索
                    </Button>
                </Empty> :
                <List
                    itemLayout='vertical'
                    size='large'
                    dataSource={records}
                    renderItem={
                        (item, index: number) => (
                            <List.Item key={index}>
                                <Skeleton loading={loading}>
                                    <span>占位符</span>
                                </Skeleton>
                            </List.Item>
                        )
                    }
                />
            }
        </div>
    );
};
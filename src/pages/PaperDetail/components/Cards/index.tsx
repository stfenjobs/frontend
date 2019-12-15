import React from 'react';
import useService from '../../services';

import { Affix, Card, Button, Rate, Divider } from 'antd';

export default (props: { style: any }) => {
    const { paper, loading } = useService();

    return (
        <Affix offsetTop={10} style={{...props.style, width: '27%'}}>
            <div>
                <Card title='论文' loading={loading}>
                    <div style={{ paddingLeft: '0.5rem' }}>
                        <Button >收藏</Button>
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
                    <Card title='第一作者' loading={loading} >
                        {paper.authors.map((value: { name: string, org: string, id: string | null }) => (
                            <span>{value.name}</span>
                        ))}
                    </Card>
                </div>
            </div>
        </Affix>
    );
};
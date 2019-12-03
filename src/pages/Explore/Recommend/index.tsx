import React from 'react';

import {Card} from 'antd';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";

const {Meta} = Card;


export default () => {
    const card = (
        <Col span={6}>
            <Card
                hoverable
                style={{width: '100%'}}
                cover={<img alt="example"
                            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575071034186&di=1e10a7b740e5e3788e8ec85a441d1165&imgtype=0&src=http%3A%2F%2Fwww.jianada-qianzheng.com%2Fupfile%2F201708%2F2017081627231977.jpg"/>}
            >
                <Meta title="Europe Street beat" description="www.instagram.com"/>
            </Card>
        </Col>
    );

    const range = (end = 0, step = 1) => {
        let arr = []
        for (let i = 0; i < end; i += step)
            arr[i] = card
        return arr
    }

    return (
        <div style={{margin: "0", verticalAlign: "middle", padding: 0}}>
            <Row gutter={[24, 24]}>
                {range(4)}
            </Row>
            <Row gutter={[24, 24]}>
                {range(4)}
            </Row>
        </div>
    );
};

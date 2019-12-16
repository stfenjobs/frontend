import React from 'react';

import {Card} from 'antd';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";

const {Meta} = Card;

const range = (end = 0, step = 1) => {
    let arr = [];
    for (let i = 0; i < end; i += step)
        arr[i] = {
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575071034186&di=1e10a7b740e5e3788e8ec85a441d1165&imgtype=0&src=http%3A%2F%2Fwww.jianada-qianzheng.com%2Fupfile%2F201708%2F2017081627231977.jpg",
            name: ("Europe Street beat :" + i),
            ds: "www.instagram.com"
        };
    return arr
};

const stars = range(4);

export default () => {
    const card = stars.map(key => (
        <Col span={6} key={key.name}>
            <Card
                hoverable
                style={{width: '100%'}}
                cover={<img alt="example"
                            src={key.img}/>}
            >
                <Meta title={key.name} description={key.ds}/>
            </Card>
        </Col>
    ));



    return (
        <div style={{margin: "0", verticalAlign: "middle", padding: 0}}>
            <Row gutter={[24, 24]}>
                {card}
            </Row>
            <Row gutter={[24, 24]}>
                {card}
            </Row>
        </div>
    );
};

import React, {useEffect} from 'react';

import {Card} from 'antd';

import Col from "antd/es/grid/col";
import {Collapse} from 'antd';
import api from '../../../api';
import useUserModel from "../../../models/userModel";
import useRouter from "use-react-router";

const {Panel} = Collapse;

const range = (end = 0, step = 1) => {
    let arr = [];
    for (let i = 0; i < end; i += step)
        arr[i] = {
            title: ("Europe Street beat :" + i),
            ds: "www.instagram.com"
        };
    return arr
};

const data = [
        {
            name: "TOP10 论文",
            info: range(6)
        },
        {
            name: "TOP10 专家",
            info: range(6)
        },
        {
            name: "TOP10 领域",
            info: range(6)
        }
    ]
;



export default () => {
    const card = data.map(key => (
        <Col style={{marginRight: "2rem"}} span={8} key={key.name}>
            <Card
                hoverable
                style={{width: '100%'}}
                title={key.name}
            >
                <Collapse bordered={false}>{/*defaultActiveKey={[]}*/}
                    {key.info.map(value => (
                        <Panel header={value.title} key={value.title}>
                            {value.ds}
                        </Panel>
                    ))}
                </Collapse>
            </Card>
        </Col>
    ));
    const {id, token} = useUserModel();
    const {history} = useRouter();
    useEffect(() => {
        // api.paper.list(token, {
        //     size: 10,
        //     page: 1,
        //     key:"",
        //     sort: "n_citation"
        // }).then (r =>{
        //     console.log(r)
        // })
    }, [history]);


    return (
        <div style={{
            margin: "5% 12%",
            position: "absolute",
            width: "66%",
            verticalAlign: "middle",
            padding: 0,
            display: "flex"
        }}>
            {card}
        </div>
    );
};

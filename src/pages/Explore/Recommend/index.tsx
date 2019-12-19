import React, {useEffect, useState} from 'react';

import {Card, Collapse, Divider, Icon, Statistic} from 'antd';

import Col from "antd/es/grid/col";
import api from '../../../api';
import useUserModel from "../../../models/userModel";
import useRouter from "use-react-router";
import {randomBytes} from "crypto";

const {Panel} = Collapse;

export default () => {
    const {id, token} = useUserModel();
    const {history} = useRouter();
    const [loading, setLoad] = useState(true);
    const [up, setUP] = useState(0);


    const [data, setData] = useState([
        {
            name: "TOP10 论文",
            info: []
        },
        {
            name: "TOP10 专家",
            info: []
        },
        {
            name: "热门领域",
            info: []
        }
    ]);


    const cardp = (
        <Col style={{marginRight: "2rem"}} span={8} key={"p"}>
            <Card loading={loading}
                  hoverable
                  style={{width: '100%'}}
                  title={"TOP10 论文"}
            >
                <Collapse bordered={false} defaultActiveKey={[0]}>
                    {data[0].info.map((value: any, index) => (
                        <Panel header={value.title} key={index}
                               style={{fontWeight: "bold", fontSize: "medium"}}>
                            <div style={{
                                textAlign: "left",
                                width: "100%",
                                fontWeight: "normal"
                            }}>
                                <Divider> Info </Divider>
                                <span><Icon type="user"/>    Author ： {value.authors[0].name}</span>
                                <br/>
                                <span><Icon type="branches"/>    Citation ： {value.n_citation}</span>
                                <br/>
                            </div>
                            <Divider> Abstract </Divider>
                            <span
                                style={{fontWeight: "normal"}}>
                                {value.abstract.slice(0, 200)} {value.abstract.length > 200 ? '...' : ''}
                            </span>
                        </Panel>
                    ))}
                </Collapse>
            </Card>
        </Col>

    );
    const carde = (
        <Col style={{marginRight: "2rem"}} span={8} key={"e"}>
            <Card loading={loading}
                  hoverable
                  style={{width: '100%'}}
                  title={"TOP10 专家"}
            >
                <Collapse bordered={false} defaultActiveKey={[0, 1]}>
                    {data[1].info.map((value: any, index) => (
                        <Panel header={value.name} key={index} style={{fontWeight: "bold", fontSize: "medium"}}>
                            <div style={{
                                textAlign: "left",
                                width: "100%",
                                paddingLeft: "8%"
                            }}>
                                <span><Icon type="branches"/>    Citations ： {value.n_citation}</span>
                                <br/>
                                <span><Icon type="read"/>    Papers： {value.n_pubs}</span>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </Card>
        </Col>
    );

    const cardk = (
        <Col style={{marginRight: "2rem"}} span={8} key={"k"}>
            <Card loading={loading}
                  hoverable
                  style={{width: '100%'}}
                  title={"热 门 领 域"}
            >
                {data[2].info.map((value: any, index) => (
                    <div style={{
                        textAlign: "left",
                        width: "100%",
                        paddingLeft: "8%"

                    }} key={index + Math.random()}>
                        <span style={{fontSize: "larger", fontWeight: "bold"}}> {value}</span>
                        <Statistic
                            value={Math.random()}
                            precision={2}
                            valueStyle={(value.length % 2 == 0) ? ({color: '#cf1322'}) : ({color: '#3f8600'})}
                            prefix={(value.length % 2 == 0) ?
                                (<Icon type="arrow-up"/>) : (<Icon type="arrow-down"/>)
                            }
                            suffix="%"
                        />
                        <Divider/>
                    </div>
                ))}

            </Card>
        </Col>
    );


    useEffect(() => {
        setLoad(true);
        api.paper.list(token, {
            size: 10,
            page: 1,
            key: "",
            sort: "n_citation"
        }).then(r => {
            console.log(r);
            if (r.data.content.papers) {
                data[0].info = r.data.content.papers;
                setData(data);
                data[2].info = r.data.content.papers[3].keywords.splice(0, 5);
                setUP(up + randomBytes(1).readInt8(0));
            }
            console.log(data);
        }).catch(e => {
            console.log(e)
        });

        api.expert.list(token, {
            size: 10,
            page: 1,
            key: "",
            sort: "n_citation"
        }).then(r => {
            console.log(r);
            if (r.data.content.experts) {
                data[1].info = r.data.content.experts;
                setData(data);
                setUP(up + randomBytes(1).readInt8(0));
            }
            console.log(data);
        }).catch(e => {
            console.log(e)
        });

        setLoad(false)
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
            {cardp}
            {carde}
            {cardk}
        </div>
    );
};

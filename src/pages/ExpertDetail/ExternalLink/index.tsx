import React from 'react'
import {BackTop, Affix, Card, Icon, Avatar} from 'antd'
import Meta from "antd/es/card/Meta";
import useService from "../services";

function ExternalLink() {
    const {publications, loading, expert} = useService();
    const aboutE = (experts: any) => (
        <Meta
            key={experts.name}
            avatar={<Avatar style={{
                fontSize: "large",
                fontWeight: "bolder",
                color: '#f1c369',
                backgroundColor: '#fdf5cf'
            }}>{experts === undefined ? '' : experts.name.charAt(0)} </Avatar>}
            title={experts === undefined ? '' : experts.name}
            description={<br/>}
        />
    );


    const aboutCard = () => (
        <Card
            loading={loading}
            title="相关专家"
        >
            {publications[0].authors.splice(0, 5).map((value) => aboutE(value))}

        </Card>

    );

    return (
        <div>
            <Affix offsetTop={10}>
                <div>
                    <div>
                        {aboutCard()}
                    </div>
                    <div style={{
                        marginTop: "1rem",
                    }}>
                        <Card
                            loading={loading}
                            title="数据分析"
                            style={{fontSize: "0.9rem"}}
                        >
                            <span><Icon type="branches"/>    Citations ： {expert.n_citation}</span>
                            <br/>
                            <span><Icon type="read"/>    Papers： {expert.n_pubs}</span>
                            <br/>
                            <span><Icon type="dot-chart"/>    H-index： {expert.h_index}</span>
                        </Card>
                    </div>
                </div>

            </Affix>
            <BackTop/>
        </div>
    )
}

export default ExternalLink;
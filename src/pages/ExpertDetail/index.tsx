import React from 'react';
import { Row, Col, Card} from 'antd';

import ExternalLink from './ExternalLink'
import PersonalAttribute from './PersonalAttribute'
import PaperResult from './PaperResult'

export default () => {
    return (
        <div className='expert-detail' style={{margin: "0 18%"}}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                <Col style={{width: "70%", }} span={15}>
                    <div className='expert-detail-left-attri'>
                        <PersonalAttribute />
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
                                    合計<span> 128 </span>件の論文
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
                        <PaperResult />
                    </Card>
                </Col>
                <Col style={{
                    width: "27%",
                    marginRight: "1%",
                    marginTop:"3rem"
                }} 
                    span={2}
                >
                    <ExternalLink />
                </Col>
            </Row>
        </div>
    );
};

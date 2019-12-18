import React from 'react';
import useRouter from 'use-react-router';
import ExternalLink from './ExternalLink'
import Detail from './Detail'
import { Row, Col } from 'antd';

export default () => {
    const { location } = useRouter();

    return (
        <div className='expert-detail' style={{ margin: "0 18%" }}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                <Col style={{ width: "70%", }} span={15}>
                    <Detail id={location.pathname.split('/').pop() as string} />
                </Col>
                <Col style={{
                    width: "27%",
                    marginRight: "1%",
                    marginTop: "3rem"
                }}
                    span={2}
                >
                    <ExternalLink />
                </Col>
            </Row>
        </div>
    );
};

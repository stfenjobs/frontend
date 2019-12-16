import React from 'react';

import { Tag, Avatar, Icon, Row, Col } from 'antd';

const name = 'Young さま'
const field = ['工業デザイン', '写真撮影'];
const fieldTag = field.map((item) =>
    <Tag><a href='http://www.instagram.com'>{item}</a></Tag>
)
const organization = 'Guangzhou Academy of Fine Arts';
const isCertificated = true;
const certificatedColor = 'green';
const nonCertificatedColor = 'red';
const mail = 'khunkin@gmail.com';
const avatar = 'https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/67195095_481191759124959_5957380830821418586_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_cat=103&oh=505d6393c21b0f33e616e12065c71f1a&oe=5E74CC67';
const avatarSize = 135;

function PersonalAttribute() {
    return (
        <div 
            style={{
                marginLeft: '1%',
                marginTop: '1%',
                padding: '2%',
                backgroundColor: 'white'
            }}
        >
            <Row gutter={20}>
                <Col span={5} style={{minWidth:"200px"}}>
                    <Avatar size={avatarSize} src={avatar} style={{marginTop:"1.1rem"}}/>
                </Col>
                <Col >
                    <div 
                        style={{
                            marginTop: '1rem',
                            lineHeight: '30px',
                        }}
                    >
                        <div style={{ marginBottom: '1rem'}} >
                            <span style={{ fontSize: '2em' }} > 
                                {name} 
                            </span>
                            <span style={{paddingBottom:"1rem"}}> 
                                <Tag color={isCertificated ? certificatedColor : nonCertificatedColor}>
                                    {isCertificated ? '已认证' : '未认证'}
                                </Tag> 
                            </span>
                        </div>
                        <div> <Icon type='bank' style={{marginRight:"0.5rem"}} />  {organization} </div>
                        <div> <Icon type='mail' style={{marginRight:"0.5rem"}} /> {mail} </div>
                        <div> <Icon type='tag' style={{marginRight:"0.5rem"}} /> {fieldTag} </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PersonalAttribute;
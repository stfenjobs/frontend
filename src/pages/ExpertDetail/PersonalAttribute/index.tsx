import React from 'react';
import './PersonalAttribute.css'

import { Tag, Descriptions, Avatar, Icon, Row, Col } from 'antd';

const name = 'Icey Hua'
const data = [255, 65535];
const field = ['gsgzh', 'wacqh'];
const fieldTag = field.map((item) =>
    <Tag><a href='www.instagram.com'>{item}</a></Tag>
)
const organization = 'GAFA';
const isCertificated = true;
const position = ['教授', '党委书记', '工业设计院长'];
const positionTag = position.map((item) =>
    <Tag><a href='www.baidu.com'>{item}</a></Tag>,
)
const profile = 'GOOOOOOOOD!';
const homepage = 'https://www.instagram.com/icey.hua'
const homepageName = 'gsgzh';
const phoneNum = '12345678910';
const mail = 'gsgzh@gmail.com';
const avatar = 'https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/67195095_481191759124959_5957380830821418586_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_cat=103&oh=505d6393c21b0f33e616e12065c71f1a&oe=5E74CC67';


function PersonalAttribute() {
    return (
        <div className="personal-attribute">
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                <Col className='personal-attribute-avatar' span={1}> 
                    <Avatar size={100} src={avatar} />
                </Col>
                <Col className="personal-attribute-description" span={20}>
                    <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} >
                        <Descriptions.Item label="论文数">{data[0]}</Descriptions.Item>
                        <Descriptions.Item label="被引数">{data[1]}</Descriptions.Item>
                        <Descriptions.Item label="是否认证">{isCertificated ? '是' : '否'}</Descriptions.Item>


                        <Descriptions.Item label="所在组织" >{organization}</Descriptions.Item>
                        <Descriptions.Item label="领域">{field}</Descriptions.Item>
                        <Descriptions.Item label="职位">{positionTag}</Descriptions.Item>

                        
                        <Descriptions.Item label="联系电话">{phoneNum}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>

                        <Descriptions.Item label="个人主页"><a href={homepage}>{homepageName}</a></Descriptions.Item>
                        <Descriptions.Item label="个人简介" span={3}>{profile} </Descriptions.Item>
                        
                    </Descriptions>
                </Col>
            </Row>
        </div>
    );
}

export default PersonalAttribute;
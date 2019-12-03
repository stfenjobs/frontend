import React from 'react';
import './PersonalAttribute.css'

import { Tag, Descriptions, Avatar, Icon, List} from 'antd';

const name = 'Icey Hua'
const data = [255, 65535];
const field = ['gsgzh','wacqh'];
const fieldTag = field.map((item) => 
    <Tag><a href='www.instagram.com'>{item}</a></Tag>
)
const organization = 'GAFA';
const isCertificated = true;
const position = ['教授', '党委书记'];
const profile = 'GOOOOOOOOD!';
const homepage = 'https://www.instagram.com/icey.hua'
const homepageName = 'gsgzh'; 
const phoneNum = '12345678910';
const mail = 'gsgzh@gmail.com';
const avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';


function PersonalAttribute(){
    return (
        <div className="personal-attribute">
            <Avatar size={100} src={avatar}/>
            <Descriptions 
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                <Descriptions.Item label="论文数">{data[0]}</Descriptions.Item>
                <Descriptions.Item label="被引数">{data[1]}</Descriptions.Item>
                <Descriptions.Item label="所在组织">{organization}</Descriptions.Item>
                <Descriptions.Item label="领域">{field}</Descriptions.Item>
                <Descriptions.Item label="职位">{position}</Descriptions.Item>
                <Descriptions.Item label="是否认证">{isCertificated ? '是' : '否'}</Descriptions.Item>
                <Descriptions.Item label="个人简介">{profile} </Descriptions.Item>
                <Descriptions.Item label="个人主页"><a href={homepage}>{homepageName}</a></Descriptions.Item>
                <Descriptions.Item label="联系电话">{phoneNum}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default PersonalAttribute;
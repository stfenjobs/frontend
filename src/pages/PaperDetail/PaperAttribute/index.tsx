import React from 'react';
import './PaperAttribute.css'
import { Tag, Descriptions, Avatar, Icon, List } from "antd";

const title = "Computer Science"
const author = "Khunkin Dang"
const court = "CCF"
const filed = ['HPC','CV','NLP'];

function PaperAttribute() {
    return (
        <div className="paper-attribute">
            <div className="paper-attribute-description">
                <Descriptions
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="标题">{title}</Descriptions.Item>
                    <Descriptions.Item label="作者">{author}</Descriptions.Item>
                    <Descriptions.Item label="会议">{court}</Descriptions.Item>
                    <Descriptions.Item label="领域">{filed}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    );
}

export default PaperAttribute;
import React from 'react'
import { BackTop, Affix, Card, Icon, Avatar } from 'antd'
import './ExternalLink.css'

const content1 = "此处应有相关推荐的图谱";

const content2 = "此处应有基于时间的论文发表统计图";

const link = ""
const content3 = (<a href={link}>GitHub主页</a>);

function ExternalLink(){

    return (
        <div>
        <Affix>
            <div className='ExternalLink'>
                <Card
                    loading={false}
                    title="相关度"
                >
                    <div className='content'>
                        {content1}
                    </div>
                </Card>
                <Card
                    loading={false}
                    title="发文量"
                >
                    <div className='content'>
                        {content2}
                    </div>
                </Card>
                <Card
                    loading={false}
                    title="外链"
                >
                    <div className='content'>
                        {content3}
                    </div>
                </Card>
            </div>
        </Affix>
        <BackTop />
        </div>
    )
}

export default ExternalLink;
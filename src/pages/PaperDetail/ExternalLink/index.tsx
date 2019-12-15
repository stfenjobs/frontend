import React from 'react'
import { BackTop, Affix, Card, Icon, Avatar } from 'antd'
import './ExternalLink.css'

const content_component = "Avxiu:__\nGithub:__\n";

const content_data = "Information";

const link = ""
const content_bargin = "Information";

function ExternalLink(){

    return (
        <div>
        <Affix>
            <div className='ExternalLink'>
                <Card
                    loading={false}
                    title="组件"
                >
                    <div className='content'>
                        {content_component}
                    </div>
                </Card>
                <Card
                    loading={false}
                    title="数据"
                >
                    <div className='content'>
                        {content_data}
                    </div>
                </Card>
                <Card
                    loading={false}
                    title="交易"
                >
                    <div className='content'>
                        {content_bargin}
                    </div>
                </Card>
            </div>
        </Affix>
        <BackTop />
        </div>
    )
}

export default ExternalLink;
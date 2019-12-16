import React from 'react'
import { BackTop, Affix, Card, Icon, Avatar } from 'antd'

const content_relativity = "此处应有相关推荐的图谱";

const content_post_num = "此处应有基于时间的论文发表统计图";

function ExternalLink(){
    const renderCard = (title: string, content: string, loading: boolean) => (
        <Card
            loading={loading}
            title={title}
        >
            <div>
                {content}
            </div>
        </Card>
    );

    return (
        <div>
        <Affix offsetTop={10}>
            <div>
                <div>
                    {renderCard('相关度', content_relativity, false)}
                </div>
                <div style={{
                    marginTop: "1rem",
                }}>
                    {renderCard('发文量', content_post_num, false)}
                </div>
            </div>
            
        </Affix>
        <BackTop />
        </div>
    )
}

export default ExternalLink;
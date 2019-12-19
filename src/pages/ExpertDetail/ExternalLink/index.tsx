import React from 'react'
import { BackTop, Affix, Card } from 'antd'

const content_relativity = "ここに関連する推奨マップがあるはずです";

const content_post_num = "時間ベースの紙の出版統計があるはずです";

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
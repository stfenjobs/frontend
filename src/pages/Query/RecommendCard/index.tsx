import React from 'react'
import { BackTop, Affix, Card, Icon, Avatar } from 'antd'
import './RecommendCard.css'

const { Meta } = Card;
const content = "hello akfiawhfoihug yuhiwdojpqksAIUDGYAhiojklsbvkujwfgwleiuaofhwkbsgil8aowlfhgliqfga";

function RecommendCard(){

    return (
        <div>
        <Affix>
            <div className='RecommendCard'>
                <Card
                    actions={[
                    <Icon type="ellipsis" key="ellipsis" />,
                    ]}
                    loading={false}
                    title="最佳匹配"
                >
                    <Meta
                    avatar={<Avatar src="https://avatarcdn.aminer.cn/upload/avatar/265/1157/1241/53f4d81cdabfaef64977b5bf.jpg!160" />}
                    title="Fei-Fei Li"
                    description="Stanford University"
                    />
                    <div className='content'>
                        {content}
                    </div>
                </Card>
            </div>
        </Affix>
        <BackTop />
        </div>
    )
}

export default RecommendCard;
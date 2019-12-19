import React,{useEffect,useState} from 'react'
import { BackTop, Affix, Card, Icon, Avatar,Skeleton } from 'antd'
import './RecommendCard.css'
import qs from 'qs';
import { QueryParam } from '../../../types'
import useRouter from 'use-react-router'
import useService from '../services'

const { Meta } = Card;

function RecommendCard(){

    const [type, setType] = useState('');
    const { location } = useRouter();
    const { papers, loading, experts  } = useService();

    useEffect(() => {
        const param: QueryParam = qs.parse(location.search.slice(1));
        setType(param.type);
    }, [location]);

    return (
        type === "expert" ? 
        <div>
        <Affix offsetTop={10}>
            <div className='RecommendCard'>
                <Card
                    actions={[
                    <a href={experts[0] !== undefined ? 'experts/'+experts[0].id:''}><Icon type="ellipsis" key="ellipsis"/></a>
                    ]}
                    loading={loading}
                    title="最佳匹配"
                >
                    <Meta
                    avatar={<Avatar src="https://avatarcdn.aminer.cn/upload/avatar/265/1157/1241/53f4d81cdabfaef64977b5bf.jpg!160" />}
                    title={experts[0] === undefined ? '':experts[0].name}
                    description={experts[0] === undefined ? '':experts[0].org === null ? "idependent":experts[0].org}
                    />
                </Card>
            
            </div>
        </Affix>
        <BackTop />
        </div>
        :
        <div>
        <Affix offsetTop={10}>
            <div className='RecommendCard'>
                <Card
                    actions={[
                    <a href={papers[0] === undefined ? "":'papers/'+papers[0].id}><Icon type="ellipsis" key="ellipsis"/></a>
                    ]}
                    loading={loading}
                    title="最佳匹配"
                >
                    <Meta
                    avatar={<Avatar src="https://avatarcdn.aminer.cn/upload/avatar/265/1157/1241/53f4d81cdabfaef64977b5bf.jpg!160" />}
                    title={papers[0] === undefined ? "" : papers[0].title}
                    description={papers[0] === undefined ? "" : papers[0].authors[0] === undefined ? "暂无":papers[0].authors[0].name}
                    />
                    <div className='content'>
                        {papers[0] === undefined ? "" : papers[0].abstract.slice(0,papers[0].abstract.length < 500 ? papers[0].abstract.length : 500)+'...'}
                    </div>
                </Card>
            
            </div>
        </Affix>
        <BackTop />
        </div>
    )
}

export default RecommendCard;
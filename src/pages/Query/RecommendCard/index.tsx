import React,{useEffect,useState} from 'react'
import { BackTop, Affix, Card, Icon, Avatar,Skeleton } from 'antd'
import './RecommendCard.css'
import qs from 'qs';
import { QueryParam } from '../../../types'
import useRouter from 'use-react-router'
import useService from '../services'
import ReactEcharts from 'echarts-for-react';


const { Meta } = Card;

function RecommendCard(){

    const [type, setType] = useState('');
    const { location } = useRouter();
    const { papers, loading, experts  } = useService();

    useEffect(() => {
        const param: QueryParam = qs.parse(location.search.slice(1));
        setType(param.type);
    }, [location]);

    const option = {
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 3, 5]
               }
            },
            indicator: [
               { name: '论文数', max: 25.39},
               { name: '被引数', max: 574.54},
               { name: 'H因子', max: 2.16},
            ],
            radius: 55,
        },
        series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                 {
                    value : [
                        experts.length!==0 && experts[0].n_pubs < 25.39 ? experts[0].n_pubs : 25.39,
                        experts.length!==0  && experts[0].n_citation < 574.54 ? experts[0].n_citation : 574.54,
                        experts.length!==0  && experts[0].h_index < 2.16 ? experts[0].h_index : 2.16,
                    ],
                }
            ]
        }]
    }


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
                    {experts.length === 0 ?
                    <div>暂无数据</div>:
                    <div>
                    <Meta
                        avatar={<Avatar style={{
                            fontSize: "large",
                            fontWeight: "bolder",
                            color: '#f1c369',
                            backgroundColor: '#fdf5cf'
                        }}>{experts[0] === undefined ? '' : experts[0].name.charAt(0)} </Avatar>}
                        title={experts[0] === undefined ? '':experts[0].name}
                        description={experts[0] === undefined ? '' : experts[0].orgs === null ? "idependent" : experts[0].orgs[0]}
                    />
                    <div className="radar-chart">
                    <ReactEcharts
                            option={option}
                            style={{height:"200px"}}
                        />
                    </div>
                    </div>
                    }
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
                        avatar={<Avatar style={{
                            fontSize: "large",
                            fontWeight: "bolder",
                            color: '#f1c369',
                            backgroundColor: '#fdf5cf'
                        }}>{papers[0] === undefined ? "" : papers[0].authors[0] === undefined ? "暂无" : papers[0].authors[0].name.charAt(0)} </Avatar>}
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
import React,{ useState, useEffect } from 'react';
import './ExpertResult.css'
import useService from '../services'
import { Tag, List, Avatar, Icon, Skeleton } from 'antd';
import qs from 'qs';
import { QueryParam } from '../../../types';
import useRouter from 'use-react-router'
import {IExpert} from '../../../types';

function checkTag(tag: { t: string, w: number }){
    return tag.t.length <= 25
}


function ExpertResult(){
    const [key, setKey] = useState('');
    const { location } = useRouter();
    const { experts, loading, getExperts, expertsTotal } = useService();

    useEffect(() => {
        const param: QueryParam = qs.parse(location.search.slice(1));
        setKey(param.q);
    }, [location]);

    return(
        <div className='result'>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    style: {marginLeft: 0},
                    className: "pagLeft",
                    onChange: page => {
                        console.log(page);
                        getExperts({
                            page: page,
                            size: 10,
                            domain: "name",
                            key: key,
                            sort: 'n_citation',
                            direction: true,
                            free: true,
                        });
                    },
                    pageSize: 10,
                    total: expertsTotal > 5000 ? 5000:expertsTotal,
                }}
                dataSource={experts[0] === undefined ? []:
                    experts.map((item: IExpert) => ({
                    href: 'experts/'+item.id,
                    title: item.name,
                    description:
                        <div className='decription'>
                            <span className='paper-num'>论文数：</span>
                            <span className='num'>{item.n_pubs}</span>
                            <span className='split'></span>
                            <span className='use-num'>被引数：</span>
                            <span className='num'>{item.n_citation}</span>
                            <div><Icon type="bank"/>{item.orgs === null || item.orgs[0] === "" ? "Independent" : item.orgs[0]}</div>
                        </div>,
                    content:
                        item.tags !== null &&
                            item.tags.filter(checkTag).slice(0,item.tags.length >= 5 ? 5:item.tags.length).map((tag: { t: string, w: number }) => (
                                <Tag><a href={'/search?q='+tag.t+'&type=paper'}>{tag.t}</a></Tag>
                            )) 
                }))}
                renderItem={(item:any) => (
                    <div className='result-item'>
                        <List.Item
                            key={item.title}
                        >
                            <Skeleton loading={loading}>
                            <List.Item.Meta
                                avatar={<Avatar style={{
                                    fontSize: "xx-large",
                                    fontWeight: "bolder",
                                    color: '#f56a00',
                                    backgroundColor: '#fde3cf'
                                }} size={100}>{item.title.charAt(0)}</Avatar>}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                            </Skeleton>
                        </List.Item>
                    </div>
                )}
            />
        </div>
    )
}

export default ExpertResult;

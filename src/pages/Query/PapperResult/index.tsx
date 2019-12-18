import React,{useEffect,useState} from 'react';
import './PapperResult.css'

import { Tag, List, Avatar, Icon } from 'antd';

import {IPaperListItem, IContentPaperList} from '../../../types/response'
import useService from '../services'
import qs from 'qs';
import { QueryParam } from '../../../types';
import useRouter from 'use-react-router'

function ExpertResult(){

    const { papers, loading, getPapers, papersTotal  } = useService();
    const [key, setKey] = useState('');
    const { location } = useRouter();

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
                    onChange: page => {
                        console.log(page);
                        getPapers({
                            page: page,
                            size: 10,
                            domain: "title",
                            key: key,
                            sort: 'n_citation',
                            direction: true,
                            free: true,
                        });
                    },
                    pageSize: 10,
                    total: papersTotal > 5000 ? 5000:papersTotal,
                }}
                dataSource={
                    papers === undefined? []:papers.map((item: IPaperListItem) => ({
                        href: 'papers/'+item.id,
                        title: item.title,
                        description:
                            <div className='decription'>
                                <span className='paper-num'>作者：</span>
                                <span className='num'>{item.authors === null ? "暂无" : item.authors.length === 0 ? "暂无":item.authors[0].name}</span>
                                <span className='split'></span>
                                <span className='use-num'>年份：</span>
                                <span className='num'>{item.year}</span>
                            </div>,
                        content:
                        item.keywords !== null &&
                            item.keywords.slice(0,item.keywords.length >= 5 ? 5:item.keywords.length).map((keyword) => (
                                <Tag><a href={'/search?q='+keyword+'&type=paper'}>{keyword}</a></Tag>
                            )) 
                    }))
                }
                renderItem={(item:any) => (
                    <div className='result-item'>
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    </div>
                )}
            />
        </div>
    )
}

export default ExpertResult;

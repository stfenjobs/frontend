import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';
import useService from './services'

import { QueryParam } from '../../types';

import TypeCard from './TypeCard'
import RecommendCard from './RecommendCard'
import ExpertResult from './ExpertResult'
import PapperResult from './PapperResult'

import ReactEcharts from 'echarts-for-react';

import './Query.css'


enum QueryType {
    PAPER = 'paper',
    EXPERT = 'expert',
};


export default () => {
    const { history, location } = useRouter();
    // const param: QueryParam = qs.parse(location.search.slice(1));
    const [tab, setTab] = useState('2');

    const {getExperts, getPapers} = useService();

    function setSearch(e:string){
        const param: QueryParam = qs.parse(location.search.slice(1));
        setTab(e);
        //TODO
        if(e == '2'){
            history.push('/search?q='+param.q+'&type=paper');
        }
        else if(e == '1'){
            history.push('/search?q='+param.q+'&type=expert');
        } 
    }

    useEffect(() => {
        const param: QueryParam = qs.parse(location.search.slice(1));
        if (param.type !== QueryType.PAPER && param.type !== QueryType.EXPERT) {
            history.push('/search/not-found');
        }

        if(param.type === 'paper'){
            getPapers({
                page: 1,
                size: 10,
                domain: "title",
                key: param.q,
                sort: 'n_citation',
                direction: true,
                free: true,
            })
            setTab('2');
        } else {

            getExperts({
                page: 1,
                size: 10,
                domain: "name",
                key: param.q,
                sort: 'name',
                direction: true,
                free: true,
            });
            setTab('1');
        }
    }, [location, history]);

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
               { name: '论文数', max: 500},
               { name: '被引数', max: 300},
               { name: 'H因子', max: 300},
            ]
        },
        series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                 {
                    value : [300,200,100],
                }
            ]
        }]
    }


    return (
        <div className='query'>
            <div className='query-left'>
                <div className='query-left-typecard'>
                    <TypeCard setTab={setSearch} tab={tab}/>
                </div>
                <div className='query-left-result'>
                {tab === '1'? <ExpertResult/> : <PapperResult/>}
                </div>
            </div>
            <div className='query-right'>
                <RecommendCard/>
            </div>
        </div>
    );
};

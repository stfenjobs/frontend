import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';

import { QueryParam } from '../../types';

import TypeCard from './TypeCard'
import RecommendCard from './RecommendCard'
import ExpertResult from './ExpertResult'

import './Query.css'


enum QueryType {
    PAPER = 'paper',
    EXPERT = 'expert',
};


export default () => {
    const { history, location } = useRouter();
    const [key, setKey] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const param: QueryParam = qs.parse(location.search.slice(1));

        if (param.type !== QueryType.PAPER && param.type !== QueryType.EXPERT) {
            history.push('/search/not-found');
        }

        setKey(param.q);
        setType(param.type);
    }, [location, history]);


    return (
        <div>
            <div className='query-left'>
                <div className='query-left-typecard'>
                    <TypeCard/>
                </div>
                <div className='query-left-result'>
                    <ExpertResult/>
                </div>
            </div>
            <div className='query-right'>
                <RecommendCard/>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';

import { ExpertDetailParam } from '../../types';

import ExternalLink from './ExternalLink'
import PersonalAttribute from './PersonalAttribute'
import PaperResult from './PaperResult'
import PatentResult from './PatentResult'
import PapperResult from '../Query/PapperResult'
import TypeCard from './TypeCard'

import './ExpertDetail.css'

enum AchieveType {
    PAPER = 'paper',
    PATENT = 'patent',
    PROJECT = 'project',
}

export default () => {
    const {history, location} = useRouter();
    const [key, setKey] = useState('');
    const [type, setType] = useState('');
    const [tab, setTab] = useState('1');

    return (
        <div className='expert-detail'>
            <div className='expert-detail-left'>
                <div className='expert-detail-left-attri'>
                    <PersonalAttribute/>
                </div>
                <div className='query-left-typecard'>
                    <TypeCard setTab={setTab}/>
                </div>
                <div className='expert-detail-left-achieve'>
                    {tab === '1' ? <PapperResult /> : <PatentResult />}
                </div>
            </div>
            <div className='expert-detail-right'>
                    <ExternalLink/>
            </div>
        </div>
    );
};

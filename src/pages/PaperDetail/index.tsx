import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';

import ExternalLink from './ExternalLink'
import TypeCard from './TypeCard'
import PaperAttribute from './PaperAttribute'
import Abstarct from './Abstract'
import Relation from './Relation'
import Quote from './Quote';

export default () => {
    const {history, location} = useRouter();
    const [key, setKey] = useState('');
    const [type, setType] = useState('');
    const [tab, setTab] = useState('1');

    return (
        <div>
            <div className='paper-detail-left'>
                <div className='paper-detail-left-attri'>
                    <PaperAttribute/>
                </div>
                <div className='query-left-typecard'>
                    <TypeCard setTab={setTab}/>
                </div>
                <div className='paper-detail-left-achieve'>
                    {tab === '0' ? <Abstarct /> : tab=== '1'? <Relation/>:<Quote/>
                    
                    }
                </div>
            </div>
            <div className='paper-detail-right'>
                    <ExternalLink/>
            </div>
        </div>
    );
};
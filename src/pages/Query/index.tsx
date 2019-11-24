import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';

import { QueryParam } from '../../types';


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
        <div>{`search ${key} from type ${type}`}</div>
    );
};

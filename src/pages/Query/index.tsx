import React, { useState, useEffect } from 'react';
import useRouter from 'use-react-router';
import qs from 'qs';


interface QueryParam {
    q: string,
    type: string,
};

enum QueryType {
    PAPER = '0',
    EXPERT = '1',
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

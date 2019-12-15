import React from 'react';

import { IPaper } from '../../../types/';

const content: IPaper = {
    id: '111',
    title: 'Deep learning via CNN',
    authors: [
        { name: 'Fei-Fei Li', org: 'Stanford', id: '1234' },
        { name: 'Andrew Ng', org: 'Stanford', id: null },
    ],
    year: '2017',
    keywords: ['deep learning', 'computer science'],
    n_citation: 1245,
    page_start: '23',
    page_end: '27',
    language: 'en',
    venue: { raw: 'Science and Technology', id: null },
    volume: '3',
    issue: '2',
    pdf: null,
    url: ['www.baidu.com'],
    summary: 'Abstract',
    price: '124',
}

export default () => {
    const [paper, setPaper] = React.useState(new IPaper());
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => { setPaper(content); setLoading(false) }, 1500);
    }, []);

    return { paper, loading }
}
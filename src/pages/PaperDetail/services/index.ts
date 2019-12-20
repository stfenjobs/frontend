import React from 'react';
import { createModel } from 'hox';
import api from '../../../api';
import { getContent } from '../../../utils';
import err from '../../../utils/error';

import { IPaper } from '../../../types/';
import { IRequestList } from '../../../types/request';
import { IContentPaperDetail, IContentPaperList, IPaperListItem } from '../../../types/response';


export default createModel(() => {
    const [paper, setPaper] = React.useState(new IPaper());
    const [commend, setCommend] = React.useState(Array<IPaperListItem>(5).fill(new IPaperListItem()));
    const [serviceLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(err.none);

    const getPaper = (token: string, id: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        setLoading(true);
        api.paper.retreive(token, id).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { content, responseErr } = getContent<IContentPaperDetail>(response.data);
            if (responseErr === err.none) {
                setPaper(content);

                let keyword: string = '';
                content.keywords
                .slice(0, content.keywords.length > 3 ? 3 : content.keywords.length)
                .forEach((value: string) => keyword += value + ' ');
                console.log('keyword', keyword);

                const param: IRequestList = {
                    size: 5,
                    page: 1,
                    domain: 'keywords',
                    key: keyword,
                    sort: 'year',
                    direction: true,
                };

                api.paper.list(token, param).then((response) => {
                    console.log('recommend', response.data);
                    if (response.status !== 200) {
                        setError(err.err404);
                        return;
                    }

                    const { content, responseErr } = getContent<IContentPaperList>(response.data);
                    if (responseErr === err.none) {
                        setCommend(content.papers);
                    } else {
                        if (responseErr === 1) {
                            setCommend([]);
                        } else {
                            setError(responseErr);
                        }
                    }

                    setLoading(false);
                }).catch(() => { setError(err.err404); setLoading(false); });
            } else {
                setError(responseErr);
                setLoading(false);
            }
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const clearErr = () => setError(err.none);

    return { paper, commend, serviceLoading, error, getPaper, clearErr };
});

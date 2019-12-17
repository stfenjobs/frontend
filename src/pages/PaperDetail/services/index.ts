import React from 'react';
import { createModel } from 'hox';
import api from '../../../api';
import { getContent } from '../../../utils';
import err from '../../../utils/error';

import { IPaper } from '../../../types/';
import { IContentPaperDetail } from '../../../types/response';

export default createModel(() => {
    const [paper, setPaper] = React.useState(new IPaper());
    const [serviceLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(err.none);

    const getPaper = (token: string, id: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        setLoading(true);
        api.paper.retreive(token, id).then((response) => {
            console.log(response.data)
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { content, responseErr } = getContent<IContentPaperDetail>(response.data);
            if (responseErr === err.none) {
                setPaper(content);
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const clearErr = () => setError(err.none);

    return { paper, serviceLoading, error, getPaper, clearErr };
});

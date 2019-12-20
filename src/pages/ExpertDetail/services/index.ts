import React from 'react';
import { createModel } from 'hox';
import api from '../../../api';
import { getContent } from '../../../utils';
import err from '../../../utils/error';
import { IExpert } from '../../../types/';
import { IContentExpertDetail, IContentPaperList, IPaperListItem } from '../../../types/response';
import { IRequestList } from '../../../types/request';

export default createModel(() => {
    const [expert, setExpert] = React.useState(new IExpert());
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(err.none);
    const [publications, setPublications] = React.useState(new Array<IPaperListItem>(11).fill(new IPaperListItem()));
    const [pubsTotal, setPubsTotal] = React.useState(0);

    const getExpertsPublication = (token:string, params: IRequestList) => {
        setLoading(true);
        api.paper.list(token,params).then((response) =>{
            console.log("api, pub", response.data)
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }
            const { content,responseErr } = getContent<IContentPaperList>(response.data);
            if (responseErr === err.none) {
                setPublications(content.papers);
                setPubsTotal(content.total);
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const getExpert = (token: string, id: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }
        setLoading(true);
        api.expert.retreive(token, id).then((response) => {
            console.log('expert', response.data);
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { content, responseErr } = getContent<IContentExpertDetail>(response.data);
            if (responseErr === err.none) {
                setExpert(content);
                getExpertsPublication(token, {
                    page: 1,
                    size: 10,
                    domain: "eid",
                    key: content.id,
                    sort: "n_citation",
                    direction: true,
                    free: true,
                });
            } else {
                setError(responseErr);
                setLoading(false);
            }

        }).catch(() => { setError(err.err404); setLoading(false);});
    };

    const clearErr = () => setError(err.none);

    return { expert, getExpert, loading, error, clearErr, publications, pubsTotal, getExpertsPublication };
});
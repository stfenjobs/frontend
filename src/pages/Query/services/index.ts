import React from 'react';
import api from '../../../api';
import useUserModel from '../../../models/userModel';
import {IExpert} from '../../../types'
import { IRequestList } from '../../../types/request';
import err from '../../../utils/error';
import { getContent } from '../../../utils';
import {IExpertPaperList, IPaperListItem, IContentPaperList} from '../../../types/response'
import { createModel } from 'hox';


export default createModel(() => {
    const [experts, setExperts] = React.useState(new Array<IExpert>(10).fill(new IExpert()));
    const [papers, setPapers] = React.useState(new Array<IPaperListItem>(10).fill(new IPaperListItem()));
    const [loading, setLoading] = React.useState(false);
    const [expertsTotal, setExpertsTotal] = React.useState(0);
    const [papersTotal, setPapersTotal] = React.useState(0);
    const [error, setError] = React.useState(err.none);
    const { token } = useUserModel();
    const [currentPage, setCurrentPage] = React.useState(1);

    const getExperts = (params: IRequestList) => {
        setLoading(true);
        // api
        console.log("key,page",params.key,params.page);
        api.expert.list(token,params).then((response) =>{
            if (response.status !== 200) {
                console.log('error');
                setError(err.err404);
                return;
            }
            console.log(response.data);
            const { content,responseErr } = getContent<IExpertPaperList>(response.data);
            if (responseErr === err.none) {
                setExperts(content.experts);
                setExpertsTotal(content.total);
            } else {
                console.log("error")
                setError(responseErr);
                setExperts([]);
                setExpertsTotal(0);
            }
            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const getPapers = (params: IRequestList) => {
        //setPapers([]);
        setLoading(true);
        // api
        api.paper.list(token,params).then((response) =>{
            if (response.status !== 200) {
                console.log('error');
                setError(err.err404);
                return;
            }
            console.log(response.data);
            const { content,responseErr } = getContent<IContentPaperList>(response.data);
            if (responseErr === err.none) {
                setPapers(content.papers);
                setPapersTotal(content.total);
            } else {
                setError(responseErr);
                setPapers([])
                setPapersTotal(0);
            }
            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    return { papers, papersTotal, experts, expertsTotal, loading, getExperts, getPapers, currentPage, setCurrentPage };
});
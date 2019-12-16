import React from 'react';
import api from '../../../api';
import useUserModel from '../../../models/userModel';
import {IExpert} from '../../../types'
import { IRequestList } from '../../../types/request';
import err from '../../../utils/error';
import { getContent } from '../../../utils';
import {IExpertPaperList} from '../../../types/response'
import { createModel } from 'hox';


export default createModel(() => {
    const [experts, setExperts] = React.useState(new Array<IExpert>(10).fill(new IExpert()));
    const [papers, setPaper] = React.useState(new Array<IExpert>(10).fill(new IExpert()));
    const [loading, setLoading] = React.useState(false);
    const [expertsTotal, setExpertsTotal] = React.useState(0);
    const [error, setError] = React.useState(err.none);
    const { token } = useUserModel();

    const getExperts = (params: IRequestList) => {
        setLoading(true);
        // api
        api.expert.list(token,params).then((response) =>{
            console.log("in api")
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
                setLoading(false);
            } else {
                setError(responseErr);
            }
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    return { experts, expertsTotal, loading, getExperts };
});
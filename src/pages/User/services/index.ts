import React from 'react';

export interface ServiceParam {

};

export default (/* params: ServiceParam */) => {
    const [records, setRecords] = React.useState(new Array<any>(10).fill(1));
    const [loading, setLoading] = React.useState(false);

    const getRecords = (/* page: string */) => {
        setLoading(true);

        // api
        setTimeout(() => { setRecords(new Array<any>()); setLoading(false); }, 1500);
    };

    React.useEffect(() => {
        getRecords();
    }, []);

    return { records, loading, getRecords };
}
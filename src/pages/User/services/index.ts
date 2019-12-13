import React from 'react';

export interface ServiceParam {

};

export default (/* params: ServiceParam */) => {
    const [records, setRecords] = React.useState(new Array<any>(10).fill(1));

    const [editable, setEditable] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const getRecords = (/* page: string */) => {
        setLoading(true);

        // api
        setTimeout(() => { setRecords(new Array<any>()); setLoading(false); }, 1500);
    };

    const onEdit = () => {
        setEditable(true);
    }

    const onUnEdit = () => {
        setEditable(false);
    }

    const certify =() => {

    }

    React.useEffect(() => {
        getRecords();
    }, []);

    return { records, editable, onEdit, onUnEdit, loading,
        getRecords, certify };
}
import React from 'react';
import { createModel } from 'hox';

export default createModel(() => {
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

    return { records, editable, onEdit, onUnEdit, loading,
        getRecords, certify };
});
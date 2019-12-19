import React from 'react';
import {createModel} from 'hox';
import err from "../../../utils/error";

export default createModel(() => {
    const [records, setRecords] = React.useState([]);
    const [editable, setEditable] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(err.none);

    const getRecords = (/* page: string */) => {
        setLoading(true)

        // api
        setTimeout(() => {
            setRecords([]);
            setLoading(false);
        }, 1500);
    };

    const onEdit = () => {
        setEditable(true);
    }

    const onUnEdit = () => {
        setEditable(false);
    }

    const certify = () => {

    }

    return {
        records, editable, onEdit, onUnEdit, loading, error,
        getRecords, certify,
    };
})
;
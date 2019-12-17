import React from 'react';
import {createModel} from 'hox';
import api from "../../../api";
import err from "../../../utils/error";
import {getContent} from "../../../utils";
import {IContentPaperDetail} from "../../../types/response";

export default createModel(() => {
    const [records, setRecords] = React.useState(new Array<any>(10).fill(1));

    const [editable, setEditable] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(err.none);

    const [favorite, setFavorite] = React.useState();


    const getFavorite = (token: string, id: string,) => {
        setLoading(true);
        api.user.getFavorite(token, id).then((response) => {
            console.log(response.data)
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }
            const {content, success} = response.data;
            if (success) {
                console.log("sueccsdsad")
                setFavorite(content);
            } else {
                setError(err.errInvalidOps);
            }
            setLoading(false);
        }).catch(() => {
            setError(err.err404);
            setLoading(false);
        });
    };

    const getRecords = (/* page: string */) => {
        setLoading(true)

        // api
        setTimeout(() => {
            setRecords(new Array<any>());
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
        records, editable, onEdit, onUnEdit, loading, favorite,
        getRecords, certify, getFavorite, setFavorite,
    };
})
;
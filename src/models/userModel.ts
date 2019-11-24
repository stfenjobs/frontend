/* user state management */

import { useState, useEffect } from 'react';
import { createModel } from 'hox';

import api from '../api';
import { encryptByMd5, getContent } from '../utils';
import Storage from '../utils/Storage';
import {
    IRequestLogin,
    IRequestRegister,
    IRequestLogout } from '../types/request';
import {
    IContentLogin,
    IContentRegister,
    IContentLogout,
} from '../types/response';
import err from '../utils/error';


// FIXME: where to handle error?

const useUser = () => {
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [eid, setEid] = useState('');
    const [error, setError] = useState(err.none);

    useEffect(() => {
        // restore from cache
        const user: IContentLogin | null = Storage.get('user');
        if (user) {
            setId(user.id);
            setToken(user.token);
            setEid(user.eid);
        }
    }, []);


    const login = (email: string, passwd: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const param: IRequestLogin = {
            email, cipher: encryptByMd5(passwd)
        };

        api.user.login(param).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const content = getContent<IContentLogin>(response.data, setError);
            if (error !== err.none) {
                return;
            }

            setId(content.id);
            setToken(content.token);
            setEid(content.eid);
            Storage.put('user', content);
        }).catch((e) => setError(err.err404));
    };

    const register = (email: string, passwd: string, username: string, photo?: string) => {
        if (token !== '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestRegister = {
            email, cipher: encryptByMd5(passwd), username, photo
        };

        api.user.register(data).then((response) => {
            if (response.status !== 201) {
                setError(err.err404);
                return;
            }

            const content = getContent<IContentRegister>(response.data, setError);
            if (error !== err.none) {
                return;
            }

            setId(content.id);
            setToken(content.token);
            setEid(content.eid);
            Storage.put('user', content);
        }).catch((e) => setError(err.err404));
    };

    const logout = (token: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const param: IRequestLogout = {
            token
        };

        api.user.logout(param).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const content = getContent<IContentLogout>(response.data, setError);
            if (error !== err.none) {
                return;
            }

            setId('');
            setToken('');
            setEid('');
            Storage.remove('user');
        }).catch((e) => setError(err.err404));
    };

    const clearError = () => setError(err.none);

    return {
        id, token, eid, error,
        login, register, logout, clearError
    };
};

export default createModel(useUser);

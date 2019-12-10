/* user state management */

import { useState, useEffect } from 'react';
import { createModel } from 'hox';

import api from '../api';
import { encryptBySha256, getContent } from '../utils';
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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState('');
    const [avatar, setAvatar] = useState('');
    const [eid, setEid] = useState('');
    const [error, setError] = useState(err.none);

    useEffect(() => {
        // restore from cache
        const user: IContentLogin | null = Storage.get('user');
        if (user) {
            setId(user.id);
            setToken(user.token);
            setUsername(user.username);
            setEmail(user.email);
            setPoints(user.points);
            setAvatar(user.avatar);
            setEid(user.eid);
        }
    }, []);


    const login = (email: string, passwd: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const param: IRequestLogin = {
            email, cipher: encryptBySha256(passwd)
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
            setUsername(content.username);
            setEmail(content.email);
            setPoints(content.points);
            setAvatar(content.avatar);
            setEid(content.eid);
            Storage.put('user', content);
        }).catch(() => setError(err.err404));
    };

    const register = (email: string, passwd: string, username: string) => {
        if (token !== '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestRegister = {
            email, cipher: encryptBySha256(passwd), username
        };

        api.user.register(data).then((response) => {
            if (response.status !== 201) {
                setError(err.err404);
                return;
            }

            getContent<IContentRegister>(response.data, setError);
            if (error !== err.none) {
                return;
            }

            login(email, passwd);
        }).catch(() => setError(err.err404));
    };

    const logout = (token: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const param: IRequestLogout = {
            token
        };

        api.user.logout(param, token).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            getContent<IContentLogout>(response.data, setError);
            if (error !== err.none) {
                return;
            }

            setId('');
            setToken('');
            setUsername('');
            setEmail('');
            setPoints('');
            setAvatar('');
            setEid('');
            Storage.remove('user');
        }).catch(() => setError(err.err404));
    };

    // TODO: update method

    const clearError = () => setError(err.none);

    return {
        id, token, username, email, points, avatar, eid, error,
        login, register, logout, clearError
    };
};

export default createModel(useUser);

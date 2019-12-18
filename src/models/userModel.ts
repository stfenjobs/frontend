/* user state management */

import { useState, useEffect } from 'react';
import { createModel } from 'hox';

import api from '../api';
import { encryptBySha256, getContent } from '../utils';
import Storage from '../utils/Storage';
import {
    IRequestLogin,
    IRequestRegister,
    IRequestPatchUserInfo,
    IRequestPatchPw,
    IRequestCertify,
    IRequestAddFavorite,
    IRequestRemoveFavorite
} from '../types/request';
import {
    IContentLogin,
    IContentRegister,
    IContentUpdateUserProfile,
    IContentUpdatePw,
    IContentCertify,
    IContentAddFavorite,
    IContentRemoveFavorite,
    IContentFavoriteList,
} from '../types/response';
import err from '../utils/error';
import { IField, IFavorite } from '../types';


// FIXME: where to handle error?

const useUser = () => {
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState('');
    const [avatar, setAvatar] = useState('');
    const [eid, setEid] = useState('');
    const [favorite, setFavorite] = useState(Array<IFavorite>(1).fill(new IFavorite('', '')));

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(err.none);

    useEffect(() => {
        // restore from cache
        const user: IContentLogin | null = Storage.get('user');
        if (user) {
            setId(user.id);
            setToken(user.token);
            setUsername(user.username);
            setEmail(user.email);
            setPoints(user.point);
            setAvatar(user.avatar);
            setEid(user.eid);
            setFavorite(user.favourite);
        }
    }, []);


    const login = (email: string, passwd: string) => {
        if (token !== '') {
            setError(err.errInvalidOps);
            return;
        }

        const param: IRequestLogin = {
            email, cipher: encryptBySha256(passwd)
        };

        setLoading(true);
        api.user.login(param).then((response) => {
            console.log('login', response);
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { content, responseErr } = getContent<IContentLogin>(response.data);
            if (responseErr === err.none) {
                setId(content.id);
                setToken(content.token);
                setUsername(content.username);
                setEmail(content.email);
                setPoints(content.point);
                setAvatar(content.avatar);
                setEid(content.eid);
                setFavorite(content.favourite);
                Storage.put('user', content);
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const register = (email: string, passwd: string, username: string) => {
        if (token !== '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestRegister = {
            email, password: encryptBySha256(passwd), userName: username
        };

        setLoading(true);
        api.user.register(data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr } = getContent<IContentRegister>(response.data);
            if (responseErr === err.none) {
                login(email, passwd);
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const logout = (token: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        setId('');
        setToken('');
        setUsername('');
        setEmail('');
        setPoints('');
        setAvatar('');
        setEid('');
        setFavorite([]);
        Storage.remove('user');
    };

    const updateProfile = (token: string, id: string, info: { email?: string, username?: string, avatar?: string }) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestPatchUserInfo = {
            email: info.email, userName: info.username, photo: info.avatar
        };

        setLoading(true);
        api.user.update(token, id, data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { content, responseErr } = getContent<IContentUpdateUserProfile>(response.data);
            if (responseErr === err.none) {
                setId(content.id);
                setUsername(content.userName);
                setEmail(content.email);
                setPoints(content.point);
                setAvatar(content.photo);

                Storage.remove('user');
                Storage.put('user', {
                    id: content.id,
                    token: token,
                    username: content.userName,
                    email: content.email,
                    point: content.point,
                    avatar: content.photo,
                    eid: eid,
                });
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const changePw = (token: string, id: string, oldPw: string, newPw: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestPatchPw = {
            oldPassword: encryptBySha256(oldPw), newPassword: encryptBySha256(newPw)
        };

        setLoading(true);
        api.user.changePw(token, id, data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr } = getContent<IContentUpdatePw>(response.data);
            if (responseErr !== err.none) {
                setError(responseErr + 100);
            } else {
                console.log('success: in api')
                setError(666);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const certify = (token: string, id: string, name: string, org: string, fields: Array<IField>) => {
        if (token === '' || eid === '-1') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestCertify = {
            name, org, tags: fields
        };

        setLoading(true);

        api.user.certify(token, id, data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr } = getContent<IContentCertify>(response.data);
            if (responseErr === err.none) {
                setEid('-1');
                Storage.put('user', { ...Storage.get('user'), eid: '-1' })
            } else {
                setError(responseErr + 200);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const addFavorite = (token: string, id: string, pId: string, pTitle: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestAddFavorite = [{ id: pId, title: pTitle }];

        setLoading(true);
        api.user.addFavorite(token, id, data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr } = getContent<IContentAddFavorite>(response.data);
            if (responseErr === err.none) {
                setFavorite([...favorite, new IFavorite(pId, pTitle)])
            } else {
                setError(responseErr);
            }

            setLoading(false);
        }).catch(() => { setError(err.err404); setLoading(false); });
    };

    const removeFavorite = (token: string, id: string, pId: string) => {
        if (token === '') {
            setError(err.errInvalidOps);
            return;
        }

        const data: IRequestRemoveFavorite = [pId];

        setLoading(true);
        api.user.removeFavorite(token, id, data).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr } = getContent<IContentRemoveFavorite>(response.data);

            if (responseErr === err.none) {
                setFavorite(favorite.filter((value: IFavorite) => value.id !== pId));
            } else {
                setError(err.errInvalidOps);
            }

            setLoading(false);
        }).catch(() => {
            setError(err.err404);
            setLoading(false);
        });
    };

    const getFavorite = (token: string, id: string,) => {
        setLoading(true);
        api.user.getFavorite(token, id).then((response) => {
            if (response.status !== 200) {
                setError(err.err404);
                return;
            }

            const { responseErr, content } = getContent<IContentFavoriteList>(response.data);
            if (responseErr === err.none) {
                setFavorite(content);
            } else {
                setError(responseErr);
            }
            setLoading(false);
        }).catch(() => {
            setError(err.err404);
            setLoading(false);
        });
    };

    const clearError = () => setError(err.none);

    return {
        id, token, username, email, points, avatar, eid, favorite,
        login, register, logout, updateProfile, changePw, certify,
        addFavorite, removeFavorite, getFavorite,
        loading, error, clearError, setFavorite
    };
};

export default createModel(useUser);

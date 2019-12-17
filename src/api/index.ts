// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

import Axios from 'axios';
import qiNiu from 'qiniu'
import RestAPI, {BaseAPI, SecondaryAPI} from './RestAPI';
import {
    IRequestPatchExpertInfo,
    IRequestPatchUserInfo,
    IRequestLogin,
    IRequestRegister,
    IRequestPatchPw,
    IRequestCertify,
    IRequestAddFavorite,
    IRequestRemoveFavorite,
} from '../types/request';
import { bucket, mac } from "./config";

class UpLoader {

    constructor() {
        this.UpdateToken();
    }

    private time = Date.now();
    private expires = 7200;
    private options = {
        scope: bucket,
        expires: this.expires
    };
    private token = "";

    public UpdateToken() {
        const putPolicy = new qiNiu.rs.PutPolicy(this.options);
        this.token = putPolicy.uploadToken(mac);
        this.time = Date.now();
    }

    public getToken() {
        if (this.checkTokenTime()) this.UpdateToken();
        return {token: this.token};

    }

    private checkTokenTime() {
        return (new Date().getTime() - this.time) > this.expires;
    }
}

class ExpertAPI extends RestAPI {
    public update = (token: string, id: string, data: IRequestPatchExpertInfo) => {
        return Axios.patch(this.catDetail(id), data, {
            headers: {'token': token}
        });
    };

    // 科技专家上传成果
    public upload = () => {
        // TODO
    };
}

class UserAPI extends BaseAPI {
    public update = (token: string, id: string, data: IRequestPatchUserInfo) =>
        Axios.patch(this.entry + id + '/', data, {
            headers: {'token': token}
        });

    public changePw = (token: string, id: string, data: IRequestPatchPw) =>
        Axios.patch(this.entry + id + '/password', data, {
            headers: {'token': token}
        });

    public certify = (token: string, id: string, data: IRequestCertify) =>
        Axios.post(this.entry + id + '/authentication', data, {
            headers: {'token': token}
        });

    public login = (param: IRequestLogin) =>
        Axios.get(this.entry + 'login/' + BaseAPI.parseParam(param));
    public register = (data: IRequestRegister) =>
        Axios.post(this.entry + 'register/', data);


    public getFavorite = (token: string, id: string) =>
        Axios.get(this.entry + id + '/favourite', {
            headers: {'token': token}
        });
    public addFavorite = (token: string, id: string, data: IRequestAddFavorite) =>
        Axios.post(this.entry + id + '/favourite', data, {
            headers: { 'token': token }
        });
    public removeFavorite = (token: string, id: string, data: IRequestRemoveFavorite) =>
        Axios.delete(this.entry + id + '/favourite', {
            data,
            headers: { 'token': token }
        });

    public purchase = new SecondaryAPI('users', 'purchases');
}

export default {
    paper: new RestAPI('papers'),
    expert: new ExpertAPI('experts'),
    /* usage for user api
     * api.user.list().then(...)
     * api.user.purchase.retreive(userId, purchaseId).then(...)
     */
    uploader: new UpLoader(),
    user: new UserAPI('users'),
}

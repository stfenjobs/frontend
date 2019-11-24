// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

import Axios from 'axios';

import RestAPI, { BaseAPI, SecondaryAPI } from './RestAPI';
import {
    IRequestPatchExpertInfo,
    IRequestPatchUserInfo,
    IRequestLogin,
    IRequestRegister,
    IRequestLogout,
} from '../types/request';


class ExpertAPI extends RestAPI {
    public update = (id: string, data: IRequestPatchExpertInfo) => {
        return Axios.patch(this.catDetail(id), data);
    };

    // 科技专家上传成果
    public upload = () => {
        // TODO
    };
}

class UserAPI extends BaseAPI {
    public update = (id: string, data: IRequestPatchUserInfo) =>
        Axios.patch(this.entry + id + '/', data);

    public certify = () => {
        // TODO
    }

    public login = (param: IRequestLogin) =>
        Axios.get(this.entry + 'login/' + BaseAPI.parseParam(param));
    public register = (data: IRequestRegister) =>
        Axios.post(this.entry + 'register/', data);
    public logout = (param: IRequestLogout) =>
        Axios.get(this.entry + 'logout/' + BaseAPI.parseParam(param));

    public purchase = new SecondaryAPI('users', 'purchases');
}

export default {
    paper: new RestAPI('papers'),
    expert: new ExpertAPI('experts'),
    /* usage for user api
     * api.user.list().then(...)
     * api.user.purchase.retreive(userId, purchaseId).then(...)
     */
    user: new UserAPI('users'),
}

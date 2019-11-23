// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

import Axios from 'axios';

import RestAPI, { BaseAPI } from './RestAPI';
import {
    IRequestPatchExpertInfo,
    IRequestPatchUserInfo,
    IRequestLogin,
    IRequestRegister,
    IRequestLogout,
} from '../types/request';


class PaperAPI extends RestAPI {
    // 科技专家上传成果
    public upload = () => {
        // TODO
    };
};

class ExpertAPI extends RestAPI {
    public update = (id: string, data: IRequestPatchExpertInfo) => {
        return Axios.patch(this.catDetail(id), data);
    };
}

class PurchaseAPI extends RestAPI {
    public create = (data: any) => {
        // TODO
    };
}

class UserAPI extends BaseAPI {
    public update = (id: string, data: IRequestPatchUserInfo) =>
        Axios.patch(this.base + id + '/', data);

    public certify = () => {
        // TODO
    }

    public login = (param: IRequestLogin) =>
        Axios.get(this.base + 'login/' + BaseAPI.parseParam(param));
    public register = (data: IRequestRegister) =>
        Axios.post(this.base + 'register/', data);
    public logout = (param: IRequestLogout) =>
        Axios.get(this.base + 'logout/' + BaseAPI.parseParam(param));

    public purchase = new PurchaseAPI('users', 'purchases');
}

export default {
    paper: new PaperAPI('contents', 'papers'),
    expert: new ExpertAPI('experts'),
    user: new UserAPI('users'),
}

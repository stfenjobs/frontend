import Axios from 'axios';
import qs from 'qs';

import { host, port, version } from './config';
import { IRequestRetreive, IRequestList } from '../types/request';


const entry = 'http://' + host + ':' + port + '/' + version + '/';

export class BaseAPI {
    protected base: string = entry;

    public constructor(service: string, secondary?: string) {
        this.base += service + '/' + (secondary ? secondary + '/' : '');
    }

    protected static parseParam = (param: any) =>
        '?' + qs.stringify(param);
};

export default class RestAPI extends BaseAPI {
    protected catDetail = (id: string, param?: IRequestRetreive) =>
        this.base + id + '/' + (param ? BaseAPI.parseParam(param) : '');
    protected catList = (param?: IRequestList) =>
        this.base + (param ? BaseAPI.parseParam(param) : '');

    public list = (param?: IRequestList) => Axios.get(this.catList(param));
    public retreive = (id: string, param?: IRequestRetreive) =>
        Axios.get(this.catDetail(id, param));

    // no demand for creating and delete resource.
};

// see https://shimo.im/docs/3VdJgXthWpjT6VQQ
import { IPaper, IExpert, IFavorite } from './index';

interface IContent {
    readonly [propsName: string]: any,
};

export interface IResponse {
    readonly success: boolean,
    readonly content: IContent,
};

export interface IContentFail {
    readonly error_code: number,
};

interface IContentEmpty { };

export type IContentPaperDetail = IPaper;

export class IPaperListItem {
    title: string = "";
    authors: Array<{name: string, org: string, id: string}> = [];
    year:string =  "";
    page_start:string =  "";
    page_end:string =  "";
    volume:string = "";
    issue:string =  "";
    abstract:string = "";
    id:string="";
    keywords: Array<string>=[];
    doc_type:string|null = null;
};

export type IContentExpertDetail = IExpert;

export interface IExpertPaperList {
    readonly total: number,
    readonly experts: Array<IExpert>,
}

export interface IContentPaperList {
    readonly total: number,
    readonly papers: Array<IPaperListItem>,
};

export interface IContentLogin {
    readonly id: string,
    readonly token: string,
    readonly username: string,
    readonly email: string,
    readonly point: string,
    readonly avatar: string,
    readonly eid: string,
    readonly favourite: Array<IFavorite>,
};

export type IContentRegister = IContentEmpty;

export interface IContentUpdateUserProfile {
    readonly password: string,
    readonly photo: string,
    readonly id: string,
    readonly userName: string,
    readonly email: string,
    readonly point: string
}

export type IContentUpdatePw = IContentEmpty;

export type IContentCertify = IContentEmpty;

export type IContentAddFavorite = IContentEmpty;

export type IContentRemoveFavorite = IResponse;

export type IContentFavoriteList = Array<IFavorite>;
// TODO

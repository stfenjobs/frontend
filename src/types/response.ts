// see https://shimo.im/docs/3VdJgXthWpjT6VQQ
import { IExpert } from ".";

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

export interface IContentPaperDetail {
    // TODO
    readonly isPurchased: boolean,
};

interface IPaperListItem {
    readonly title: string,
    readonly authors: Array<{name: string, org: string, id: string}>,
    readonly year: string,
    readonly page_start: string,
    readonly page_end: string,
    readonly volume: string,
    readonly issue: string,
};


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
// TODO

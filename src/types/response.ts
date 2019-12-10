// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

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
    readonly id: string,
    readonly author: Array<string>,
    readonly ref: number,
    readonly date: string, // YYYY-MM-dd
    readonly abstract: string,
    readonly price: string,
};

export interface IContentPaperList {
    readonly total: number,
    readonly papers: Array<IPaperListItem>,
};

export interface IContentLogin {
    readonly id: string,
    readonly token: string,
    readonly username: string,
    readonly email: string,
    readonly points: string,
    readonly avatar: string,
    readonly eid: string,
};

export type IContentRegister = IContentEmpty;

export type IContentLogout = IContentEmpty;

// TODO

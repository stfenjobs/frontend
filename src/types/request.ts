// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

export interface IRequestRetreive {
    token: string,
};

export interface IRequestList {
    page: number,
    size: number,
    domain: string,
    key: string,
    sort: number,
    direction: boolean,
    free?: boolean,
};

export interface IRequestUploadPaper {
    // TODO
};

export interface IRequestPatchExpertInfo {
    // TODO
};

export interface IRequestPatchUserInfo {
    token: string,
    email?: string,
    username?: string,
    photo?: string,
};

export interface IRequestLogin {
    email: string,
    cipher: string,
};

export interface IRequestRegister {
    email: string,
    cipher: string,
    username: string,
    photo?: string,
};

export interface IRequestLogout {
    token: string,
};
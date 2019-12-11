// see https://shimo.im/docs/3VdJgXthWpjT6VQQ

export interface IRequestRetreive {
    token: string,
};

export interface IRequestList {
    page: number,
    size: number,
    domain: string,
    key: string,
    sort: string,
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
    email?: string,
    userName?: string,
    photo?: string,
};

export interface IRequestLogin {
    email: string,
    cipher: string,
};

export interface IRequestRegister {
    email: string,
    password: string,
    userName: string,
};

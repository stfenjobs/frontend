import { sha256 } from 'js-sha256';
import { IResponse, IContentFail } from "../types/response";
import err from '../utils/error';


export const encryptBySha256 = (passwd: string): string => {
    // TODO
    return sha256(passwd);
};

// get content from ajax response
export function getContent<T>(response: IResponse) {
    let responseErr = err.none;
    if (!response.success) {
        responseErr = (response.content as IContentFail).error_code;
    }

    const content: T = response.content as T;
    return { content, responseErr };
};

export const trim = (s: string) => {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

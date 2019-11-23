import { IResponse, IContentFail } from "../types/response";


export const encryptByMd5 = (passwd: string): string => {
    // TODO
    return passwd;
};

export function getContent<T>(response: IResponse, setError: (code: number) => void) {
    if (!response.success) {
        setError((response.content as IContentFail).error_code);
    }

    const content: T = response.content as T;
    return content;
}

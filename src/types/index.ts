export interface IConfig {
    locale: string,
};

export interface LocaleDict {
    [key: string]: any,
};

export interface QueryParam {
    q: string,
    type: string,
};

export interface ExpertDetailParam {
    q: string,
    type: string,
};

export class IPaper {
    id: string = '';
    title: string = '';
    authors: Array<{ name: string, org: string, id: string | null }> = [];
    year: string = '';
    venue: { raw: string, id: string | null } = { raw: '', id: null };
    keywords: Array<string> = [];
    n_citation: number = 0;
    page_start: string = '';
    page_end: string = '';
    language: string = '';
    volume: string = '';
    issue: string = '';
    pdf: string | null = null;
    url: Array<string> = [];
    summary: string = '';
    price: string = '';
};

export interface IField {
    n: string,
    w: number,
};

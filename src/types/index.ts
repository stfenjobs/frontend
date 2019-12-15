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

class Tag{
    t: string;
    w: number;

    public constructor(){
        this.t = "";
        this.w = 1;
    }
}

export class IExpert {
    pubs: Array<{r: number, i: string}>;
    n_pubs: number;
    h_index: number;
    org: string;
    name: string;
    id: string;
    n_citation: number;
    tags: Array<{t: string, w: number}>;
    orgs: string[];

    public constructor(){
        this.pubs = [];
        this.n_pubs = 0;
        this.h_index = 0;
        this.org = "";
        this.name = "";
        this.id = "";
        this.n_citation = 0;
        this.tags = [];
        this.orgs = [];
    }
}
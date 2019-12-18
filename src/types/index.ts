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
    urls: Array<string> = [];
    summary: string = '';
    price: string = '';
    abstract: string = '';
};

export class IFavorite {
    id: string = '';
    title: string = '';
    addTime: number = 0;

    public constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
};

export class IField {
    n: string = '';
    w: number = 0;

    public constructor(n: string) {
        this.n = n;
        this.w = 10;
    }
};

class Tag {
    t: string;
    w: number;

    public constructor() {
        this.t = "";
        this.w = 1;
    }
}

export class IExpert {
    pubs: Array<{ r: number, i: string }>;
    n_pubs: number;
    h_index: number;
    org: string;
    name: string;
    id: string;
    n_citation: number;
    tags: Array<{ t: string, w: number }>;
    orgs: string[];
    isCertification: boolean;

    public constructor() {
        this.pubs = [];
        this.n_pubs = 0;
        this.h_index = 0;
        this.org = "";
        this.name = "";
        this.id = "";
        this.n_citation = 0;
        this.tags = [{ t: "", w: 0 }];
        this.orgs = [];
        this.isCertification = false;
    }
}
export interface Website {
    id?: number;
    name: string;
    year: string;
    link: URL;
    skills?: [string, string];
    employers?: [string, string];
}

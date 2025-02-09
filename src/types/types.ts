export interface Website {
    id?: number;
    name: string;
    year: string;
    link: string;
    skills?: [string, string];
    employers?: [string, string];
}

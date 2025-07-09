export interface Website {
    id?: number;
    name: string;
    year: string;
    link: URL;
    skills?: [string, string];
    employers?: [string, string];
}

export declare type FieldType = 'text' | 'textArea' | 'number' | 'date' | 'url' | 'multi' | 'select' | 'password';

export interface FormField {
    name: string;
    text?: string;
    subtext?: string;
    type: FieldType;
    required?: boolean;
    value?: any;
    placeholder?: string;
    default?: any;
    min?: number;
    max?: number;
    class?: string;
    disabled?: boolean;
    autocomplete?: string;
    ariaAutocomplete?: 'list' | 'none' | 'inline' | 'both';
}

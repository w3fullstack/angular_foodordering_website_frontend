import { NbAuthToken } from './token/token';
export declare class NbAuthResult {
    protected success: boolean;
    protected response: any;
    protected redirect: any;
    protected token: NbAuthToken;
    protected rawToken: string;
    protected errors: string[];
    protected messages: string[];
    constructor(success: boolean, response?: any, redirect?: any, errors?: any, messages?: any, rawToken?: string);
    setToken(token: NbAuthToken): void;
    getResponse(): any;
    getRawToken(): any;
    getToken(): any;
    getRedirect(): any;
    getErrors(): string[];
    getMessages(): string[];
    isSuccess(): boolean;
    isFailure(): boolean;
}

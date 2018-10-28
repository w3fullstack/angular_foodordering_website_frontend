import { InjectionToken } from '@angular/core';
import { NbAuthToken } from './services';
export interface NbAuthOptions {
    forms?: any;
    providers?: any;
}
export interface NbAuthProviders {
    [key: string]: any;
}
export interface NbAuthSocialLink {
    link?: string;
    url?: string;
    target?: string;
    title?: string;
    icon?: string;
}
export declare const defaultSettings: any;
export declare const NB_AUTH_OPTIONS: InjectionToken<NbAuthOptions>;
export declare const NB_AUTH_USER_OPTIONS: InjectionToken<NbAuthOptions>;
export declare const NB_AUTH_PROVIDERS: InjectionToken<NbAuthProviders>;
export declare const NB_AUTH_TOKEN_CLASS: InjectionToken<NbAuthToken>;
export declare const NB_AUTH_INTERCEPTOR_HEADER: InjectionToken<NbAuthProviders>;

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
import { NbMediaBreakpoint } from './services/breakpoints.service';
import { NbJSThemeOptions } from './services/js-themes/theme.options';
export interface NbThemeOptions {
    name: string;
}
export declare const nbThemeOptionsToken: InjectionToken<NbThemeOptions>;
export declare const nbMediaBreakpointsToken: InjectionToken<NbMediaBreakpoint[]>;
export declare const nbBuiltInJSThemesToken: InjectionToken<NbJSThemeOptions[]>;
export declare const nbJSThemesToken: InjectionToken<NbJSThemeOptions[]>;
/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
export declare const NB_WINDOW: InjectionToken<Window>;
export declare const NB_DOCUMENT: InjectionToken<Document>;

import { InjectionToken } from '@angular/core';
var socialLinks = [];
export var defaultSettings = {
    forms: {
        login: {
            redirectDelay: 500,
            // delay before redirect after a successful login, while success message is shown to the user
            provider: 'email',
            // provider id key. If you have multiple providers, or what to use your own
            rememberMe: true,
            // whether to show or not the `rememberMe` checkbox
            showMessages: {
                // show/not show success/error messages
                success: true,
                error: true,
            },
            socialLinks: socialLinks,
        },
        register: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            terms: true,
            socialLinks: socialLinks,
        },
        requestPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            socialLinks: socialLinks,
        },
        resetPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            socialLinks: socialLinks,
        },
        logout: {
            redirectDelay: 500,
            provider: 'email',
        },
        validation: {
            password: {
                required: true,
                minLength: 4,
                maxLength: 50,
            },
            email: {
                required: true,
            },
            fullName: {
                required: false,
                minLength: 4,
                maxLength: 50,
            },
        },
    },
};
export var NB_AUTH_OPTIONS = new InjectionToken('Nebular Auth Options');
export var NB_AUTH_USER_OPTIONS = new InjectionToken('Nebular User Auth Options');
export var NB_AUTH_PROVIDERS = new InjectionToken('Nebular Auth Providers');
export var NB_AUTH_TOKEN_CLASS = new InjectionToken('Nebular Token Class');
export var NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken('Nebular Simple Interceptor Header');
//# sourceMappingURL=auth.options.js.map
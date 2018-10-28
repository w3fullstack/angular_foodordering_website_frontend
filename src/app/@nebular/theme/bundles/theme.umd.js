(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/router'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/router', '@angular/platform-browser'], factory) :
	(factory((global.nb = global.nb || {}, global.nb.theme = global.nb.theme || {}),global.ng.core,global.ng.common,global.Rx,global.Rx.operators,global.ng.forms,global.ng.router,global.ng.platformBrowser));
}(this, (function (exports,_angular_core,_angular_common,rxjs,rxjs_operators,_angular_forms,_angular_router,_angular_platformBrowser) { 'use strict';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var nbThemeOptionsToken = new _angular_core.InjectionToken('NB_THEME_OPTIONS');
var nbMediaBreakpointsToken = new _angular_core.InjectionToken('NB_MEDIA_BREAKPOINTS');
var nbBuiltInJSThemesToken = new _angular_core.InjectionToken('NB_BUILT_IN_THEMES');
var nbJSThemesToken = new _angular_core.InjectionToken('NB_THEMES');
/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
var NB_WINDOW = new _angular_core.InjectionToken('NB_WINDOW');
var NB_DOCUMENT = new _angular_core.InjectionToken('NB_DOCUMENT');

var NbColorHelper = /** @class */ (function () {
    function NbColorHelper() {
    }
    NbColorHelper.shade = function (color, weight) {
        return NbColorHelper.mix('#000000', color, weight);
    };
    NbColorHelper.tint = function (color, weight) {
        return NbColorHelper.mix('#ffffff', color, weight);
    };
    NbColorHelper.mix = function (color1, color2, weight) {
        var d2h = function (d) { return d.toString(16); };
        var h2d = function (h) { return parseInt(h, 16); };
        var result = '#';
        for (var i = 1; i < 7; i += 2) {
            var firstPart = h2d(color1.substr(i, 2));
            var secondPart = h2d(color2.substr(i, 2));
            var resultPart = d2h(Math.floor(secondPart + (firstPart - secondPart) * (weight / 100.0)));
            result += ('0' + resultPart).slice(-2);
        }
        return result;
    };
    NbColorHelper.hexToRgbA = function (hex, alpha) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        throw new Error('Bad Hex');
    };
    return NbColorHelper;
}());

var palette = {
    primary: '#8a7fff',
    success: '#40dc7e',
    info: '#4ca6ff',
    warning: '#ffa100',
    danger: '#ff4c6a',
};
var DEFAULT_THEME = {
    name: 'default',
    variables: {
        fontMain: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSecondary: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        bg: '#ffffff',
        fg: '#a4abb3',
        fgHeading: '#2a2a2a',
        fgText: '#3b3b3b',
        fgHighlight: '#41d974',
        layoutBg: '#ebeff5',
        separator: '#ebeef2',
        primary: palette.primary,
        success: palette.success,
        info: palette.info,
        warning: palette.warning,
        danger: palette.danger,
        primaryLight: NbColorHelper.tint(palette.primary, 15),
        successLight: NbColorHelper.tint(palette.success, 15),
        infoLight: NbColorHelper.tint(palette.info, 15),
        warningLight: NbColorHelper.tint(palette.warning, 15),
        dangerLight: NbColorHelper.tint(palette.danger, 15),
    },
};

var palette$1 = {
    primary: '#7659ff',
    success: '#00d977',
    info: '#0088ff',
    warning: '#ffa100',
    danger: '#ff386a',
};
var COSMIC_THEME = {
    name: 'cosmic',
    base: 'default',
    variables: {
        bg: '#3d3780',
        fg: '#a1a1e5',
        fgHeading: '#ffffff',
        fgText: '#d1d1ff',
        fgHighlight: '#00f9a6',
        layoutBg: '#2f296b',
        separator: '#342e73',
        primary: palette$1.primary,
        success: palette$1.success,
        info: palette$1.info,
        warning: palette$1.warning,
        danger: palette$1.danger,
        primaryLight: NbColorHelper.tint(palette$1.primary, 20),
        successLight: NbColorHelper.tint(palette$1.success, 20),
        infoLight: NbColorHelper.tint(palette$1.info, 20),
        warningLight: NbColorHelper.tint(palette$1.warning, 20),
        dangerLight: NbColorHelper.tint(palette$1.danger, 20),
    },
};

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var BUILT_IN_THEMES = [
    DEFAULT_THEME,
    COSMIC_THEME,
];
/**
 * Js Themes registry - provides access to the JS themes' variables.
 * Usually shouldn't be used directly, but through the NbThemeService class methods (getJsTheme).
 */
var NbJSThemesRegistry = /** @class */ (function () {
    function NbJSThemesRegistry(builtInThemes, newThemes) {
        if (newThemes === void 0) { newThemes = []; }
        var _this = this;
        this.themes = {};
        var themes = this.combineByNames(newThemes, builtInThemes);
        themes.forEach(function (theme) {
            _this.register(theme, theme.name, theme.base);
        });
    }
    /**
     * Registers a new JS theme
     * @param config any
     * @param themeName string
     * @param baseTheme string
     */
    /**
       * Registers a new JS theme
       * @param config any
       * @param themeName string
       * @param baseTheme string
       */
    NbJSThemesRegistry.prototype.register = /**
       * Registers a new JS theme
       * @param config any
       * @param themeName string
       * @param baseTheme string
       */
    function (config, themeName, baseTheme) {
        var base = this.has(baseTheme) ? this.get(baseTheme) : {};
        this.themes[themeName] = this.mergeDeep({}, base, config);
    };
    /**
     * Checks whether the theme is registered
     * @param themeName
     * @returns boolean
     */
    /**
       * Checks whether the theme is registered
       * @param themeName
       * @returns boolean
       */
    NbJSThemesRegistry.prototype.has = /**
       * Checks whether the theme is registered
       * @param themeName
       * @returns boolean
       */
    function (themeName) {
        return !!this.themes[themeName];
    };
    /**
     * Return a theme
     * @param themeName
     * @returns NbJSThemeOptions
     */
    /**
       * Return a theme
       * @param themeName
       * @returns NbJSThemeOptions
       */
    NbJSThemesRegistry.prototype.get = /**
       * Return a theme
       * @param themeName
       * @returns NbJSThemeOptions
       */
    function (themeName) {
        if (!this.themes[themeName]) {
            throw Error("NbThemeConfig: no theme '" + themeName + "' found registered.");
        }
        return JSON.parse(JSON.stringify(this.themes[themeName]));
    };
    NbJSThemesRegistry.prototype.combineByNames = function (newThemes, oldThemes) {
        var _this = this;
        if (newThemes) {
            var mergedThemes_1 = [];
            newThemes.forEach(function (theme) {
                var sameOld = oldThemes.find(function (tm) { return tm.name === theme.name; })
                    || {};
                var mergedTheme = _this.mergeDeep({}, sameOld, theme);
                mergedThemes_1.push(mergedTheme);
            });
            oldThemes.forEach(function (theme) {
                if (!mergedThemes_1.find(function (tm) { return tm.name === theme.name; })) {
                    mergedThemes_1.push(theme);
                }
            });
            return mergedThemes_1;
        }
        return oldThemes;
    };
    NbJSThemesRegistry.prototype.isObject = function (item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    };
    // TODO: move to helpers
    // TODO: move to helpers
    NbJSThemesRegistry.prototype.mergeDeep = 
    // TODO: move to helpers
    function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (!sources.length) {
            return target;
        }
        var source = sources.shift();
        if (this.isObject(target) && this.isObject(source)) {
            for (var key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, (_a = {}, _a[key] = {}, _a));
                    }
                    this.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, (_b = {}, _b[key] = source[key], _b));
                }
            }
        }
        return this.mergeDeep.apply(this, [target].concat(sources));
        var _a, _b;
    };
    NbJSThemesRegistry.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbJSThemesRegistry.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: _angular_core.Inject, args: [nbBuiltInJSThemesToken,] },] },
        { type: Array, decorators: [{ type: _angular_core.Inject, args: [nbJSThemesToken,] },] },
    ]; };
    return NbJSThemesRegistry;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var DEFAULT_MEDIA_BREAKPOINTS = [
    {
        name: 'xs',
        width: 0,
    },
    {
        name: 'is',
        width: 400,
    },
    {
        name: 'sm',
        width: 576,
    },
    {
        name: 'md',
        width: 768,
    },
    {
        name: 'lg',
        width: 992,
    },
    {
        name: 'xl',
        width: 1200,
    },
    {
        name: 'xxl',
        width: 1400,
    },
    {
        name: 'xxxl',
        width: 1600,
    },
];
/**
 * Manages media breakpoints
 *
 * Provides access to available media breakpoints to convert window width to a configured breakpoint,
 * e.g. 200px - *xs* breakpoint
 */
var NbMediaBreakpointsService = /** @class */ (function () {
    function NbMediaBreakpointsService(breakpoints) {
        this.breakpoints = breakpoints;
        this.breakpointsMap = this.breakpoints.reduce(function (res, b) {
            res[b.name] = b.width;
            return res;
        }, {});
    }
    /**
     * Returns a configured breakpoint by width
     * @param width number
     * @returns {Z|{name: string, width: number}}
     */
    /**
       * Returns a configured breakpoint by width
       * @param width number
       * @returns {Z|{name: string, width: number}}
       */
    NbMediaBreakpointsService.prototype.getByWidth = /**
       * Returns a configured breakpoint by width
       * @param width number
       * @returns {Z|{name: string, width: number}}
       */
    function (width) {
        var unknown = { name: 'unknown', width: width };
        var breakpoints = this.getBreakpoints();
        return breakpoints
            .find(function (point, index) {
            var next = breakpoints[index + 1];
            return width >= point.width && (!next || width < next.width);
        }) || unknown;
    };
    /**
     * Returns a configured breakpoint by name
     * @param name string
     * @returns NbMediaBreakpoint
     */
    /**
       * Returns a configured breakpoint by name
       * @param name string
       * @returns NbMediaBreakpoint
       */
    NbMediaBreakpointsService.prototype.getByName = /**
       * Returns a configured breakpoint by name
       * @param name string
       * @returns NbMediaBreakpoint
       */
    function (name) {
        var unknown = { name: 'unknown', width: NaN };
        var breakpoints = this.getBreakpoints();
        return breakpoints.find(function (point) { return name === point.name; }) || unknown;
    };
    /**
     * Returns a list of configured breakpoints for the theme
     * @returns NbMediaBreakpoint[]
     */
    /**
       * Returns a list of configured breakpoints for the theme
       * @returns NbMediaBreakpoint[]
       */
    NbMediaBreakpointsService.prototype.getBreakpoints = /**
       * Returns a list of configured breakpoints for the theme
       * @returns NbMediaBreakpoint[]
       */
    function () {
        return this.breakpoints;
    };
    /**
     * Returns a map of configured breakpoints for the theme
     * @returns {[p: string]: number}
     */
    /**
       * Returns a map of configured breakpoints for the theme
       * @returns {[p: string]: number}
       */
    NbMediaBreakpointsService.prototype.getBreakpointsMap = /**
       * Returns a map of configured breakpoints for the theme
       * @returns {[p: string]: number}
       */
    function () {
        return this.breakpointsMap;
    };
    NbMediaBreakpointsService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbMediaBreakpointsService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [nbMediaBreakpointsToken,] },] },
    ]; };
    return NbMediaBreakpointsService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Main Nebular service. Includes various helper methods.
 */
var NbThemeService = /** @class */ (function () {
    function NbThemeService(options, breakpointService, jsThemesRegistry, componentFactoryResolver) {
        this.options = options;
        this.breakpointService = breakpointService;
        this.jsThemesRegistry = jsThemesRegistry;
        this.componentFactoryResolver = componentFactoryResolver;
        this.themeChanges$ = new rxjs.ReplaySubject(1);
        this.appendToLayoutTop$ = new rxjs.ReplaySubject();
        this.createLayoutTop$ = new rxjs.Subject();
        this.appendLayoutClass$ = new rxjs.Subject();
        this.removeLayoutClass$ = new rxjs.Subject();
        this.changeWindowWidth$ = new rxjs.ReplaySubject(2);
        if (options && options.name) {
            this.changeTheme(options.name);
        }
    }
    NbThemeService.prototype.changeTheme = function (name) {
        this.themeChanges$.next({ name: name, previous: this.currentTheme });
        this.currentTheme = name;
    };
    NbThemeService.prototype.changeWindowWidth = function (width) {
        this.changeWindowWidth$.next(width);
    };
    NbThemeService.prototype.appendToLayoutTop = function (entity) {
        var factory = entity;
        if (entity instanceof _angular_core.Type) {
            factory = this.componentFactoryResolver.resolveComponentFactory(entity);
        }
        var subject = new rxjs.ReplaySubject(1);
        this.appendToLayoutTop$.next({ factory: factory, listener: subject });
        return subject.asObservable();
    };
    /**
     * Returns a theme object with variables (color/paddings/etc) on a theme change.
     * Once subscribed - returns current theme.
     *
     * @returns {Observable<NbJSThemeOptions>}
     */
    /**
       * Returns a theme object with variables (color/paddings/etc) on a theme change.
       * Once subscribed - returns current theme.
       *
       * @returns {Observable<NbJSThemeOptions>}
       */
    NbThemeService.prototype.getJsTheme = /**
       * Returns a theme object with variables (color/paddings/etc) on a theme change.
       * Once subscribed - returns current theme.
       *
       * @returns {Observable<NbJSThemeOptions>}
       */
    function () {
        var _this = this;
        return this.onThemeChange().pipe(rxjs_operators.map(function (theme) {
            return _this.jsThemesRegistry.get(theme.name);
        }));
    };
    NbThemeService.prototype.clearLayoutTop = function () {
        var observable = new rxjs.BehaviorSubject(null);
        this.createLayoutTop$.next({ listener: observable });
        this.appendToLayoutTop$ = new rxjs.ReplaySubject();
        return observable.asObservable();
    };
    /**
     * Triggers media query breakpoint change
     * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
     * ```
     *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
     * ```
     * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
     */
    /**
       * Triggers media query breakpoint change
       * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
       * ```
       *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
       * ```
       * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
       */
    NbThemeService.prototype.onMediaQueryChange = /**
       * Triggers media query breakpoint change
       * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
       * ```
       *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
       * ```
       * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
       */
    function () {
        var _this = this;
        return this.changeWindowWidth$
            .pipe(rxjs_operators.startWith(undefined), rxjs_operators.pairwise(), rxjs_operators.map(function (_a) {
            var prevWidth = _a[0], width = _a[1];
            return [
                _this.breakpointService.getByWidth(prevWidth),
                _this.breakpointService.getByWidth(width),
            ];
        }), rxjs_operators.filter(function (_a) {
            var prevPoint = _a[0], point = _a[1];
            return prevPoint.name !== point.name;
        }), rxjs_operators.distinctUntilChanged(null, function (params) { return params[0].name + params[1].name; }), rxjs_operators.share());
    };
    NbThemeService.prototype.onThemeChange = function () {
        return this.themeChanges$.pipe(rxjs_operators.share());
    };
    NbThemeService.prototype.onAppendToTop = function () {
        return this.appendToLayoutTop$.pipe(rxjs_operators.share());
    };
    NbThemeService.prototype.onClearLayoutTop = function () {
        return this.createLayoutTop$.pipe(rxjs_operators.share());
    };
    NbThemeService.prototype.appendLayoutClass = function (className) {
        this.appendLayoutClass$.next(className);
    };
    NbThemeService.prototype.onAppendLayoutClass = function () {
        return this.appendLayoutClass$.pipe(rxjs_operators.share());
    };
    NbThemeService.prototype.removeLayoutClass = function (className) {
        this.removeLayoutClass$.next(className);
    };
    NbThemeService.prototype.onRemoveLayoutClass = function () {
        return this.removeLayoutClass$.pipe(rxjs_operators.share());
    };
    NbThemeService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbThemeService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [nbThemeOptionsToken,] },] },
        { type: NbMediaBreakpointsService, },
        { type: NbJSThemesRegistry, },
        { type: _angular_core.ComponentFactoryResolver, },
    ]; };
    return NbThemeService;
}());

/**
 * Service to control the global page spinner.
 */
var NbSpinnerService = /** @class */ (function () {
    function NbSpinnerService(document) {
        this.document = document;
        this.loaders = [];
        this.selector = 'nb-global-spinner';
    }
    /**
     * Appends new loader to the list of loader to be completed before
     * spinner will be hidden
     * @param method Promise<any>
     */
    /**
       * Appends new loader to the list of loader to be completed before
       * spinner will be hidden
       * @param method Promise<any>
       */
    NbSpinnerService.prototype.registerLoader = /**
       * Appends new loader to the list of loader to be completed before
       * spinner will be hidden
       * @param method Promise<any>
       */
    function (method) {
        this.loaders.push(method);
    };
    /**
     * Clears the list of loader
     */
    /**
       * Clears the list of loader
       */
    NbSpinnerService.prototype.clear = /**
       * Clears the list of loader
       */
    function () {
        this.loaders = [];
    };
    /**
     * Start the loader process, show spinnder and execute loaders
     */
    /**
       * Start the loader process, show spinnder and execute loaders
       */
    NbSpinnerService.prototype.load = /**
       * Start the loader process, show spinnder and execute loaders
       */
    function () {
        this.showSpinner();
        this.executeAll();
    };
    NbSpinnerService.prototype.executeAll = function (done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        Promise.all(this.loaders).then(function (values) {
            _this.hideSpinner();
            done.call(null, values);
        })
            .catch(function (error) {
            // TODO: Promise.reject
            console.error(error);
        });
    };
    // TODO is there any better way of doing this?
    // TODO is there any better way of doing this?
    NbSpinnerService.prototype.showSpinner = 
    // TODO is there any better way of doing this?
    function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    };
    NbSpinnerService.prototype.hideSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    };
    NbSpinnerService.prototype.getSpinnerElement = function () {
        return this.document.getElementById(this.selector);
    };
    NbSpinnerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbSpinnerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_DOCUMENT,] },] },
    ]; };
    return NbSpinnerService;
}());

/**
 * Layout direction.
 * */
/**
 * Layout direction.
 * */

/**
 * Layout direction.
 * */
(function (NbLayoutDirection) {
    NbLayoutDirection["LTR"] = "ltr";
    NbLayoutDirection["RTL"] = "rtl";
})(exports.NbLayoutDirection || (exports.NbLayoutDirection = {}));

/**
 * Layout direction setting injection token.
 * */
var NB_LAYOUT_DIRECTION = new _angular_core.InjectionToken('Layout direction');
/**
 * Layout Direction Service.
 * Allows to set or get layout direction and listen to it's changes
 */
var NbLayoutDirectionService = /** @class */ (function () {
    function NbLayoutDirectionService(direction) {
        if (direction === void 0) { direction = exports.NbLayoutDirection.LTR; }
        this.direction = direction;
        this.$directionChange = new rxjs.ReplaySubject(1);
        this.setDirection(direction);
    }
    /**
     * Returns true if layout direction set to left to right.
     * @returns boolean.
     * */
    /**
       * Returns true if layout direction set to left to right.
       * @returns boolean.
       * */
    NbLayoutDirectionService.prototype.isLtr = /**
       * Returns true if layout direction set to left to right.
       * @returns boolean.
       * */
    function () {
        return this.direction === exports.NbLayoutDirection.LTR;
    };
    /**
     * Returns true if layout direction set to right to left.
     * @returns boolean.
     * */
    /**
       * Returns true if layout direction set to right to left.
       * @returns boolean.
       * */
    NbLayoutDirectionService.prototype.isRtl = /**
       * Returns true if layout direction set to right to left.
       * @returns boolean.
       * */
    function () {
        return this.direction === exports.NbLayoutDirection.RTL;
    };
    /**
     * Returns current layout direction.
     * @returns NbLayoutDirection.
     * */
    /**
       * Returns current layout direction.
       * @returns NbLayoutDirection.
       * */
    NbLayoutDirectionService.prototype.getDirection = /**
       * Returns current layout direction.
       * @returns NbLayoutDirection.
       * */
    function () {
        return this.direction;
    };
    /**
     * Sets layout direction
     * @param {NbLayoutDirection} direction
     */
    /**
       * Sets layout direction
       * @param {NbLayoutDirection} direction
       */
    NbLayoutDirectionService.prototype.setDirection = /**
       * Sets layout direction
       * @param {NbLayoutDirection} direction
       */
    function (direction) {
        this.direction = direction;
        this.$directionChange.next(direction);
    };
    /**
     * Triggered when direction was changed.
     * @returns Observable<NbLayoutDirection>.
     */
    /**
       * Triggered when direction was changed.
       * @returns Observable<NbLayoutDirection>.
       */
    NbLayoutDirectionService.prototype.onDirectionChange = /**
       * Triggered when direction was changed.
       * @returns Observable<NbLayoutDirection>.
       */
    function () {
        return this.$directionChange.pipe(rxjs_operators.share());
    };
    NbLayoutDirectionService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbLayoutDirectionService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [NB_LAYOUT_DIRECTION,] },] },
    ]; };
    return NbLayoutDirectionService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function nbWindowFactory() {
    return window;
}
var NbThemeModule = /** @class */ (function () {
    function NbThemeModule() {
    }
    // TODO: check the options (throw exception?)
    /**
     * Main Theme Module
     *
     * @param nbThemeOptions {NbThemeOptions} Main theme options
     * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
     * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
     *
     * @returns {ModuleWithProviders}
     */
    // TODO: check the options (throw exception?)
    /**
       * Main Theme Module
       *
       * @param nbThemeOptions {NbThemeOptions} Main theme options
       * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
       * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
       *
       * @returns {ModuleWithProviders}
       */
    NbThemeModule.forRoot = 
    // TODO: check the options (throw exception?)
    /**
       * Main Theme Module
       *
       * @param nbThemeOptions {NbThemeOptions} Main theme options
       * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
       * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
       *
       * @returns {ModuleWithProviders}
       */
    function (nbThemeOptions, nbJSThemes, nbMediaBreakpoints, layoutDirection) {
        return {
            ngModule: NbThemeModule,
            providers: [
                { provide: nbThemeOptionsToken, useValue: nbThemeOptions || {} },
                { provide: nbBuiltInJSThemesToken, useValue: BUILT_IN_THEMES },
                { provide: nbJSThemesToken, useValue: nbJSThemes || [] },
                { provide: nbMediaBreakpointsToken, useValue: nbMediaBreakpoints || DEFAULT_MEDIA_BREAKPOINTS },
                { provide: NB_WINDOW, useFactory: nbWindowFactory },
                { provide: NB_DOCUMENT, useExisting: _angular_common.DOCUMENT },
                NbJSThemesRegistry,
                NbThemeService,
                NbMediaBreakpointsService,
                NbSpinnerService,
                { provide: NB_LAYOUT_DIRECTION, useValue: layoutDirection || exports.NbLayoutDirection.LTR },
                NbLayoutDirectionService,
            ],
        };
    };
    NbThemeModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                    ],
                    exports: [],
                },] },
    ];
    return NbThemeModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbSharedModule = /** @class */ (function () {
    function NbSharedModule() {
    }
    NbSharedModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    exports: [
                        _angular_common.CommonModule,
                        _angular_forms.FormsModule,
                        _angular_router.RouterModule,
                    ],
                },] },
    ];
    return NbSharedModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Component intended to be used within  the `<nb-card>` component.
 * It adds styles for a preset header section.
 *
 * @styles
 *
 * card-header-font-family:
 * card-header-font-size:
 * card-header-font-weight:
 * card-header-fg:
 * card-header-fg-heading:
 * card-header-active-bg:
 * card-header-active-fg:
 * card-header-disabled-bg:
 * card-header-primary-bg:
 * card-header-info-bg:
 * card-header-success-bg:
 * card-header-warning-bg:
 * card-header-danger-bg:
 */
var NbCardHeaderComponent = /** @class */ (function () {
    function NbCardHeaderComponent() {
    }
    NbCardHeaderComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card-header',
                    template: "<ng-content></ng-content>",
                },] },
    ];
    return NbCardHeaderComponent;
}());
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
var NbCardBodyComponent = /** @class */ (function () {
    function NbCardBodyComponent() {
    }
    NbCardBodyComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card-body',
                    template: "<ng-content></ng-content>",
                },] },
    ];
    return NbCardBodyComponent;
}());
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
var NbCardFooterComponent = /** @class */ (function () {
    function NbCardFooterComponent() {
    }
    NbCardFooterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card-footer',
                    template: "<ng-content></ng-content>",
                },] },
    ];
    return NbCardFooterComponent;
}());
/**
 * Basic content container component.
 *
 * @example While this component can be used alone, it also provides a number
 * of child components for common card sections:
 *
 * ```
 * <nb-card-header></nb-card-header>
 * <nb-card-body></nb-card-body>
 * <nb-card-footer></nb-card-footer>
 * ```
 *
 * @styles
 *
 * card-line-height:
 * card-font-weight:
 * card-fg-text:
 * card-bg:
 * card-height-xxsmall:
 * card-height-xsmall:
 * card-height-small:
 * card-height-medium:
 * card-height-large:
 * card-height-xlarge:
 * card-height-xxlarge:
 * card-shadow:
 * card-border-radius:
 * card-padding:
 * card-margin:
 * card-separator:
 *
 */
var NbCardComponent = /** @class */ (function () {
    function NbCardComponent() {
    }
    Object.defineProperty(NbCardComponent.prototype, "xxsmall", {
        get: function () {
            return this.size === NbCardComponent.SIZE_XXSMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "xsmall", {
        get: function () {
            return this.size === NbCardComponent.SIZE_XSMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "small", {
        get: function () {
            return this.size === NbCardComponent.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCardComponent.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "large", {
        get: function () {
            return this.size === NbCardComponent.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "xlarge", {
        get: function () {
            return this.size === NbCardComponent.SIZE_XLARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "xxlarge", {
        get: function () {
            return this.size === NbCardComponent.SIZE_XXLARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "active", {
        get: function () {
            return this.status === NbCardComponent.STATUS_ACTIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "disabled", {
        get: function () {
            return this.status === NbCardComponent.STATUS_DISABLED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "primary", {
        get: function () {
            return this.status === NbCardComponent.STATUS_PRIMARY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "info", {
        get: function () {
            return this.status === NbCardComponent.STATUS_INFO;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "success", {
        get: function () {
            return this.status === NbCardComponent.STATUS_SUCCESS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "warning", {
        get: function () {
            return this.status === NbCardComponent.STATUS_WARNING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "danger", {
        get: function () {
            return this.status === NbCardComponent.STATUS_DANGER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "hasAccent", {
        get: function () {
            return this.accent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "primaryAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_PRIMARY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "infoAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_INFO;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "successAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_SUCCESS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "warningAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_WARNING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "dangerAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_DANGER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "activeAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_ACTIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "disabledAccent", {
        get: function () {
            return this.accent === NbCardComponent.ACCENT_DISABLED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "setSize", {
        set: /**
           * Card size, available sizes:
           * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
           * @param {string} val
           */
        function (val) {
            this.size = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "setStatus", {
        set: /**
           * Card status (adds specific styles):
           * active, disabled, primary, info, success, warning, danger
           * @param {string} val
           */
        function (val) {
            this.status = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "setAccent", {
        set: /**
           * Card accent (color of the top border):
           * active, disabled, primary, info, success, warning, danger
           * @param {string} val
           */
        function (val) {
            this.accent = val;
        },
        enumerable: true,
        configurable: true
    });
    NbCardComponent.SIZE_XXSMALL = 'xxsmall';
    NbCardComponent.SIZE_XSMALL = 'xsmall';
    NbCardComponent.SIZE_SMALL = 'small';
    NbCardComponent.SIZE_MEDIUM = 'medium';
    NbCardComponent.SIZE_LARGE = 'large';
    NbCardComponent.SIZE_XLARGE = 'xlarge';
    NbCardComponent.SIZE_XXLARGE = 'xxlarge';
    NbCardComponent.STATUS_ACTIVE = 'active';
    NbCardComponent.STATUS_DISABLED = 'disabled';
    NbCardComponent.STATUS_PRIMARY = 'primary';
    NbCardComponent.STATUS_INFO = 'info';
    NbCardComponent.STATUS_SUCCESS = 'success';
    NbCardComponent.STATUS_WARNING = 'warning';
    NbCardComponent.STATUS_DANGER = 'danger';
    NbCardComponent.ACCENT_ACTIVE = 'active';
    NbCardComponent.ACCENT_DISABLED = 'disabled';
    NbCardComponent.ACCENT_PRIMARY = 'primary';
    NbCardComponent.ACCENT_INFO = 'info';
    NbCardComponent.ACCENT_SUCCESS = 'success';
    NbCardComponent.ACCENT_WARNING = 'warning';
    NbCardComponent.ACCENT_DANGER = 'danger';
    NbCardComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card',
                    styles: [":host{display:flex;flex-direction:column} "],
                    template: "\n    <ng-content></ng-content>\n    <ng-content select=\"nb-card-header\"></ng-content>\n    <ng-content select=\"nb-card-body\"></ng-content>\n    <ng-content select=\"nb-card-footer\"></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbCardComponent.propDecorators = {
        "xxsmall": [{ type: _angular_core.HostBinding, args: ['class.xxsmall-card',] },],
        "xsmall": [{ type: _angular_core.HostBinding, args: ['class.xsmall-card',] },],
        "small": [{ type: _angular_core.HostBinding, args: ['class.small-card',] },],
        "medium": [{ type: _angular_core.HostBinding, args: ['class.medium-card',] },],
        "large": [{ type: _angular_core.HostBinding, args: ['class.large-card',] },],
        "xlarge": [{ type: _angular_core.HostBinding, args: ['class.xlarge-card',] },],
        "xxlarge": [{ type: _angular_core.HostBinding, args: ['class.xxlarge-card',] },],
        "active": [{ type: _angular_core.HostBinding, args: ['class.active-card',] },],
        "disabled": [{ type: _angular_core.HostBinding, args: ['class.disabled-card',] },],
        "primary": [{ type: _angular_core.HostBinding, args: ['class.primary-card',] },],
        "info": [{ type: _angular_core.HostBinding, args: ['class.info-card',] },],
        "success": [{ type: _angular_core.HostBinding, args: ['class.success-card',] },],
        "warning": [{ type: _angular_core.HostBinding, args: ['class.warning-card',] },],
        "danger": [{ type: _angular_core.HostBinding, args: ['class.danger-card',] },],
        "hasAccent": [{ type: _angular_core.HostBinding, args: ['class.accent',] },],
        "primaryAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-primary',] },],
        "infoAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-info',] },],
        "successAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-success',] },],
        "warningAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-warning',] },],
        "dangerAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-danger',] },],
        "activeAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-active',] },],
        "disabledAccent": [{ type: _angular_core.HostBinding, args: ['class.accent-disabled',] },],
        "setSize": [{ type: _angular_core.Input, args: ['size',] },],
        "setStatus": [{ type: _angular_core.Input, args: ['status',] },],
        "setAccent": [{ type: _angular_core.Input, args: ['accent',] },],
    };
    return NbCardComponent;
}());

/**
 * Reveal card component.
 *
 * ![image](assets/images/components/reveal-card.gif)
 *
 * @example
 *
 * ```
 * <nb-reveal-card>
 *   <nb-card-front>
 *     <nb-card><nb-card-body>Front Card</nb-card-body></nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card><nb-card-body>Back Card</nb-card-body></nb-card>
 *   </nb-card-back>
 * </nb-reveal-card>
 * ```
 */
var NbRevealCardComponent = /** @class */ (function () {
    function NbRevealCardComponent() {
        /**
           * Reveal state
           * @type boolean
           */
        this.revealed = false;
    }
    NbRevealCardComponent.prototype.toggleReveal = function () {
        this.revealed = !this.revealed;
    };
    NbRevealCardComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-reveal-card',
                    styles: [":host{display:block;position:relative}:host.revealed .second-card-container{top:0;transition:none}:host.revealed .second-card-container /deep/ nb-card-back{top:0}:host.revealed .reveal-button{transform:none}:host /deep/ nb-card-front{display:block;height:100%}:host .second-card-container{position:absolute;top:100%;right:0;left:0;overflow:hidden;transition:top 0s 0.5s}:host .second-card-container /deep/ nb-card-back{position:absolute;left:0;top:100%;width:100%;transition:top 0.5s}:host .reveal-button{cursor:pointer;position:absolute;right:0;bottom:0;transform:rotate(180deg);transition:transform 0.3s} "],
                    template: "\n    <ng-content select=\"nb-card-front\"></ng-content>\n    <div class=\"second-card-container\">\n      <ng-content select=\"nb-card-back\"></ng-content>\n    </div>\n    <a class=\"reveal-button\" (click)=\"toggleReveal()\">\n      <i class=\"nb-arrow-dropdown\" aria-hidden=\"true\"></i>\n    </a>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbRevealCardComponent.propDecorators = {
        "revealed": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['class.revealed',] },],
    };
    return NbRevealCardComponent;
}());

/**
 * Flip card component.
 *
 * ![image](assets/images/components/flip-card.gif)
 *
 * @example
 *
 * ```
 * <nb-flip-card>
 *   <nb-card-front>
 *     <nb-card><nb-card-body>Front Card</nb-card-body></nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card><nb-card-body>Back Card</nb-card-body></nb-card>
 *   </nb-card-back>
 * </nb-flip-card>
 * ```
 */
var NbFlipCardComponent = /** @class */ (function () {
    function NbFlipCardComponent() {
        /**
           * Flip state
           * @type boolean
           */
        this.flipped = false;
    }
    NbFlipCardComponent.prototype.toggleFlip = function () {
        this.flipped = !this.flipped;
    };
    NbFlipCardComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-flip-card',
                    styles: [":host{display:block;perspective:1200px;position:relative}:host.flipped .flipcard-body{transform:rotateY(180deg)}:host.flipped .flipcard-body .front-container .flip-button{opacity:0}:host .flipcard-body{display:flex;transition:transform 0.5s;transform-style:preserve-3d}:host .flipcard-body .front-container,:host .flipcard-body .back-container{backface-visibility:hidden;flex:1}:host .flipcard-body .front-container .flip-button,:host .flipcard-body .back-container .flip-button{cursor:pointer;position:absolute;right:0;bottom:0;opacity:1;transition:opacity 0s 0.15s}:host .flipcard-body .back-container{transform:rotateY(180deg)} "],
                    template: "\n    <div class=\"flipcard-body\">\n      <div class=\"front-container\">\n        <ng-content select=\"nb-card-front\"></ng-content>\n        <a class=\"flip-button\" (click)=\"toggleFlip()\">\n          <i class=\"nb-arrow-dropleft\" aria-hidden=\"true\"></i>\n        </a>\n      </div>\n      <div class=\"back-container\">\n        <ng-content select=\"nb-card-back\"></ng-content>\n        <a class=\"flip-button\" (click)=\"toggleFlip()\">\n          <i class=\"nb-arrow-dropleft\" aria-hidden=\"true\"></i>\n        </a>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbFlipCardComponent.propDecorators = {
        "flipped": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['class.flipped',] },],
    };
    return NbFlipCardComponent;
}());

/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the front card.
 */
var NbCardFrontComponent = /** @class */ (function () {
    function NbCardFrontComponent() {
    }
    NbCardFrontComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card-front',
                    template: '<ng-content select="nb-card"></ng-content>',
                },] },
    ];
    return NbCardFrontComponent;
}());
/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the back card.
 */
var NbCardBackComponent = /** @class */ (function () {
    function NbCardBackComponent() {
    }
    NbCardBackComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-card-back',
                    template: '<ng-content select="nb-card"></ng-content>',
                },] },
    ];
    return NbCardBackComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_CARD_COMPONENTS = [
    NbCardComponent,
    NbCardBodyComponent,
    NbCardFooterComponent,
    NbCardHeaderComponent,
    NbRevealCardComponent,
    NbFlipCardComponent,
    NbCardFrontComponent,
    NbCardBackComponent,
];
var NbCardModule = /** @class */ (function () {
    function NbCardModule() {
    }
    NbCardModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: NB_CARD_COMPONENTS.slice(),
                    exports: NB_CARD_COMPONENTS.slice(),
                },] },
    ];
    return NbCardModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function convertToBoolProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === '');
    }
    return !!val;
}
function getElementHeight(el) {
    /**
       *
       * TODO: Move helpers in separate common module.
       * TODO: Provide window through di token.
       * */
    var style = window.getComputedStyle(el);
    var marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    var marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
    return el.offsetHeight + marginTop + marginBottom;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * A container component which determines a content position inside of the layout.
 * The layout could contain unlimited columns (not including the sidebars).
 *
 * @example By default the columns are ordered from the left to the right,
 * but it's also possible to overwrite this behavior by setting a `left` attribute to the column,
 * moving it to the very first position:
 * ```
 * <nb-layout>
 *   <nb-layout-column>Second</nb-layout-column>
 *   <nb-layout-column>Third</nb-layout-column>
 *   <nb-layout-column left>First</nb-layout-column>
 * </nb-layout>
 * ```
 */
var NbLayoutColumnComponent = /** @class */ (function () {
    function NbLayoutColumnComponent() {
    }
    Object.defineProperty(NbLayoutColumnComponent.prototype, "left", {
        set: /**
           * Move the column to the very left position in the layout.
           * @param {boolean} val
           */
        function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.startValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutColumnComponent.prototype, "start", {
        set: /**
           * Make columnt first in the layout.
           * @param {boolean} val
           */
        function (val) {
            this.startValue = convertToBoolProperty(val);
            this.leftValue = false;
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutColumnComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-layout-column',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutColumnComponent.propDecorators = {
        "leftValue": [{ type: _angular_core.HostBinding, args: ['class.left',] },],
        "startValue": [{ type: _angular_core.HostBinding, args: ['class.start',] },],
        "left": [{ type: _angular_core.Input },],
        "start": [{ type: _angular_core.Input },],
    };
    return NbLayoutColumnComponent;
}());
/**
 * Page header component.
 * Located on top of the page above the layout columns and sidebars.
 * Could be made `fixed` by setting the corresponding property. In the fixed mode the header becomes
 * sticky to the top of the nb-layout (to of the page).
 *
 * @styles
 *
 * header-font-family
 * header-line-height
 * header-fg
 * header-bg
 * header-height
 * header-padding
 * header-shadow
 */
var NbLayoutHeaderComponent = /** @class */ (function () {
    function NbLayoutHeaderComponent() {
    }
    Object.defineProperty(NbLayoutHeaderComponent.prototype, "fixed", {
        set: /**
           * Makes the header sticky to the top of the nb-layout.
           * @param {boolean} val
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutHeaderComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-layout-header',
                    template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutHeaderComponent.propDecorators = {
        "fixedValue": [{ type: _angular_core.HostBinding, args: ['class.fixed',] },],
        "fixed": [{ type: _angular_core.Input },],
    };
    return NbLayoutHeaderComponent;
}());
/**
 * Page footer.
 * Located under the nb-layout content (specifically, under the columns).
 * Could be made `fixed`, becoming sticky to the bottom of the view port (window).
 *
 * @styles
 *
 * footer-height
 * footer-padding
 * footer-fg
 * footer-bg
 * footer-separator
 * footer-shadow
 */
var NbLayoutFooterComponent = /** @class */ (function () {
    function NbLayoutFooterComponent() {
    }
    Object.defineProperty(NbLayoutFooterComponent.prototype, "fixed", {
        set: /**
           * Makes the footer sticky to the bottom of the window.
           * @param {boolean} val
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutFooterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-layout-footer',
                    template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutFooterComponent.propDecorators = {
        "fixedValue": [{ type: _angular_core.HostBinding, args: ['class.fixed',] },],
        "fixed": [{ type: _angular_core.Input },],
    };
    return NbLayoutFooterComponent;
}());
/**
 * The general Nebular component-container.
 * It is required that all children component of the framework are located inside of the nb-layout.
 *
 * Can contain the following components inside:
 *
 * ```
 * nb-layout-header
 * nb-layout-column
 * nb-sidebar
 * nb-layout-footer
 * ```
 *
 * By default the layout fills up the full view-port.
 * The window scrollbars are disabled on the body and moved inside of the nb-layout, so that the scrollbars
 * won't mess with the fixed nb-header.
 *
 * The children components are projected into the flexible layout structure allowing to adjust the layout behavior
 * based on the settings provided.
 *
 * The layout content (columns) becomes centered when the window width is more than
 * the value specified in the theme variable `layout-content-width`.
 *
 * The layout also contains the area on the very top (the first child of the nb-layout), which could be used
 * to dynamically append some components like modals or spinners/loaders
 * so that they are located on top of the elements hierarchy.
 * More details are below under the `ThemeService` section.
 *
 * The layout component is also responsible for changing of the application themes.
 * It listens to the `themeChange` event and change the theme CSS class appended to body.
 * Based on the class appended a specific CSS-theme is applied to the application.
 * More details of the Theme System could be found here [Enabling Theme System](#/docs/concepts/theme-system)
 *
 * @example A simple layout example:
 *
 * ```
 * <nb-layout>
 *   <nb-layout-header>Great Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @example For example, it is possible to ask the layout to center the columns (notice: we added a `center` attribute
 * to the layout:
 *
 * ```
 * <nb-layout center>
 *   <nb-layout-header>Great Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @styles
 *
 * layout-font-family
 * layout-font-size
 * layout-line-height
 * layout-fg
 * layout-bg
 * layout-min-height
 * layout-content-width
 * layout-window-mode-min-width
 * layout-window-mode-max-width: window mode only, after this value layout turns into floating window
 * layout-window-mode-bg: window mode only, background
 * layout-window-mode-padding-top: window mode only, max padding from top
 * layout-window-shadow: window mode shadow
 * layout-padding
 * layout-medium-padding
 * layout-small-padding
 */
var NbLayoutComponent = /** @class */ (function () {
    function NbLayoutComponent(themeService, spinnerService, componentFactoryResolver, elementRef, renderer, router, window, document, platformId, layoutDirectionService) {
        var _this = this;
        this.themeService = themeService;
        this.spinnerService = spinnerService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.window = window;
        this.document = document;
        this.platformId = platformId;
        this.layoutDirectionService = layoutDirectionService;
        this.centerValue = false;
        this.windowModeValue = false;
        this.withScrollValue = false;
        this.afterViewInit$ = new rxjs.BehaviorSubject(null);
        this.alive = true;
        this.themeService.onThemeChange()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (theme) {
            var body = _this.document.getElementsByTagName('body')[0];
            if (theme.previous) {
                _this.renderer.removeClass(body, "nb-theme-" + theme.previous);
            }
            _this.renderer.addClass(body, "nb-theme-" + theme.name);
        });
        this.themeService.onAppendLayoutClass()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.addClass(_this.elementRef.nativeElement, className);
        });
        this.themeService.onRemoveLayoutClass()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.removeClass(_this.elementRef.nativeElement, className);
        });
        this.spinnerService.registerLoader(new Promise(function (resolve, reject) {
            _this.afterViewInit$
                .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
                .subscribe(function (_) { return resolve(); });
        }));
        this.spinnerService.load();
        if (_angular_common.isPlatformBrowser(this.platformId)) {
            // trigger first time so that after the change we have the initial value
            this.themeService.changeWindowWidth(this.window.innerWidth);
        }
    }
    Object.defineProperty(NbLayoutComponent.prototype, "center", {
        set: /**
           * Defines whether the layout columns will be centered after some width
           * @param {boolean} val
           */
        function (val) {
            this.centerValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "windowMode", {
        set: /**
           * Defines whether the layout enters a 'window' mode, when the layout content (including sidebars and fixed header)
           * becomes centered by width with a margin from the top of the screen, like a floating window.
           * Automatically enables `withScroll` mode, as in the window mode scroll must be inside the layout and cannot be on
           * window. (TODO: check this)
           * @param {boolean} val
           */
        function (val) {
            this.windowModeValue = convertToBoolProperty(val);
            this.withScroll = this.windowModeValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "withScroll", {
        set: /**
           * Defines whether to move the scrollbars to layout or leave it at the body level.
           * Automatically set to true when `windowMode` is enabled.
           * @param {boolean} val
           */
        function (val) {
            this.withScrollValue = convertToBoolProperty(val);
            // TODO: is this the best way of doing it? as we don't have access to body from theme styles
            // TODO: add e2e test
            var body = this.document.getElementsByTagName('body')[0];
            if (this.withScrollValue) {
                this.renderer.setStyle(body, 'overflow', 'hidden');
            }
            else {
                this.renderer.setStyle(body, 'overflow', 'initial');
            }
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeService.onAppendToTop()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            var componentRef = _this.veryTopRef.createComponent(data.factory);
            data.listener.next(componentRef);
            data.listener.complete();
        });
        this.themeService.onClearLayoutTop()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            _this.veryTopRef.clear();
            data.listener.next(true);
        });
        this.layoutDirectionService.onDirectionChange()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (direction) {
            _this.renderer.setProperty(_this.document, 'dir', direction);
        });
        this.afterViewInit$.next(true);
    };
    NbLayoutComponent.prototype.ngOnInit = function () {
        this.initScrollTop();
    };
    NbLayoutComponent.prototype.ngOnDestroy = function () {
        this.themeService.clearLayoutTop();
        this.alive = false;
    };
    NbLayoutComponent.prototype.onResize = function (event) {
        this.themeService.changeWindowWidth(event.target.innerWidth);
    };
    NbLayoutComponent.prototype.initScrollTop = function () {
        var _this = this;
        this.router.events
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (event) { return event instanceof _angular_router.NavigationEnd; }))
            .subscribe(function () {
            _this.scrollableContainerRef.nativeElement.scrollTo && _this.scrollableContainerRef.nativeElement.scrollTo(0, 0);
        });
    };
    NbLayoutComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-layout',
                    styles: [":host{-webkit-font-smoothing:antialiased}[dir=ltr] :host{text-align:left}[dir=rtl] :host{text-align:right}:host .layout{display:flex;flex-direction:column}:host /deep/ nb-layout-header{display:block}:host /deep/ nb-layout-header nav{align-items:center;justify-content:flex-start;display:flex}:host /deep/ nb-layout-header.fixed{position:fixed;left:0;right:0;z-index:1040}:host .layout-container{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row}[dir=ltr] :host .layout-container /deep/ nb-sidebar.left{order:0}[dir=rtl] :host .layout-container /deep/ nb-sidebar.left{order:2}[dir=ltr] :host .layout-container /deep/ nb-sidebar.right{order:2}[dir=rtl] :host .layout-container /deep/ nb-sidebar.right{order:0}:host .layout-container /deep/ nb-sidebar.end{order:2}:host .layout-container /deep/ nb-sidebar .fixed{position:fixed;width:100%;overflow-y:auto;height:100%}:host .layout-container .content{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:column;min-width:0}:host .layout-container .content.center{max-width:100%;position:relative;margin-left:auto;margin-right:auto}:host .layout-container .content .columns{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row;width:100%}:host .layout-container .content .columns /deep/ nb-layout-column{order:1;flex:1 0;min-width:0}[dir=ltr] :host .layout-container .content .columns /deep/ nb-layout-column.left{order:0}[dir=rtl] :host .layout-container .content .columns /deep/ nb-layout-column.left{order:2}:host .layout-container .content .columns /deep/ nb-layout-column.start{order:0}:host .layout-container .content /deep/ nb-layout-footer{display:block;margin-top:auto}:host .layout-container .content /deep/ nb-layout-footer nav{justify-content:center;display:flex} "],
                    template: "\n    <ng-template #layoutTopDynamicArea></ng-template>\n    <div class=\"scrollable-container\" #scrollableContainer>\n      <div class=\"layout\">\n        <ng-content select=\"nb-layout-header\"></ng-content>\n        <div class=\"layout-container\">\n          <ng-content select=\"nb-sidebar\"></ng-content>\n          <div class=\"content\" [class.center]=\"centerValue\">\n            <div class=\"columns\">\n              <ng-content select=\"nb-layout-column\"></ng-content>\n            </div>\n            <ng-content select=\"nb-layout-footer\"></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutComponent.ctorParameters = function () { return [
        { type: NbThemeService, },
        { type: NbSpinnerService, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer2, },
        { type: _angular_router.Router, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_WINDOW,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_DOCUMENT,] },] },
        { type: Object, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID,] },] },
        { type: NbLayoutDirectionService, },
    ]; };
    NbLayoutComponent.propDecorators = {
        "windowModeValue": [{ type: _angular_core.HostBinding, args: ['class.window-mode',] },],
        "withScrollValue": [{ type: _angular_core.HostBinding, args: ['class.with-scroll',] },],
        "center": [{ type: _angular_core.Input },],
        "windowMode": [{ type: _angular_core.Input },],
        "withScroll": [{ type: _angular_core.Input },],
        "veryTopRef": [{ type: _angular_core.ViewChild, args: ['layoutTopDynamicArea', { read: _angular_core.ViewContainerRef },] },],
        "scrollableContainerRef": [{ type: _angular_core.ViewChild, args: ['scrollableContainer', { read: _angular_core.ElementRef },] },],
        "onResize": [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return NbLayoutComponent;
}());

var NB_LAYOUT_COMPONENTS = [
    NbLayoutComponent,
    NbLayoutColumnComponent,
    NbLayoutFooterComponent,
    NbLayoutHeaderComponent,
];
var NbLayoutModule = /** @class */ (function () {
    function NbLayoutModule() {
    }
    NbLayoutModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: NB_LAYOUT_COMPONENTS.slice(),
                    exports: NB_LAYOUT_COMPONENTS.slice(),
                },] },
    ];
    return NbLayoutModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function isUrlPathEqual(path, link) {
    var locationPath = getPathPartOfUrl(path);
    return link === locationPath;
}
function isUrlPathContain(path, link) {
    var locationPath = getPathPartOfUrl(path);
    var endOfUrlSegmentRegExp = /\/|^$/;
    return locationPath.startsWith(link) &&
        locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
}
function getPathPartOfUrl(url) {
    return url.match(/.*?(?=[?#]|$)/)[0];
}

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var itemClick$ = new rxjs.ReplaySubject(1);
var addItems$ = new rxjs.ReplaySubject(1);
var navigateHome$ = new rxjs.ReplaySubject(1);
var getSelectedItem$ = new rxjs.ReplaySubject(1);
var itemSelect$ = new rxjs.ReplaySubject(1);
var itemHover$ = new rxjs.ReplaySubject(1);
var submenuToggle$ = new rxjs.ReplaySubject(1);
// TODO: check if we need both URL and LINK
/**
 * Menu Item options
 */
var NbMenuItem = /** @class */ (function () {
    function NbMenuItem() {
        /**
           * Children items height
           * @type {number}
           */
        this.subMenuHeight = 0;
        /**
           * Item is selected when partly or fully equal to the current url
           * @type {string}
           */
        this.pathMatch = 'full';
    }
    return NbMenuItem;
}());
// TODO: map select events to router change events
// TODO: review the interface
/**
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 */
var NbMenuService = /** @class */ (function () {
    function NbMenuService() {
    }
    /**
     * Add items to the end of the menu items list
     * @param {List<NbMenuItem>} items
     * @param {string} tag
     */
    /**
       * Add items to the end of the menu items list
       * @param {List<NbMenuItem>} items
       * @param {string} tag
       */
    NbMenuService.prototype.addItems = /**
       * Add items to the end of the menu items list
       * @param {List<NbMenuItem>} items
       * @param {string} tag
       */
    function (items, tag) {
        addItems$.next({ tag: tag, items: items });
    };
    /**
     * Navigate to the home menu item
     * @param {string} tag
     */
    /**
       * Navigate to the home menu item
       * @param {string} tag
       */
    NbMenuService.prototype.navigateHome = /**
       * Navigate to the home menu item
       * @param {string} tag
       */
    function (tag) {
        navigateHome$.next({ tag: tag });
    };
    /**
     * Returns currently selected item. Won't subscribe to the future events.
     * @param {string} tag
     * @returns {Observable<{tag: string; item: NbMenuItem}>}
     */
    /**
       * Returns currently selected item. Won't subscribe to the future events.
       * @param {string} tag
       * @returns {Observable<{tag: string; item: NbMenuItem}>}
       */
    NbMenuService.prototype.getSelectedItem = /**
       * Returns currently selected item. Won't subscribe to the future events.
       * @param {string} tag
       * @returns {Observable<{tag: string; item: NbMenuItem}>}
       */
    function (tag) {
        var listener = new rxjs.BehaviorSubject(null);
        getSelectedItem$.next({ tag: tag, listener: listener });
        return listener.asObservable();
    };
    NbMenuService.prototype.onItemClick = function () {
        return itemClick$.pipe(rxjs_operators.share());
    };
    NbMenuService.prototype.onItemSelect = function () {
        return itemSelect$.pipe(rxjs_operators.share());
    };
    NbMenuService.prototype.onItemHover = function () {
        return itemHover$.pipe(rxjs_operators.share());
    };
    NbMenuService.prototype.onSubmenuToggle = function () {
        return submenuToggle$.pipe(rxjs_operators.share());
    };
    NbMenuService.decorators = [
        { type: _angular_core.Injectable },
    ];
    return NbMenuService;
}());
var NbMenuInternalService = /** @class */ (function () {
    function NbMenuInternalService(location) {
        this.location = location;
        this.items = [];
        this.items = [];
    }
    NbMenuInternalService.prototype.getItems = function () {
        return this.items;
    };
    NbMenuInternalService.prototype.prepareItems = function (items) {
        var _this = this;
        var defaultItem = new NbMenuItem();
        items.forEach(function (i) {
            _this.applyDefaults(i, defaultItem);
            _this.setParent(i);
        });
    };
    NbMenuInternalService.prototype.updateSelection = function (items, tag, collapseOther) {
        var _this = this;
        if (collapseOther === void 0) { collapseOther = false; }
        if (collapseOther) {
            this.collapseAll(items, tag);
        }
        items.forEach(function (item) { return _this.selectItemByUrl(item, tag); });
    };
    NbMenuInternalService.prototype.resetItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.resetItem(i); });
    };
    NbMenuInternalService.prototype.collapseAll = function (items, tag, except) {
        var _this = this;
        items.forEach(function (i) { return _this.collapseItem(i, tag, except); });
    };
    NbMenuInternalService.prototype.onAddItem = function () {
        return addItems$.pipe(rxjs_operators.share());
    };
    NbMenuInternalService.prototype.onNavigateHome = function () {
        return navigateHome$.pipe(rxjs_operators.share());
    };
    NbMenuInternalService.prototype.onGetSelectedItem = function () {
        return getSelectedItem$.pipe(rxjs_operators.share());
    };
    NbMenuInternalService.prototype.itemHover = function (item, tag) {
        itemHover$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.submenuToggle = function (item, tag) {
        submenuToggle$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.itemSelect = function (item, tag) {
        itemSelect$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.itemClick = function (item, tag) {
        itemClick$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.resetItem = function (item) {
        var _this = this;
        item.selected = false;
        item.children && item.children.forEach(function (child) {
            _this.resetItem(child);
        });
    };
    NbMenuInternalService.prototype.isParent = function (parent, child) {
        return child.parent
            ? child.parent === parent || this.isParent(parent, child.parent)
            : false;
    };
    NbMenuInternalService.prototype.collapseItem = function (item, tag, except) {
        var _this = this;
        if (except && (item === except || this.isParent(item, except))) {
            return;
        }
        var wasExpanded = item.expanded;
        item.expanded = false;
        if (wasExpanded) {
            this.submenuToggle(item);
        }
        item.children && item.children.forEach(function (child) { return _this.collapseItem(child, tag); });
    };
    NbMenuInternalService.prototype.applyDefaults = function (item, defaultItem) {
        var _this = this;
        var menuItem = __assign({}, item);
        Object.assign(item, defaultItem, menuItem);
        item.children && item.children.forEach(function (child) {
            _this.applyDefaults(child, defaultItem);
        });
    };
    NbMenuInternalService.prototype.setParent = function (item) {
        var _this = this;
        item.children && item.children.forEach(function (child) {
            child.parent = item;
            _this.setParent(child);
        });
    };
    NbMenuInternalService.prototype.selectItem = function (item, tag) {
        item.selected = true;
        this.itemSelect(item, tag);
        this.selectParent(item, tag);
    };
    NbMenuInternalService.prototype.selectParent = function (_a, tag) {
        var item = _a.parent;
        if (!item) {
            return;
        }
        if (!item.expanded) {
            item.expanded = true;
            this.submenuToggle(item, tag);
        }
        item.selected = true;
        this.selectParent(item, tag);
    };
    NbMenuInternalService.prototype.selectItemByUrl = function (item, tag) {
        var wasSelected = item.selected;
        var isSelected = this.selectedInUrl(item);
        if (!wasSelected && isSelected) {
            this.selectItem(item, tag);
        }
        if (item.children) {
            this.updateSelection(item.children, tag);
        }
    };
    NbMenuInternalService.prototype.selectedInUrl = function (item) {
        var exact = item.pathMatch === 'full';
        return exact
            ? isUrlPathEqual(this.location.path(), item.link)
            : isUrlPathContain(this.location.path(), item.link);
    };
    NbMenuInternalService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbMenuInternalService.ctorParameters = function () { return [
        { type: _angular_common.Location, },
    ]; };
    return NbMenuInternalService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function sumSubmenuHeight(item) {
    return item.expanded
        ? (item.subMenuHeight || 0) + item.children.filter(function (c) { return c.children; }).reduce(function (acc, c) { return acc + sumSubmenuHeight(c); }, 0)
        : 0;
}
var NbMenuItemComponent = /** @class */ (function () {
    function NbMenuItemComponent(menuService, platformId, changeDetection) {
        this.menuService = menuService;
        this.platformId = platformId;
        this.changeDetection = changeDetection;
        this.menuItem = null;
        this.hoverItem = new _angular_core.EventEmitter();
        this.toggleSubMenu = new _angular_core.EventEmitter();
        this.selectItem = new _angular_core.EventEmitter();
        this.itemClick = new _angular_core.EventEmitter();
        this.alive = true;
        this.maxHeight = 0;
    }
    NbMenuItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subMenu.changes
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            _this.updateSubmenuHeight();
            _this.updateMaxHeight();
        });
        this.menuService.onSubmenuToggle()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.updateMaxHeight(); });
        this.updateSubmenuHeight();
        this.updateMaxHeight();
        this.changeDetection.detectChanges();
    };
    NbMenuItemComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuItemComponent.prototype.updateSubmenuHeight = function () {
        if (_angular_common.isPlatformBrowser(this.platformId)) {
            this.menuItem.subMenuHeight = this.subMenu.reduce(function (acc, c) { return acc + getElementHeight(c.nativeElement); }, 0);
        }
    };
    NbMenuItemComponent.prototype.updateMaxHeight = function () {
        this.maxHeight = sumSubmenuHeight(this.menuItem);
    };
    NbMenuItemComponent.prototype.onToggleSubMenu = function (item) {
        this.toggleSubMenu.emit(item);
    };
    NbMenuItemComponent.prototype.onHoverItem = function (item) {
        this.hoverItem.emit(item);
    };
    NbMenuItemComponent.prototype.onSelectItem = function (item) {
        this.selectItem.emit(item);
    };
    NbMenuItemComponent.prototype.onItemClick = function (item) {
        this.itemClick.emit(item);
    };
    NbMenuItemComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[nbMenuItem]',
                    template: "<span *ngIf=\"menuItem.group\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> {{ menuItem.title }} </span> <a *ngIf=\"menuItem.link && !menuItem.url && !menuItem.children && !menuItem.group\" [routerLink]=\"menuItem.link\" [queryParams]=\"menuItem.queryParams\" [fragment]=\"menuItem.fragment\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"menuItem.url && !menuItem.children && !menuItem.link && !menuItem.group\" [attr.href]=\"menuItem.url\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" (click)=\"onSelectItem(menuItem)\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"!menuItem.children && !menuItem.link && !menuItem.url && !menuItem.group\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" (click)=\"$event.preventDefault(); onItemClick(menuItem);\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"menuItem.children\" (click)=\"$event.preventDefault(); onToggleSubMenu(menuItem);\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" href=\"#\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> <i class=\"ion chevron\" [class.ion-chevron-left]=\"!menuItem.expanded\" [class.ion-chevron-down]=\"menuItem.expanded\"></i> </a> <ul *ngIf=\"menuItem.children\" [class.collapsed]=\"!(menuItem.children && menuItem.expanded)\" [class.expanded]=\"menuItem.expanded\" class=\"menu-items\" [style.max-height.px]=\"maxHeight\"> <ng-container *ngFor=\"let item of menuItem.children\"> <li nbMenuItem *ngIf=\"!item.hidden\" [menuItem]=\"item\" [class.menu-group]=\"item.group\" (hoverItem)=\"onHoverItem($event)\" (toggleSubMenu)=\"onToggleSubMenu($event)\" (selectItem)=\"onSelectItem($event)\" (itemClick)=\"onItemClick($event)\" class=\"menu-item\"> </li> </ng-container> </ul> ",
                },] },
    ];
    /** @nocollapse */
    NbMenuItemComponent.ctorParameters = function () { return [
        { type: NbMenuService, },
        { type: Object, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID,] },] },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    NbMenuItemComponent.propDecorators = {
        "menuItem": [{ type: _angular_core.Input },],
        "hoverItem": [{ type: _angular_core.Output },],
        "toggleSubMenu": [{ type: _angular_core.Output },],
        "selectItem": [{ type: _angular_core.Output },],
        "itemClick": [{ type: _angular_core.Output },],
        "subMenu": [{ type: _angular_core.ViewChildren, args: [NbMenuItemComponent, { read: _angular_core.ElementRef },] },],
    };
    return NbMenuItemComponent;
}());
/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * @example Basic usage
 *
 * ```
 * // ...
 * menuItems: NbMenuItem[] = [{ title: home, link: '/' }, { title: dashboard, link: 'dashboard' }];
 * // ...
 * <nb-menu [items]="menuItems"></nb-menu>
 * ```
 *
 * @styles
 *
 * menu-font-family:
 * menu-font-size:
 * menu-font-weight:
 * menu-fg:
 * menu-bg:
 * menu-active-fg:
 * menu-active-bg:
 * menu-active-font-weight:
 * menu-submenu-bg:
 * menu-submenu-fg:
 * menu-submenu-active-fg:
 * menu-submenu-active-bg:
 * menu-submenu-active-border-color:
 * menu-submenu-active-shadow:
 * menu-submenu-hover-fg:
 * menu-submenu-hover-bg:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-container-padding:
 * menu-submenu-padding:
 * menu-group-font-weight:
 * menu-group-font-size:
 * menu-group-fg:
 * menu-group-padding
 * menu-item-padding:
 * menu-item-separator:
 * menu-icon-font-size:
 * menu-icon-margin:
 * menu-icon-color:
 * menu-icon-active-color:
 */
var NbMenuComponent = /** @class */ (function () {
    function NbMenuComponent(window, menuInternalService, router) {
        this.window = window;
        this.menuInternalService = menuInternalService;
        this.router = router;
        this.alive = true;
        this.autoCollapseValue = false;
    }
    Object.defineProperty(NbMenuComponent.prototype, "inverse", {
        set: /**
           * Makes colors inverse based on current theme
           * @type boolean
           */
        function (val) {
            this.inverseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbMenuComponent.prototype, "autoCollapse", {
        set: /**
           * Collapse all opened submenus on the toggle event
           * Default value is "false"
           * @type boolean
           */
        function (val) {
            this.autoCollapseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuInternalService
            .onAddItem()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) { return _this.onAddItem(data); });
        this.menuInternalService
            .onNavigateHome()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function () { return _this.navigateHome(); });
        this.menuInternalService
            .onGetSelectedItem()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) {
            data.listener.next({ tag: _this.tag, item: _this.getSelectedItem(_this.items) });
        });
        this.router.events
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (event) { return event instanceof _angular_router.NavigationEnd; }))
            .subscribe(function () {
            _this.menuInternalService.resetItems(_this.items);
            _this.menuInternalService.updateSelection(_this.items, _this.tag, _this.autoCollapseValue);
        });
        // TODO: this probably won't work if you pass items dynamically into items input
        this.menuInternalService.prepareItems(this.items);
        (_a = this.items).push.apply(_a, this.menuInternalService.getItems());
        var _a;
    };
    NbMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.menuInternalService.updateSelection(_this.items, _this.tag); });
    };
    NbMenuComponent.prototype.onAddItem = function (data) {
        (_a = this.items).push.apply(_a, data.items);
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue);
        var _a;
    };
    NbMenuComponent.prototype.onHoverItem = function (item) {
        this.menuInternalService.itemHover(item, this.tag);
    };
    NbMenuComponent.prototype.onToggleSubMenu = function (item) {
        if (this.autoCollapseValue) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    };
    // TODO: is not fired on page reload
    // TODO: is not fired on page reload
    NbMenuComponent.prototype.onSelectItem = 
    // TODO: is not fired on page reload
    function (item) {
        this.menuInternalService.resetItems(this.items);
        this.menuInternalService.selectItem(item, this.tag);
    };
    NbMenuComponent.prototype.onItemClick = function (item) {
        this.menuInternalService.itemClick(item, this.tag);
    };
    NbMenuComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuComponent.prototype.navigateHome = function () {
        var homeItem = this.getHomeItem(this.items);
        if (homeItem) {
            if (homeItem.link) {
                this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
            }
            if (homeItem.url) {
                this.window.location.href = homeItem.url;
            }
        }
    };
    NbMenuComponent.prototype.getHomeItem = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.home) {
                return item;
            }
            var homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
    };
    NbMenuComponent.prototype.compareTag = function (tag) {
        return !tag || tag === this.tag;
    };
    NbMenuComponent.prototype.getSelectedItem = function (items) {
        var _this = this;
        var selected = null;
        items.forEach(function (item) {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = _this.getSelectedItem(item.children);
            }
        });
        return selected;
    };
    NbMenuComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-menu',
                    styles: [":host /deep/ {display:block}:host /deep/ .menu-items,:host /deep/ .menu-item>.menu-items{list-style-type:none;overflow:hidden;transition:max-height 0.3s ease-in}:host /deep/ .menu-item a{display:flex;color:inherit;text-decoration:none;align-items:center}:host /deep/ .menu-item a .menu-title{flex:1}[dir=rtl] :host /deep/ .menu-item a .menu-title{text-align:right} "],
                    template: "\n    <ul class=\"menu-items\">\n      <ng-container *ngFor=\"let item of items\">\n        <li nbMenuItem *ngIf=\"!item.hidden\"\n            [menuItem]=\"item\"\n            [class.menu-group]=\"item.group\"\n            (hoverItem)=\"onHoverItem($event)\"\n            (toggleSubMenu)=\"onToggleSubMenu($event)\"\n            (selectItem)=\"onSelectItem($event)\"\n            (itemClick)=\"onItemClick($event)\"\n            class=\"menu-item\">\n        </li>\n      </ng-container>\n    </ul>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbMenuComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_WINDOW,] },] },
        { type: NbMenuInternalService, },
        { type: _angular_router.Router, },
    ]; };
    NbMenuComponent.propDecorators = {
        "inverseValue": [{ type: _angular_core.HostBinding, args: ['class.inverse',] },],
        "tag": [{ type: _angular_core.Input },],
        "items": [{ type: _angular_core.Input },],
        "inverse": [{ type: _angular_core.Input },],
        "autoCollapse": [{ type: _angular_core.Input },],
    };
    return NbMenuComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];
var NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];
var NbMenuModule = /** @class */ (function () {
    function NbMenuModule() {
    }
    NbMenuModule.forRoot = function () {
        return {
            ngModule: NbMenuModule,
            providers: NB_MENU_PROVIDERS.slice(),
        };
    };
    NbMenuModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [NbSharedModule],
                    declarations: nbMenuComponents.slice(),
                    exports: nbMenuComponents.slice(),
                },] },
    ];
    return NbMenuModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Route tabset components.
 * Renders tabs inside of a router-outlet.
 *
 * @example basic usage example
 *
 * ```
 *  tabs = [
 *  {
 *    title: 'Route tab #1',
 *    route: '/pages/description',
 *  },
 *  {
 *    title: 'Route tab #2',
 *    route: '/pages/images',
 *    }
 *  ];
 *
 *  <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
 * ```
 *
 * @styles
 *
 * route-tabs-font-family:
 * route-tabs-font-size:
 * route-tabs-active-bg:
 * route-tabs-active-font-weight:
 * route-tabs-padding:
 * route-tabs-header-bg:
 * route-tabs-separator:
 * route-tabs-fg:
 * route-tabs-fg-heading:
 * route-tabs-bg:
 * route-tabs-selected:
 */
var NbRouteTabsetComponent = /** @class */ (function () {
    function NbRouteTabsetComponent(router) {
        this.router = router;
        this.fullWidthValue = false;
        /**
           * Emits when tab is selected
           * @type {EventEmitter<any>}
           */
        this.changeTab = new _angular_core.EventEmitter();
    }
    Object.defineProperty(NbRouteTabsetComponent.prototype, "fullWidth", {
        set: /**
           * Take full width of a parent
           * @param {boolean} val
           */
        function (val) {
            this.fullWidthValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbRouteTabsetComponent.prototype.selectTab = function (tab) {
        this.changeTab.emit(tab);
        this.router.navigate([tab.route]);
    };
    NbRouteTabsetComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-route-tabset',
                    styles: ["ul{display:flex;flex-direction:row;list-style-type:none;margin:0}ul li{cursor:pointer;margin-bottom:-1px;text-align:center}ul li.active a::before{display:block}ul li a{position:relative;text-decoration:none;display:inline-block}ul li a::before{display:none;position:absolute;content:'';width:100%;height:6px;border-radius:3px;bottom:-2px;left:0}:host.full-width ul{justify-content:space-around} "],
                    template: "\n    <ul>\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"$event.preventDefault(); selectTab(tab)\"\n          routerLink=\"{{tab.route}}\"\n          routerLinkActive=\"active\"\n          [routerLinkActiveOptions]=\"{ exact: true }\">\n        <a href>{{tab.title}}</a>\n      </li>\n    </ul>\n    <router-outlet></router-outlet>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbRouteTabsetComponent.ctorParameters = function () { return [
        { type: _angular_router.Router, },
    ]; };
    NbRouteTabsetComponent.propDecorators = {
        "fullWidthValue": [{ type: _angular_core.HostBinding, args: ['class.full-width',] },],
        "tabs": [{ type: _angular_core.Input },],
        "fullWidth": [{ type: _angular_core.Input },],
        "changeTab": [{ type: _angular_core.Output },],
    };
    return NbRouteTabsetComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbRouteTabsetModule = /** @class */ (function () {
    function NbRouteTabsetModule() {
    }
    NbRouteTabsetModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: [
                        NbRouteTabsetComponent,
                    ],
                    exports: [
                        NbRouteTabsetComponent,
                    ],
                },] },
    ];
    return NbRouteTabsetModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Sidebar service.
 *
 * Root module service to control the sidebar from any part of the app.
 */
var NbSidebarService = /** @class */ (function () {
    function NbSidebarService() {
        this.toggle$ = new rxjs.Subject();
        this.expand$ = new rxjs.Subject();
        this.collapse$ = new rxjs.Subject();
    }
    /**
     * Subscribe to toggle events
     *
     * @returns Observable<{ compact: boolean, tag: string }>
     */
    /**
       * Subscribe to toggle events
       *
       * @returns Observable<{ compact: boolean, tag: string }>
       */
    NbSidebarService.prototype.onToggle = /**
       * Subscribe to toggle events
       *
       * @returns Observable<{ compact: boolean, tag: string }>
       */
    function () {
        return this.toggle$.pipe(rxjs_operators.share());
    };
    /**
     * Subscribe to expand events
     * @returns Observable<{ tag: string }>
     */
    /**
       * Subscribe to expand events
       * @returns Observable<{ tag: string }>
       */
    NbSidebarService.prototype.onExpand = /**
       * Subscribe to expand events
       * @returns Observable<{ tag: string }>
       */
    function () {
        return this.expand$.pipe(rxjs_operators.share());
    };
    /**
     * Subscribe to collapse evens
     * @returns Observable<{ tag: string }>
     */
    /**
       * Subscribe to collapse evens
       * @returns Observable<{ tag: string }>
       */
    NbSidebarService.prototype.onCollapse = /**
       * Subscribe to collapse evens
       * @returns Observable<{ tag: string }>
       */
    function () {
        return this.collapse$.pipe(rxjs_operators.share());
    };
    /**
     * Toggle a sidebar
     * @param {boolean} compact
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    /**
       * Toggle a sidebar
       * @param {boolean} compact
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    NbSidebarService.prototype.toggle = /**
       * Toggle a sidebar
       * @param {boolean} compact
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    function (compact, tag) {
        if (compact === void 0) { compact = false; }
        this.toggle$.next({ compact: compact, tag: tag });
    };
    /**
     * Expands a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    /**
       * Expands a sidebar
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    NbSidebarService.prototype.expand = /**
       * Expands a sidebar
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    function (tag) {
        this.expand$.next({ tag: tag });
    };
    /**
     * Collapses a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    /**
       * Collapses a sidebar
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    NbSidebarService.prototype.collapse = /**
       * Collapses a sidebar
       * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
       * to specify which sidebar you want to control
       */
    function (tag) {
        this.collapse$.next({ tag: tag });
    };
    NbSidebarService.decorators = [
        { type: _angular_core.Injectable },
    ];
    return NbSidebarService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
var NbSidebarHeaderComponent = /** @class */ (function () {
    function NbSidebarHeaderComponent() {
    }
    NbSidebarHeaderComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-sidebar-header',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    return NbSidebarHeaderComponent;
}());
/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
var NbSidebarFooterComponent = /** @class */ (function () {
    function NbSidebarFooterComponent() {
    }
    NbSidebarFooterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-sidebar-footer',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    return NbSidebarFooterComponent;
}());
/**
 * Layout sidebar component.
 *
 * Sidebar can be placed on the left or the right side of the layout,
 * or on start or end position of layout (depends on document direction, left to right or right to left)
 * It can be fixed (shown above the content) or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * @example Minimal sidebar example
 *
 * ```
 * <nb-sidebar>
 *   Sidebar content.
 * </nb-sidebar>
 * ```
 *
 * @example Example of fixed sidebar located on the left side, initially collapsed.
 *
 * ```
 * <nb-sidebar left fixed state="collapsed">
 *  <nb-sidebar-header>Header</nb-sidebar-header>
 *
 *    Sidebar content, menu or another component here.
 *
 *  <nb-sidebar-footer>
 *    Footer components here
 *  </nb-sidebar-footer>
 * </nb-sidebar>
 * ```
 *
 * @styles
 *
 * sidebar-font-size: Sidebar content font size
 * sidebar-line-height: Sidebar content line height
 * sidebar-fg: Foreground color
 * sidebar-bg: Background color
 * sidebar-height: Content height
 * sidebar-width: Expanded width
 * sidebar-width-compact: Compacted width
 * sidebar-padding: Sidebar content padding
 * sidebar-header-height: Sidebar header height
 * sidebar-footer-height: Sidebar footer height
 * sidebar-shadow: Sidebar container shadow
 *
 */
var NbSidebarComponent = /** @class */ (function () {
    function NbSidebarComponent(sidebarService, themeService, element) {
        this.sidebarService = sidebarService;
        this.themeService = themeService;
        this.element = element;
        this.responsiveValue = false;
        this.alive = true;
        this.fixedValue = false;
        this.rightValue = false;
        this.leftValue = true;
        this.startValue = false;
        this.endValue = false;
        this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;
    }
    Object.defineProperty(NbSidebarComponent.prototype, "expanded", {
        get: 
        // TODO: rename stateValue to state (take a look to the card component)
        function () {
            return this.stateValue === NbSidebarComponent.STATE_EXPANDED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "collapsed", {
        get: function () {
            return this.stateValue === NbSidebarComponent.STATE_COLLAPSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "compacted", {
        get: function () {
            return this.stateValue === NbSidebarComponent.STATE_COMPACTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "right", {
        set: /**
           * Places sidebar on the right side
           * @type {boolean}
           */
        function (val) {
            this.rightValue = convertToBoolProperty(val);
            this.leftValue = !this.rightValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "left", {
        set: /**
           * Places sidebar on the left side
           * @type {boolean}
           */
        function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.rightValue = !this.leftValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "start", {
        set: /**
           * Places sidebar on the start edge of layout
           * @type {boolean}
           */
        function (val) {
            this.startValue = convertToBoolProperty(val);
            this.endValue = !this.startValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "end", {
        set: /**
           * Places sidebar on the end edge of layout
           * @type {boolean}
           */
        function (val) {
            this.endValue = convertToBoolProperty(val);
            this.startValue = !this.endValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "fixed", {
        set: /**
           * Makes sidebar fixed (shown above the layout content)
           * @type {boolean}
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "state", {
        set: /**
           * Initial sidebar state, `expanded`|`collapsed`|`compacted`
           * @type {string}
           */
        function (val) {
            this.stateValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "responsive", {
        set: /**
           * Makes sidebar listen to media query events and change its behaviour
           * @type {boolean}
           */
        function (val) {
            this.responsiveValue = convertToBoolProperty(val);
            this.toggleResponsive(this.responsiveValue);
        },
        enumerable: true,
        configurable: true
    });
    NbSidebarComponent.prototype.toggleResponsive = function (enabled) {
        if (enabled) {
            this.mediaQuerySubscription = this.onMediaQueryChanges();
        }
        else if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    NbSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.onToggle()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.toggle(data.compact);
            }
        });
        this.sidebarService.onExpand()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.expand();
            }
        });
        this.sidebarService.onCollapse()
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.collapse();
            }
        });
    };
    NbSidebarComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    NbSidebarComponent.prototype.onClick = 
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    function (event) {
        var menu = this.element.nativeElement.querySelector('nb-menu');
        if (menu && menu.contains(event.target)) {
            var link = event.target;
            var linkChildren = ['span', 'i'];
            // if we clicked on span - get the link
            if (linkChildren.indexOf(link.tagName.toLowerCase()) !== -1 && link.parentNode) {
                link = event.target.parentNode;
            }
            // we only expand if an item has children
            if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
                this.expand();
            }
        }
    };
    /**
     * Collapses the sidebar
     */
    /**
       * Collapses the sidebar
       */
    NbSidebarComponent.prototype.collapse = /**
       * Collapses the sidebar
       */
    function () {
        this.state = NbSidebarComponent.STATE_COLLAPSED;
    };
    /**
     * Expands the sidebar
     */
    /**
       * Expands the sidebar
       */
    NbSidebarComponent.prototype.expand = /**
       * Expands the sidebar
       */
    function () {
        this.state = NbSidebarComponent.STATE_EXPANDED;
    };
    /**
     * Compacts the sidebar (minimizes)
     */
    /**
       * Compacts the sidebar (minimizes)
       */
    NbSidebarComponent.prototype.compact = /**
       * Compacts the sidebar (minimizes)
       */
    function () {
        this.state = NbSidebarComponent.STATE_COMPACTED;
    };
    /**
     * Toggles sidebar state (expanded|collapsed|compacted)
     * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
     * otherwise - between expanded & collapsed. False by default.
     *
     * @example Toggle sidebar state
     *
     * ```
     * this.sidebar.toggle(true);
     * ```
     */
    /**
       * Toggles sidebar state (expanded|collapsed|compacted)
       * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
       * otherwise - between expanded & collapsed. False by default.
       *
       * @example Toggle sidebar state
       *
       * ```
       * this.sidebar.toggle(true);
       * ```
       */
    NbSidebarComponent.prototype.toggle = /**
       * Toggles sidebar state (expanded|collapsed|compacted)
       * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
       * otherwise - between expanded & collapsed. False by default.
       *
       * @example Toggle sidebar state
       *
       * ```
       * this.sidebar.toggle(true);
       * ```
       */
    function (compact) {
        if (compact === void 0) { compact = false; }
        if (this.responsiveEnabled()) {
            if (this.responsiveState === NbSidebarComponent.RESPONSIVE_STATE_MOBILE) {
                compact = false;
            }
        }
        var closedStates = [NbSidebarComponent.STATE_COMPACTED, NbSidebarComponent.STATE_COLLAPSED];
        if (compact) {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COMPACTED;
        }
        else {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COLLAPSED;
        }
    };
    NbSidebarComponent.prototype.onMediaQueryChanges = function () {
        var _this = this;
        return this.themeService.onMediaQueryChange()
            .subscribe(function (_a) {
            var prev = _a[0], current = _a[1];
            // TODO: get width by the key and define only max width for the tablets and mobiles
            var tablet = ['xs', 'is', 'sm', 'md', 'lg'];
            var mobile = ['xs', 'is'];
            if (tablet.indexOf(current.name) !== -1) {
                _this.fixed = true;
                _this.compact();
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_TABLET;
            }
            if (mobile.indexOf(current.name) !== -1) {
                _this.collapse();
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_MOBILE;
            }
            if (tablet.indexOf(current.name) === -1 && prev.width < current.width) {
                _this.expand();
                _this.fixed = false;
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;
            }
        });
    };
    NbSidebarComponent.prototype.responsiveEnabled = function () {
        return this.responsiveValue;
    };
    NbSidebarComponent.STATE_EXPANDED = 'expanded';
    NbSidebarComponent.STATE_COLLAPSED = 'collapsed';
    NbSidebarComponent.STATE_COMPACTED = 'compacted';
    NbSidebarComponent.RESPONSIVE_STATE_MOBILE = 'mobile';
    NbSidebarComponent.RESPONSIVE_STATE_TABLET = 'tablet';
    NbSidebarComponent.RESPONSIVE_STATE_PC = 'pc';
    NbSidebarComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-sidebar',
                    styles: [":host{display:flex;flex-direction:column;overflow:hidden;z-index:auto;order:0}:host .scrollable{overflow-y:auto;overflow-x:hidden;flex:1}:host .main-container{position:fixed;transform:translate3d(0, 0, 0);display:flex;flex-direction:column}:host.right{margin-right:0;margin-left:auto}[dir=ltr] :host.right{order:4}[dir=rtl] :host.right{order:0}:host.end{order:4}[dir=ltr] :host.end{margin-right:0;margin-left:auto}[dir=rtl] :host.end{margin-left:0;margin-right:auto}:host.fixed{position:fixed;height:100%;z-index:999;top:0;bottom:0;left:0}:host.fixed.right{right:0}[dir=ltr] :host.fixed.start{left:0}[dir=rtl] :host.fixed.start{right:0}[dir=ltr] :host.fixed.end{right:0}[dir=rtl] :host.fixed.end{left:0}:host /deep/ nb-sidebar-footer{margin-top:auto;display:block}:host /deep/ nb-sidebar-header{display:block} "],
                    template: "\n    <div class=\"main-container\">\n      <ng-content select=\"nb-sidebar-header\"></ng-content>\n      <div class=\"scrollable\" (click)=\"onClick($event)\">\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"nb-sidebar-footer\"></ng-content>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbSidebarComponent.ctorParameters = function () { return [
        { type: NbSidebarService, },
        { type: NbThemeService, },
        { type: _angular_core.ElementRef, },
    ]; };
    NbSidebarComponent.propDecorators = {
        "fixedValue": [{ type: _angular_core.HostBinding, args: ['class.fixed',] },],
        "rightValue": [{ type: _angular_core.HostBinding, args: ['class.right',] },],
        "leftValue": [{ type: _angular_core.HostBinding, args: ['class.left',] },],
        "startValue": [{ type: _angular_core.HostBinding, args: ['class.start',] },],
        "endValue": [{ type: _angular_core.HostBinding, args: ['class.end',] },],
        "expanded": [{ type: _angular_core.HostBinding, args: ['class.expanded',] },],
        "collapsed": [{ type: _angular_core.HostBinding, args: ['class.collapsed',] },],
        "compacted": [{ type: _angular_core.HostBinding, args: ['class.compacted',] },],
        "right": [{ type: _angular_core.Input },],
        "left": [{ type: _angular_core.Input },],
        "start": [{ type: _angular_core.Input },],
        "end": [{ type: _angular_core.Input },],
        "fixed": [{ type: _angular_core.Input },],
        "state": [{ type: _angular_core.Input },],
        "responsive": [{ type: _angular_core.Input },],
        "tag": [{ type: _angular_core.Input },],
    };
    return NbSidebarComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_SIDEBAR_COMPONENTS = [
    NbSidebarComponent,
    NbSidebarFooterComponent,
    NbSidebarHeaderComponent,
];
var NB_SIDEBAR_PROVIDERS = [
    NbSidebarService,
];
var NbSidebarModule = /** @class */ (function () {
    function NbSidebarModule() {
    }
    NbSidebarModule.forRoot = function () {
        return {
            ngModule: NbSidebarModule,
            providers: NB_SIDEBAR_PROVIDERS.slice(),
        };
    };
    NbSidebarModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: NB_SIDEBAR_COMPONENTS.slice(),
                    exports: NB_SIDEBAR_COMPONENTS.slice(),
                },] },
    ];
    return NbSidebarModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Specific tab container.
 */
var NbTabComponent = /** @class */ (function () {
    function NbTabComponent() {
        this.activeValue = false;
        this.init = false;
    }
    Object.defineProperty(NbTabComponent.prototype, "active", {
        get: /**
           * Specifies active tab
           * @returns {boolean}
           */
        function () {
            return this.activeValue;
        },
        set: function (val) {
            this.activeValue = convertToBoolProperty(val);
            if (this.activeValue) {
                this.init = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTabComponent.prototype, "lazyLoad", {
        set: /**
           * Lazy load content before tab selection
           * @param {boolean} val
           */
        function (val) {
            this.init = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbTabComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-tab',
                    template: "\n    <ng-container *ngIf=\"init\">\n      <ng-content></ng-content>\n    </ng-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbTabComponent.propDecorators = {
        "tabTitle": [{ type: _angular_core.Input },],
        "route": [{ type: _angular_core.Input },],
        "activeValue": [{ type: _angular_core.HostBinding, args: ['class.content-active',] },],
        "active": [{ type: _angular_core.Input },],
        "lazyLoad": [{ type: _angular_core.Input },],
        "badgeText": [{ type: _angular_core.Input },],
        "badgeStatus": [{ type: _angular_core.Input },],
        "badgePosition": [{ type: _angular_core.Input },],
    };
    return NbTabComponent;
}());
// TODO: Combine tabset with route-tabset, so that we can:
// - have similar interface
// - easy to migrate from one to another
// - can mix them both (route/content tab)
/**
 *
 * Dynamic tabset component.
 * Renders `<nb-tab></ng-tab> containers inside.
 *
 * @example Basic tabset example
 *
 * ```
 * <nb-tabset>
 *  <nb-tab tabTitle="Simple Tab #1">
 *    Tab content 1
 *  </nb-tab>
 *  <nb-tab tabTitle="Simple Tab #2">
 *    Tab content 2
 *  </nb-tab>
 * </nb-tabset>
 *
 * @styles
 *
 * tabs-font-family:
 * tabs-font-size:
 * tabs-content-font-family:
 * tabs-content-font-size:
 * tabs-active-bg:
 * tabs-active-font-weight:
 * tabs-padding:
 * tabs-content-padding:
 * tabs-header-bg:
 * tabs-separator:
 * tabs-fg:
 * tabs-fg-text:
 * tabs-fg-heading:
 * tabs-bg:
 * tabs-selected:
 *
 ```
 */
var NbTabsetComponent = /** @class */ (function () {
    function NbTabsetComponent(route) {
        this.route = route;
        this.fullWidthValue = false;
        /**
           * Emits when tab is selected
           * @type EventEmitter<any>
           */
        this.changeTab = new _angular_core.EventEmitter();
    }
    Object.defineProperty(NbTabsetComponent.prototype, "fullWidth", {
        set: /**
           * Take full width of a parent
           * @param {boolean} val
           */
        function (val) {
            this.fullWidthValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbTabsetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var activeTab = _this.tabs.find(function (tab) { return _this.routeParam ? tab.route === params[_this.routeParam] : tab.active; });
            _this.selectTab(activeTab || _this.tabs.first);
        });
    };
    // TODO: navigate to routeParam
    // TODO: navigate to routeParam
    NbTabsetComponent.prototype.selectTab = 
    // TODO: navigate to routeParam
    function (selectedTab) {
        this.tabs.forEach(function (tab) { return tab.active = tab === selectedTab; });
        this.changeTab.emit(selectedTab);
    };
    NbTabsetComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-tabset',
                    styles: [":host{display:block}:host.full-width ul{justify-content:space-around}:host /deep/ nb-tab{flex:1;-ms-flex:1 1 auto;overflow:auto;display:none}:host /deep/ nb-tab.content-active{display:block}ul{display:flex;flex-direction:row;list-style-type:none;margin:0}ul li{cursor:pointer;margin-bottom:-1px;text-align:center;position:relative}ul li.active a::before{display:block}ul li a{position:relative;text-decoration:none;display:inline-block}ul li a::before{display:none;position:absolute;content:'';width:100%;height:6px;border-radius:3px;bottom:-2px;left:0} "],
                    template: "\n    <ul>\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"selectTab(tab)\"\n          [class.active]=\"tab.active\">\n        <a href (click)=\"$event.preventDefault()\">{{ tab.tabTitle }}</a>\n        <nb-badge *ngIf=\"tab.badgeText\"\n          [text]=\"tab.badgeText\"\n          [status]=\"tab.badgeStatus\"\n          [position]=\"tab.badgePosition\">\n        </nb-badge>\n      </li>\n    </ul>\n    <ng-content select=\"nb-tab\"></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbTabsetComponent.ctorParameters = function () { return [
        { type: _angular_router.ActivatedRoute, },
    ]; };
    NbTabsetComponent.propDecorators = {
        "tabs": [{ type: _angular_core.ContentChildren, args: [NbTabComponent,] },],
        "fullWidthValue": [{ type: _angular_core.HostBinding, args: ['class.full-width',] },],
        "fullWidth": [{ type: _angular_core.Input },],
        "routeParam": [{ type: _angular_core.Input },],
        "changeTab": [{ type: _angular_core.Output },],
    };
    return NbTabsetComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 *
 * @example Badge with default position and status(color):
 *
 * ```
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * @example Badge located on the bottom right with warning status:
 *
 * ```
 * <nb-badge text="badgeText" status="warning" position="bottom right">
 * </nb-badge>
 * ```
 *
 * @styles
 *
 * badge-fg-text:
 * badge-primary-bg-color:
 * badge-success-bg-color:
 * badge-info-bg-color:
 * badge-warning-bg-color:
 * badge-danger-bg-color:
 */
var NbBadgeComponent = /** @class */ (function () {
    function NbBadgeComponent(layoutDirectionService) {
        this.layoutDirectionService = layoutDirectionService;
        this.colorClass = NbBadgeComponent.STATUS_PRIMARY;
        /**
           * Text to display
           * @type string
           */
        this.text = '';
    }
    Object.defineProperty(NbBadgeComponent.prototype, "status", {
        set: /**
           * Badge status (adds specific styles):
           * 'primary', 'info', 'success', 'warning', 'danger'
           * @param {string} val
           * @type string
           */
        function (value) {
            if (value) {
                this.colorClass = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "positionClass", {
        get: function () {
            if (!this.position) {
                return NbBadgeComponent.TOP_RIGHT;
            }
            var isLtr = this.layoutDirectionService.isLtr();
            var startValue = isLtr ? 'left' : 'right';
            var endValue = isLtr ? 'right' : 'left';
            return this.position
                .replace(/\bstart\b/, startValue)
                .replace(/\bend\b/, endValue);
        },
        enumerable: true,
        configurable: true
    });
    NbBadgeComponent.TOP_LEFT = 'top left';
    NbBadgeComponent.TOP_RIGHT = 'top right';
    NbBadgeComponent.BOTTOM_LEFT = 'bottom left';
    NbBadgeComponent.BOTTOM_RIGHT = 'bottom right';
    NbBadgeComponent.TOP_START = 'top start';
    NbBadgeComponent.TOP_END = 'top end';
    NbBadgeComponent.BOTTOM_START = 'bottom start';
    NbBadgeComponent.BOTTOM_END = 'bottom end';
    NbBadgeComponent.STATUS_PRIMARY = 'primary';
    NbBadgeComponent.STATUS_INFO = 'info';
    NbBadgeComponent.STATUS_SUCCESS = 'success';
    NbBadgeComponent.STATUS_WARNING = 'warning';
    NbBadgeComponent.STATUS_DANGER = 'danger';
    NbBadgeComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-badge',
                    styles: [":host .nb-badge{position:absolute;padding:0.25em 0.4em;font-size:75%;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:0.25rem}:host .nb-badge.top{top:0}:host .nb-badge.right{right:0}:host .nb-badge.bottom{bottom:0}:host .nb-badge.left{left:0} "],
                    template: "\n    <span class=\"nb-badge {{positionClass}} nb-badge-{{colorClass}}\">{{text}}</span>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbBadgeComponent.ctorParameters = function () { return [
        { type: NbLayoutDirectionService, },
    ]; };
    NbBadgeComponent.propDecorators = {
        "text": [{ type: _angular_core.Input },],
        "position": [{ type: _angular_core.Input },],
        "status": [{ type: _angular_core.Input },],
    };
    return NbBadgeComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbBadgeModule = /** @class */ (function () {
    function NbBadgeModule() {
    }
    NbBadgeModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    exports: [NbBadgeComponent],
                    declarations: [NbBadgeComponent],
                },] },
    ];
    return NbBadgeModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_TABSET_COMPONENTS = [
    NbTabsetComponent,
    NbTabComponent,
];
var NbTabsetModule = /** @class */ (function () {
    function NbTabsetModule() {
    }
    NbTabsetModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                        NbBadgeModule,
                    ],
                    declarations: NB_TABSET_COMPONENTS.slice(),
                    exports: NB_TABSET_COMPONENTS.slice(),
                },] },
    ];
    return NbTabsetModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 *
 * Can be used as a user profile link.
 *
 * @styles
 *
 * user-font-size:
 * user-line-height:
 * user-bg:
 * user-fg:
 * user-fg-highlight:
 * user-font-family-secondary:
 * user-size-small:
 * user-size-medium:
 * user-size-large:
 * user-size-xlarge:
 */
var NbUserComponent = /** @class */ (function () {
    function NbUserComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
        /**
           * Specifies a name to be shown on the right of a user picture
           * @type string
           */
        this.name = 'Anonymous';
        this.showNameValue = true;
        this.showTitleValue = true;
        this.showInitialsValue = true;
        this.isMenuShown = false;
    }
    Object.defineProperty(NbUserComponent.prototype, "small", {
        get: function () {
            return this.sizeValue === NbUserComponent.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "medium", {
        get: function () {
            return this.sizeValue === NbUserComponent.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "large", {
        get: function () {
            return this.sizeValue === NbUserComponent.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "xlarge", {
        get: function () {
            return this.sizeValue === NbUserComponent.SIZE_XLARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "picture", {
        set: /**
           * Absolute path to a user picture. Or base64 image
           * User name initials (JD for John Doe) will be shown if no picture specified
           * @type string
           */
        function (value) {
            this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle("url(" + value + ")") : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "size", {
        set: /**
           * Size of the component, small|medium|large
           * @type string
           */
        function (val) {
            this.sizeValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showName", {
        set: /**
           * Whether to show a user name or not
           * @type boolean
           */
        function (val) {
            this.showNameValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showTitle", {
        set: /**
           * Whether to show a user title or not
           * @type boolean
           */
        function (val) {
            this.showTitleValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showInitials", {
        set: /**
           * Whether to show a user initials (if no picture specified) or not
           * @type boolean
           */
        function (val) {
            this.showInitialsValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "onlyPicture", {
        set: /**
           * Whether to show only a picture or also show the name and title
           * @type boolean
           */
        function (val) {
            this.showNameValue = this.showTitleValue = !convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "inverse", {
        set: /**
           * Makes colors inverse based on current theme
           * @type boolean
           */
        function (val) {
            this.inverseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbUserComponent.prototype.getInitials = function () {
        if (this.name) {
            var names = this.name.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    };
    // TODO: it makes sense use object instead of list of variables (or even enum)
    /*
        static readonly SIZE = {
         SMALL: 'small',
         MEDIUM: 'medium',
         LARGE: 'large',
        };
       */
    NbUserComponent.SIZE_SMALL = 'small';
    NbUserComponent.SIZE_MEDIUM = 'medium';
    NbUserComponent.SIZE_LARGE = 'large';
    NbUserComponent.SIZE_XLARGE = 'xlarge';
    NbUserComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-user',
                    styles: [":host{display:flex}:host .user-container{position:relative;display:flex;align-items:center}:host .user-picture{position:relative;border-radius:50%;flex-shrink:0}:host .user-picture.image{background-size:cover;background-repeat:no-repeat}:host .user-picture.background{display:flex;align-items:center;justify-content:center}:host .user-title{font-size:0.75rem}[dir=rtl] :host .user-name,[dir=rtl] :host .user-title{text-align:right}[dir=ltr] :host .info-container{margin-left:.5rem}[dir=rtl] :host .info-container{margin-right:.5rem} "],
                    template: "<div class=\"user-container\"> <div *ngIf=\"imageBackgroundStyle\" class=\"user-picture image\" [style.background-image]=\"imageBackgroundStyle\"> <nb-badge *ngIf=\"badgeText\" [text]=\"badgeText\" [status]=\"badgeStatus\" [position]=\"badgePosition\"></nb-badge> </div> <div *ngIf=\"!imageBackgroundStyle\" class=\"user-picture background\" [style.background-color]=\"color\"> <ng-container *ngIf=\"showInitialsValue\"> {{ getInitials() }} </ng-container> <nb-badge *ngIf=\"badgeText\" [text]=\"badgeText\" [status]=\"badgeStatus\" [position]=\"badgePosition\"></nb-badge> </div> <div class=\"info-container\"> <div *ngIf=\"showNameValue && name\" class=\"user-name\">{{ name }}</div> <div *ngIf=\"showTitleValue && title\" class=\"user-title\">{{ title }}</div> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    NbUserComponent.ctorParameters = function () { return [
        { type: _angular_platformBrowser.DomSanitizer, },
    ]; };
    NbUserComponent.propDecorators = {
        "inverseValue": [{ type: _angular_core.HostBinding, args: ['class.inverse',] },],
        "small": [{ type: _angular_core.HostBinding, args: ['class.small',] },],
        "medium": [{ type: _angular_core.HostBinding, args: ['class.medium',] },],
        "large": [{ type: _angular_core.HostBinding, args: ['class.large',] },],
        "xlarge": [{ type: _angular_core.HostBinding, args: ['class.xlarge',] },],
        "name": [{ type: _angular_core.Input },],
        "title": [{ type: _angular_core.Input },],
        "picture": [{ type: _angular_core.Input },],
        "color": [{ type: _angular_core.Input },],
        "size": [{ type: _angular_core.Input },],
        "showName": [{ type: _angular_core.Input },],
        "showTitle": [{ type: _angular_core.Input },],
        "showInitials": [{ type: _angular_core.Input },],
        "onlyPicture": [{ type: _angular_core.Input },],
        "inverse": [{ type: _angular_core.Input },],
        "badgeText": [{ type: _angular_core.Input },],
        "badgeStatus": [{ type: _angular_core.Input },],
        "badgePosition": [{ type: _angular_core.Input },],
    };
    return NbUserComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_USER_COMPONENTS = [
    NbUserComponent,
];
var NbUserModule = /** @class */ (function () {
    function NbUserModule() {
    }
    NbUserModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                        NbBadgeModule,
                    ],
                    declarations: NB_USER_COMPONENTS.slice(),
                    exports: NB_USER_COMPONENTS.slice(),
                },] },
    ];
    return NbUserModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
var NbActionComponent = /** @class */ (function () {
    function NbActionComponent() {
        this.disabledValue = false;
    }
    Object.defineProperty(NbActionComponent.prototype, "disabled", {
        set: /**
           * Disables the item (changes item opacity and mouse cursor)
           * @type boolean
           */
        function (val) {
            this.disabledValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbActionComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-action',
                    template: "\n    <a class=\"icon-container\" href=\"#\" *ngIf=\"icon; else showContent\" (click)=\"$event.preventDefault()\">\n      <i class=\"control-icon {{ icon }}\"></i>\n    </a>\n    <ng-template #showContent>\n      <ng-content></ng-content>\n    </ng-template>\n    <nb-badge *ngIf=\"badgeText\" [text]=\"badgeText\" [status]=\"badgeStatus\" [position]=\"badgePosition\"></nb-badge>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbActionComponent.propDecorators = {
        "disabledValue": [{ type: _angular_core.HostBinding, args: ['class.disabled',] },],
        "icon": [{ type: _angular_core.Input },],
        "disabled": [{ type: _angular_core.Input },],
        "badgeText": [{ type: _angular_core.Input },],
        "badgeStatus": [{ type: _angular_core.Input },],
        "badgePosition": [{ type: _angular_core.Input },],
    };
    return NbActionComponent;
}());
/**
 * Shows a horizontal list of actions, available in multiple sizes
 * Aligns items vertically.
 *
 * @styles
 *
 * actions-font-size:
 * actions-font-family:
 * actions-line-height:
 * actions-fg:
 * actions-bg:
 * actions-separator:
 * actions-padding:
 * actions-size-small:
 * actions-size-medium:
 * actions-size-large:
 */
var NbActionsComponent = /** @class */ (function () {
    function NbActionsComponent() {
        this.fullWidthValue = false;
    }
    Object.defineProperty(NbActionsComponent.prototype, "small", {
        get: function () {
            return this.sizeValue === NbActionsComponent.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "medium", {
        get: function () {
            return this.sizeValue === NbActionsComponent.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "large", {
        get: function () {
            return this.sizeValue === NbActionsComponent.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "size", {
        set: /**
           * Size of the component, small|medium|large
           * @type string
           */
        function (val) {
            this.sizeValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "inverse", {
        set: /**
           * Makes colors inverse based on current theme
           * @type boolean
           */
        function (val) {
            this.inverseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "fullWidth", {
        set: /**
           * Component will fill full width of the container
           * @type boolean
           */
        function (val) {
            this.fullWidthValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbActionsComponent.SIZE_SMALL = 'small';
    NbActionsComponent.SIZE_MEDIUM = 'medium';
    NbActionsComponent.SIZE_LARGE = 'large';
    NbActionsComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-actions',
                    styles: [":host{display:flex;align-items:center}:host /deep/ nb-action{display:flex;flex-wrap:wrap;align-items:center;position:relative}:host /deep/ nb-action i.control-icon:hover{cursor:pointer}:host /deep/ nb-action.disabled{cursor:not-allowed}:host /deep/ nb-action.disabled>*{opacity:0.5}:host /deep/ nb-action.disabled a,:host /deep/ nb-action.disabled i{cursor:not-allowed !important} "],
                    template: "\n    <ng-content select=\"nb-action\"></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbActionsComponent.propDecorators = {
        "inverseValue": [{ type: _angular_core.HostBinding, args: ['class.inverse',] },],
        "small": [{ type: _angular_core.HostBinding, args: ['class.small',] },],
        "medium": [{ type: _angular_core.HostBinding, args: ['class.medium',] },],
        "large": [{ type: _angular_core.HostBinding, args: ['class.large',] },],
        "fullWidthValue": [{ type: _angular_core.HostBinding, args: ['class.full-width',] },],
        "size": [{ type: _angular_core.Input },],
        "inverse": [{ type: _angular_core.Input },],
        "fullWidth": [{ type: _angular_core.Input },],
    };
    return NbActionsComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_ACTIONS_COMPONENTS = [
    NbActionComponent,
    NbActionsComponent,
];
var NbActionsModule = /** @class */ (function () {
    function NbActionsModule() {
    }
    NbActionsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                        NbBadgeModule,
                    ],
                    declarations: NB_ACTIONS_COMPONENTS.slice(),
                    exports: NB_ACTIONS_COMPONENTS.slice(),
                },] },
    ];
    return NbActionsModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Search component service, connects you code to a page-level search component.
 */
var NbSearchService = /** @class */ (function () {
    function NbSearchService() {
        this.searchSubmittings$ = new rxjs.Subject();
        this.searchActivations$ = new rxjs.Subject();
        this.searchDeactivations$ = new rxjs.Subject();
    }
    /***
     * Activate (open) search component
     * @param {string} searchType
     * @param {string} tag
     */
    /***
       * Activate (open) search component
       * @param {string} searchType
       * @param {string} tag
       */
    NbSearchService.prototype.activateSearch = /***
       * Activate (open) search component
       * @param {string} searchType
       * @param {string} tag
       */
    function (searchType, tag) {
        this.searchActivations$.next({ searchType: searchType, tag: tag });
    };
    /**
     * Deactibate (close) search component
     * @param {string} searchType
     * @param {string} tag
     */
    /**
       * Deactibate (close) search component
       * @param {string} searchType
       * @param {string} tag
       */
    NbSearchService.prototype.deactivateSearch = /**
       * Deactibate (close) search component
       * @param {string} searchType
       * @param {string} tag
       */
    function (searchType, tag) {
        this.searchDeactivations$.next({ searchType: searchType, tag: tag });
    };
    /**
     * Trigger search submit
     * @param {string} term
     * @param {string} tag
     */
    /**
       * Trigger search submit
       * @param {string} term
       * @param {string} tag
       */
    NbSearchService.prototype.submitSearch = /**
       * Trigger search submit
       * @param {string} term
       * @param {string} tag
       */
    function (term, tag) {
        this.searchSubmittings$.next({ term: term, tag: tag });
    };
    /**
     * Subscribe to 'activate' event
     * @returns Observable<{searchType: string; tag?: string}>
     */
    /**
       * Subscribe to 'activate' event
       * @returns Observable<{searchType: string; tag?: string}>
       */
    NbSearchService.prototype.onSearchActivate = /**
       * Subscribe to 'activate' event
       * @returns Observable<{searchType: string; tag?: string}>
       */
    function () {
        return this.searchActivations$.pipe(rxjs_operators.share());
    };
    /**
     * Subscribe to 'deactivate' event
     * @returns Observable<{searchType: string; tag?: string}>
     */
    /**
       * Subscribe to 'deactivate' event
       * @returns Observable<{searchType: string; tag?: string}>
       */
    NbSearchService.prototype.onSearchDeactivate = /**
       * Subscribe to 'deactivate' event
       * @returns Observable<{searchType: string; tag?: string}>
       */
    function () {
        return this.searchDeactivations$.pipe(rxjs_operators.share());
    };
    /**
     * Subscribe to 'submit' event (when submit button clicked)
     * @returns Observable<{term: string; tag?: string}>
     */
    /**
       * Subscribe to 'submit' event (when submit button clicked)
       * @returns Observable<{term: string; tag?: string}>
       */
    NbSearchService.prototype.onSearchSubmit = /**
       * Subscribe to 'submit' event (when submit button clicked)
       * @returns Observable<{term: string; tag?: string}>
       */
    function () {
        return this.searchSubmittings$.pipe(rxjs_operators.share());
    };
    NbSearchService.decorators = [
        { type: _angular_core.Injectable },
    ];
    return NbSearchService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
var NbSearchFieldComponent = /** @class */ (function () {
    function NbSearchFieldComponent() {
        this.searchClose = new _angular_core.EventEmitter();
        this.search = new _angular_core.EventEmitter();
        this.tabOut = new _angular_core.EventEmitter();
        this.showSearch = false;
    }
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalZoomin", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_MODAL_ZOOMIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "rotateLayout", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_ROTATE_LAYOUT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalMove", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_MODAL_MOVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "curtain", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "columnCurtain", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_COLUMN_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalDrop", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_MODAL_DROP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalHalf", {
        get: function () {
            return this.searchType === NbSearchFieldComponent.TYPE_MODAL_HALF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "type", {
        set: function (val) {
            this.searchType = val;
        },
        enumerable: true,
        configurable: true
    });
    NbSearchFieldComponent.prototype.closeSearch = function () {
        this.searchClose.emit(true);
    };
    NbSearchFieldComponent.prototype.submitSearch = function (term) {
        if (term) {
            this.search.emit(term);
        }
    };
    NbSearchFieldComponent.TYPE_MODAL_ZOOMIN = 'modal-zoomin';
    NbSearchFieldComponent.TYPE_ROTATE_LAYOUT = 'rotate-layout';
    NbSearchFieldComponent.TYPE_MODAL_MOVE = 'modal-move';
    NbSearchFieldComponent.TYPE_CURTAIN = 'curtain';
    NbSearchFieldComponent.TYPE_COLUMN_CURTAIN = 'column-curtain';
    NbSearchFieldComponent.TYPE_MODAL_DROP = 'modal-drop';
    NbSearchFieldComponent.TYPE_MODAL_HALF = 'modal-half';
    NbSearchFieldComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-search-field',
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    styles: [":host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:0.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input::placeholder{opacity:0.3}:host span{font-size:90%;font-weight:bold;display:block;width:75%;margin:0 auto;padding:0.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity 0.5s}:host.modal-zoomin .search::before,:host.modal-zoomin .search::after{content:'';position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search::before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px, -15px, 0)}:host.modal-zoomin .search::after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px, 15px, 0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search::before,:host.modal-zoomin.show .search::after{transform:translate3d(0, 0, 0);transition:transform 0.5s}:host.modal-zoomin.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-zoomin.show .search form{opacity:1;transform:scale3d(1, 1, 1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}} ",
"/deep/ nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}/deep/ nb-layout.rotate-layout.with-search .scrollable-container{transition:transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0, 50vh, 0) rotate3d(1, 0, 0, 30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100%;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:0.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(0.7, 0.7, 1);transition:opacity 0.5s, transform 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.rotate-layout.show .search form{opacity:1;transform:scale3d(1, 1, 1)} ",
"/deep/ nb-layout.modal-move .layout{transition:transform 0.5s}/deep/ nb-layout.modal-move.with-search .layout{transform:scale3d(0.8, 0.8, 1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity 0.5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity 0.5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0, 1, 1);transform-origin:0 50%;transition:transform 0.3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-move.show .search input{transform:scale3d(1, 1, 1);transition-duration:0.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}} ",
":host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform 0.3s;transition-delay:0.4s;transition-timing-function:ease-out}:host.curtain .search::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;transition:transform 0.3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity 0.1s;transition-delay:0.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%, 0, 0);transition-delay:0s}:host.curtain.show .search::after{transform:translate3d(100%, 0, 0);transition-delay:0.4s}:host.curtain.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.curtain.show .search form{opacity:1;transform:scale3d(1, 1, 1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}} ",
"/deep/ nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0, 1, 1);transform-origin:0 50%;transition:transform 0.3s;transition-timing-function:cubic-bezier(0.86, 0, 0.07, 1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity 0.5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%, 0, 0);transition:transform 0.3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show::before{transform:scale3d(1, 1, 1)}:host.column-curtain.show .search form{transform:translate3d(0, 0, 0);transition-delay:0.15s;transition-timing-function:cubic-bezier(0.86, 0, 0.07, 1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}} ",
"/deep/ nb-layout.modal-drop .layout{position:relative;transition:transform 0.4s, opacity 0.4s;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}/deep/ nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(0.9, 0.9, 1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search::before{content:'';position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity 0.4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity 0.4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:0.25rem;text-align:center;opacity:0;transition:opacity 0.4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:0.85rem 0;opacity:0;transform:translate3d(0, -50px, 0);transition:opacity 0.4s, transform 0.4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0, -50px, 0);transition:transform 0.4s}:host.modal-drop .search .form-content::after{content:'';position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search::before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translate3d(0, 0, 0);transition:none}:host.modal-drop.show .search .form-content::after{animation:scaleUpDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s 0.4s}:host.modal-drop.show .search span{opacity:1;transform:translate3d(0, 0, 0);transition-delay:0.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1, 0, 1)}50%{transform:scale3d(1, 1, 1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}100%{opacity:1;transform:scale3d(1, 0, 1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}} ",
"/deep/ nb-layout.modal-half .layout{transition:transform 0.6s, opacity 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}/deep/ nb-layout.modal-half.with-search .layout{transform:scale3d(0.8, 0.8, 1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.6s, transform 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1);transform:translate3d(0, -100%, 0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search::before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-half.show .search .form-wrapper{transform:translate3d(0, 0, 0)} "],
                    template: "\n    <div class=\"search\" (keyup.esc)=\"closeSearch()\">\n      <button (click)=\"closeSearch()\">\n        <i class=\"nb-close-circled\"></i>\n      </button>\n      <div class=\"form-wrapper\">\n        <form class=\"form\" (keyup.enter)=\"submitSearch(searchInput.value)\">\n          <div class=\"form-content\">\n            <input class=\"search-input\"\n                   #searchInput\n                   autocomplete=\"off\"\n                   [attr.placeholder]=\"placeholder\"\n                   tabindex=\"-1\"\n                   (blur)=\"tabOut.next($event)\"/>\n          </div>\n          <span class=\"info\">{{ hint }}</span>\n        </form>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbSearchFieldComponent.propDecorators = {
        "searchType": [{ type: _angular_core.Input },],
        "placeholder": [{ type: _angular_core.Input },],
        "hint": [{ type: _angular_core.Input },],
        "searchClose": [{ type: _angular_core.Output },],
        "search": [{ type: _angular_core.Output },],
        "tabOut": [{ type: _angular_core.Output },],
        "inputElement": [{ type: _angular_core.ViewChild, args: ['searchInput',] },],
        "showSearch": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['class.show',] },],
        "modalZoomin": [{ type: _angular_core.HostBinding, args: ['class.modal-zoomin',] },],
        "rotateLayout": [{ type: _angular_core.HostBinding, args: ['class.rotate-layout',] },],
        "modalMove": [{ type: _angular_core.HostBinding, args: ['class.modal-move',] },],
        "curtain": [{ type: _angular_core.HostBinding, args: ['class.curtain',] },],
        "columnCurtain": [{ type: _angular_core.HostBinding, args: ['class.column-curtain',] },],
        "modalDrop": [{ type: _angular_core.HostBinding, args: ['class.modal-drop',] },],
        "modalHalf": [{ type: _angular_core.HostBinding, args: ['class.modal-half',] },],
        "type": [{ type: _angular_core.Input },],
    };
    return NbSearchFieldComponent;
}());
/**
 * Beautiful full-page search control.
 *
 * @styles
 *
 * search-btn-open-fg:
 * search-btn-close-fg:
 * search-bg:
 * search-bg-secondary:
 * search-text:
 * search-info:
 * search-dash:
 * search-placeholder:
 */
var NbSearchComponent = /** @class */ (function () {
    function NbSearchComponent(searchService, themeService, router) {
        this.searchService = searchService;
        this.themeService = themeService;
        this.router = router;
        this.alive = true;
        /**
           * Search input placeholder
           * @type {string}
           */
        this.placeholder = 'Search...';
        /**
           * Hint showing under the input field to improve user experience
           *
           * @type {string}
           */
        this.hint = 'Hit enter to search';
        this.showSearch = false;
        this.searchFieldComponentRef$ = new rxjs.BehaviorSubject(null);
        this.searchType = 'rotate-layout';
    }
    Object.defineProperty(NbSearchComponent.prototype, "type", {
        set: /**
           * Search design type, available types are
           * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
           * @type {string}
           */
        function (val) {
            this.searchType = val;
        },
        enumerable: true,
        configurable: true
    });
    NbSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (event) { return event instanceof _angular_router.NavigationEnd; }))
            .subscribe(function (event) { return _this.searchService.deactivateSearch(_this.searchType, _this.tag); });
        rxjs.combineLatest([
            this.searchFieldComponentRef$,
            this.searchService.onSearchActivate(),
        ])
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (_a) {
            var componentRef = _a[0], data = _a[1];
            return componentRef != null;
        }), rxjs_operators.filter(function (_a) {
            var componentRef = _a[0], data = _a[1];
            return !_this.tag || data.tag === _this.tag;
        }))
            .subscribe(function (_a) {
            var componentRef = _a[0], data = _a[1];
            _this.showSearch = true;
            _this.themeService.appendLayoutClass(_this.searchType);
            rxjs.of(null).pipe(rxjs_operators.delay(0)).subscribe(function () {
                _this.themeService.appendLayoutClass('with-search');
            });
            componentRef.instance.showSearch = true;
            componentRef.instance.inputElement.nativeElement.focus();
            componentRef.changeDetectorRef.detectChanges();
        });
        rxjs.combineLatest([
            this.searchFieldComponentRef$,
            this.searchService.onSearchDeactivate(),
        ])
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }), rxjs_operators.filter(function (_a) {
            var componentRef = _a[0], data = _a[1];
            return componentRef != null;
        }), rxjs_operators.filter(function (_a) {
            var componentRef = _a[0], data = _a[1];
            return !_this.tag || data.tag === _this.tag;
        }))
            .subscribe(function (_a) {
            var componentRef = _a[0], data = _a[1];
            _this.showSearch = false;
            componentRef.instance.showSearch = false;
            componentRef.instance.inputElement.nativeElement.value = '';
            componentRef.instance.inputElement.nativeElement.blur();
            componentRef.changeDetectorRef.detectChanges();
            _this.themeService.removeLayoutClass('with-search');
            rxjs.of(null).pipe(rxjs_operators.delay(500)).subscribe(function () {
                _this.themeService.removeLayoutClass(_this.searchType);
            });
        });
    };
    NbSearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeService.appendToLayoutTop(NbSearchFieldComponent)
            .subscribe(function (componentRef) {
            _this.connectToSearchField(componentRef);
        });
    };
    NbSearchComponent.prototype.openSearch = function () {
        this.searchService.activateSearch(this.searchType, this.tag);
    };
    NbSearchComponent.prototype.connectToSearchField = function (componentRef) {
        var _this = this;
        componentRef.instance.searchType = this.searchType;
        componentRef.instance.placeholder = this.placeholder;
        componentRef.instance.hint = this.hint;
        componentRef.instance.searchClose.subscribe(function () {
            _this.searchService.deactivateSearch(_this.searchType, _this.tag);
        });
        componentRef.instance.search.subscribe(function (term) {
            _this.searchService.submitSearch(term, _this.tag);
            _this.searchService.deactivateSearch(_this.searchType, _this.tag);
        });
        componentRef.instance.tabOut
            .subscribe(function () { return _this.showSearch && componentRef.instance.inputElement.nativeElement.focus(); });
        componentRef.changeDetectorRef.detectChanges();
        this.searchFieldComponentRef$.next(componentRef);
    };
    NbSearchComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        var componentRef = this.searchFieldComponentRef$.getValue();
        if (componentRef) {
            componentRef.destroy();
        }
    };
    NbSearchComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-search',
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    styles: [":host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none} "],
                    template: "\n    <button class=\"start-search\" (click)=\"openSearch()\">\n      <i class=\"nb-search\"></i>\n    </button>\n    <ng-template #attachedSearchContainer></ng-template>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbSearchComponent.ctorParameters = function () { return [
        { type: NbSearchService, },
        { type: NbThemeService, },
        { type: _angular_router.Router, },
    ]; };
    NbSearchComponent.propDecorators = {
        "tag": [{ type: _angular_core.Input },],
        "placeholder": [{ type: _angular_core.Input },],
        "hint": [{ type: _angular_core.Input },],
        "showSearch": [{ type: _angular_core.HostBinding, args: ['class.show',] },],
        "attachedSearchContainer": [{ type: _angular_core.ViewChild, args: ['attachedSearchContainer', { read: _angular_core.ViewContainerRef },] },],
        "type": [{ type: _angular_core.Input },],
    };
    return NbSearchComponent;
}());

var NbSearchModule = /** @class */ (function () {
    function NbSearchModule() {
    }
    NbSearchModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: [
                        NbSearchComponent,
                        NbSearchFieldComponent,
                    ],
                    exports: [
                        NbSearchComponent,
                        NbSearchFieldComponent,
                    ],
                    providers: [
                        NbSearchService,
                    ],
                    entryComponents: [
                        NbSearchFieldComponent,
                    ],
                },] },
    ];
    return NbSearchModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Styled checkbox component
 *
 * @example Basic example
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled">Enabled?</nb-checkbox>
 * ```
 *
 * @example Example with status
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled" status="danger">Enabled?</nb-checkbox>
 * ```
 *
 * @styles
 *
 * checkbox-bg:
 * checkbox-size:
 * checkbox-border-size:
 * checkbox-border-color:
 * checkbox-checkmark:
 * checkbox-checked-bg:
 * checkbox-checked-size:
 * checkbox-checked-border-size:
 * checkbox-checked-border-color:
 * checkbox-checked-checkmark:
 * checkbox-disabled-bg:
 * checkbox-disabled-size:
 * checkbox-disabled-border-size:
 * checkbox-disabled-border-color:
 * checkbox-disabled-checkmark:
 */
var NbCheckboxComponent = /** @class */ (function () {
    function NbCheckboxComponent() {
        /**
           * Checkbox value
           * @type {boolean}
           * @private
           */
        this._value = false;
        this.disabled = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NbCheckboxComponent.prototype, "setDisabled", {
        set: function (val) {
            this.disabled = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "setStatus", {
        set: /**
           * Checkbox status (success, warning, danger)
           * @param {string} val
           */
        function (val) {
            this.status = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    NbCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbCheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbCheckboxComponent.prototype.writeValue = function (val) {
        this.value = val;
    };
    NbCheckboxComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-checkbox',
                    template: "\n    <label class=\"customised-control customised-checkbox\">\n      <input type=\"checkbox\" class=\"customised-control-input\"\n             [disabled]=\"disabled\"\n             [checked]=\"value\"\n             (change)=\"value = !value\">\n      <span class=\"customised-control-indicator\"></span>\n      <span class=\"customised-control-description\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
                    providers: [{
                            provide: _angular_forms.NG_VALUE_ACCESSOR,
                            useExisting: _angular_core.forwardRef(function () { return NbCheckboxComponent; }),
                            multi: true,
                        }],
                },] },
    ];
    /** @nocollapse */
    NbCheckboxComponent.propDecorators = {
        "_value": [{ type: _angular_core.Input, args: ['value',] },],
        "setDisabled": [{ type: _angular_core.Input, args: ['disabled',] },],
        "setStatus": [{ type: _angular_core.Input, args: ['status',] },],
        "success": [{ type: _angular_core.HostBinding, args: ['class.success',] },],
        "warning": [{ type: _angular_core.HostBinding, args: ['class.warning',] },],
        "danger": [{ type: _angular_core.HostBinding, args: ['class.danger',] },],
    };
    return NbCheckboxComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbCheckboxModule = /** @class */ (function () {
    function NbCheckboxModule() {
    }
    NbCheckboxModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: [NbCheckboxComponent],
                    exports: [NbCheckboxComponent],
                },] },
    ];
    return NbCheckboxModule;
}());

/**
 * Describes placement of the UI element on the screen.
 * */
/**
 * Adjustment strategies.
 * */
/**
 * Adjustment strategies.
 * */
var NbPopoverAdjustment;
/**
 * Adjustment strategies.
 * */
(function (NbPopoverAdjustment) {
    NbPopoverAdjustment["CLOCKWISE"] = "clockwise";
    NbPopoverAdjustment["COUNTERCLOCKWISE"] = "counterclockwise";
})(NbPopoverAdjustment || (NbPopoverAdjustment = {}));
/**
 * Arrangement of one element relative to another.
 * */
/**
 * Arrangement of one element relative to another.
 * */
var NbPopoverPlacement;
/**
 * Arrangement of one element relative to another.
 * */
(function (NbPopoverPlacement) {
    NbPopoverPlacement["TOP"] = "top";
    NbPopoverPlacement["BOTTOM"] = "bottom";
    NbPopoverPlacement["LEFT"] = "left";
    NbPopoverPlacement["RIGHT"] = "right";
})(NbPopoverPlacement || (NbPopoverPlacement = {}));
var NbPopoverLogicalPlacement;
(function (NbPopoverLogicalPlacement) {
    NbPopoverLogicalPlacement["START"] = "start";
    NbPopoverLogicalPlacement["END"] = "end";
})(NbPopoverLogicalPlacement || (NbPopoverLogicalPlacement = {}));
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
var NbPopoverMode;
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
(function (NbPopoverMode) {
    NbPopoverMode["CLICK"] = "click";
    NbPopoverMode["HOVER"] = "hover";
    NbPopoverMode["HINT"] = "hint";
})(NbPopoverMode || (NbPopoverMode = {}));

var NbPositioningHelper = /** @class */ (function () {
    function NbPositioningHelper(window) {
        this.window = window;
    }
    /**
     * Calculates position of the element relatively to the host element based on the placement.
     * */
    /**
       * Calculates position of the element relatively to the host element based on the placement.
       * */
    NbPositioningHelper.prototype.calcPosition = /**
       * Calculates position of the element relatively to the host element based on the placement.
       * */
    function (positioned, host, placement) {
        var positionCalculator = NbPositioningHelper.positionCalculator[placement];
        var position = positionCalculator.call(NbPositioningHelper.positionCalculator, positioned, host);
        position.top += this.window.pageYOffset;
        position.left += this.window.pageXOffset;
        return position;
    };
    /**
       * Describes height of the popover arrow.
       * */
    NbPositioningHelper.ARROW_SIZE = 10;
    /**
       * Contains position calculators for all {@link NbPopoverPlacement}
       * */
    NbPositioningHelper.positionCalculator = (_a = {},
        _a[NbPopoverPlacement.TOP] = function (positioned, host) {
            return {
                top: host.top - positioned.height - NbPositioningHelper.ARROW_SIZE,
                left: host.left + host.width / 2 - positioned.width / 2,
            };
        },
        _a[NbPopoverPlacement.BOTTOM] = function (positioned, host) {
            return {
                top: host.top + host.height + NbPositioningHelper.ARROW_SIZE,
                left: host.left + host.width / 2 - positioned.width / 2,
            };
        },
        _a[NbPopoverPlacement.LEFT] = function (positioned, host) {
            return {
                top: host.top + host.height / 2 - positioned.height / 2,
                left: host.left - positioned.width - NbPositioningHelper.ARROW_SIZE,
            };
        },
        _a[NbPopoverPlacement.RIGHT] = function (positioned, host) {
            return {
                top: host.top + host.height / 2 - positioned.height / 2,
                left: host.left + host.width + NbPositioningHelper.ARROW_SIZE,
            };
        },
        _a);
    NbPositioningHelper.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbPositioningHelper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_WINDOW,] },] },
    ]; };
    return NbPositioningHelper;
}());
var _a;

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Popover container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
var NbPopoverComponent = /** @class */ (function () {
    function NbPopoverComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
           * Popover placement relatively host element.
           * */
        this.placement = NbPopoverPlacement.TOP;
        this.positionTop = 0;
        this.positionLeft = 0;
    }
    Object.defineProperty(NbPopoverComponent.prototype, "componentOutlet", {
        set: /**
           * If content type is TemplateRef we're passing context as template outlet param.
           * But if we have custom component content we're just assigning passed context to the component instance.
           * */
        function (el) {
            if (this.isComponent) {
                Object.assign(el._componentRef.instance, this.context);
                /**
                       * Change detection have to performed here, because another way applied context
                       * will be rendered on the next change detection loop and
                       * we'll have incorrect positioning. Because rendered component may change its size
                       * based on the context.
                       * */
                this.changeDetectorRef.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isTemplate", {
        /**
         * Check that content is a TemplateRef.
         *
         * @return boolean
         * */
        get: /**
           * Check that content is a TemplateRef.
           *
           * @return boolean
           * */
        function () {
            return this.content instanceof _angular_core.TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isComponent", {
        /**
         * Check that content is an angular component.
         *
         * @return boolean
         * */
        get: /**
           * Check that content is an angular component.
           *
           * @return boolean
           * */
        function () {
            return this.content instanceof _angular_core.Type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isPrimitive", {
        /**
         * Check that if content is not a TemplateRef or an angular component it means a primitive.
         * */
        get: /**
           * Check that if content is not a TemplateRef or an angular component it means a primitive.
           * */
        function () {
            return !this.isTemplate && !this.isComponent;
        },
        enumerable: true,
        configurable: true
    });
    NbPopoverComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-popover',
                    styles: [":host{position:absolute;z-index:10000;border-radius:5px;top:200px}:host .primitive-popover{padding:0.75rem 1rem}:host .arrow{position:absolute;width:0;height:0}:host .arrow{border-left:11px solid transparent;border-right:11px solid transparent}:host .arrow::after{position:absolute;content:' ';width:0;height:0;top:3px;left:calc(50% - 9px);border-left:9px solid transparent;border-right:9px solid transparent}:host.bottom .arrow{top:-11px;left:calc(50% - 11px)}:host.left .arrow{right:-17px;top:calc(50% - 5.5px);transform:rotate(90deg)}:host.top .arrow{bottom:-11px;left:calc(50% - 11px);transform:rotate(180deg)}:host.right .arrow{left:-17px;top:calc(50% - 5.5px);transform:rotate(270deg)} "],
                    template: "\n    <span class=\"arrow\"></span>\n\n    <ng-container *ngIf=\"isTemplate\">\n      <ng-container *ngTemplateOutlet=\"content; context: context\"></ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"isComponent\" [ngComponentOutlet]=\"content\"></ng-container>\n    <ng-container *ngIf=\"isPrimitive\">\n      <div class=\"primitive-popover\">{{content}}</div>\n    </ng-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbPopoverComponent.ctorParameters = function () { return [
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    NbPopoverComponent.propDecorators = {
        "content": [{ type: _angular_core.Input },],
        "context": [{ type: _angular_core.Input },],
        "placement": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['class',] },],
        "positionTop": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['style.top.px',] },],
        "positionLeft": [{ type: _angular_core.Input }, { type: _angular_core.HostBinding, args: ['style.left.px',] },],
        "componentOutlet": [{ type: _angular_core.ViewChild, args: [_angular_common.NgComponentOutlet,] },],
    };
    return NbPopoverComponent;
}());

/**
 * Describes the bypass order of the {@link NbPopoverPlacement} in the {@link NbPopoverAdjustment}.
 * */
var NB_ORDERED_PLACEMENTS = (_a$1 = {},
    _a$1[NbPopoverAdjustment.CLOCKWISE] = [
        NbPopoverPlacement.TOP,
        NbPopoverPlacement.RIGHT,
        NbPopoverPlacement.BOTTOM,
        NbPopoverPlacement.LEFT,
    ],
    _a$1[NbPopoverAdjustment.COUNTERCLOCKWISE] = [
        NbPopoverPlacement.TOP,
        NbPopoverPlacement.LEFT,
        NbPopoverPlacement.BOTTOM,
        NbPopoverPlacement.RIGHT,
    ],
    _a$1);
var NbAdjustmentHelper = /** @class */ (function () {
    function NbAdjustmentHelper(positioningHelper, window) {
        this.positioningHelper = positioningHelper;
        this.window = window;
    }
    /**
     * Calculated {@link NbPopoverPosition} based on placed element, host element,
     * placed element placement and adjustment strategy.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param host {ClientRect} host element.
     * @param placement {NbPopoverPlacement} placed element placement relatively host.
     * @param adjustment {NbPopoverAdjustment} adjustment strategy.
     *
     * @return {NbPopoverPosition} calculated position.
     * */
    /**
       * Calculated {@link NbPopoverPosition} based on placed element, host element,
       * placed element placement and adjustment strategy.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param host {ClientRect} host element.
       * @param placement {NbPopoverPlacement} placed element placement relatively host.
       * @param adjustment {NbPopoverAdjustment} adjustment strategy.
       *
       * @return {NbPopoverPosition} calculated position.
       * */
    NbAdjustmentHelper.prototype.adjust = /**
       * Calculated {@link NbPopoverPosition} based on placed element, host element,
       * placed element placement and adjustment strategy.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param host {ClientRect} host element.
       * @param placement {NbPopoverPlacement} placed element placement relatively host.
       * @param adjustment {NbPopoverAdjustment} adjustment strategy.
       *
       * @return {NbPopoverPosition} calculated position.
       * */
    function (placed, host, placement, adjustment) {
        var _this = this;
        var placements = NB_ORDERED_PLACEMENTS[adjustment].slice();
        var ordered = this.orderPlacements(placement, placements);
        var possible = ordered.map(function (pl) {
            return ({
                position: _this.positioningHelper.calcPosition(placed, host, pl),
                placement: pl,
            });
        });
        return this.chooseBest(placed, possible);
    };
    /**
     * Searches first adjustment which doesn't go beyond the viewport.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param possible {NbPopoverPosition[]} possible positions list ordered according to adjustment strategy.
     *
     * @return {NbPopoverPosition} calculated position.
     * */
    /**
       * Searches first adjustment which doesn't go beyond the viewport.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param possible {NbPopoverPosition[]} possible positions list ordered according to adjustment strategy.
       *
       * @return {NbPopoverPosition} calculated position.
       * */
    NbAdjustmentHelper.prototype.chooseBest = /**
       * Searches first adjustment which doesn't go beyond the viewport.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param possible {NbPopoverPosition[]} possible positions list ordered according to adjustment strategy.
       *
       * @return {NbPopoverPosition} calculated position.
       * */
    function (placed, possible) {
        var _this = this;
        return possible.find(function (adjust) { return _this.inViewPort(placed, adjust); }) || possible.shift();
    };
    /**
     * Finds out is adjustment doesn't go beyond of the view port.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param position {NbPopoverPosition} position of the placed element.
     *
     * @return {boolean} true if placed element completely viewport.
     * */
    /**
       * Finds out is adjustment doesn't go beyond of the view port.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param position {NbPopoverPosition} position of the placed element.
       *
       * @return {boolean} true if placed element completely viewport.
       * */
    NbAdjustmentHelper.prototype.inViewPort = /**
       * Finds out is adjustment doesn't go beyond of the view port.
       *
       * @param placed {ClientRect} placed element relatively host.
       * @param position {NbPopoverPosition} position of the placed element.
       *
       * @return {boolean} true if placed element completely viewport.
       * */
    function (placed, position) {
        return position.position.top - this.window.pageYOffset > 0
            && position.position.left - this.window.pageXOffset > 0
            && position.position.top + placed.height < this.window.innerHeight + this.window.pageYOffset
            && position.position.left + placed.width < this.window.innerWidth + this.window.pageXOffset;
    };
    /**
     * Reorder placements list to make placement start point and fit {@link NbPopoverAdjustment}
     *
     * @param placement {NbPopoverPlacement} active placement
     * @param placements {NbPopoverPlacement[]} placements list according to the active adjustment strategy.
     *
     * @return {NbPopoverPlacement[]} correctly ordered placements list.
     *
     * @example order placements for {@link NbPopoverPlacement#RIGHT} and {@link NbPopoverAdjustment#CLOCKWISE}
     * ```
     * const placements = NB_ORDERED_PLACEMENTS[NbPopoverAdjustment.CLOCKWISE];
     * const ordered = orderPlacement(NbPopoverPlacement.RIGHT, placements);
     *
     * expect(ordered).toEqual([
     *  NbPopoverPlacement.RIGHT,
     *  NbPopoverPlacement.BOTTOM,
     *  NbPopoverPlacement.LEFT,
     *  NbPopoverPlacement.TOP,
     * ]);
     * ```
     * */
    /**
       * Reorder placements list to make placement start point and fit {@link NbPopoverAdjustment}
       *
       * @param placement {NbPopoverPlacement} active placement
       * @param placements {NbPopoverPlacement[]} placements list according to the active adjustment strategy.
       *
       * @return {NbPopoverPlacement[]} correctly ordered placements list.
       *
       * @example order placements for {@link NbPopoverPlacement#RIGHT} and {@link NbPopoverAdjustment#CLOCKWISE}
       * ```
       * const placements = NB_ORDERED_PLACEMENTS[NbPopoverAdjustment.CLOCKWISE];
       * const ordered = orderPlacement(NbPopoverPlacement.RIGHT, placements);
       *
       * expect(ordered).toEqual([
       *  NbPopoverPlacement.RIGHT,
       *  NbPopoverPlacement.BOTTOM,
       *  NbPopoverPlacement.LEFT,
       *  NbPopoverPlacement.TOP,
       * ]);
       * ```
       * */
    NbAdjustmentHelper.prototype.orderPlacements = /**
       * Reorder placements list to make placement start point and fit {@link NbPopoverAdjustment}
       *
       * @param placement {NbPopoverPlacement} active placement
       * @param placements {NbPopoverPlacement[]} placements list according to the active adjustment strategy.
       *
       * @return {NbPopoverPlacement[]} correctly ordered placements list.
       *
       * @example order placements for {@link NbPopoverPlacement#RIGHT} and {@link NbPopoverAdjustment#CLOCKWISE}
       * ```
       * const placements = NB_ORDERED_PLACEMENTS[NbPopoverAdjustment.CLOCKWISE];
       * const ordered = orderPlacement(NbPopoverPlacement.RIGHT, placements);
       *
       * expect(ordered).toEqual([
       *  NbPopoverPlacement.RIGHT,
       *  NbPopoverPlacement.BOTTOM,
       *  NbPopoverPlacement.LEFT,
       *  NbPopoverPlacement.TOP,
       * ]);
       * ```
       * */
    function (placement, placements) {
        var index = placements.indexOf(placement);
        var start = placements.splice(index, placements.length);
        return start.concat.apply(start, placements);
    };
    NbAdjustmentHelper.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAdjustmentHelper.ctorParameters = function () { return [
        { type: NbPositioningHelper, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_WINDOW,] },] },
    ]; };
    return NbAdjustmentHelper;
}());
var _a$1;

/**
 * Describes popover triggers strategies based on popover {@link NbPopoverMode} mode.
 * */
var NB_TRIGGERS = (_a$2 = {},
    /**
     * Creates toggle and close events streams based on popover {@link NbPopoverMode#CLICK} mode.
     * Fires toggle event when click was performed on the host element.
     * Fires close event when click was performed on the document but
     * not on the host or container or popover container isn't rendered yet.
     *
     * @param host {HTMLElement} popover host element.
     * @param getContainer {Function} popover container getter.
     * @param document {Document} document ref.
     *
     * @return {NbPopoverTrigger} open and close events streams.
     * */
    _a$2[NbPopoverMode.CLICK] = /**
       * Creates toggle and close events streams based on popover {@link NbPopoverMode#CLICK} mode.
       * Fires toggle event when click was performed on the host element.
       * Fires close event when click was performed on the document but
       * not on the host or container or popover container isn't rendered yet.
       *
       * @param host {HTMLElement} popover host element.
       * @param getContainer {Function} popover container getter.
       * @param document {Document} document ref.
       *
       * @return {NbPopoverTrigger} open and close events streams.
       * */
    function (host, getContainer, document) {
        return {
            open: rxjs.EMPTY,
            close: rxjs.fromEvent(document, 'click')
                .pipe(rxjs_operators.filter(function (event) {
                return !host.contains(event.target)
                    && getContainer()
                    && !getContainer().location.nativeElement.contains(event.target);
            })),
            toggle: rxjs.fromEvent(host, 'click'),
        };
    },
    /**
     * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
     * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
     * Fires close event when mouse leaves the host element and stops out of the host and popover container.
     *
     * @param host {HTMLElement} popover host element.
     * @param getContainer {Function} popover container getter.
     * @param document {Document} document ref.
     *
     * @return {NbPopoverTrigger} open and close events streams.
     * */
    _a$2[NbPopoverMode.HOVER] = /**
       * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
       * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
       * Fires close event when mouse leaves the host element and stops out of the host and popover container.
       *
       * @param host {HTMLElement} popover host element.
       * @param getContainer {Function} popover container getter.
       * @param document {Document} document ref.
       *
       * @return {NbPopoverTrigger} open and close events streams.
       * */
    function (host, getContainer, document) {
        return {
            open: rxjs.fromEvent(host, 'mouseenter')
                .pipe(rxjs_operators.delay(100), rxjs_operators.takeUntil(rxjs.fromEvent(host, 'mouseleave')), rxjs_operators.repeat()),
            close: rxjs.fromEvent(host, 'mouseleave')
                .pipe(rxjs_operators.switchMap(function () {
                return rxjs.fromEvent(document, 'mousemove')
                    .pipe(rxjs_operators.debounceTime(100), rxjs_operators.takeWhile(function () { return !!getContainer(); }), rxjs_operators.filter(function (event) {
                    return !host.contains(event.target)
                        && !getContainer().location.nativeElement.contains(event.target);
                }));
            })),
            toggle: rxjs.EMPTY,
        };
    },
    /**
     * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
     * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
     * Fires close event when mouse leaves the host element.
     *
     * @param host {HTMLElement} popover host element.
     *
     * @return {NbPopoverTrigger} open and close events streams.
     * */
    _a$2[NbPopoverMode.HINT] = /**
       * Creates open and close events streams based on popover {@link NbPopoverMode#HOVER} mode.
       * Fires open event when mouse hovers over the host element and stay over at least 100 milliseconds.
       * Fires close event when mouse leaves the host element.
       *
       * @param host {HTMLElement} popover host element.
       *
       * @return {NbPopoverTrigger} open and close events streams.
       * */
    function (host) {
        return {
            open: rxjs.fromEvent(host, 'mouseenter')
                .pipe(rxjs_operators.delay(100), rxjs_operators.takeUntil(rxjs.fromEvent(host, 'mouseleave')), rxjs_operators.repeat()),
            close: rxjs.fromEvent(host, 'mouseleave'),
            toggle: rxjs.EMPTY,
        };
    },
    _a$2);
var NbTriggerHelper = /** @class */ (function () {
    function NbTriggerHelper(document) {
        this.document = document;
    }
    /**
     * Creates open and close events streams based on popover {@link NbPopoverMode} mode.
     *
     * @param host {HTMLElement} popover host element.
     * @param getContainer {Function} popover container getter.
     * Getter required because listen can be called when container isn't initialized.
     * @param mode {NbPopoverMode} describes container triggering strategy.
     *
     * @return {NbPopoverTrigger} open and close events streams.
     * */
    /**
       * Creates open and close events streams based on popover {@link NbPopoverMode} mode.
       *
       * @param host {HTMLElement} popover host element.
       * @param getContainer {Function} popover container getter.
       * Getter required because listen can be called when container isn't initialized.
       * @param mode {NbPopoverMode} describes container triggering strategy.
       *
       * @return {NbPopoverTrigger} open and close events streams.
       * */
    NbTriggerHelper.prototype.createTrigger = /**
       * Creates open and close events streams based on popover {@link NbPopoverMode} mode.
       *
       * @param host {HTMLElement} popover host element.
       * @param getContainer {Function} popover container getter.
       * Getter required because listen can be called when container isn't initialized.
       * @param mode {NbPopoverMode} describes container triggering strategy.
       *
       * @return {NbPopoverTrigger} open and close events streams.
       * */
    function (host, getContainer, mode) {
        var createTrigger = NB_TRIGGERS[mode];
        return createTrigger.call(NB_TRIGGERS, host, getContainer, this.document);
    };
    NbTriggerHelper.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbTriggerHelper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_DOCUMENT,] },] },
    ]; };
    return NbTriggerHelper;
}());
var _a$2;

var NbPlacementHelper = /** @class */ (function () {
    function NbPlacementHelper(layoutDirectionService) {
        this.layoutDirectionService = layoutDirectionService;
    }
    /*
     * Maps logical position to physical according to current layout direction.
     * */
    /*
       * Maps logical position to physical according to current layout direction.
       * */
    NbPlacementHelper.prototype.toPhysicalPlacement = /*
       * Maps logical position to physical according to current layout direction.
       * */
    function (placement) {
        var isLtr = this.layoutDirectionService.isLtr();
        if (placement === NbPopoverLogicalPlacement.START) {
            return isLtr ? NbPopoverPlacement.LEFT : NbPopoverPlacement.RIGHT;
        }
        if (placement === NbPopoverLogicalPlacement.END) {
            return isLtr ? NbPopoverPlacement.RIGHT : NbPopoverPlacement.LEFT;
        }
        return placement;
    };
    NbPlacementHelper.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbPlacementHelper.ctorParameters = function () { return [
        { type: NbLayoutDirectionService, },
    ]; };
    return NbPlacementHelper;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Powerful popover directive, which provides the best UX for your users.
 *
 * ![image](assets/images/components/popover.gif)
 *
 * @example Popover can accept different content such as:
 * TemplateRef
 *
 * ```
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 *
 * @example Custom components
 *
 * ```
 * <button [nbPopover]="NbCardComponent"></button>
 * ```
 *
 * @example Primitive types
 *
 * ```
 * <button nbPopover="Hello, Popover!"></button>
 * ```
 *
 * @example Popover has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```
 * <button nbPopover="Hello, Popover!" nbPopoverPlacement="left"></button>
 * ```
 *
 * @example By default popover will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change placement of the popover container.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjust]="false"></button>
 * ```
 *
 * */
/*
*
* TODO
* Rendering strategy have to be refactored.
* For now directive creates and deletes popover container each time.
* I think we can handle this slightly smarter and show/hide in any situations.
*/
var NbPopoverDirective = /** @class */ (function () {
    function NbPopoverDirective(hostRef, themeService, componentFactoryResolver, positioningHelper, adjustmentHelper, triggerHelper, platformId, placementHelper) {
        this.hostRef = hostRef;
        this.themeService = themeService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.positioningHelper = positioningHelper;
        this.adjustmentHelper = adjustmentHelper;
        this.triggerHelper = triggerHelper;
        this.platformId = platformId;
        this.placementHelper = placementHelper;
        /**
           * Position will be calculated relatively host element based on the placement.
           * Can be top, right, bottom, left, start or end.
           * */
        this.placement = NbPopoverPlacement.TOP;
        /**
           * Container placement will be changes automatically based on this strategy if container can't fit view port.
           * Set this property to any falsy value if you want to disable automatically adjustment.
           * Available values: clockwise, counterclockwise.
           * */
        this.adjustment = NbPopoverAdjustment.CLOCKWISE;
        /**
           * Describes when the container will be shown.
           * Available options: click, hover and hint
           * */
        this.mode = NbPopoverMode.CLICK;
        /*
           * Is used for unsubscribe all subscriptions after component destructuring.
           * */
        this.alive = true;
    }
    Object.defineProperty(NbPopoverDirective.prototype, "isShown", {
        /**
         * Returns true if popover already shown.
         * @return boolean
         * */
        get: /**
           * Returns true if popover already shown.
           * @return boolean
           * */
        function () {
            return !!this.containerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "isHidden", {
        /**
         * Returns true if popover hidden.
         * @return boolean
         * */
        get: /**
           * Returns true if popover hidden.
           * @return boolean
           * */
        function () {
            return !this.containerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "container", {
        get: function () {
            return this.containerRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "containerElement", {
        get: function () {
            return this.containerRef.location.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "hostElement", {
        get: function () {
            return this.hostRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    NbPopoverDirective.prototype.ngOnInit = function () {
        if (_angular_common.isPlatformBrowser(this.platformId)) {
            this.registerTriggers();
        }
    };
    NbPopoverDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    /**
     * Show popover.
     * */
    /**
       * Show popover.
       * */
    NbPopoverDirective.prototype.show = /**
       * Show popover.
       * */
    function () {
        if (this.isHidden) {
            this.renderPopover();
        }
    };
    /**
     * Hide popover.
     * */
    /**
       * Hide popover.
       * */
    NbPopoverDirective.prototype.hide = /**
       * Hide popover.
       * */
    function () {
        if (this.isShown) {
            this.destroyPopover();
        }
    };
    /**
     * Toggle popover state.
     * */
    /**
       * Toggle popover state.
       * */
    NbPopoverDirective.prototype.toggle = /**
       * Toggle popover state.
       * */
    function () {
        if (this.isShown) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /*
       * Adjust popover position on window resize.
       * Window resize may change host element position, so popover relocation required.
       *
       * TODO
       * Fix tslint to add capability make HostListener private.
       * */
    NbPopoverDirective.prototype.onResize = /*
       * Adjust popover position on window resize.
       * Window resize may change host element position, so popover relocation required.
       *
       * TODO
       * Fix tslint to add capability make HostListener private.
       * */
    function () {
        if (this.isShown) {
            this.place();
        }
    };
    /*
     * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
     * see {@link NbTriggerHelper}
     * */
    /*
       * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
       * see {@link NbTriggerHelper}
       * */
    NbPopoverDirective.prototype.registerTriggers = /*
       * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
       * see {@link NbTriggerHelper}
       * */
    function () {
        var _this = this;
        var _a = this.triggerHelper
            .createTrigger(this.hostElement, function () { return _this.containerRef; }, this.mode), open = _a.open, close = _a.close, toggle = _a.toggle;
        open.pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.show(); });
        close.pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.hide(); });
        toggle.pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.toggle(); });
    };
    /*
     * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
     * and positioning container based on {@link NbPopoverDirective#placement}
     * and {@link NbPopoverDirective#adjustment}.
     * */
    /*
       * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
       * and positioning container based on {@link NbPopoverDirective#placement}
       * and {@link NbPopoverDirective#adjustment}.
       * */
    NbPopoverDirective.prototype.renderPopover = /*
       * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
       * and positioning container based on {@link NbPopoverDirective#placement}
       * and {@link NbPopoverDirective#adjustment}.
       * */
    function () {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(NbPopoverComponent);
        this.themeService.appendToLayoutTop(factory)
            .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
            .subscribe(function (containerRef) {
            _this.containerRef = containerRef;
            _this.patchPopover(_this.content, _this.context);
            /*
                     * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
                     * and haven't got calculated size.
                     * But we should have size on this step to calculate popover position correctly.
                     *
                     * TODO
                     * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
                     * Investigate, maybe we can create method in the {@link NbThemeService}
                     * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
                     * instead of performing this call by service client.
                     * */
            /*
             * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
             * and haven't got calculated size.
             * But we should have size on this step to calculate popover position correctly.
             *
             * TODO
             * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
             * Investigate, maybe we can create method in the {@link NbThemeService}
             * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
             * instead of performing this call by service client.
             * */
            _this.containerRef.changeDetectorRef.markForCheck();
            _this.containerRef.changeDetectorRef.detectChanges();
            _this.place();
        });
    };
    /*
     * Destroys the {@link NbPopoverComponent} and nullify its reference;
     * */
    /*
       * Destroys the {@link NbPopoverComponent} and nullify its reference;
       * */
    NbPopoverDirective.prototype.destroyPopover = /*
       * Destroys the {@link NbPopoverComponent} and nullify its reference;
       * */
    function () {
        this.containerRef.destroy();
        this.containerRef = null;
    };
    /*
     * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
     * */
    /*
       * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
       * */
    NbPopoverDirective.prototype.place = /*
       * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
       * */
    function () {
        var hostRect = this.hostElement.getBoundingClientRect();
        var containerRect = this.containerElement.getBoundingClientRect();
        this.adjust(containerRect, hostRect);
    };
    /*
     * Set container content and context.
     * */
    /*
       * Set container content and context.
       * */
    NbPopoverDirective.prototype.patchPopover = /*
       * Set container content and context.
       * */
    function (content, context) {
        this.container.content = content;
        this.container.context = context;
    };
    /*
     * Set container placement.
     * */
    /*
       * Set container placement.
       * */
    NbPopoverDirective.prototype.patchPopoverPlacement = /*
       * Set container placement.
       * */
    function (placement) {
        this.container.placement = placement;
    };
    /*
     * Set container position.
     * */
    /*
       * Set container position.
       * */
    NbPopoverDirective.prototype.patchPopoverPosition = /*
       * Set container position.
       * */
    function (_a) {
        var top = _a.top, left = _a.left;
        this.container.positionTop = top;
        this.container.positionLeft = left;
    };
    /*
     * Calculates container adjustment and sets container position and placement.
     * */
    /*
       * Calculates container adjustment and sets container position and placement.
       * */
    NbPopoverDirective.prototype.adjust = /*
       * Calculates container adjustment and sets container position and placement.
       * */
    function (containerRect, hostRect) {
        var _a = this.performAdjustment(containerRect, hostRect), placement = _a.placement, position = _a.position;
        this.patchPopoverPlacement(placement);
        this.patchPopoverPosition(position);
    };
    /*
     * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
     * If not, just calculates element position.
     * */
    /*
       * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
       * If not, just calculates element position.
       * */
    NbPopoverDirective.prototype.performAdjustment = /*
       * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
       * If not, just calculates element position.
       * */
    function (placed, host) {
        if (this.adjustment) {
            return this.calcAdjustment(placed, host);
        }
        return this.calcPosition(placed, host);
    };
    /*
     * Calculate adjustment.
     * see {@link NbAdjustmentHelper}.
     * */
    /*
       * Calculate adjustment.
       * see {@link NbAdjustmentHelper}.
       * */
    NbPopoverDirective.prototype.calcAdjustment = /*
       * Calculate adjustment.
       * see {@link NbAdjustmentHelper}.
       * */
    function (placed, host) {
        var placement = this.placementHelper.toPhysicalPlacement(this.placement);
        return this.adjustmentHelper.adjust(placed, host, placement, this.adjustment);
    };
    /*
     * Calculate position.
     * see {@link NbPositioningHelper}
     * */
    /*
       * Calculate position.
       * see {@link NbPositioningHelper}
       * */
    NbPopoverDirective.prototype.calcPosition = /*
       * Calculate position.
       * see {@link NbPositioningHelper}
       * */
    function (placed, host) {
        var placement = this.placementHelper.toPhysicalPlacement(this.placement);
        return {
            position: this.positioningHelper.calcPosition(placed, host, placement),
            placement: placement,
        };
    };
    NbPopoverDirective.decorators = [
        { type: _angular_core.Directive, args: [{ selector: '[nbPopover]' },] },
    ];
    /** @nocollapse */
    NbPopoverDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: NbThemeService, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: NbPositioningHelper, },
        { type: NbAdjustmentHelper, },
        { type: NbTriggerHelper, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID,] },] },
        { type: NbPlacementHelper, },
    ]; };
    NbPopoverDirective.propDecorators = {
        "content": [{ type: _angular_core.Input, args: ['nbPopover',] },],
        "context": [{ type: _angular_core.Input, args: ['nbPopoverContext',] },],
        "placement": [{ type: _angular_core.Input, args: ['nbPopoverPlacement',] },],
        "adjustment": [{ type: _angular_core.Input, args: ['nbPopoverAdjustment',] },],
        "mode": [{ type: _angular_core.Input, args: ['nbPopoverMode',] },],
        "onResize": [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return NbPopoverDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbPopoverModule = /** @class */ (function () {
    function NbPopoverModule() {
    }
    NbPopoverModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [NbSharedModule],
                    declarations: [NbPopoverComponent, NbPopoverDirective],
                    exports: [NbPopoverDirective],
                    entryComponents: [NbPopoverComponent],
                    providers: [NbAdjustmentHelper, NbPositioningHelper, NbTriggerHelper, NbPlacementHelper],
                },] },
    ];
    return NbPopoverModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Context menu component used as content within NbContextMenuDirective.
 *
 * @styles
 *
 * context-menu-fg
 * context-menu-active-fg
 * context-menu-active-bg
 * */
var NbContextMenuComponent = /** @class */ (function () {
    function NbContextMenuComponent() {
        this.items = [];
    }
    NbContextMenuComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-context-menu',
                    styles: [":host /deep/ nb-menu{display:inline;font-size:0.875rem;line-height:1.5rem}:host /deep/ nb-menu ul.menu-items{margin:0;padding:0.5rem 0}:host /deep/ nb-menu ul.menu-items .menu-item{border:none;white-space:nowrap}:host /deep/ nb-menu ul.menu-items .menu-item:first-child{border:none}:host /deep/ nb-menu ul.menu-items .menu-item a{cursor:pointer;border-radius:0;padding:0}:host /deep/ nb-menu ul.menu-items .menu-item a .menu-icon{font-size:1.5rem;width:auto}:host /deep/ nb-menu ul.menu-items .menu-item a .menu-title{padding:0.375rem 3rem}[dir=rtl] :host /deep/ nb-menu ul.menu-items .menu-item a .menu-title{text-align:right}[dir=ltr] :host /deep/ nb-menu ul.menu-items .menu-item a .menu-icon ~ .menu-title{padding-left:0}[dir=rtl] :host /deep/ nb-menu ul.menu-items .menu-item a .menu-icon ~ .menu-title{padding-right:0}[dir=ltr] :host /deep/ nb-menu ul.menu-items .menu-item a .menu-icon:first-child{padding-left:1rem}[dir=rtl] :host /deep/ nb-menu ul.menu-items .menu-item a .menu-icon:first-child{padding-right:1rem} "],
                    template: '<nb-menu class="context-menu" [items]="items" [tag]="tag"></nb-menu>',
                },] },
    ];
    /** @nocollapse */
    NbContextMenuComponent.propDecorators = {
        "items": [{ type: _angular_core.Input },],
        "tag": [{ type: _angular_core.Input },],
    };
    return NbContextMenuComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Full featured context menu directive.
 *
 * ![image](assets/images/components/context-menu.gif)
 *
 * @example Just pass menu items array:
 *
 * ```
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and subscribe to events using NbMenuService.
 * `NbContextMenu` renders plain `NbMenu` inside, so
 * you have to work with it just like with `NbMenu` component:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuTag="my-context-menu"></button>
 * ...
 * nbMenuService.onItemClick()
 *   .pipe(filter(({ tag }) => tag === 'my-context-menu'))
 *   .subscribe(...handle it somehow)
 * ```
 *
 * @example Context menu has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example By default context menu will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change placement of the context menu.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * */
var NbContextMenuDirective = /** @class */ (function () {
    function NbContextMenuDirective(hostRef, themeService, componentFactoryResolver, positioningHelper, adjustmentHelper, triggerHelper, platformId, placementHelper) {
        this.context = {};
        /**
             * Initialize popover with all the important inputs.
             * */
        this.popover = new NbPopoverDirective(hostRef, themeService, componentFactoryResolver, positioningHelper, adjustmentHelper, triggerHelper, platformId, placementHelper);
        this.popover.content = NbContextMenuComponent;
        this.popover.placement = NbPopoverPlacement.BOTTOM;
    }
    Object.defineProperty(NbContextMenuDirective.prototype, "items", {
        set: /**
           * Basic menu items, will be passed to the internal NbMenuComponent.
           * */
        function (items) {
            this.validateItems(items);
            this.popover.context = Object.assign(this.context, { items: items });
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(NbContextMenuDirective.prototype, "placement", {
        set: /**
           * Position will be calculated relatively host element based on the placement.
           * Can be top, right, bottom and left.
           * */
        function (placement) {
            this.popover.placement = placement;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(NbContextMenuDirective.prototype, "adjustment", {
        set: /**
           * Container placement will be changes automatically based on this strategy if container can't fit view port.
           * Set this property to any falsy value if you want to disable automatically adjustment.
           * Available values: clockwise, counterclockwise.
           * */
        function (adjustment) {
            this.popover.adjustment = adjustment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbContextMenuDirective.prototype, "tag", {
        set: /**
           * Set NbMenu tag, which helps identify menu when working with NbMenuService.
           * */
        function (tag) {
            this.popover.context = Object.assign(this.context, { tag: tag });
        },
        enumerable: true,
        configurable: true
    });
    NbContextMenuDirective.prototype.ngOnInit = function () {
        this.popover.ngOnInit();
    };
    NbContextMenuDirective.prototype.ngOnDestroy = function () {
        this.popover.ngOnDestroy();
    };
    /**
     * Show context menu.
     * */
    /**
       * Show context menu.
       * */
    NbContextMenuDirective.prototype.show = /**
       * Show context menu.
       * */
    function () {
        this.popover.show();
    };
    /**
     * Hide context menu.
     * */
    /**
       * Hide context menu.
       * */
    NbContextMenuDirective.prototype.hide = /**
       * Hide context menu.
       * */
    function () {
        this.popover.hide();
    };
    /**
     * Toggle context menu state.
     * */
    /**
       * Toggle context menu state.
       * */
    NbContextMenuDirective.prototype.toggle = /**
       * Toggle context menu state.
       * */
    function () {
        this.popover.toggle();
    };
    NbContextMenuDirective.prototype.onResize = function () {
        this.popover.onResize();
    };
    /*
     * NbMenuComponent will crash if don't pass menu items to it.
     * So, we just validating them and throw custom obvious error.
     * */
    /*
       * NbMenuComponent will crash if don't pass menu items to it.
       * So, we just validating them and throw custom obvious error.
       * */
    NbContextMenuDirective.prototype.validateItems = /*
       * NbMenuComponent will crash if don't pass menu items to it.
       * So, we just validating them and throw custom obvious error.
       * */
    function (items) {
        if (!items || !items.length) {
            throw Error("List of menu items expected, but given: " + items);
        }
    };
    NbContextMenuDirective.decorators = [
        { type: _angular_core.Directive, args: [{ selector: '[nbContextMenu]' },] },
    ];
    /** @nocollapse */
    NbContextMenuDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: NbThemeService, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: NbPositioningHelper, },
        { type: NbAdjustmentHelper, },
        { type: NbTriggerHelper, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID,] },] },
        { type: NbPlacementHelper, },
    ]; };
    NbContextMenuDirective.propDecorators = {
        "items": [{ type: _angular_core.Input, args: ['nbContextMenu',] },],
        "placement": [{ type: _angular_core.Input, args: ['nbContextMenuPlacement',] },],
        "adjustment": [{ type: _angular_core.Input, args: ['nbContextMenuAdjustment',] },],
        "tag": [{ type: _angular_core.Input, args: ['nbContextMenuTag',] },],
        "onResize": [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return NbContextMenuDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbContextMenuModule = /** @class */ (function () {
    function NbContextMenuModule() {
    }
    NbContextMenuModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule, NbPopoverModule, NbMenuModule],
                    exports: [NbContextMenuDirective],
                    declarations: [NbContextMenuDirective, NbContextMenuComponent],
                    entryComponents: [NbPopoverComponent, NbContextMenuComponent],
                },] },
    ];
    return NbContextMenuModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

exports.NbMenuService = NbMenuService;
exports.NbMenuItem = NbMenuItem;
exports.nbThemeOptionsToken = nbThemeOptionsToken;
exports.nbMediaBreakpointsToken = nbMediaBreakpointsToken;
exports.nbBuiltInJSThemesToken = nbBuiltInJSThemesToken;
exports.nbJSThemesToken = nbJSThemesToken;
exports.NB_WINDOW = NB_WINDOW;
exports.NB_DOCUMENT = NB_DOCUMENT;
exports.nbWindowFactory = nbWindowFactory;
exports.NbThemeModule = NbThemeModule;
exports.NbThemeService = NbThemeService;
exports.NbSpinnerService = NbSpinnerService;
exports.DEFAULT_MEDIA_BREAKPOINTS = DEFAULT_MEDIA_BREAKPOINTS;
exports.NbMediaBreakpointsService = NbMediaBreakpointsService;
exports.NbColorHelper = NbColorHelper;
exports.NB_LAYOUT_DIRECTION = NB_LAYOUT_DIRECTION;
exports.NbLayoutDirectionService = NbLayoutDirectionService;
exports.NbCardModule = NbCardModule;
exports.NbLayoutModule = NbLayoutModule;
exports.NbMenuModule = NbMenuModule;
exports.NbRouteTabsetModule = NbRouteTabsetModule;
exports.NbSidebarModule = NbSidebarModule;
exports.NbSidebarService = NbSidebarService;
exports.NbTabsetModule = NbTabsetModule;
exports.NbUserModule = NbUserModule;
exports.NbActionsModule = NbActionsModule;
exports.NbSearchModule = NbSearchModule;
exports.NbSearchService = NbSearchService;
exports.NbCheckboxComponent = NbCheckboxComponent;
exports.NbCheckboxModule = NbCheckboxModule;
exports.NbBadgeComponent = NbBadgeComponent;
exports.NbBadgeModule = NbBadgeModule;
exports.NbPopoverDirective = NbPopoverDirective;
exports.NbPopoverModule = NbPopoverModule;
exports.NbContextMenuDirective = NbContextMenuDirective;
exports.NbContextMenuModule = NbContextMenuModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));

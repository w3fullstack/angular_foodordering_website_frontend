import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { NB_AUTH_PROVIDERS } from '../auth.options';
import { NbTokenService } from './token/token.service';
/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Providers.
 */
var NbAuthService = /** @class */ (function () {
    function NbAuthService(tokenService, injector, providers) {
        if (providers === void 0) { providers = {}; }
        this.tokenService = tokenService;
        this.injector = injector;
        this.providers = providers;
    }
    /**
     * Retrieves current authenticated token stored
     * @returns {Observable<any>}
     */
    /**
       * Retrieves current authenticated token stored
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.getToken = /**
       * Retrieves current authenticated token stored
       * @returns {Observable<any>}
       */
    function () {
        return this.tokenService.get();
    };
    /**
     * Returns true if auth token is presented in the token storage
     * @returns {Observable<any>}
     */
    /**
       * Returns true if auth token is presented in the token storage
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.isAuthenticated = /**
       * Returns true if auth token is presented in the token storage
       * @returns {Observable<any>}
       */
    function () {
        return this.getToken()
            .pipe(map(function (token) { return token.isValid(); }));
    };
    /**
     * Returns tokens stream
     * @returns {Observable<NbAuthSimpleToken>}
     */
    /**
       * Returns tokens stream
       * @returns {Observable<NbAuthSimpleToken>}
       */
    NbAuthService.prototype.onTokenChange = /**
       * Returns tokens stream
       * @returns {Observable<NbAuthSimpleToken>}
       */
    function () {
        return this.tokenService.tokenChange();
    };
    /**
     * Returns authentication status stream
     * @returns {Observable<boolean>}
     */
    /**
       * Returns authentication status stream
       * @returns {Observable<boolean>}
       */
    NbAuthService.prototype.onAuthenticationChange = /**
       * Returns authentication status stream
       * @returns {Observable<boolean>}
       */
    function () {
        return this.onTokenChange()
            .pipe(map(function (token) { return token.isValid(); }));
    };
    /**
     * Authenticates with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Authenticates with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.authenticate = /**
       * Authenticates with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        var _this = this;
        return this.getProvider(provider).authenticate(data)
            .pipe(switchMap(function (result) {
            return _this.processResultToken(result);
        }));
    };
    /**
     * Registers with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Registers with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.register = /**
       * Registers with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        var _this = this;
        return this.getProvider(provider).register(data)
            .pipe(switchMap(function (result) {
            return _this.processResultToken(result);
        }));
    };
    /**
     * Sign outs with the selected provider
     * Removes token from the token storage
     *
     * Example:
     * logout('email')
     *
     * @param provider
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Sign outs with the selected provider
       * Removes token from the token storage
       *
       * Example:
       * logout('email')
       *
       * @param provider
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.logout = /**
       * Sign outs with the selected provider
       * Removes token from the token storage
       *
       * Example:
       * logout('email')
       *
       * @param provider
       * @returns {Observable<NbAuthResult>}
       */
    function (provider) {
        var _this = this;
        return this.getProvider(provider).logout()
            .pipe(switchMap(function (result) {
            if (result.isSuccess()) {
                _this.tokenService.clear()
                    .pipe(map(function () { return result; }));
            }
            return observableOf(result);
        }));
    };
    /**
     * Sends forgot password request to the selected provider
     *
     * Example:
     * requestPassword('email', {email: 'email@example.com'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Sends forgot password request to the selected provider
       *
       * Example:
       * requestPassword('email', {email: 'email@example.com'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.requestPassword = /**
       * Sends forgot password request to the selected provider
       *
       * Example:
       * requestPassword('email', {email: 'email@example.com'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        return this.getProvider(provider).requestPassword(data);
    };
    /**
     * Tries to reset password with the selected provider
     *
     * Example:
     * resetPassword('email', {newPassword: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Tries to reset password with the selected provider
       *
       * Example:
       * resetPassword('email', {newPassword: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.resetPassword = /**
       * Tries to reset password with the selected provider
       *
       * Example:
       * resetPassword('email', {newPassword: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        return this.getProvider(provider).resetPassword(data);
    };
    /**
     * Sends a refresh token request
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param {string} provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Sends a refresh token request
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param {string} provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.refreshToken = /**
       * Sends a refresh token request
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param {string} provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        var _this = this;
        return this.getProvider(provider).refreshToken()
            .pipe(switchMap(function (result) {
            return _this.processResultToken(result);
        }));
    };
    /**
     * Gets the selected provider
     *
     * Example:
     * getProvider('email')
     *
     * @param {string} provider
     * @returns {NbAbstractAuthProvider}
     */
    /**
       * Gets the selected provider
       *
       * Example:
       * getProvider('email')
       *
       * @param {string} provider
       * @returns {NbAbstractAuthProvider}
       */
    NbAuthService.prototype.getProvider = /**
       * Gets the selected provider
       *
       * Example:
       * getProvider('email')
       *
       * @param {string} provider
       * @returns {NbAbstractAuthProvider}
       */
    function (provider) {
        if (!this.providers[provider]) {
            throw new TypeError("Nb auth provider '" + provider + "' is not registered");
        }
        return this.injector.get(this.providers[provider].service);
    };
    NbAuthService.prototype.processResultToken = function (result) {
        var _this = this;
        if (result.isSuccess() && result.getRawToken()) {
            return this.tokenService.setRaw(result.getRawToken())
                .pipe(switchMap(function () { return _this.tokenService.get(); }), map(function (token) {
                result.setToken(token);
                return result;
            }));
        }
        return observableOf(result);
    };
    NbAuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthService.ctorParameters = function () { return [
        { type: NbTokenService, },
        { type: Injector, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NB_AUTH_PROVIDERS,] },] },
    ]; };
    return NbAuthService;
}());
export { NbAuthService };
//# sourceMappingURL=auth.service.js.map
import { Inject, Injectable } from '@angular/core';
import { NB_AUTH_TOKEN_CLASS } from '../../auth.options';
import { nbCreateToken } from './token';
var NbTokenStorage = /** @class */ (function () {
    function NbTokenStorage() {
    }
    return NbTokenStorage;
}());
export { NbTokenStorage };
/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
var NbTokenLocalStorage = /** @class */ (function () {
    function NbTokenLocalStorage(tokenClass) {
        this.tokenClass = tokenClass;
        this.key = 'auth_app_token';
    }
    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    /**
       * Returns token from localStorage
       * @returns {NbAuthToken}
       */
    NbTokenLocalStorage.prototype.get = /**
       * Returns token from localStorage
       * @returns {NbAuthToken}
       */
    function () {
        return nbCreateToken(this.tokenClass, localStorage.getItem(this.key));
    };
    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    /**
       * Sets token to localStorage
       * @param {NbAuthToken} token
       */
    NbTokenLocalStorage.prototype.set = /**
       * Sets token to localStorage
       * @param {NbAuthToken} token
       */
    function (token) {
        localStorage.setItem(this.key, token.toString());
    };
    /**
     * Sets raw (string) token to localStorage
     * @param {string} token
     */
    /**
       * Sets raw (string) token to localStorage
       * @param {string} token
       */
    NbTokenLocalStorage.prototype.setRaw = /**
       * Sets raw (string) token to localStorage
       * @param {string} token
       */
    function (token) {
        localStorage.setItem(this.key, token);
    };
    /**
     * Clears token from localStorage
     */
    /**
       * Clears token from localStorage
       */
    NbTokenLocalStorage.prototype.clear = /**
       * Clears token from localStorage
       */
    function () {
        localStorage.removeItem(this.key);
    };
    NbTokenLocalStorage.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbTokenLocalStorage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_TOKEN_CLASS,] },] },
    ]; };
    return NbTokenLocalStorage;
}());
export { NbTokenLocalStorage };
//# sourceMappingURL=token-storage.js.map
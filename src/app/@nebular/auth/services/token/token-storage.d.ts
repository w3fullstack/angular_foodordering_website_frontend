import { NbAuthToken, NbTokenClass } from './token';
export declare abstract class NbTokenStorage {
    abstract get(): NbAuthToken;
    abstract set(token: NbAuthToken): any;
    abstract setRaw(token: string): any;
    abstract clear(): any;
}
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
export declare class NbTokenLocalStorage implements NbTokenStorage {
    protected tokenClass: NbTokenClass;
    protected key: string;
    constructor(tokenClass: NbTokenClass);
    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    get(): NbAuthToken;
    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    set(token: NbAuthToken): void;
    /**
     * Sets raw (string) token to localStorage
     * @param {string} token
     */
    setRaw(token: string): void;
    /**
     * Clears token from localStorage
     */
    clear(): void;
}

import { Observable, BehaviorSubject } from 'rxjs';
import { NbTokenStorage } from './token-storage';
import { NbAuthToken } from './token';
/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
export declare class NbTokenService {
    protected tokenStorage: NbTokenStorage;
    protected token$: BehaviorSubject<NbAuthToken>;
    constructor(tokenStorage: NbTokenStorage);
    /**
     * Publishes token when it changes.
     * @returns {Observable<NbAuthToken>}
     */
    tokenChange(): Observable<NbAuthToken>;
    /**
     * Sets a token into the storage. This method is used by the NbAuthService automatically.
     *
     * @param {NbAuthToken} token
     * @returns {Observable<any>}
     */
    set(token: NbAuthToken): Observable<null>;
    /**
     * Sets a raw token into the storage. This method is used by the NbAuthService automatically.
     *
     * @param {string} token
     * @returns {Observable<any>}
     */
    setRaw(token: string): Observable<null>;
    /**
     * Returns observable of current token
     * @returns {Observable<NbAuthToken>}
     */
    get(): Observable<NbAuthToken>;
    /**
     * Removes the token and published token value
     *
     * @returns {Observable<any>}
     */
    clear(): Observable<null>;
    protected publishStoredToken(): void;
}

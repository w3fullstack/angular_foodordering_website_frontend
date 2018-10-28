export interface NbAuthToken {
    getValue(): string;
    isValid(): boolean;
    toString(): string;
}
export interface NbTokenClass {
    new (raw: string): NbAuthToken;
}
export declare function nbCreateToken(tokenClass: NbTokenClass, token: string): NbAuthToken;
/**
 * Wrapper for simple (text) token
 */
export declare class NbAuthSimpleToken implements NbAuthToken {
    readonly token: string;
    constructor(token: string);
    /**
     * Returns the token value
     * @returns string
     */
    getValue(): string;
    /**
     * Is non empty and valid
     * @returns {boolean}
     */
    isValid(): boolean;
    /**
     * Validate value and convert to string, if value is not valid return empty string
     * @returns {string}
     */
    toString(): string;
}
/**
 * Wrapper for JWT token with additional methods.
 */
export declare class NbAuthJWTToken extends NbAuthSimpleToken {
    /**
     * Returns payload object
     * @returns any
     */
    getPayload(): any;
    /**
     * Returns expiration date
     * @returns Date
     */
    getTokenExpDate(): Date;
    /**
     * Is data expired
     * @returns {boolean}
     */
    isValid(): boolean;
}

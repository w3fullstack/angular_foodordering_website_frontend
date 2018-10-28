var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { urlBase64Decode } from '../../helpers';
export function nbCreateToken(tokenClass, token) {
    return new tokenClass(token);
}
/**
 * Wrapper for simple (text) token
 */
var /**
 * Wrapper for simple (text) token
 */
NbAuthSimpleToken = /** @class */ (function () {
    function NbAuthSimpleToken(token) {
        this.token = token;
    }
    /**
     * Returns the token value
     * @returns string
     */
    /**
       * Returns the token value
       * @returns string
       */
    NbAuthSimpleToken.prototype.getValue = /**
       * Returns the token value
       * @returns string
       */
    function () {
        return this.token;
    };
    /**
     * Is non empty and valid
     * @returns {boolean}
     */
    /**
       * Is non empty and valid
       * @returns {boolean}
       */
    NbAuthSimpleToken.prototype.isValid = /**
       * Is non empty and valid
       * @returns {boolean}
       */
    function () {
        return !!this.token;
    };
    /**
     * Validate value and convert to string, if value is not valid return empty string
     * @returns {string}
     */
    /**
       * Validate value and convert to string, if value is not valid return empty string
       * @returns {string}
       */
    NbAuthSimpleToken.prototype.toString = /**
       * Validate value and convert to string, if value is not valid return empty string
       * @returns {string}
       */
    function () {
        return !!this.token ? this.token : '';
    };
    return NbAuthSimpleToken;
}());
/**
 * Wrapper for simple (text) token
 */
export { NbAuthSimpleToken };
/**
 * Wrapper for JWT token with additional methods.
 */
var /**
 * Wrapper for JWT token with additional methods.
 */
NbAuthJWTToken = /** @class */ (function (_super) {
    __extends(NbAuthJWTToken, _super);
    function NbAuthJWTToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns payload object
     * @returns any
     */
    /**
       * Returns payload object
       * @returns any
       */
    NbAuthJWTToken.prototype.getPayload = /**
       * Returns payload object
       * @returns any
       */
    function () {
        if (!this.token) {
            throw new Error('Cannot extract payload from an empty token.');
        }
        var parts = this.token.split('.');
        if (parts.length !== 3) {
            throw new Error("The token " + this.token + " is not valid JWT token and must consist of three parts.");
        }
        var decoded;
        try {
            decoded = urlBase64Decode(parts[1]);
        }
        catch (e) {
            throw new Error("The token " + this.token + " is not valid JWT token and cannot be parsed.");
        }
        if (!decoded) {
            throw new Error("The token " + this.token + " is not valid JWT token and cannot be decoded.");
        }
        return JSON.parse(decoded);
    };
    /**
     * Returns expiration date
     * @returns Date
     */
    /**
       * Returns expiration date
       * @returns Date
       */
    NbAuthJWTToken.prototype.getTokenExpDate = /**
       * Returns expiration date
       * @returns Date
       */
    function () {
        var decoded = this.getPayload();
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    /**
     * Is data expired
     * @returns {boolean}
     */
    /**
       * Is data expired
       * @returns {boolean}
       */
    NbAuthJWTToken.prototype.isValid = /**
       * Is data expired
       * @returns {boolean}
       */
    function () {
        return _super.prototype.isValid.call(this) && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
    };
    return NbAuthJWTToken;
}(NbAuthSimpleToken));
/**
 * Wrapper for JWT token with additional methods.
 */
export { NbAuthJWTToken };
//# sourceMappingURL=token.js.map
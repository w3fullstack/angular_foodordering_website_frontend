var NbAuthResult = /** @class */ (function () {
    function NbAuthResult(success, response, redirect, errors, messages, rawToken) {
        this.success = success;
        this.response = response;
        this.redirect = redirect;
        this.errors = [];
        this.messages = [];
        this.errors = this.errors.concat([errors]);
        if (errors instanceof Array) {
            this.errors = errors;
        }
        this.messages = this.messages.concat([messages]);
        if (messages instanceof Array) {
            this.messages = messages;
        }
        this.rawToken = rawToken;
    }
    NbAuthResult.prototype.setToken = function (token) {
        this.token = token;
        this.rawToken = token.toString();
    };
    NbAuthResult.prototype.getResponse = function () {
        return this.response;
    };
    NbAuthResult.prototype.getRawToken = function () {
        return this.rawToken;
    };
    NbAuthResult.prototype.getToken = function () {
        return this.token;
    };
    NbAuthResult.prototype.getRedirect = function () {
        return this.redirect;
    };
    NbAuthResult.prototype.getErrors = function () {
        return this.errors.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.getMessages = function () {
        return this.messages.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.isSuccess = function () {
        return this.success;
    };
    NbAuthResult.prototype.isFailure = function () {
        return !this.success;
    };
    return NbAuthResult;
}());
export { NbAuthResult };
//# sourceMappingURL=auth-result.js.map
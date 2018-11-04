import * as crypto from 'crypto-js';
import {CookieService} from 'ngx-cookie-service';

export class Utils {

  static CookieService: CookieService;

  public static encodeJwt(data) {
    try {
      const encodedHeader = this.base64url(crypto.enc.Utf8.parse(JSON.stringify({"alg": "HS256", "typ": "JWT"})));
      const encodedData = this.base64url(crypto.enc.Utf8.parse(JSON.stringify(data)));
      return encodedHeader + '.' + encodedData;
    } catch (e) {
      console.error('exception in common.ts.decodeJwt', e);
      return null;
    }
  }

  public static decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error('exception in common.ts.decodeJwt', e);
      this.CookieService.delete('user');
      window.location.href = '/user/login';
      return null;
    }
  };

  public static base64url(source) {
    try {
      let encodedSource = crypto.enc.Base64.stringify(source);
      encodedSource = encodedSource.replace(/=+$/, '');
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');
      return encodedSource;
    } catch (e) {
      console.error('exception in common.ts.base64url', e);
      return null;
    }
  }
}

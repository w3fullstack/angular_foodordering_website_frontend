import { Router } from '@angular/router';
import { NbAuthSocialLink } from '../../auth.options';
import { NbAuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

export declare class NbLoginComponent {
    protected service: NbAuthService;
    protected config: {};
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    provider: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    socialLinks: NbAuthSocialLink[];
    constructor(service: NbAuthService, toastrService: ToastrService, cookieService: CookieService,  config: {}, router: Router);
    login(): void;
    getConfigValue(key: string): any;
    signInUser(username: string, password: string): void;
    fetchRestaurant(role: any, user_id: any): any;
}

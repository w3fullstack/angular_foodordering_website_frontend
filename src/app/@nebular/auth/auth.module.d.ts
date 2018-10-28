import { Injector, ModuleWithProviders } from '@angular/core';
import { NbAuthService } from './services/auth.service';
import { NbTokenService } from './services/token/token.service';
import { NbAuthOptions } from './auth.options';
export declare function nbAuthServiceFactory(config: any, tokenService: NbTokenService, injector: Injector): NbAuthService;
export declare function nbOptionsFactory(options: any): any;
export declare class NbAuthModule {
    static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders;
}

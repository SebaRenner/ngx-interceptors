import { InjectionToken } from "@angular/core";
import { Observable, of } from "rxjs";

export interface AuthTokenProvider {
    getToken(): Observable<string>;
}

export interface AuthInterceptorConfig {
    tokenProvider: AuthTokenProvider;
}

export const defaultAuthConfig: AuthInterceptorConfig = {
    tokenProvider: {
        getToken: () => of('defaultToken')
    }
};

export const AUTH_INTERCEPTOR_CONFIG = new InjectionToken<AuthInterceptorConfig>('auth.config');

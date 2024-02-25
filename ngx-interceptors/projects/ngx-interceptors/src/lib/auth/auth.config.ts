import { InjectionToken } from "@angular/core";

export interface AuthInterceptorConfig {}

export const defaultAuthConfig: AuthInterceptorConfig = {}

export const AUTH_INTERCEPTOR_CONFIG = new InjectionToken<AuthInterceptorConfig>('auth.config');

import { InjectionToken } from "@angular/core";

export type HttpHeader = {
  [name: string]: string | string[];
}

// Could be extended with dynamic headers or an encryption config option
export interface HeaderInterceptorConfig {
  headers: HttpHeader;
}

export const defaultHeaderConfig: HeaderInterceptorConfig = {
  headers: {}
}

export const HEADER_INTERCEPTOR_CONFIG = new InjectionToken<HeaderInterceptorConfig>('header.config');

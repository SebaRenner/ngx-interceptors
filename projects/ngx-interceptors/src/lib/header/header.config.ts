import { InjectionToken } from "@angular/core";

export type HttpHeader = {
  [name: string]: string | string[];
}

// Could be extended with an encryption config option
export interface HeaderInterceptorConfig {
  headers: HttpHeader;
  enableDynamicHeaders: boolean;
}

export const defaultHeaderConfig: HeaderInterceptorConfig = {
  headers: {},
  enableDynamicHeaders: false
}

export const HEADER_INTERCEPTOR_CONFIG = new InjectionToken<HeaderInterceptorConfig>('header.config');

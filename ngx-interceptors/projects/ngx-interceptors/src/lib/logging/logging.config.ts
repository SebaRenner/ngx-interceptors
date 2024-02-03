import { InjectionToken } from "@angular/core";

export interface LoggingInterceptorConfig {
  color: string;
}

export const defaultConfig: LoggingInterceptorConfig = {
  color: 'orange'
}

export const LOGGING_INTERCEPTOR_CONFIG = new InjectionToken<LoggingInterceptorConfig>('logging.config');

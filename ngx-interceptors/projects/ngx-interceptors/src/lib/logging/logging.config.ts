import { InjectionToken } from "@angular/core";

export interface LoggingInterceptorConfig {
  color: string;
}

export const defaultLoggingConfig: LoggingInterceptorConfig = {
  color: 'black'
}

export const LOGGING_INTERCEPTOR_CONFIG = new InjectionToken<LoggingInterceptorConfig>('logging.config');

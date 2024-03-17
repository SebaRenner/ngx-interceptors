import { InjectionToken } from "@angular/core";

export enum LoggingDateFormat {
  Default,
  ISO,
  UTC,
  Locale
}

export interface LoggingInterceptorConfig {
  color: string;
  dateFormat: LoggingDateFormat;
}

export const defaultLoggingConfig: LoggingInterceptorConfig = {
  color: 'black',
  dateFormat: LoggingDateFormat.ISO
}

export const LOGGING_INTERCEPTOR_CONFIG = new InjectionToken<LoggingInterceptorConfig>('logging.config');

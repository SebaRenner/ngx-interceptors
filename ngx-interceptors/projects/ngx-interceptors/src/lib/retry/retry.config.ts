import { InjectionToken } from "@angular/core";

export interface RetryInterceptorConfig {
  retries: number;
  delay: number;
}

export const defaultRetryConfig: RetryInterceptorConfig = {
  retries: 3,
  delay: 500
}

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryInterceptorConfig>('retry.config');

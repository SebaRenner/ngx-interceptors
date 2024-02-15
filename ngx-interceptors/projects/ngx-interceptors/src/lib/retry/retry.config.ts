import { InjectionToken } from "@angular/core";

// additional config options:
// - backoff strategy instead of fixed delay
// - only retry on set of Errors/ErrorCodes
export interface RetryInterceptorConfig {
  retries: number;
  delay: number;
}

export const defaultRetryConfig: RetryInterceptorConfig = {
  retries: 3,
  delay: 500
}

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryInterceptorConfig>('retry.config');

import { InjectionToken } from "@angular/core";

export enum BackoffStrategy {
  Fixed,
  Linear,
  Exponential
}

// additional config options:
// - only retry on set of Errors/ErrorCodes
// - polynomial backoff could easily be added
export interface RetryInterceptorConfig {
  retries: number;
  delay: number;
  backoffStrategy: BackoffStrategy;
  addJitter: boolean;
  jitterFactor: number
}

export const defaultRetryConfig: RetryInterceptorConfig = {
  retries: 3,
  delay: 500,
  backoffStrategy: BackoffStrategy.Fixed,
  addJitter: false,
  jitterFactor: 10
}

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryInterceptorConfig>('retry.config');

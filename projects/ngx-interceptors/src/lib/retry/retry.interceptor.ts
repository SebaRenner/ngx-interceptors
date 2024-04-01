import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable, retry, timer } from "rxjs";
import { BackoffStrategy, RETRY_INTERCEPTOR_CONFIG, RetryInterceptorConfig, defaultRetryConfig } from "./retry.config";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(RETRY_INTERCEPTOR_CONFIG) private config: RetryInterceptorConfig) {
    this.config = { ...defaultRetryConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(retry({ count: this.config.retries, delay: (error, retryCount) => calcDelay(retryCount, this.config) }));
  }
}

export const retryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const injectedConfig = inject(RETRY_INTERCEPTOR_CONFIG, { optional: true});
  const config: RetryInterceptorConfig = { ...defaultRetryConfig, ...injectedConfig };

  return next(req)
    .pipe(retry({ count: config.retries, delay: (error, retryCount) => calcDelay(retryCount, config) }));
}

const calcDelay = (attempt: number, config: RetryInterceptorConfig): Observable<number> => {
  let delay = 0;
  switch (config.backoffStrategy) {
    case BackoffStrategy.Fixed:
      delay = config.delay;
      break;
    case BackoffStrategy.Linear:
      delay = attempt * config.delay
      break;
    case BackoffStrategy.Exponential:
      delay = Math.pow(2, attempt) * config.delay;
      break;
  }

  if (config.addJitter) {
    const jitter = (Math.random() * 2 - 1) * config.jitterFactor;
    delay = delay + jitter;
  }

  return timer(delay);
}



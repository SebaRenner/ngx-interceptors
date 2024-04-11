import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable, retry, timer } from "rxjs";
import { RETRY_INTERCEPTOR_CONFIG, RetryInterceptorConfig, defaultRetryConfig } from "./retry.config";
import { calcDelay } from "./retry.utils";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(RETRY_INTERCEPTOR_CONFIG) private config: RetryInterceptorConfig) {
    this.config = { ...defaultRetryConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(retry({ count: this.config.retries, delay: (error, retryCount) => timer(calcDelay(retryCount, this.config)) }));
  }
}

export const retryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const injectedConfig = inject(RETRY_INTERCEPTOR_CONFIG, { optional: true});
  const config: RetryInterceptorConfig = { ...defaultRetryConfig, ...injectedConfig };

  return next(req)
    .pipe(retry({ count: config.retries, delay: (error, retryCount) => timer(calcDelay(retryCount, config)) }));
}

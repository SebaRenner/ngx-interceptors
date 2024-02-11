import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable, retry } from "rxjs";
import { RETRY_INTERCEPTOR_CONFIG, RetryInterceptorConfig, defaultRetryConfig } from "./retry.config";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(RETRY_INTERCEPTOR_CONFIG) private config: RetryInterceptorConfig) {
    this.config = this.config ?? defaultRetryConfig
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(retry({ count: this.config.retries, delay: this.config.delay }));
  }
}

export const retryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config = inject(RETRY_INTERCEPTOR_CONFIG, { optional: true}) ?? defaultRetryConfig;

  return next(req)
    .pipe(retry({ count: config.retries, delay: config.delay }));
}

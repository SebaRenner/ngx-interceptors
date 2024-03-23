import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { MOCK_INTERCEPTOR_CONFIG, MockInterceptorConfig, defaultMockConfig } from "./mock.config";
import { Observable, delay, of } from "rxjs";

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(MOCK_INTERCEPTOR_CONFIG) private config: MockInterceptorConfig) {
    this.config = { ...defaultMockConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(this.config.response).pipe(delay(this.config.delay));
  }
}

export const mockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const injectedConfig = inject(MOCK_INTERCEPTOR_CONFIG, { optional: true });
  const config: MockInterceptorConfig = { ...defaultMockConfig, ...injectedConfig };

  return of(config.response).pipe(delay(config.delay));;
}

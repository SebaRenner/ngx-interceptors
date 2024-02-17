import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HEADER_INTERCEPTOR_CONFIG, HeaderInterceptorConfig, defaultHeaderConfig } from "./header.config";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(HEADER_INTERCEPTOR_CONFIG) private config: HeaderInterceptorConfig) {
    this.config = this.config ?? defaultHeaderConfig
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: this.config.headers
    })

    return next.handle(modifiedReq);
  }
}

export const headerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config = inject(HEADER_INTERCEPTOR_CONFIG, { optional: true}) ?? defaultHeaderConfig;
  const modifiedReq = req.clone({
    setHeaders: config.headers
  })

  return next(modifiedReq);
}

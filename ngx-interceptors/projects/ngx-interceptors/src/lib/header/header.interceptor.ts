import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HEADER_INTERCEPTOR_CONFIG, HeaderInterceptorConfig, HttpHeader, defaultHeaderConfig } from "./header.config";
import { DynamicHeaderService } from "./services/dynamic-header.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(HEADER_INTERCEPTOR_CONFIG) private config: HeaderInterceptorConfig, private dynamicHeaderService: DynamicHeaderService) {
    this.config = this.config ?? defaultHeaderConfig
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeader = this.config.headers;
    if (this.config.enableDynamicHeaders) {
      const dynamicHeaders: HttpHeader = this.dynamicHeaderService.getHeaders();
      headers = { ...headers, ...dynamicHeaders };
    }

    const modifiedReq = req.clone({
      setHeaders: headers
    })

    return next.handle(modifiedReq);
  }
}

export const headerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config = inject(HEADER_INTERCEPTOR_CONFIG, { optional: true}) ?? defaultHeaderConfig;

  let headers: HttpHeader = config.headers;
  if (config.enableDynamicHeaders) {
    const dynamicHeaderService = inject(DynamicHeaderService);
    const dynamicHeaders: HttpHeader = dynamicHeaderService.getHeaders();
    headers = { ...headers, ...dynamicHeaders };
  }

  const modifiedReq = req.clone({
    setHeaders: headers
  })

  return next(modifiedReq);
}

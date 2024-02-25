import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AUTH_INTERCEPTOR_CONFIG, AuthInterceptorConfig, defaultAuthConfig } from "./auth.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(AUTH_INTERCEPTOR_CONFIG) private config: AuthInterceptorConfig) {
    this.config = this.config ?? defaultAuthConfig
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = '';

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(modifiedReq);
  }
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config = inject(AUTH_INTERCEPTOR_CONFIG, { optional: true}) ?? defaultAuthConfig;
  const token = '';

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
      }
  })

  return next(modifiedReq);
}

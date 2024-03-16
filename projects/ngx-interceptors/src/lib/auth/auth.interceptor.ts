import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AUTH_INTERCEPTOR_CONFIG, AuthInterceptorConfig, defaultAuthConfig } from "./auth.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(AUTH_INTERCEPTOR_CONFIG) private config: AuthInterceptorConfig) {
    this.config = { ...defaultAuthConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.config.tokenProvider.getToken().pipe(switchMap((token) => {
      let value = token;
      if (this.config.bearerPrefix) {
        value = `Bearer ${value}`
      }
      const modifiedReq = req.clone({
        setHeaders: {
          [this.config.headerName]: value
        }
      })
      return next.handle(modifiedReq);
    }))
  }
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const injectedConfig = inject(AUTH_INTERCEPTOR_CONFIG, { optional: true});
  const config: AuthInterceptorConfig = { ...defaultAuthConfig, ...injectedConfig }; 

  return config.tokenProvider.getToken().pipe(switchMap((token) => {
    let value = token;
    if (config.bearerPrefix) {
      value = `Bearer ${value}`
    }
    const modifiedReq = req.clone({
      setHeaders: {
        [config.headerName]: value
      }
    })

    return next(modifiedReq);
  }))
}

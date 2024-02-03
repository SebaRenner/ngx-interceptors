import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { LOGGING_INTERCEPTOR_CONFIG, LoggingInterceptorConfig, defaultConfig } from "./logging.config";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(LOGGING_INTERCEPTOR_CONFIG) private config: LoggingInterceptorConfig) {
    this.config = this.config ?? defaultConfig
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const now = new Date().toISOString();

    console.log(`%c[${now}] [${req.method}] ${req.url}`, `color: ${this.config.color}`)

    return next.handle(req);
  }
}

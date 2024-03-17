import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable } from "rxjs";
import { LOGGING_INTERCEPTOR_CONFIG, LoggingDateFormat, LoggingInterceptorConfig, defaultLoggingConfig } from "./logging.config";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(LOGGING_INTERCEPTOR_CONFIG) private config: LoggingInterceptorConfig) {
    this.config = { ...defaultLoggingConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const now = getFormattedTimestamp(new Date(), this.config.dateFormat);

    console.log(`%c[${now}] [${req.method}] ${req.url}`, `color: ${this.config.color}`)

    return next.handle(req);
  }
}

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const injectedConfig = inject(LOGGING_INTERCEPTOR_CONFIG, { optional: true});
  const config: LoggingInterceptorConfig = { ...defaultLoggingConfig, ...injectedConfig };
  const now = getFormattedTimestamp(new Date(), config.dateFormat);

  console.log(`%c[${now}] [${req.method}] ${req.url}`, `color: ${config.color}`)

  return next(req);
}

const getFormattedTimestamp = (timestamp: Date, dateFormat: LoggingDateFormat): string => {
  switch (dateFormat) {
    case LoggingDateFormat.Default: return timestamp.toString();
    case LoggingDateFormat.ISO: return timestamp.toISOString();
    case LoggingDateFormat.UTC: return timestamp.toUTCString();
    case LoggingDateFormat.Locale: return timestamp.toLocaleString();
  }
}

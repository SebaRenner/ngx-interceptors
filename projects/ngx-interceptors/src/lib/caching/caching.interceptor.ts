import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, Optional, inject } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { CACHING_INTERCEPTOR_CONFIG, CachingInterceptorConfig, defaultCachingConfig } from "./caching.config";
import { CachingService } from "./services/caching.service";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(CACHING_INTERCEPTOR_CONFIG) private config: CachingInterceptorConfig, private cachingService: CachingService) {
    this.config = { ...defaultCachingConfig, ...this.config };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var cachedResponse = this.cachingService.get(req.url);
    if (cachedResponse) return of(cachedResponse);

    return next.handle(req).pipe(tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          this.cachingService.add(req.url, event);
        }
      }
    }));
  }
}

export const cachingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cachingService = inject(CachingService);
  const injectedConfig = inject(CACHING_INTERCEPTOR_CONFIG, { optional: true });
  const config: CachingInterceptorConfig = { ...defaultCachingConfig, ...injectedConfig };

  var cachedResponse = cachingService.get(req.url);
  if (cachedResponse) return of(cachedResponse);

  return next(req).pipe(tap({
    next: (event) => {
      if (event instanceof HttpResponse) {
        cachingService.add(req.url, event);
      }
    }
  }));
}

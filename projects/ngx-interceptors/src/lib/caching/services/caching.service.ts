import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { CACHING_INTERCEPTOR_CONFIG, CachingInterceptorConfig, defaultCachingConfig } from "../caching.config";

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private _cache: Map<string, HttpResponse<unknown>> = new Map<string, HttpResponse<unknown>>();

  constructor(@Optional() @Inject(CACHING_INTERCEPTOR_CONFIG) private config: CachingInterceptorConfig) {
    this.config = { ...defaultCachingConfig, ...this.config };
    if (this.config.maxSize < 0) {
      throw new Error('Sub zero max cache size is not allowed');
    }
  }

  get size(): number {
    return this._cache.size;
  }

  add(url: string, response: HttpResponse<unknown>) {
    if (this._cache.size === this.config.maxSize) {
      throw new Error('Cache of CachingInterceptor is full. You can manually clear it or use an eviction policy');
    }

    this._cache.set(url, response);
  }

  get(url: string): HttpResponse<unknown> | undefined {
    return this._cache.get(url);
  }

  clear() {
    this._cache.clear();
  }
}

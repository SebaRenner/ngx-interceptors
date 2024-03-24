import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { CACHING_INTERCEPTOR_CONFIG, CacheEvictionPolicy, CachingInterceptorConfig, defaultCachingConfig } from "../caching.config";

interface CacheEntry<T> {
  value: T;
  lastAccessed: Date;
  accessCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private _cache: Map<string, CacheEntry<HttpResponse<unknown>>> = new Map<string, CacheEntry<HttpResponse<unknown>>>();

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
      this.evict();
    }

    const cacheEntry: CacheEntry<HttpResponse<unknown>> = {
      value: response,
      lastAccessed: new Date(),
      accessCount: 0
    };
    this._cache.set(url, cacheEntry);
  }

  get(url: string): HttpResponse<unknown> | undefined {
    var cacheEntry = this._cache.get(url);

    if (cacheEntry) {
      const updatedEntry: CacheEntry<HttpResponse<unknown>> = {
        value: cacheEntry.value,
        lastAccessed: new Date(),
        accessCount: cacheEntry.accessCount + 1
      };
      this._cache.set(url, updatedEntry);
    }

    return cacheEntry?.value;
  }

  clear() {
    this._cache.clear();
  }

  private evict() {
    switch(this.config.evictionPolicy) {
      case CacheEvictionPolicy.None:
        throw new Error('Cache of CachingInterceptor is full. You can manually clear it or use an eviction policy');
      case CacheEvictionPolicy.FIFO:
        const firstEntry = this._cache.keys().next().value;
        this._cache.delete(firstEntry);
        break;
      case CacheEvictionPolicy.LFU:
        const lfuSortedCache = Array.from(this._cache.entries()).sort((a, b) => {
          return a[1].accessCount - b[1].accessCount;
        });
        this._cache.delete(lfuSortedCache[0][0]);
        break;
      case CacheEvictionPolicy.LRU:
        const lruSortedCache = Array.from(this._cache.entries()).sort((a, b) => {
          return a[1].lastAccessed.getTime() - b[1].lastAccessed.getTime();
        });
        this._cache.delete(lruSortedCache[0][0]);
        break;
    }
  }
}

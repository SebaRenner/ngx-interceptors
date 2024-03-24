import { InjectionToken } from "@angular/core";

export enum CacheEvictionPolicy {
  None,
  LRU,
  LFU,
  FIFO
}

/*
Config ideas:
- include caching of HttpErrorResponses
- Url blacklist for endpoint that shouldn't be cached
- Only cache responses of requests with
- Configurable TTL
*/
export interface CachingInterceptorConfig {
  maxSize: number;
  evictionPolicy: CacheEvictionPolicy;
}

export const defaultCachingConfig: CachingInterceptorConfig = {
  maxSize: 200,
  evictionPolicy: CacheEvictionPolicy.LRU
};

export const CACHING_INTERCEPTOR_CONFIG = new InjectionToken<CachingInterceptorConfig>('caching.config');
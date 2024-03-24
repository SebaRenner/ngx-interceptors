import { InjectionToken } from "@angular/core";

export enum CacheEvictionPolicy {
  None,
  LRU,
  LFU,
  FIFO
}

/*
Additional config ideas:
- include caching of HttpErrorResponses
- Configurable TTL
*/
export interface CachingInterceptorConfig {
  maxSize: number;
  evictionPolicy: CacheEvictionPolicy;
  excludedEndpoints: string[];
}

export const defaultCachingConfig: CachingInterceptorConfig = {
  maxSize: 200,
  evictionPolicy: CacheEvictionPolicy.LRU,
  excludedEndpoints: []
};

export const CACHING_INTERCEPTOR_CONFIG = new InjectionToken<CachingInterceptorConfig>('caching.config');

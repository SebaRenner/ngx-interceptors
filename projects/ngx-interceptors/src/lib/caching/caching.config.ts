import { InjectionToken } from "@angular/core";

/*
Config ideas:
- Max Cache Size
- Eviction Policy
- Only successful filter
- Url blacklist for endpoint that shouldn't be cached
*/
export interface CachingInterceptorConfig {}

export const defaultCachingConfig: CachingInterceptorConfig = {};

export const CACHING_INTERCEPTOR_CONFIG = new InjectionToken<CachingInterceptorConfig>('caching.config');

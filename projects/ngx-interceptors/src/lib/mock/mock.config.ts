import { HttpResponse } from "@angular/common/http";
import { InjectionToken } from "@angular/core";

export interface MockInterceptorConfig {
  response: HttpResponse<unknown>;
  delay: number;
}

export const defaultMockConfig: MockInterceptorConfig = {
  response: new HttpResponse({ status: 204, statusText: 'No content', body: 'mock response' }),
  delay: 0
};

export const MOCK_INTERCEPTOR_CONFIG = new InjectionToken<MockInterceptorConfig>('mock.config');

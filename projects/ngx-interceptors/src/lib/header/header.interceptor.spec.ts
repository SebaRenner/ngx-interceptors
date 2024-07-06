import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HeaderInterceptor } from "./header.interceptor";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HEADER_INTERCEPTOR_CONFIG, HttpHeader } from "./header.config";
import { DynamicHeaderService } from "./services/dynamic-header.service";

class DynamicHeaderServiceMock {
  getHeaders() {
    return { 'Dynamic-Header': 'dynamic-value' }
  }
}

describe('HeaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: DynamicHeaderService,
            useClass: DynamicHeaderServiceMock
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should use default config', () => {
    // arrange
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    expect(req.request.headers.keys()).toEqual([]);
  });

  it('should add headers to request', () => {
    // arrange
    const name = 'Content-Type';
    const value = 'application/json';
    const headers: HttpHeader = { [name]: value };

    TestBed.overrideProvider(HEADER_INTERCEPTOR_CONFIG, { useValue: { headers: headers } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get(name);
    expect(header).toBeDefined();
    expect(header).toBe(value);
  });

  it('should use dynamic headers', () => {
    // arrange
    TestBed.overrideProvider(HEADER_INTERCEPTOR_CONFIG, { useValue: { enableDynamicHeaders: true } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get('Dynamic-Header');
    expect(header).toBeDefined();
    expect(header).toBe('dynamic-value');
  });

  it('should not use dynamic headers', () => {
    // arrange
    TestBed.overrideProvider(HEADER_INTERCEPTOR_CONFIG, { useValue: { enableDynamicHeaders: false } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get('Dynamic-Header');
    expect(header).toBeNull();
  });

  it('should merge static and dynamic headers', () => {
    // arrange
    const name = 'Content-Type';
    const value = 'application/json';
    const headers: HttpHeader = { [name]: value };

    TestBed.overrideProvider(HEADER_INTERCEPTOR_CONFIG, { useValue: { headers: headers, enableDynamicHeaders: true } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    expect(req.request.headers.keys()).toEqual([name, 'Dynamic-Header']);
  });

  it('should not overwrite existing headers', () => {
    // arrange
    const name = 'Content-Type';
    const value = 'application/json';
    const headers: HttpHeader = { [name]: value };

    TestBed.overrideProvider(HEADER_INTERCEPTOR_CONFIG, { useValue: { headers: headers, enableDynamicHeaders: true } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com', {
      headers: {
        ['Content-Length']: '1435'
      }
    }).subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    expect(req.request.headers.keys()).toEqual(['Content-Length', 'Content-Type', 'Dynamic-Header']);
  });
});

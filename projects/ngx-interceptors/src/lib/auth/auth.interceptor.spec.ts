import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AuthInterceptor } from "./auth.interceptor";
import { AUTH_INTERCEPTOR_CONFIG, AuthTokenProvider, defaultAuthConfig } from "./auth.config";
import { Observable, of } from "rxjs";

class TokenProviderMock implements AuthTokenProvider {
  getToken(): Observable<string> {
    return of('mockToken');
  }
}

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
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
    const authHeader = req.request.headers.get(defaultAuthConfig.headerName);
    expect(authHeader).toBeDefined();
    expect(authHeader).toMatch(/^Bearer /);
    expect(authHeader).toEqual("Bearer defaultToken");
  })

  it('should use custom header name', () => {
    // arrange
    const name = 'X-Token';

    TestBed.overrideProvider(AUTH_INTERCEPTOR_CONFIG, { useValue: { headerName: name } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get(name);
    expect(header).toBeDefined();
    expect(header).toEqual('Bearer defaultToken');
  })

  it('should not add bearer prefix', () => {
    // arrange
    TestBed.overrideProvider(AUTH_INTERCEPTOR_CONFIG, { useValue: { bearerPrefix: false } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get(defaultAuthConfig.headerName);
    expect(header).toEqual('defaultToken');
  })

  it('should use token from provided token service', () => {
    // arrange
    TestBed.overrideProvider(AUTH_INTERCEPTOR_CONFIG, { useValue: { tokenProvider: new TokenProviderMock() } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get(defaultAuthConfig.headerName);
    expect(header).toEqual('Bearer mockToken');
  })
});

import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HeaderInterceptor } from "./header.interceptor";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HEADER_INTERCEPTOR_CONFIG, HttpHeader } from "./header.config";

describe('HeaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const headers: HttpHeader = {
    'Content-Type': 'application/json'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true
        },
        {
          provide: HEADER_INTERCEPTOR_CONFIG,
          useValue: {
            headers: headers
          }
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add headers to request', () => {
    // arrange
    const name = 'Content-Type';
    const value = 'application/json'

    // act
    httpClient.get('https://example.com').subscribe();

    // assert
    const req = httpMock.expectOne('https://example.com');
    const header = req.request.headers.get(name);
    expect(header).toBeDefined();
    expect(header).toBe(value);
  })
});

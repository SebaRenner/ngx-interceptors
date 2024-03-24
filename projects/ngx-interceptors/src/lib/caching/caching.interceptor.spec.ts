import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CachingInterceptor } from "./caching.interceptor";
import { CachingService } from "./services/caching.service";

describe('CachingInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CachingInterceptor,
          multi: true
        },
        CachingService
      ]
    });
    service = TestBed.inject(CachingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add successful request to cache', () => {
    // arrange
    const url = 'https://example.com';

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    const req = httpMock.expectOne(url);
    req.flush({}, { status: 200, statusText: 'Ok' });

    // assert
    const cacheEntry = service.get(url);
    expect(cacheEntry).toBeDefined();
    expect(cacheEntry?.ok).toBeTrue();
    expect(cacheEntry?.status).toBe(200);
    expect(cacheEntry?.statusText).toBe('Ok');
  });

  it('should return already cached response', () => {
    // arrange
    const url = 'https://example.com';

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    httpClient.get(url).subscribe();

    const req = httpMock.expectOne(url);
    req.flush({}, { status: 200, statusText: 'Ok' });

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectNone(url);
    expect(service.size).toBe(1);
  });
});

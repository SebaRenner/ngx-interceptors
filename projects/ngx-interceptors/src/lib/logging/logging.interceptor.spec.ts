import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';
import { LOGGING_INTERCEPTOR_CONFIG } from './logging.config';

describe('LoggingInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptor,
          multi: true
        }
      ]
    });

    // httpClient = TestBed.inject(HttpClient);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should log to console', () => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    const consoleSpy = spyOn(console, 'log');

    httpClient.get('https://example.com').subscribe();

    const req = httpMock.expectOne('https://example.com');
    expect(req.request.method).toEqual('GET');

    req.flush({});

    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should use default configuration when no configuration is passed', () => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    const consoleSpy = spyOn(console, 'log');

    httpClient.get('https://example.com').subscribe();

    const req = httpMock.expectOne('https://example.com');
    expect(req.request.method).toEqual('GET');

    req.flush({});

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(String), 'color: black');
  });

  it('should use provided configuration when configuration is passed', () => {
    TestBed.overrideProvider(LOGGING_INTERCEPTOR_CONFIG, { useValue: { color: 'green' } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    const consoleSpy = spyOn(console, 'log');

    httpClient.get('https://example.com').subscribe();

    const req = httpMock.expectOne('https://example.com');
    expect(req.request.method).toEqual('GET');

    req.flush({});

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(String), 'color: green');
  });
});

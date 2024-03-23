import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';
import { LOGGING_INTERCEPTOR_CONFIG, LoggingDateFormat, defaultLoggingConfig } from './logging.config';

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
    jasmine.clock().install();
  });

  afterEach(() => {
    httpMock.verify();
    jasmine.clock().uninstall();
  });

  it('should log once to console using default logging config', () => {
    // arrange
    const consoleSpy = spyOn(console, 'log');
    const dateTime = new Date(2024, 0, 1, 12, 0, 0);
    const url = 'https://example.com';
    const expectedLog = `[${dateTime.toISOString()}] [GET] ${url}`;
    jasmine.clock().mockDate(dateTime);

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectOne(url);
    expect(consoleSpy).toHaveBeenCalledOnceWith(`%c${expectedLog}`, `color: ${defaultLoggingConfig.color}`);
  });

  it('should log once to console in color provided in config', () => {
    // arrange
    const consoleSpy = spyOn(console, 'log');
    const url = 'https://example.com';
    TestBed.overrideProvider(LOGGING_INTERCEPTOR_CONFIG, { useValue: { color: 'green' } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectOne(url);
    expect(consoleSpy).toHaveBeenCalledOnceWith(jasmine.any(String), 'color: green');
  });

  it('should log once to console using date format provided in config', () => {
    // arrange
    const consoleSpy = spyOn(console, 'log');
    const dateTime = new Date(2024, 0, 1, 12, 0, 0);
    const url = 'https://example.com';
    const expectedLog = `[${dateTime.toUTCString()}] [GET] ${url}`;
    jasmine.clock().mockDate(dateTime);

    TestBed.overrideProvider(LOGGING_INTERCEPTOR_CONFIG, { useValue: { dateFormat: LoggingDateFormat.UTC } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectOne(url);
    expect(consoleSpy).toHaveBeenCalledOnceWith(`%c${expectedLog}`, `color: ${defaultLoggingConfig.color}`);
  });

  it('should log once to console because url matches filter', () => {
    // arrange
    const consoleSpy = spyOn(console, 'log');
    const url = 'https://example.com/api/users/1';
    const urlFilter = ['https://example.com/api'];

    TestBed.overrideProvider(LOGGING_INTERCEPTOR_CONFIG, { useValue: { urlFilter } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectOne(url);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should not log to console when doesnt url match filter', () => {
    // arrange
    const consoleSpy = spyOn(console, 'log');
    const url = 'https://example.com/api/messages';
    const urlFilter = ['https://example.com/api/users'];

    TestBed.overrideProvider(LOGGING_INTERCEPTOR_CONFIG, { useValue: { urlFilter } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get(url).subscribe();

    // assert
    httpMock.expectOne(url);
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});

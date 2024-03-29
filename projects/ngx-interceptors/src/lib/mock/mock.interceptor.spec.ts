import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { MockInterceptor } from "./mock.interceptor";
import { MOCK_INTERCEPTOR_CONFIG, defaultMockConfig } from "./mock.config";

describe('MockInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockInterceptor,
          multi: true
        }
      ]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the HttpResponse from the default config', done => {
    // arrange
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com', { observe: 'response' }).subscribe((response: HttpResponse<unknown>) => {
      // assert
      expect(response.ok).toBeTrue();
      expect(response.status).toEqual(defaultMockConfig.response.status);
      expect(response.statusText).toEqual(defaultMockConfig.response.statusText);
      expect(response.body).toEqual(defaultMockConfig.response.body)
      httpMock.expectNone('https://example.com');
      done();
    });
  });

  it('should return the HttpResponse from the injected config', done => {
    // arrange
    const users = [{ id: '1', name: 'user1' }, { id: '2', name: 'user2' }];
    const mockResponse = new HttpResponse({ status: 200, statusText: 'Ok', body: users })

    TestBed.overrideProvider(MOCK_INTERCEPTOR_CONFIG, { useValue: { response: mockResponse } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com', { observe: 'response' }).subscribe((response: HttpResponse<unknown>) => {
      // assert
      expect(response.status).toEqual(mockResponse.status);
      expect(response.statusText).toEqual(mockResponse.statusText);
      expect(response.body).toEqual(mockResponse.body)
      httpMock.expectNone('https://example.com');
      done()
    });
  });

  it('should return the HttpResponse after the specified delay', fakeAsync(() => {
    // arrange
    const delay = 1000;
    const mockResponse = new HttpResponse({ status: 200, statusText: 'Ok', body: 'Delayed response' });
    const startTime = Date.now();
    let responseReceived = false;

    TestBed.overrideProvider(MOCK_INTERCEPTOR_CONFIG, { useValue: { response: mockResponse, delay: delay } });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // act
    httpClient.get('https://example.com', { observe: 'response' }).subscribe((response: HttpResponse<unknown>) => {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toEqual(delay);
      expect(response.status).toEqual(mockResponse.status);
      expect(response.statusText).toEqual(mockResponse.statusText);
      expect(response.body).toEqual(mockResponse.body);
      responseReceived = true;
    });

    tick(delay - 1);
    expect(responseReceived).toBeFalse();
    tick(1);
    expect(responseReceived).toBeTrue();

    // assert
    httpMock.expectNone('https://example.com');
  }));
});

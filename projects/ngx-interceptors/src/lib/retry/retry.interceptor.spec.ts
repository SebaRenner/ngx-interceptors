import { TestBed } from "@angular/core/testing";
import { RetryInterceptor } from "./retry.interceptor";
import { RETRY_INTERCEPTOR_CONFIG } from "./retry.config";

describe('RetryInterceptor', () => {
  let interceptor: RetryInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetryInterceptor]
    });
  });

  it('should throw an error if retries are set to less than 0', () => {
    // arrange
    TestBed.overrideProvider(RETRY_INTERCEPTOR_CONFIG, { useValue: { retries: -1 } });

    // act & assert
    expect(() => {
      interceptor = TestBed.inject(RetryInterceptor);
    }).toThrowError('Sub zero retries or delay is not allowed');
  });

  it('should throw an error if delay is set to less than 0', () => {
    // arrange
    TestBed.overrideProvider(RETRY_INTERCEPTOR_CONFIG, { useValue: { delay: -1 } });

    // act & assert
    expect(() => {
      interceptor = TestBed.inject(RetryInterceptor);
    }).toThrowError('Sub zero retries or delay is not allowed');
  });

  it('should be constructed with default config', () => {
    // act
    interceptor = TestBed.inject(RetryInterceptor);

    // assert
    expect(interceptor).toBeDefined();
  })
});

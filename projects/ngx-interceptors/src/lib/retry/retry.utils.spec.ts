import { BackoffStrategy, RetryInterceptorConfig, defaultRetryConfig } from "./retry.config";
import { calcDelay } from "./retry.utils";

describe('calcDelay', () => {
  it('should return the fixed delay of the config', () => {
    // arrange
    const attempt = 2;
    const delay = 150;
    const config: RetryInterceptorConfig = {
      ...defaultRetryConfig,
      backoffStrategy: BackoffStrategy.Fixed,
      delay: delay,
      addJitter: false,
    };

    // act
    const result = calcDelay(attempt, config)

    // assert
    expect(result).toBe(delay);
  });

  it('should return the product of the attempt and the delay from the config', () => {
    // arrange
    const attempt = 2;
    const delay = 150;
    const expectedResult = attempt * delay;
    const config: RetryInterceptorConfig = {
      ...defaultRetryConfig,
      backoffStrategy: BackoffStrategy.Linear,
      delay: delay,
      addJitter: false,
    };

    // act
    const result = calcDelay(attempt, config)

    // assert
    expect(result).toBe(expectedResult);
  });

  it('should return the product of the exponential attempt and the delay from the config', () => {
    // arrange
    const attempt = 2;
    const delay = 150;
    const expectedResult = Math.pow(2, attempt) * delay;
    const config: RetryInterceptorConfig = {
      ...defaultRetryConfig,
      backoffStrategy: BackoffStrategy.Exponential,
      delay: delay,
      addJitter: false,
    };

    // act
    const result = calcDelay(attempt, config)

    // assert
    expect(result).toBe(expectedResult);
  });

  it('should add jitter', () => {
    // arrange
    const randomValue = 0.75;
    const jitterFactor = 5;
    spyOn(Math, 'random').and.returnValue(randomValue);

    const attempt = 2;
    const delay = 150;
    const jitter = (randomValue * 2 - 1) * jitterFactor;
    const expectedResult = delay + jitter;

    const config: RetryInterceptorConfig = {
      ...defaultRetryConfig,
      backoffStrategy: BackoffStrategy.Fixed,
      delay: delay,
      addJitter: true,
      jitterFactor: jitterFactor
    };

    // act
    const result = calcDelay(attempt, config)

    // assert
    expect(result).toBe(expectedResult);
  });
});

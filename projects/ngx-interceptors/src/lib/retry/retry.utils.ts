import { BackoffStrategy, RetryInterceptorConfig } from "./retry.config";

export const calcDelay = (attempt: number, config: RetryInterceptorConfig): number => {
  let delay = 0;
  switch (config.backoffStrategy) {
    case BackoffStrategy.Fixed:
      delay = config.delay;
      break;
    case BackoffStrategy.Linear:
      delay = attempt * config.delay
      break;
    case BackoffStrategy.Exponential:
      delay = Math.pow(2, attempt) * config.delay;
      break;
  }

  if (config.addJitter) {
    const jitter = (Math.random() * 2 - 1) * config.jitterFactor;
    delay = delay + jitter;
  }

  return delay;
}

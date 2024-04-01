# Retry Interceptor
Automatically retries sending failed requests.

## Configuration
The configuration of the logging interceptor can be overwritten by providing the `RETRY_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `retries` | `3` | The number of retries | 
| `delay` | `500` | The delay between each retry attempt in milliseconds. | 
| `backoffStrategy` | `BackoffStrategy.Fixed` | The strategy for calculating the delay between retry attempts. | 
| `addJitter` | `false` | Whether to add random jitter to each retry attempt.  | 
| `jitterFactor` | `10` | The magnitude of the random jitter to be added to each retry attempt (in milliseconds). | 

### BackoffStrategy Enum
| Option | Description |
|---|---|
| `Fixed` | Uses a fixed interval between each retry attempt. |
| `Linear` |	Increases the delay linearly with each retry attempt. |
| `Exponential` | Increases the delay exponentially with each retry attempt. |

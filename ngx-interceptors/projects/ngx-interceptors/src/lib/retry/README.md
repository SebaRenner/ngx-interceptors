# Retry Interceptor
Automatically retries sending failed requests.

## Configuration
The configuration of the logging interceptor can be overwritten by providing the `RETRY_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `retries` | `3` | The amount of retries | 
| `delay` | `500` | The delay between each retry | 

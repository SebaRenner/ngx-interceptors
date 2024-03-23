# Mock Interceptor
Instead of handling the request, the interceptor will return a custom `HttpResponse`.

## Configuration
The configuration of the mock interceptor can be overwritten by providing the `MOCK_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `response` | `new HttpResponse({ status: 204, statusText: 'No content', body: 'mock response' }),` | The response the mock interceptor should return  | 
| `delay` | `0` | Allows you to simulate network latency | 

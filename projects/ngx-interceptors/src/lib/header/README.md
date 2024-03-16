# Header Interceptor
Add custom headers to your outgoing requests.

## Configuration
The configuration of the header interceptor can be overwritten by providing the `HEADER_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `headers` | `{}` | A list of headers to be attach to your requests | 
| `enableDynamicHeaders` | `false` | If enabled, every request will get the current headers defined in the `DynamicHeaderService`, merge them with the static `headers` and add them to the outgoing request  | 

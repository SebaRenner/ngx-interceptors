# Caching Interceptor
Saves responses of requests into a cache and returns cached responses if another request is made to the same url.  

## Configuration
The configuration of the caching interceptor can be overwritten by providing the `CACHING_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `maxSize` | `200` | Max amount of cached request responses. Will throw an error if maxSize would be exceeded and no eviction policy is defined. |

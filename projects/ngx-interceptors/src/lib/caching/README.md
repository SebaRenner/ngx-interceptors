# Caching Interceptor
Saves responses of requests into a cache and returns cached responses if another request is made to the same url.  

## Configuration
The configuration of the caching interceptor can be overwritten by providing the `CACHING_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `maxSize` | `200` | Max amount of cached request responses. Will throw an error if maxSize would be exceeded and no eviction policy is defined. |
| `evictionPolicy` | `CacheEvictionPolicy.LRU` | The eviction policy defines which element should be removed when the cache would exceed the `maxSize` to make room for the new entry. |

### CacheEvictionPolicy Enum
| Option | Description |
|---|---|
| `None` | No element will be removed. If an entry is added and the cache has reached its maximum capacity, an error will be thrown |
| `LRU` | Removes the element that was accessed the least recent |
| `LFU` | Removes the element that was accessed the least frequent |
| `FIFO` | Removes the element that was added first  |

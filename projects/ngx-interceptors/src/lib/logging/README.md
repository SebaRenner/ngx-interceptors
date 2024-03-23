# Logging Interceptor
Logs the time, method and url of every outgoing request to the console.

## Configuration
The configuration of the logging interceptor can be overwritten by providing the `LOGGING_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `color` | `'black'` | The color of the log message |
| `dateFormat` | `LoggingDateFormat.ISO` | The format the of timestamp |
| `urlFilter` | `[]` | Only log to console when the request url starts with an element in the filter. If no filter is provided, all requests will be logged. |

### LoggingDateFormat Enum
| Option | Example | Description |
|---|---|---|
| `Default` | `Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)`  | Standard ECMA 262 Format. Timezone depends on browser locale |
| `ISO` | `1975-08-19T21:15:30.810Z` | ISO Format |
| `UTC` | `Tue, 19 Aug 1975 21:15:30 GMT` | UTC Format |
| `Locale` | `19.8.1975, 23:15:30` | Depending on your browser locale |

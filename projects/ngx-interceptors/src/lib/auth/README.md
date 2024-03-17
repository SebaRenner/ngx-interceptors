# Auth Interceptor
Adds an authentication token to outgoing requests.

## Configuration
The configuration of the auth interceptor can be overwritten by providing the `AUTH_INTERCEPTOR_CONFIG`.

| Field | Default | Description | 
|---|---|---|
| `tokenProvider` | `() => of('defaultToken')` | Provide an instance of an `AuthTokenProvider` |
| `headerName` | `'Authorization'` | Custom name for the auth header |
| `bearerPrefix` | `true` | Whether to add the `'Bearer '` prefix in front of the auth token or not |

## Token Provider Usage
Create a service that implements the `AuthTokenProvider` interface. The interface requires you to implement a `getToken()` function. 

```ts
@Injectable({
    providedIn: 'root'
})
export class CustomTokenProviderService implements AuthTokenProvider {
    getToken(): Observable<string> {
        // your logic for providing the auth token
        return of('yourToken');
    }
}
```

In your module or bootstrap function provide an instance of your service to the `AUTH_INTERCEPTOR_CONFIG`.

```ts
{
    provide: AUTH_INTERCEPTOR_CONFIG,
    useValue: {
        tokenProvider: new CustomTokenProviderService(),
        headerName: 'Authorization',
        bearerPrefix: true
    }
}
```


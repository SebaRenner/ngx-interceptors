# ngx-interceptors
Common HTTP Interceptors for Angular Applications. Available as HTTP Inteceptor class or function.

## Interceptors
- [AuthInterceptor](/ngx-interceptors/projects/ngx-interceptors/src/lib/auth/)
- [HeaderInterceptor](/ngx-interceptors/projects/ngx-interceptors/src/lib/header/)
- [LoggingInterceptor](/ngx-interceptors/projects/ngx-interceptors/src/lib/logging/)
- [RetryInterceptor](/ngx-interceptors/projects/ngx-interceptors/src/lib/retry/)

## Usage
Adding one or multiple interceptors to your application is done by registering them as providers. Either in your module class or for standalone projects in the bootstrap application function.

### Module based project
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Standalone project
#### HTTP Interceptor Class
```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true }
  ]
})
  .catch((err) => console.error(err));
```

#### HTTP Interceptor Function
```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([retryInterceptor])
    )
  ]
})
  .catch((err) => console.error(err));
```

## Configuration
Each interceptor comes with a custom configuration. You can overwrite the default configuration and provide your own values.

```ts
providers: [
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: {
        retries: 3,
        delay: 1000
      }
    }
  ]
```
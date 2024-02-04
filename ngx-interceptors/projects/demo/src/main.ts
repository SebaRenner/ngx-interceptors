import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOGGING_INTERCEPTOR_CONFIG, LoggingInterceptor } from '../../ngx-interceptors/src/public-api';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: LOGGING_INTERCEPTOR_CONFIG,
      useValue: {
        color: 'blue'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ]
})
  .catch((err) => console.error(err));

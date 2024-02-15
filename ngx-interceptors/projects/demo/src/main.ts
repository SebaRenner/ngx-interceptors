import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RETRY_INTERCEPTOR_CONFIG, retryInterceptor } from '../../ngx-interceptors/src/public-api';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([retryInterceptor])
    ),
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: {
        retries: 2,
        delay: 2000
      }
    }
  ]
})
  .catch((err) => console.error(err));

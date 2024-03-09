import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AUTH_INTERCEPTOR_CONFIG, authInterceptor } from '../../ngx-interceptors/src/public-api';
import { CustomTokenProviderService } from './app/custom-token-provider.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    {
      provide: AUTH_INTERCEPTOR_CONFIG,
      useValue: {
        tokenProvider: new CustomTokenProviderService()
      }
    }
  ]
})
  .catch((err) => console.error(err));

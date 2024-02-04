import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../../ngx-interceptors/src/public-api';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    )
  ]
})
  .catch((err) => console.error(err));

import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { PrimeNgModule } from './shared/primeng.module';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { Loading } from './features/todo/components/loading/loading';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(PrimeNgModule),
    provideAnimations(),
    MessageService,
  ]
};

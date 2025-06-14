import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PushPipe } from '@ngrx/component';
import { CommonModule } from '@angular/common';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { dashboardReducer } from '../store/dashboard/dashboard.reducer';
import { DashboardEffects } from '../store/dashboard/dashboard.effects'; // Uncomment if you have effects
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app-config.interface';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ dashboard: dashboardReducer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    provideEffects([DashboardEffects]),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: environment },
    
  ],
};

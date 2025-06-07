import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PushPipe } from '@ngrx/component';
import { CommonModule } from '@angular/common';

import { dashboardReducer } from '../store/dashboard/dashboard.reducer';
import { DashboardEffects } from '../store/dashboard/dashboard.effects'; // Uncomment if you have effects
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ dashboard: dashboardReducer }),
    provideEffects([DashboardEffects]),
    provideHttpClient(), 
    
  ],
};
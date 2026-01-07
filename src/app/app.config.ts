import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideAnimations } from '@angular/platform-browser/animations';
import* as Highcharts from 'highcharts';



export const appConfig: ApplicationConfig = {
 
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(),
    
    provideRouter(routes)
  ],

};

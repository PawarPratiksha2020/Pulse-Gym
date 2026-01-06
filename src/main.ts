import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideAnimations } from '@angular/platform-browser/animations';

ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(App, appConfig)

  .catch((err) => console.error(err));


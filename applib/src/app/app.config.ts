import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { IConfig, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

const maskConfig:Partial<IConfig> = {
  validation:false
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideEnvironmentNgxMask(maskConfig), provideHttpClient() ]
};

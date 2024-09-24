import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FilesEffects } from './store/effects';
import { siziboxReducer } from './store/reducers';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideStore(),
        provideEffects([FilesEffects]),
        provideState({
            name: 'siziboxStore',
            reducer: siziboxReducer
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        importProvidersFrom(
            StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: !isDevMode()
            })
        )
    ]
};

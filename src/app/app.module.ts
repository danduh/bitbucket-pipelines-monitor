import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BuildsModule} from './builds/builds.module';
import {CoreModule} from './core/core.module';
import {appRoutes} from './app.routes';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        BuildsModule,
        CoreModule,
        appRoutes
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuildsComponent} from './builds/builds.component';
import {buildsRoutes} from './builds.routes';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        buildsRoutes,
        SharedModule
    ],
    declarations: [
        BuildsComponent
    ]
})
export class BuildsModule {
}

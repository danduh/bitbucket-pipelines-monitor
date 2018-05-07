import {RouterModule, Routes} from '@angular/router';
import {BuildsComponent} from './builds/builds.component';

const routes: Routes = [
    {
        path: '',
        component: BuildsComponent
    },
    {
        path: ':buildId',
        component: BuildsComponent
    }
];

export const buildsRoutes = RouterModule.forChild(routes);

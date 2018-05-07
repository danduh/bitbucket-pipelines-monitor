import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: 'builds',
        loadChildren: './builds/builds.module#BuildsModule'
    },
    {path: '**', redirectTo: '/builds'}
];

export const appRoutes = RouterModule.forRoot(routes);

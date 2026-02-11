import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@auth/auth.routes';
import { ORGANIZATION_ROUTES } from '@organization/organization.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: AUTH_ROUTES,
    }, {
        path: 'organization',
        children: ORGANIZATION_ROUTES,
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];

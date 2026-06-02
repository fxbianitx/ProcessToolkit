import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@auth/auth.routes';
import { ORGANIZATION_ROUTES } from '@organization/organization.routes';
import { AppLayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    // AUTH (sin header)
    {
        path: 'auth',
        children: AUTH_ROUTES,
    },

    // APP (con header)
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            // puedes agrupar bajo /organization o dejarlo en raíz
            ...ORGANIZATION_ROUTES,

            // default cuando ya estás logueado (o cuando quieres llevar a orgs)
            { path: '', redirectTo: 'orgs', pathMatch: 'full' },
        ],
    },

    // fallback
    { path: '**', redirectTo: 'auth/login' },
];

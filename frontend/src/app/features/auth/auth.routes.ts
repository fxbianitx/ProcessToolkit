import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ProfileSetupComponent } from './pages/profile-setup/profile-setup.component';

export const AUTH_ROUTES: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    }, {
        path: 'login', 
        component: LoginComponent 
    }, {
        path: 'register', 
        component: RegisterComponent 
    }, {
        path: 'verify-email', 
        component: VerifyEmailComponent 
    }, {
        path: 'profile-setup', 
        component: ProfileSetupComponent 
    },
];

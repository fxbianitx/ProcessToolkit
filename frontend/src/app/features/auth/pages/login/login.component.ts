import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiInputComponent } from '@shared/components/ui-input/ui-input.component';
import { UiInputPasswordComponent } from '@shared/components/ui-input/ui-input-password.component';
import { LoginActionsComponent } from '@auth/components/login-actions/login-actions.component';
import { AuthHeaderComponent } from '@auth/components/auth-header/auth-header.component';
import { AuthFooterComponent } from '@auth/components/auth-footer/auth-footer.component';
import { LoginService } from '@auth/services/login.service';
import { UserMapper } from '@data/mappers/user.mapper';
import { map, switchMap } from 'rxjs';
import { AuthStateService } from '@auth/state/auth-state.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, CommonModule, ReactiveFormsModule, UiInputComponent, UiInputPasswordComponent, LoginActionsComponent, AuthHeaderComponent, AuthFooterComponent],
    templateUrl: './login.component.html'
})

//! Login Component
class LoginComponent {
    loginForm: FormGroup;
    formSubmitted: boolean = false;

    //! Constructor
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private authState: AuthStateService
    ) {
        // Inicializar formulario con las credenciales aplicando validaciones.
        this.loginForm = this.fb.group({
            email: this.fb.control<string>('', [Validators.required, Validators.email]),
            password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)])
        });
    }

    //! Obtener un FormControl de un formulario
    getControl(name: string): FormControl {
        return this.loginForm.get(name) as FormControl;
    }

    //! Inicio de sesión con credenciales
    onSubmitCredentials(): void {
        // Activar validaciones
        this.formSubmitted = true;

        // Validar formulario antes de continuar con el proceso de autenticación.
        if (this.loginForm.invalid) return;

        this.loginService.login(this.loginForm.value).pipe(
            switchMap(() => this.loginService.getCurrentUser()),
            map(dto => UserMapper.fromDto(dto))
        ).subscribe({
            next: user => this.authState.setUser(user),
            error: err => console.error('Error de login:', err)
        });
    }

    //! Inicio de sesion con google
    onClickGoogleAuth(): void {
        console.log('Iniciando flujo de Google OAuth...');
    }
}

export { LoginComponent };
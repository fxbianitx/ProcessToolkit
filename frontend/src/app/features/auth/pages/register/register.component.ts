import { Component } from '@angular/core';
import {
    FormBuilder, FormGroup, Validators, ReactiveFormsModule,
    FormControl, AbstractControl, ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { UiInputComponent } from '@shared/components/ui-input/ui-input.component';
import { UiInputPasswordComponent } from '@shared/components/ui-input/ui-input-password.component';
import { AuthHeaderComponent } from '@auth/components/auth-header/auth-header.component';
import { AuthFooterComponent } from '@auth/components/auth-footer/auth-footer.component';
import { RegisterActionsComponent } from '@auth/components/register-actions/register-actions.component';
import { AuthRegisterFlowState } from '@auth/state/auth-register-flow.service';
import { RegisterService } from '@auth/services/register.service';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const p = group.get('password')?.value;
    const c = group.get('passwordConfirmation')?.value;
    if (!p || !c) return null;
    return p === c ? null : { passwordMismatch: true };
}

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule,
        UiInputComponent, UiInputPasswordComponent,
        RegisterActionsComponent, AuthHeaderComponent, AuthFooterComponent
    ],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup;
    formSubmitted = false;
    isLoading = false;
    apiError: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private registerFlow: AuthRegisterFlowState,
        private registerService: RegisterService,
    ) {
        this.registerForm = this.fb.group({
            email: this.fb.control<string>('', [Validators.required, Validators.email]),
            password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
            passwordConfirmation: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
        }, { validators: passwordMatchValidator });
    }

    getControl(name: string): FormControl {
        return this.registerForm.get(name) as FormControl;
    }

    onSubmitRegister(): void {

        console.log('submit fired');

        this.formSubmitted = true;
        this.apiError = null;

        if (this.registerForm.invalid) return;
        if (this.isLoading) return;

        const email = this.registerForm.value.email as string;
        const password = this.registerForm.value.password as string;
        const password_confirmation = this.registerForm.value.passwordConfirmation as string;

        this.isLoading = true;

        this.registerService.start({ email, password, password_confirmation }).subscribe({
            next: (res) => {
                const token = res.data.registration_token;

                // Guarda en state el flujo (token + email + expires)
                this.registerFlow.start({
                    email: res.data.email,
                    registrationToken: token,
                    expiresAt: res.data.expires_at,
                });

                this.router.navigateByUrl('/auth/verify-email');
            },
            error: (err) => {
                // intenta leer mensaje de Laravel
                this.apiError =
                    err?.error?.message ??
                    err?.error?.errors?.email?.[0] ??
                    err?.error?.errors?.password?.[0] ??
                    'No se pudo iniciar el registro. Intenta nuevamente.';
                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    onClickGoogleAuth(): void {
        console.log('Google OAuth register...');
    }
}

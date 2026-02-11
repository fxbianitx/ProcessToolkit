import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UiInputComponent } from '@shared/components/ui-input/ui-input.component';
import { AuthRegisterFlowState } from '@auth/state/auth-register-flow.service';
import { RegisterService } from '@auth/services/register.service';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, UiInputComponent],
    templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
    email = '';
    submitted = false;
    isLoading = false;
    apiError: string | null = null;

    private registrationToken = '';

    codeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private registerFlow: AuthRegisterFlowState,
        private registerService: RegisterService
    ) {
        this.codeForm = this.fb.group({
            code: this.fb.control<string>('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern(/^\d{6}$/)
            ])
        });
    }

    ngOnInit(): void {
        const session = this.registerFlow.get();

        // Si no hay sesión, lo mandas al register (no puede verificar)
        if (!session?.registrationToken || !session?.email) {
            this.router.navigateByUrl('/auth/register');
            return;
        }

        this.email = session.email;
        this.registrationToken = session.registrationToken;
    }

    getControl(name: string): FormControl {
        return this.codeForm.get(name) as FormControl;
    }

    onSubmitCode(): void {
        this.submitted = true;
        this.apiError = null;

        if (this.codeForm.invalid) return;
        if (this.isLoading) return;

        const code = (this.codeForm.value.code as string).trim();

        this.isLoading = true;

        this.registerService.verify({
            registration_token: this.registrationToken,
            code,
        }).subscribe({
            next: () => {
                // verificado ✅
                this.router.navigateByUrl('/auth/profile-setup');
            },
            error: (err) => {
                // mensajes típicos de Laravel: message + errors
                this.apiError =
                    err?.error?.message ??
                    err?.error?.errors?.code?.[0] ??
                    'Código inválido o expirado. Intenta nuevamente.';

                // opcional: marcar el input como inválido para que se muestre errorMsg
                this.getControl('code').setErrors({ server: true });

                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    onResendCode(): void {
        this.apiError = null;

        if (!this.registrationToken) {
            this.apiError = 'Sesión inválida. Vuelve a registrarte.';
            return;
        }

        this.isLoading = true;

        this.registerService.resend({ registration_token: this.registrationToken }).subscribe({
            next: (res) => {
                // opcional: mostrar toast o mensaje
                console.log('Reenviado', res);
            },
            error: (err) => {
                this.apiError = err?.error?.message ?? 'No se pudo reenviar el código.';
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
        });
    }

}

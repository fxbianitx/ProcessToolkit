import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { UiInputComponent } from '@shared/components/ui-input/ui-input.component';
import { AuthRegisterFlowState } from '@auth/state/auth-register-flow.service';

@Component({
    selector: 'app-profile-setup',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, UiInputComponent],
    templateUrl: './profile-setup.component.html',
    animations: [
        trigger('fadeSlideIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ]
})
export class ProfileSetupComponent implements OnInit {
    email = '';
    submitted = false;

    profileForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private registerFlow: AuthRegisterFlowState
    ) {
        this.profileForm = this.fb.group({
            // username nullable en BD => opcional en frontend
            username: this.fb.control<string>('', [
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.pattern(/^[a-zA-Z0-9_]+$/)
            ]),
            first_name: this.fb.control<string>('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(60)
            ]),
            last_name: this.fb.control<string>('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(60)
            ]),
        });
    }

    ngOnInit(): void {
        // Si no hay draft del flujo, no deberían entrar acá

    }

    getControl(name: string): FormControl {
        return this.profileForm.get(name) as FormControl;
    }

    onSubmitProfile(): void {
        this.submitted = true;
        if (this.profileForm.invalid) return;

        const payload = this.profileForm.value as {
            username?: string;
            first_name: string;
            last_name: string;
        };

        // Limpieza: si username viene vacío, lo mandamos como null/undefined
        const cleaned = {
            ...payload,
            username: payload.username?.trim() ? payload.username.trim() : null,
            first_name: payload.first_name.trim(),
            last_name: payload.last_name.trim(),
        };

        // Por ahora mock: luego aquí llamaremos al backend (Laravel 12)
        console.log('ProfileSetup payload:', cleaned);

        // Cuando termine, ya podemos limpiar el draft del registro
        this.registerFlow.clear();

        // Redirección final (ajústalo a tu app)
        this.router.navigate(["/organization/orgs"]);
    }

    // Opcional: autogenerar username sugerido (sin backend)
    suggestUsername(): void {
        const first = (this.getControl('first_name').value || '').toString().trim().toLowerCase();
        const last = (this.getControl('last_name').value || '').toString().trim().toLowerCase();

        if (!first || !last) return;

        const base = `${first}.${last}`
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
            .replace(/[^a-z0-9.]/g, '')
            .replace(/\.+/g, '.')
            .slice(0, 20);

        // username es opcional: solo sugerimos si está vacío
        if (!this.getControl('username').value) {
            this.getControl('username').setValue(base.replace('.', '_'));
        }
    }
}

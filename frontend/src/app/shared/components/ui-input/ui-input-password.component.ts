import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui-input-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="flex flex-col w-full mb-5 text-left">
            <!-- Header: Label y extras -->
            <div class="flex justify-between items-center px-1 mb-1 min-h-[18px]">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {{ label }}
                </label>
                <ng-content select="[label-extra]"></ng-content>
            </div>

            <!-- Contenedor de la contraseña -->
            <div class="relative group">
                <input [type]="showPassword ? 'text' : type" 
                    [formControl]="control" 
                    [placeholder]="placeholder"
                    [attr.autocomplete]="autocomplete"
                    [ngClass]="{
                        'border-slate-200 focus:border-slate-900': !isInvalidState,
                        'border-red-400 bg-red-50/50 focus:border-red-500': isInvalidState,
                        'pr-12': type === 'password'
                    }"
                    class="w-full px-4 py-3.5 bg-white border rounded-2xl text-slate-900 text-sm outline-none transition-all duration-200 placeholder:text-slate-300" 
                />

                <!-- Botón del Ojo (Solo si el tipo original es password) -->
                <button 
                    type="button"
                    (click)="togglePassword()"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors outline-none"
                    tabindex="-1"
                >
                    <!-- Icono Ojo Abierto (Ver) -->
                    <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    
                    <!-- Icono Ojo Cerrado (Ocultar) -->
                    <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                </button>
            </div>

            <!-- Error Message -->
            <div *ngIf="isInvalidState" class="mt-2 px-1">
                <p class="text-[10px] text-red-500 font-bold uppercase leading-none">
                    ● {{ errorMsg }}
                </p>
            </div>
        </div>
    `
})
export class UiInputPasswordComponent {
    @Input() label: string = '';
    @Input() type: string = 'text';
    @Input() control!: FormControl;
    @Input() placeholder: string = '';
    @Input() errorMsg: string = '';
    @Input() submitted: boolean = false;
    @Input() autocomplete: 'new-password' | 'current-password' | 'password' | 'off' = 'new-password';


    showPassword = false;

    get isInvalidState(): boolean {
        return this.submitted && this.control.invalid;
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ui-login-actions',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="mt-4">
            <!-- Botón de Envío (Submit) -->
            <button type="submit" 
                class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.25em] transition-all duration-200 
                    hover:bg-slate-800 active:scale-[0.98] shadow-xl shadow-slate-200"
            >
                Iniciar sesión
            </button>

            <!-- Separador Visual -->
            <div class="flex items-center gap-3 my-2">
                <div class="flex-1 h-px bg-slate-200"></div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">o</span>
                <div class="flex-1 h-px bg-slate-200"></div>
            </div>

            <!-- Botón Social (Google) -->
            <button type="button"
                (click)="handleGoogleClick()"
                class="w-full py-3.5 border border-slate-300 rounded-2xl flex items-center justify-center gap-3
                    text-slate-700 font-bold text-[11px] uppercase tracking-wider
                    hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
                <img src="/assets/icons/google.svg" 
                    alt="Google" 
                    class="w-4 h-4" 
                    (error)="handleIconError($event)"
                />
                    Continuar con Google
            </button>
        </div>
    `
})
export class LoginActionsComponent {
    @Input() submitLabel: string = 'Iniciar Sesión';
    @Input() googleLabel: string = 'Iniciar sesión con Google';

    // Evento para que el padre maneje la lógica de Google
    @Output() googleClick = new EventEmitter<void>();

    handleGoogleClick() {
        this.googleClick.emit();
    }

    // Pequeño helper por si el icono no carga en local
    handleIconError(event: any) {
        event.target.style.display = 'none';
    }
}
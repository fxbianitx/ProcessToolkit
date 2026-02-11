import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ui-register-actions',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="mt-4">
            <button
                type="button"
                (click)="submitClick.emit()"
                class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.25em]
                    transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] shadow-xl shadow-slate-200"
            >
                {{ submitLabel }}
            </button>
        </div>
    `
})
export class RegisterActionsComponent {
    @Input() submitLabel: string = 'Crear cuenta';
    @Output() submitClick = new EventEmitter<void>();
    @Output() googleClick = new EventEmitter<void>();

    handleGoogleClick() {
        this.googleClick.emit();
    }

    handleIconError(event: any) {
        event.target.style.display = 'none';
    }
}

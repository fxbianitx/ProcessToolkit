import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-org-section-head',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './org-section-head.component.html',
})
export class OrgSectionHeadComponent {
    //! Definir título de sección
    @Input() title = '';

    //! Definir descripción opcional
    @Input() description?: string;

    //! Definir texto del botón
    @Input() actionLabel?: string;

    @Input() secondaryLabel?: string;

    @Output() secondary = new EventEmitter<void>();

    //! Emitir acción
    @Output() action = new EventEmitter<void>();

    //! Disparar acción
    onAction(): void {
        this.action.emit();
    }

    onSecondary(): void {
        this.secondary.emit();
    }
}

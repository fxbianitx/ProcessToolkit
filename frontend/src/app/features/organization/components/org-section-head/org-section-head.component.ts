import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-org-section-head",
    templateUrl: "./org-section-head.component.html",
})
export class OrgSectionHeadComponent {
    //! Definir título de sección
    @Input() title = "";

    //! Definir descripción opcional
    @Input() description?: string;

    //! Definir texto del botón
    @Input() actionLabel?: string;

    //! Emitir acción
    @Output() action = new EventEmitter<void>();

    //! Disparar acción
    onAction(): void {
        this.action.emit();
    }
}

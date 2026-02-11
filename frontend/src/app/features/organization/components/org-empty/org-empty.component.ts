import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-org-empty",
    templateUrl: "./org-empty.component.html",
})
export class OrgEmptyComponent {
    //! Definir título del empty state
    @Input() title = "Aún no tienes una organización";

    //! Definir descripción del empty state
    @Input() description = "Crea una para empezar a definir reglas y auditar ejecuciones.";

    //! Emitir evento para crear organización
    @Output() create = new EventEmitter<void>();

    //! Emitir click de crear
    onCreate(): void {
        this.create.emit();
    }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Organization } from "@data/models/organization.model";

@Component({
    selector: "app-org-card",
    templateUrl: "./org-card.component.html",
})
export class OrgCardComponent {
    //! Recibir organización a renderizar
    @Input() org!: Organization;

    //! Emitir evento cuando se seleccione organización
    @Output() selected = new EventEmitter<Organization>();

    //! Emitir selección
    select(): void {
        this.selected.emit(this.org);
    }
}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OrganizationFacade } from "../../services/organization-facade.service";

@Component({
    selector: "app-org-create",
    templateUrl: "./org-create.component.html",
})
export class OrgCreateComponent {
    //! Mantener nombre de la organización (form simple)
    name = "";

    //! Indicar estado de envío
    saving = false;

    constructor(private org: OrganizationFacade, private router: Router) { }

    //! Crear organización y redirigir al dashboard
    create(): void {
        const trimmed = this.name.trim();
        if (!trimmed) return;

        this.saving = true;

        this.org.createAndSelect$({ name: trimmed }).subscribe({
            next: (created) => {
                this.saving = false;
                this.router.navigate([`/org/${created.id}/dashboard`]);
            },
            error: () => (this.saving = false),
        });
    }
}

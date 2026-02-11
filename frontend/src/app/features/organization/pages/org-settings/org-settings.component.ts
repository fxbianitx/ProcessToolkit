import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Organization } from "@data/models/organization.model";
import { OrganizationApiService } from "../../services/organization-api.service";
import { OrganizationFacade } from "../../services/organization-facade.service";
import { OrgShellComponent } from "../../components/org-shell/org-shell.component";

@Component({
    selector: "app-org-settings",
    standalone: true,
    imports: [CommonModule, FormsModule, OrgShellComponent],
    templateUrl: "./org-settings.component.html",
})
export class OrgSettingsComponent implements OnInit, OnDestroy {
    //! Mantener organización actual
    org: Organization | null = null;

    //! Mantener campos editables
    name = "";

    //! Indicar estado de carga
    loading = true;

    //! Indicar estado de guardado
    saving = false;

    //! Mantener control de suscripciones
    private sub = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: OrganizationApiService,
        private facade: OrganizationFacade
    ) { }

    //! Cargar organización y rellenar formulario al iniciar
    ngOnInit(): void {
        const orgId = this.route.snapshot.paramMap.get("orgId");
        if (!orgId) {
            //! Redirigir si no existe orgId
            this.router.navigate(["/orgs"]);
            return;
        }

        this.loading = true;

        const s = this.api.getOrgById$(orgId).subscribe({
            next: (org) => {
                this.org = org;
                this.facade.select(org); // setear current org
                this.name = org.name;    // rellenar campo editable
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.router.navigate(["/orgs"]);
            },
        });

        this.sub.add(s);
    }

    //! Liberar recursos
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    //! Guardar cambios de configuración (v1: solo nombre)
    save(): void {
        if (!this.org) return;

        const trimmed = this.name.trim();
        if (!trimmed || trimmed === this.org.name) return;

        this.saving = true;
        // Por ahora, simular guardado local (para no romperte flujo)
        this.org = { ...this.org, name: trimmed };
        this.facade.select(this.org); // actualizar contexto
        this.saving = false;
    }

    //! Volver al dashboard
    back(): void {
        if (!this.org) {
            this.router.navigate(["/orgs"]);
            return;
        }
        this.router.navigate([`/org/${this.org.id}/dashboard`]);
    }
}

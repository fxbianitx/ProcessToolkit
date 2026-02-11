import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { Organization } from "@data/models/organization.model";
import { OrganizationApiService } from "../../services/organization-api.service";
import { OrganizationFacade } from "../../services/organization-facade.service";
import { OrgShellComponent } from "@organization/components/org-shell/org-shell.component";

@Component({
    selector: "app-org-dashboard",
    standalone: true,
    imports: [CommonModule, OrgShellComponent],
    templateUrl: "./org-dashboard.component.html",
})
export class OrgDashboardComponent implements OnInit, OnDestroy {
    //! Mantener organización actual cargada desde backend
    org: Organization | null = null;

    //! Indicar estado de carga
    loading = true;

    //! Mantener control de suscripciones
    private sub = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: OrganizationApiService,
        private facade: OrganizationFacade
    ) { }

    //! Cargar organización por orgId al iniciar
    ngOnInit(): void {
        const orgId = this.route.snapshot.paramMap.get("orgId");
        if (!orgId) {
            //! Redirigir si no existe orgId
            this.router.navigate(["/orgs"]);
            return;
        }

        this.loading = true;

        //! Obtener organización del backend y setearla como contexto actual
        const s = this.api.getOrgById$(orgId).subscribe({
            next: (org) => {
                this.org = org;
                this.facade.select(org); // setear current org en state
                this.loading = false;
            },
            error: () => {
                //! Si falla, volver al selector
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

    //! Navegar a configuración de la organización
    goSettings(): void {
        if (!this.org) return;
        this.router.navigate([`/org/${this.org.id}/settings`]);
    }

    //! Navegar a reglas (cuando lo implementes)
    goRules(): void {
        if (!this.org) return;
        // TODO: crea rutas rules y actualiza aquí
        // this.router.navigate([`/org/${this.org.id}/rules`]);
    }

    //! Navegar a auditoría (cuando lo implementes)
    goAudit(): void {
        if (!this.org) return;
        // TODO: crea rutas audit y actualiza aquí
        // this.router.navigate([`/org/${this.org.id}/audit`]);
    }

    //! Navegar a integración (cuando lo implementes)
    goIntegration(): void {
        if (!this.org) return;
        // TODO: crea rutas integration y actualiza aquí
        // this.router.navigate([`/org/${this.org.id}/integration`]);
    }
}

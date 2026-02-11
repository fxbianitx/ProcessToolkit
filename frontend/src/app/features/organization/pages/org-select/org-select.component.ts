import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

import { OrganizationFacade } from "../../services/organization-facade.service";
import { Organization } from "@data/models/organization.model";

// ✅ Componentes reutilizables
import { OrgShellComponent } from "../../components/org-shell/org-shell.component";
import { OrgSectionHeadComponent } from "../../components/org-section-head/org-section-head.component";
import { OrgEmptyComponent } from "../../components/org-empty/org-empty.component";
import { OrgCardComponent } from "../../components/org-card/org-card.component";

@Component({
    selector: "app-org-select",
    standalone: true,
    imports: [
        CommonModule,
        OrgShellComponent,
        OrgSectionHeadComponent,
        OrgEmptyComponent,
        OrgCardComponent,
    ],
    templateUrl: "./org-select.component.html",
})
export class OrgSelectComponent implements OnInit {
    //! Mantener lista de organizaciones del usuario
    orgs: Organization[] = [];

    //! Indicar estado de carga
    loading = true;

    constructor(private org: OrganizationFacade, private router: Router) { }

    //! Cargar organizaciones al iniciar
    ngOnInit(): void {
        this.org.listMyOrgs$().subscribe({
            next: (items) => {
                this.orgs = items;
                this.loading = false;

                //! Redirigir si solo existe una organización
                if (items.length === 1) {
                    this.select(items[0]);
                }
            },
            error: () => (this.loading = false),
        });
    }

    //! Seleccionar organización y navegar al dashboard
    select(item: Organization): void {
        this.org.select(item);
        this.router.navigate([`/org/${item.id}/dashboard`]);
    }

    //! Navegar a crear organización
    goCreate(): void {
        this.router.navigate(["/orgs/new"]);
    }
}

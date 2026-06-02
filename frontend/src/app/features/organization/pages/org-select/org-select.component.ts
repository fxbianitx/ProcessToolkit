import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrganizationFacade } from '../../services/organization-facade.service';
import { Organization } from '@data/models/organization.model';
import { OrgShellComponent } from '../../components/org-shell/org-shell.component';
import { OrgSectionHeadComponent } from '../../components/org-section-head/org-section-head.component';
import { OrgEmptyComponent } from '../../components/org-empty/org-empty.component';
import { OrgCardComponent } from '../../components/org-card/org-card.component';
import { OrgJoinPanelComponent } from '@organization/components/org-join-panel/org-join-panel.component';

type ViewMode = 'list' | 'join';

@Component({
    selector: 'app-org-select',
    standalone: true,
    imports: [
        CommonModule,
        OrgShellComponent,
        OrgSectionHeadComponent,
        OrgEmptyComponent,
        OrgCardComponent,
        OrgJoinPanelComponent,
    ],
    templateUrl: './org-select.component.html',
})
export class OrgSelectComponent implements OnInit {
    //! Mantener lista de organizaciones del usuario
    orgs: Organization[] = [];

    //! Indicar estado de carga
    loading = true;

    view: ViewMode = 'list';

    constructor(
        private org: OrganizationFacade,
        public router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

    //! Cargar organizaciones al iniciar
    ngOnInit(): void {
        this.loading = true;

        this.org
            .listMyOrgs$()
            .pipe(
                take(1),
                finalize(() => {
                    this.loading = false;
                    this.cdr.detectChanges(); // o markForCheck()
                }),
            )
            .subscribe({
                next: (items) => {
                    this.orgs = items;
                    // por si quieres render inmediato incluso antes del finalize
                    this.cdr.detectChanges();

                    if (items.length === 1) this.select(items[0]);
                },
                error: () => {
                    // finalize ya apaga loading
                    this.cdr.detectChanges();
                },
            });
    }

    //! Seleccionar organización y navegar al dashboard
    select(item: Organization): void {
        this.org.select(item);
        this.router.navigate([`/org/${item.id}/dashboard`]);
    }

    //! Navegar a crear organización
    goCreate(): void {
        this.router.navigate(['/orgs/new']);
    }

    //! Cambiar a panel de unirse a organizacion
    showJoin(): void {
        this.view = 'join';
    }

    //! Cambiar a penel de listado de organizaciones
    showList(): void {
        this.view = 'list';
    }
}

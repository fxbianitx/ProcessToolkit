import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationFacade } from '../../services/organization-facade.service';
import { OrgShellComponent } from '@organization/components/org-shell/org-shell.component';

@Component({
    selector: 'app-org-create',
    standalone: true,
    imports: [CommonModule, FormsModule, OrgShellComponent],
    templateUrl: './org-create.component.html',
})
export class OrgCreateComponent {
    //! Mantener nombre de la organización (form simple)
    name = '';

    //! Indicar estado de envío
    saving = false;

    setup = {
        enableAudit: true,
        inviteMembers: false,
        createSampleRules: true,
        require2FA: false,
        enableWebhooks: true,
    };

    settings = {
        timezone: 'America/Lima',
        currency: 'PEN',
        dataRetentionDays: 90,
        locale: 'es-PE',
        fiscalYearStartMonth: 1,
    };

    constructor(
        private org: OrganizationFacade,
        public router: Router,
    ) {}

    //! Crear organización y redirigir al dashboard
    create(): void {
        const trimmed = this.name.trim();
        if (!trimmed) return;

        this.saving = true;

        // Si tu backend todavía no recibe config, igual lo dejamos listo:
        const payload = {
            name: trimmed,
            setup: this.setup,
            settings: this.settings,
        };

        this.org.createAndSelect$(payload as any).subscribe({
            next: (created) => {
                this.saving = false;
                this.router.navigate([`/org/${created.id}/dashboard`]);
            },
            error: () => (this.saving = false),
        });
    }
}

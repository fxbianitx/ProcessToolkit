import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type FooterLink = { label: string; href: string };

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
})
export class AppFooterComponent {
    @Input() brand = 'ProcessTool';
    @Input() tagline = 'Business Rules & Audit';

    @Input() productLinks: FooterLink[] = [
        { label: 'Dashboard', href: '/orgs' },
        { label: 'Reglas', href: '/rules' },
        { label: 'Auditoría', href: '/audits' },
        { label: 'Seguridad', href: '/security' },
    ];

    @Input() companyLinks: FooterLink[] = [
        { label: 'Acerca', href: '/about' },
        { label: 'Roadmap', href: '/roadmap' },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Contacto', href: '/contact' },
    ];

    @Input() resourcesLinks: FooterLink[] = [
        { label: 'Documentación', href: '/docs' },
        { label: 'API', href: '/docs/api' },
        { label: 'Guías', href: '/docs/guides' },
        { label: 'Soporte', href: '/support' },
    ];

    // Puedes setear esto desde un servicio después
    @Input() statusLabel = 'All systems operational';
    @Input() statusTone: 'ok' | 'warn' | 'down' = 'ok';

    get statusDotClass() {
        switch (this.statusTone) {
            case 'warn':
                return 'bg-amber-500/80';
            case 'down':
                return 'bg-red-500/80';
            default:
                return 'bg-emerald-500/80';
        }
    }

    year = new Date().getFullYear();
}

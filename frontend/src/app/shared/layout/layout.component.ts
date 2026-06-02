import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
    animate,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { AppHeaderComponent } from './header/header.component';
import { AppFooterComponent } from './footer/footer.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AppHeaderComponent,
        AppSidebarComponent,
        AppFooterComponent
    ],
    templateUrl: './layout.component.html',
    animations: [
        // Drawer mobile (entra/sale)
        trigger('drawer', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('220ms cubic-bezier(.2,.9,.2,1)', style({ transform: 'translateX(0)' })),
            ]),
            transition(':leave', [
                animate('180ms cubic-bezier(.2,.9,.2,1)', style({ transform: 'translateX(-100%)' })),
            ]),
        ]),

        // Overlay fade
        trigger('overlay', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('160ms ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('140ms ease-in', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    userName = 'Fabián';
    userEmail = 'fabian@correo.com';
    orgName = 'Mi Organización';

    mobileSidebarOpen = false;
    isMobile = false;

    private mq!: MediaQueryList;
    private onMqChange!: (e: MediaQueryListEvent) => void;

    ngOnInit() {
        // lg en Tailwind empieza en 1024px, entonces mobile es <1024
        this.mq = window.matchMedia('(max-width: 1023.98px)');

        // set inicial (esto evita que quede mal al cargar)
        this.isMobile = this.mq.matches;

        // si pasas a desktop, cerramos drawer
        if (!this.isMobile) this.mobileSidebarOpen = false;

        // listener
        this.onMqChange = (e: MediaQueryListEvent) => {
            this.isMobile = e.matches;

            // si pasas a desktop, cierra drawer
            if (!this.isMobile) this.mobileSidebarOpen = false;

            // ✅ mejor que detectChanges() durante resize
            this.cdr.markForCheck();
        };

        // compat
        if (this.mq.addEventListener) this.mq.addEventListener('change', this.onMqChange);
        else this.mq.addListener(this.onMqChange as any);
    }

    ngOnDestroy() {
        if (!this.mq) return;
        if (this.mq.removeEventListener) this.mq.removeEventListener('change', this.onMqChange);
        else this.mq.removeListener(this.onMqChange as any);
    }

    onCreate() {
        // Por ahora: crear organización
        this.router.navigate(['/orgs/new']);
    }

    onOrg() {
        // Ir a selector de organizaciones
        this.router.navigate(['/orgs']);
    }

    onProfile() {
        // Si aún no tienes ruta de perfil, puedes mandar a profile-setup o settings
        this.router.navigate(['/auth/profile-setup']);
    }

    onLogout() {
        this.router.navigate(['/auth/login']);
    }

    toggleMobileSidebar() {
        if (!this.isMobile) return;
        this.mobileSidebarOpen = !this.mobileSidebarOpen;
    }

    closeMobileSidebar() {
        this.mobileSidebarOpen = false;
    }
}

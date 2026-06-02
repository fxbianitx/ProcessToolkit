import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderBrandComponent } from './brand/brand.component';
import { HeaderNavComponent } from './nav/nav.component';
import { HeaderSearchComponent } from './search/search.component';
import { HeaderUserMenuComponent } from './user-menu/user-menu.component';
import { HeaderMobileToggleComponent } from './mobile-toggle/mobile-toggle.component';
import { HeaderMobilePanelComponent } from './mobile-panel/mobile-panel.component';

type NavItem = { label: string; href: string; exact?: boolean };

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        HeaderBrandComponent,
        HeaderNavComponent,
        HeaderSearchComponent,
        HeaderUserMenuComponent,
        HeaderMobileToggleComponent,
        HeaderMobilePanelComponent,
    ],
    templateUrl: './header.component.html',
})
export class AppHeaderComponent {
    @Input() brand = 'ProcessTool';
    @Input() logoText = 'P'; // placeholder simple

    // nav configurable
    @Input() nav: NavItem[] = [
        { label: 'Dashboard', href: '/organization/orgs' },
        { label: 'Reglas', href: '/rules' },
        { label: 'Auditoría', href: '/audits' },
        { label: 'Docs', href: '/docs' },
    ];

    // org switcher (si luego conectas tu lista real)
    @Input() orgName?: string;

    // user
    @Input() userName?: string;
    @Input() userEmail?: string;

    // actions
    @Output() createClicked = new EventEmitter<void>();
    @Output() orgClicked = new EventEmitter<void>();
    @Output() profileClicked = new EventEmitter<void>();
    @Output() logoutClicked = new EventEmitter<void>();
    @Output() sidebarToggle = new EventEmitter<void>();


    mobileOpen = false;
    userMenuOpen = false;

    toggleMobile() {
        this.mobileOpen = !this.mobileOpen;
        if (!this.mobileOpen) this.userMenuOpen = false;
    }

    toggleUserMenu() {
        this.userMenuOpen = !this.userMenuOpen;
    }

    closeMenus() {
        this.mobileOpen = false;
        this.userMenuOpen = false;
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@shared/types/sidebar/sidebar.types';

import { SidebarBrandComponent } from './brand/brand.component';
import { SidebarOrgSwitcherComponent } from './org-switcher/org-switcher.component';
import { SidebarNavComponent } from './nav/nav.component';
import { SidebarCtaComponent } from './cta/cta.component';
import { SidebarUserCardComponent } from './user-card/user-card.component';
import { SidebarMobileDrawerComponent } from './mobile-drawer/mobile-drawer.component';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        SidebarBrandComponent,
        SidebarOrgSwitcherComponent,
        SidebarNavComponent,
        SidebarCtaComponent,
        SidebarUserCardComponent,
        SidebarMobileDrawerComponent,
    ],
    templateUrl: './sidebar.component.html',
})
export class AppSidebarComponent {
    @Input() brand = 'ProcessTool';
    @Input() logoText = 'P';
    @Input() orgName?: string;
    @Output() orgClicked = new EventEmitter<void>();

    // Nav
    @Input() nav: NavItem[] = [
        { label: 'Dashboard', href: '/orgs', icon: 'home' },
        { label: 'Reglas', href: '/rules', icon: 'rules' },
        { label: 'Auditoría', href: '/audits', icon: 'audit' },
        { label: 'Docs', href: '/docs', icon: 'docs' },
        { label: 'Settings', href: '/settings', icon: 'settings' },
    ];

    // Actions
    @Output() createClicked = new EventEmitter<void>();
    @Output() profileClicked = new EventEmitter<void>();
    @Output() logoutClicked = new EventEmitter<void>();

    // User
    @Input() userName?: string;
    @Input() userEmail?: string;

    // State
    @Input() collapsed = false;
    @Output() collapsedChange = new EventEmitter<boolean>();

    mobileOpen = false;

    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }

    openMobile() {
        this.mobileOpen = true;
    }

    closeMobile() {
        this.mobileOpen = false;
    }
}

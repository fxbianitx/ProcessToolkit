import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@shared/types/sidebar/sidebar.types';

import { SidebarBrandComponent } from '../brand/brand.component';
import { SidebarOrgSwitcherComponent } from '../org-switcher/org-switcher.component';
import { SidebarNavComponent } from '../nav/nav.component';
import { SidebarCtaComponent } from '../cta/cta.component';
import { SidebarUserCardComponent } from '../user-card/user-card.component';

@Component({
    selector: 'app-sidebar-mobile-drawer',
    standalone: true,
    imports: [
        CommonModule,
        SidebarBrandComponent,
        SidebarOrgSwitcherComponent,
        SidebarNavComponent,
        SidebarCtaComponent,
        SidebarUserCardComponent,
    ],
    templateUrl: './mobile-drawer.component.html',
})
export class SidebarMobileDrawerComponent {
    @Input() brand = 'ProcessTool';
    @Input() logoText = 'P';
    @Input() orgName?: string;
    @Input() nav: NavItem[] = [];
    @Input() userName?: string;
    @Input() userEmail?: string;

    @Output() close = new EventEmitter<void>();
    @Output() orgClicked = new EventEmitter<void>();
    @Output() createClicked = new EventEmitter<void>();
    @Output() profileClicked = new EventEmitter<void>();
    @Output() logoutClicked = new EventEmitter<void>();
}

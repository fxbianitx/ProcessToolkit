import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar-org-switcher',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './org-switcher.component.html',
})
export class SidebarOrgSwitcherComponent {
    @Input() orgName?: string;
    @Input() collapsed = false;

    @Output() orgClicked = new EventEmitter<void>();
}

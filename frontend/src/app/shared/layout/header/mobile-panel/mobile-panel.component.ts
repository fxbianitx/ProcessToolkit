import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@shared/types/header/header.types';

@Component({
    selector: 'app-header-mobile-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mobile-panel.component.html',
})
export class HeaderMobilePanelComponent {
    @Input() nav: NavItem[] = [];
    @Input() orgName?: string;

    @Output() org = new EventEmitter<void>();
    @Output() create = new EventEmitter<void>();
    @Output() profile = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
}

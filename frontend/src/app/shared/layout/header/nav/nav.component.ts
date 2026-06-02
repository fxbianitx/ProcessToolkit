import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavItem } from '@shared/types/header/header.types';

@Component({
    selector: 'app-header-nav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav.component.html',
})
export class HeaderNavComponent {
    @Input() nav: NavItem[] = [];
}

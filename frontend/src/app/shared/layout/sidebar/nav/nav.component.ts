import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavItem } from '@shared/types/sidebar/sidebar.types';

@Component({
    selector: 'app-sidebar-nav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav.component.html',
})
export class SidebarNavComponent {
    @Input() nav: NavItem[] = [];
    @Input() collapsed = false;

    iconPath(icon?: NavItem['icon']): string {
        switch (icon) {
            case 'home':
                return 'M10 2.75l6.5 5.5v8a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 0110.5 16.25v-2.5A1.75 1.75 0 008.75 12h-1.5A1.75 1.75 0 005.5 13.75v2.5A1.75 1.75 0 013.75 18H1.25A1.75 1.75 0 01-.5 16.25v-8L10 2.75z';
            case 'rules':
                return 'M4 3.5h12A1.5 1.5 0 0117.5 5v10A1.5 1.5 0 0116 16.5H4A1.5 1.5 0 012.5 15V5A1.5 1.5 0 014 3.5zm2.25 3h7.5M6.25 9h7.5M6.25 11.5h4.5';
            case 'audit':
                return 'M5 2.75h8A2.25 2.25 0 0115.25 5v12.25H5A2.25 2.25 0 012.75 15V5A2.25 2.25 0 015 2.75zm2 4h6m-6 3h6m-6 3h4';
            case 'docs':
                return 'M6 2.75h6.5L16.25 6.5V17A1.75 1.75 0 0114.5 18.75H6A1.75 1.75 0 014.25 17V4.5A1.75 1.75 0 016 2.75z';
            case 'settings':
                return 'M10 6.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm7 3l-1.2.7.05 1.4 1.1.85-1.5 2.6-1.3-.35-1.1.9.1 1.35H7.85l.1-1.35-1.1-.9-1.3.35-1.5-2.6 1.1-.85.05-1.4L3 9.25l1.5-2.6 1.3.35 1.1-.9L7.85 4.75h4.3l-.1 1.35 1.1.9 1.3-.35 1.5 2.6z';
            default:
                return 'M4 10h12';
        }
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar-user-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-card.component.html',
})
export class SidebarUserCardComponent {
    @Input() collapsed = false;
    @Input() userName?: string;
    @Input() userEmail?: string;

    @Output() profileClicked = new EventEmitter<void>();
    @Output() logoutClicked = new EventEmitter<void>();

    initial(): string {
        const s = (this.userName || 'U').trim();
        return (s[0] || 'U').toUpperCase();
    }
}

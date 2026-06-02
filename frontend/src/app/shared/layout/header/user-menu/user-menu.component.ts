import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header-user-menu',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-menu.component.html',
})
export class HeaderUserMenuComponent {
    @Input() open = false;
    @Input() userName?: string;
    @Input() userEmail?: string;

    @Output() toggle = new EventEmitter<void>();
    @Output() profile = new EventEmitter<void>();
    @Output() org = new EventEmitter<void>();
    @Output() logout = new EventEmitter<void>();

    initial(): string {
        const base = (this.userName || 'U').trim();
        return (base[0] || 'U').toUpperCase();
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar-cta',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cta.component.html',
})
export class SidebarCtaComponent {
    @Input() collapsed = false;
    @Output() createClicked = new EventEmitter<void>();
}

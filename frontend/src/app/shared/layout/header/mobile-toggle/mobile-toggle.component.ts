import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header-mobile-toggle',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mobile-toggle.component.html',
})
export class HeaderMobileToggleComponent {
    @Input() open = false;
    @Output() toggle = new EventEmitter<void>();
}

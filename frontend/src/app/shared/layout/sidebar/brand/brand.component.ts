import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-brand',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './brand.component.html',
})
export class SidebarBrandComponent {
    @Input() brand = 'ProcessTool';
    @Input() logoText = 'P';
    @Input() collapsed = false;
}

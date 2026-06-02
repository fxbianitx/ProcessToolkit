import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header-brand',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './brand.component.html',
})
export class HeaderBrandComponent {
    @Input() brand = 'ProcessTool';
    @Input() logoText = 'P';
}

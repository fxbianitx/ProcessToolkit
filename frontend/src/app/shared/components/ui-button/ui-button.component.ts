import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ui-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() type: 'submit' | 'button' = 'button';
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-org-join-code-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './org-join-code-input.component.html',
})
export class OrgJoinCodeInputComponent {
    @Input() applying = false;

    @Input() code = '';
    @Output() codeChange = new EventEmitter<string>();

    @Input() note = '';
    @Output() noteChange = new EventEmitter<string>();

    @Output() apply = new EventEmitter<void>();

    get codeOk(): boolean {
        return (this.code || '').trim().length >= 4;
    }
}

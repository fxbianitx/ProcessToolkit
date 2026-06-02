import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgJoinCodeInputComponent } from '../org-join-code-input/org-join-code-input.component';
import { OrgJoinStatusCardComponent } from '../org-join-status-card/org-join-status-card.component';

type JoinState = 'form' | 'sent';

@Component({
    selector: 'app-org-join-panel',
    standalone: true,
    imports: [CommonModule, FormsModule, OrgJoinCodeInputComponent, OrgJoinStatusCardComponent],
    templateUrl: './org-join-panel.component.html',
})
export class OrgJoinPanelComponent {
    @Output() back = new EventEmitter<void>();

    state: JoinState = 'form';
    code = '';
    note = '';

    // simula el "aplicar"
    applying = false;

    onApply(): void {
        if (!this.code || this.code.trim().length < 4) return;

        this.applying = true;

        // ✅ aquí luego llamas a tu API real
        setTimeout(() => {
            this.applying = false;
            this.state = 'sent';
        }, 700);
    }

    reset(): void {
        this.state = 'form';
        this.code = '';
        this.note = '';
    }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-org-join-status-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './org-join-status-card.component.html',
})
export class OrgJoinStatusCardComponent {
    @Input() title = 'Solicitud enviada';
    @Input() subtitle = '';
}

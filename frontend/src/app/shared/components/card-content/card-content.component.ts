import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-content',
    standalone: true,
    imports: [CommonModule],
            template: `
            <div
              [class]="
                'rounded-2xl border border-slate-200/70 bg-white/65 backdrop-blur-xl ' +
                'shadow-[0_1px_0_rgba(15,23,42,0.06),0_12px_28px_rgba(15,23,42,0.06)] ' +
                (className || '')
              "
            >
              <div class="p-5 sm:p-6">
                <ng-content></ng-content>
              </div>
            </div>
          `,})
export class CardContentComponent {
    @Input() className = '';
}

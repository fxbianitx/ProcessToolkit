import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header-search',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search.component.html',
})
export class HeaderSearchComponent {
    @Output() queryChange = new EventEmitter<string>();
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="flex flex-col w-full text-left" [ngClass]="noMargin ? '' : 'mb-5'">
            <div class="flex justify-between items-center px-1 mb-1 min-h-[18px]">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {{ label }}
                </label>
                <ng-content select="[label-extra]"></ng-content>
            </div>

            <input
                [type]="type"
                [formControl]="control"
                [placeholder]="placeholder"
                [attr.autocomplete]="autocomplete"
                [attr.name]="name"
                [ngClass]="{
                'border-slate-200 focus:border-slate-900': !isInvalidState,
                'border-red-400 bg-red-50/50 focus:border-red-500': isInvalidState
                }"
                class="w-full px-4 py-3.5 bg-white border rounded-2xl text-slate-900 text-sm outline-none transition-all duration-200 placeholder:text-slate-300"
            />

            <div *ngIf="isInvalidState" class="mt-2 px-1">
                <p class="text-[10px] text-red-500 font-bold uppercase leading-none">
                ● {{ errorMsg }}
                </p>
            </div>
        </div>
    `
})

export class UiInputComponent {
    @Input() label?: string = '';
    @Input() type: string = 'text';
    @Input() control!: FormControl;
    @Input() placeholder: string = '';
    @Input() submitted: boolean = false;
    @Input() errorMsg: string = '';

    @Input() noMargin: boolean = false;
    @Input() autocomplete: string | null = null;
    @Input() name: string | null = null;

    get isInvalidState(): boolean {
        return this.submitted && this.control.invalid;
    }
}


import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[autoFocus]',
})
export class AutoFocusDirective implements OnInit {

    constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) { }

    ngOnInit(): void {

        const tabindex: number = this.elementRef.nativeElement.tabIndex;

        if (tabindex === null || tabindex === undefined || tabindex < 0) {

            throw new Error('Elements with directive autoFocus should have a tabindex equal or greater than 0.');

        }
        this.elementRef.nativeElement.focus();

    }

}

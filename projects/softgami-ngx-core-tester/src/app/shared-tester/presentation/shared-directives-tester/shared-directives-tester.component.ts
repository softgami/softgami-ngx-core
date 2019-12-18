import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-shared-directives-tester',
    templateUrl: './shared-directives-tester.component.html',
    styleUrls: ['./shared-directives-tester.component.scss'],
})
export class SharedDirectivesTesterComponent implements OnInit {

    showFocusableElement = false;
    trimOnBlur = '';
    trimOnBlurControl: FormControl;
    formTrimOnBlur: FormGroup;
    formNumbersOnly: FormGroup;
    numbersOnlyControl: FormControl;
    numbersOnlyIntegersControl: FormControl;
    numbersOnly;
    numbersOnlyIntegers;
    @ViewChild('fTrimOnBlur', {static: false}) fTrimOnBlur: HTMLFormElement;
    @ViewChild('fNumbersOnly', {static: false}) fNumbersOnly: HTMLFormElement;

    constructor() {

        this.trimOnBlurControl = new FormControl(null);
        this.formTrimOnBlur = new FormGroup({
            trimOnBlurControl: this.trimOnBlurControl,
        });
        this.numbersOnlyControl = new FormControl(null);
        this.numbersOnlyIntegersControl = new FormControl(null);

        this.formNumbersOnly = new FormGroup({
            numbersOnlyControl: this.numbersOnlyControl,
            numbersOnlyIntegersControl: this.numbersOnlyIntegersControl,
        });

    }

    ngOnInit() {
    }

    typeOf(val: any) {
        return typeof val;
    }

}

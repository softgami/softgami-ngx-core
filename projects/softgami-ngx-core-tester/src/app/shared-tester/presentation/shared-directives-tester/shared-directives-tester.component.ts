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
    fractionDigitsControl: FormControl;
    numbersOnlyWithFractionDigitsControl: FormControl;
    numbersOnly;
    numbersOnlyIntegers;
    fractionDigits: number;
    @ViewChild('fTrimOnBlur', {static: false}) fTrimOnBlur: HTMLFormElement;
    @ViewChild('fNumbersOnly', {static: false}) fNumbersOnly: HTMLFormElement;

    constructor() {

        this.trimOnBlurControl = new FormControl(null);
        this.formTrimOnBlur = new FormGroup({
            trimOnBlurControl: this.trimOnBlurControl,
        });
        this.numbersOnlyControl = new FormControl(null);
        this.numbersOnlyIntegersControl = new FormControl(null);
        this.numbersOnlyWithFractionDigitsControl = new FormControl(null);
        this.fractionDigitsControl = new FormControl(null);

        this.formNumbersOnly = new FormGroup({
            numbersOnlyControl: this.numbersOnlyControl,
            numbersOnlyIntegersControl: this.numbersOnlyIntegersControl,
            fractionDigitsControl: this.fractionDigitsControl,
            numbersOnlyWithFractionDigitsControl: this.numbersOnlyWithFractionDigitsControl,
        });

    }

    ngOnInit() {
    }

    typeOf(val: any) {
        return typeof val;
    }

}

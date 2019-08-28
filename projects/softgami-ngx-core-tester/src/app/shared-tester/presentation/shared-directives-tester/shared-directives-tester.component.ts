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
    @ViewChild('fTrimOnBlur', {static: false}) fTrimOnBlur: HTMLFormElement;

    constructor() {

        this.trimOnBlurControl = new FormControl(null);
        this.formTrimOnBlur = new FormGroup({
            trimOnBlurControl: this.trimOnBlurControl,
        });

    }

    ngOnInit() {
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DateValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/date.validator';
import { EmailValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/email.validator';
import { MatchOtherValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/match-other.validator';
import { NoWhitespaceValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/no-whitespace.validator';
import { PhoneValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/phone.validator';
import { TaxNumberValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/tax-number.validator';

@Component({
    selector: 'app-shared-validators-tester',
    templateUrl: './shared-validators-tester.component.html',
    styleUrls: ['./shared-validators-tester.component.scss'],
})
export class SharedValidatorsTesterComponent implements OnInit {

    form: FormGroup;
    date: FormControl;
    email: FormControl;
    firstInput: FormControl;
    secondInput: FormControl;
    whitespace: FormControl;
    phone: FormControl;
    taxNumber: FormControl;
    phoneTemplateDrivenModel: string;
    dateTemplateDrivenModel: string;
    emailTemplateDrivenModel: string;
    firstTemplateDrivenModel: string;
    secondTemplateDrivenModel: string;
    whitespaceTemplateDrivenModel: string;

    @ViewChild('f', {static: false}) f: HTMLFormElement;

    constructor() {

        this.date = new FormControl(null,
            [
                Validators.required,
                DateValidator(),
            ],
        );
        this.email = new FormControl(null,
            [
                Validators.required,
                EmailValidator(),
            ],
        );
        this.firstInput = new FormControl(null,
            [
                Validators.required,
            ],
        );
        this.secondInput = new FormControl(null,
            [
                Validators.required,
                MatchOtherValidator(this.firstInput),
            ],
        );
        this.whitespace = new FormControl(null,
            [
                Validators.required,
                NoWhitespaceValidator(),
            ],
        );
        this.phone = new FormControl(null,
            [
                Validators.required,
                PhoneValidator(),
            ],
        );
        this.taxNumber = new FormControl(null,
            [
                Validators.required,
                TaxNumberValidator(),
            ],
        );

        this.form = new FormGroup({
            date: this.date,
            email: this.email,
            firstInput: this.firstInput,
            secondInput: this.secondInput,
            whitespace: this.whitespace,
            phone: this.phone,
            taxNumber: this.taxNumber,
        });

    }

    ngOnInit() { }

}

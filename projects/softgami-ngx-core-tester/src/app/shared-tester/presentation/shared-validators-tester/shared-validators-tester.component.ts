import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DateValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/date.validator';
import { DuplicatedValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/duplicated.validator';
import { EmailValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/email.validator';
import { MatchOtherValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/match-other.validator';
import { NoWhitespaceValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/no-whitespace.validator';
import { PasswordValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/password.validator';
import { PhoneValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/phone.validator';
import { TaxNumberValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/tax-number.validator';
import { ZipCodeValidator } from 'projects/softgami-ngx-core/src/lib/softgami-shared/validators/zip-code.validator';

@Component({
    selector: 'app-shared-validators-tester',
    templateUrl: './shared-validators-tester.component.html',
    styleUrls: [ './shared-validators-tester.component.scss' ],
})
export class SharedValidatorsTesterComponent {

    form: FormGroup;
    date: FormControl;
    email: FormControl;
    firstInput: FormControl;
    secondInput: FormControl;
    whitespace: FormControl;
    phone: FormControl;
    taxNumber: FormControl;
    duplicated: FormControl;
    password: FormControl;
    zipCode: FormControl;

    phoneTemplateDrivenModel: string | undefined;
    dateTemplateDrivenModel: string | undefined;
    emailTemplateDrivenModel: string | undefined;
    firstTemplateDrivenModel: string | undefined;
    secondTemplateDrivenModel: string | undefined;
    whitespaceTemplateDrivenModel: string | undefined;
    taxNumberTemplateDrivenModel: string | undefined;
    duplicatedTemplateDrivenModels: {
        number: number | null;
    }[] = [
        {
            number: null,
        },
        {
            number: null,
        },
    ];

    passwordTemplateDrivenModel: string | undefined;
    zipCodeTemplateDrivenModel: string | undefined;

    @ViewChild('f', { static: false }) f: HTMLFormElement | undefined;

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
                TaxNumberValidator(undefined, true),
            ],
        );
        this.duplicated = new FormControl(null,
            [
                Validators.required,
                DuplicatedValidator<string>(0, [ '123', '1234' ]),
            ],
        );
        this.password = new FormControl(null,
            [
                Validators.required,
                PasswordValidator(),
            ],
        );
        this.zipCode = new FormControl(null,
            [
                Validators.required,
                ZipCodeValidator(),
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
            duplicated: this.duplicated,
            password: this.password,
            zipCode: this.zipCode,
        });

    }

}

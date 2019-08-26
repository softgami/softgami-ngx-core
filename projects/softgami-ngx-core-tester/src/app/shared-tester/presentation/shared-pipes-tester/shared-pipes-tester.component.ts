import { Component } from '@angular/core';

@Component({
    selector: 'app-shared-pipes-tester',
    templateUrl: './shared-pipes-tester.component.html',
    styleUrls: ['./shared-pipes-tester.component.scss'],
})
export class SharedPipesTesterComponent {

    elementsList: any[] = [
        {
            user: {
                name: 'Jules Verne',
                age: 1,
            },
        },
        {
            user: {
                name: 'Edgar Allan Poe',
                age: 1,
            },
        },
        {
            user: {
                name: 'Arthur Conan Doyle',
                age: 1,
            },
        }
    ];

    constructor() {


    }

}

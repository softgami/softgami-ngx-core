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
                age: 10,
                valid: true,
            },
        },
        {
            user: {
                name: 'Edgar Allan Poe',
                age: 11,
                valid: false,
            },
        },
        {
            user: {
                name: 'Arthur Conan Doyle',
                age: 12,
                valid: true,
            },
        }
    ];

}

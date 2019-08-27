import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shared-directives-tester',
    templateUrl: './shared-directives-tester.component.html',
    styleUrls: ['./shared-directives-tester.component.scss'],
})
export class SharedDirectivesTesterComponent implements OnInit {

    showFocusableElement = false;

    constructor() { }

    ngOnInit() {
    }

}

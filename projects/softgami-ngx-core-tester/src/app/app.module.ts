import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreTesterModule } from './core-tester/core-tester.module';
import { Html5StorageTesterModule } from './html5-storage-tester/html5-storage-tester.module';
import { SharedTesterModule } from './shared-tester/shared-tester.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreTesterModule,
        FormsModule,
        Html5StorageTesterModule,
        ReactiveFormsModule,
        SharedTesterModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule { }

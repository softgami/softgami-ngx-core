import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreTesterModule } from './core-tester/core-tester.module';
import { Html5StorageTesterModule } from './html5-storage-tester/html5-storage-tester.module';
import { SharedTesterModule } from './shared-tester/shared-tester.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CoreTesterModule,
        FormsModule,
        Html5StorageTesterModule,
        ReactiveFormsModule,
        SharedTesterModule,
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}

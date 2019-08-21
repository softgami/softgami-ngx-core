import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Html5StorageTesterModule } from './html5-storage-tester/html5-storage-tester.module';
import { SharedTesterModule } from './shared-tester/shared-tester.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        // SoftgamiCoreModule.forRoot(CoreService),
        BrowserModule,
        FormsModule,
        Html5StorageTesterModule,
        ReactiveFormsModule,
        SharedTesterModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    /*constructor(injector: Injector) {
        SoftgamiCoreModule.setInjector(injector);
    }*/
}

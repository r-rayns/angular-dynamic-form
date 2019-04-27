import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './mat-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormListDemoComponent } from './components/form-demos/list-demo/form-list-demo.component';
import { FormListComponent } from './components/dynamic-form/form-types/list/form-list.component';
import { DynamicFormControlComponent } from './components/dynamic-form/form/dynamic-form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormListDemoComponent,
    DynamicFormControlComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

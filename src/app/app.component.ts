import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SelectControl } from './components/dynamic-form/controls/types/select-control';
import { InputControl } from './components/dynamic-form/controls/types/input-control';
import { CheckboxControl } from './components/dynamic-form/controls/types/checkbox-control';
import { BasicControl } from './components/dynamic-form/controls/control-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {}

import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ControlBase } from './control-base';

@Injectable()
export class ControlService {
  constructor() {
  }

  toFormGroup(controls: ControlBase<any>[]) {
    const controlGroup: any = {};

    controls.forEach(control => {
      if (control.visible) {
        controlGroup[ control.key ] = this.createFormControl(control);
      }
    });
    return new FormGroup(controlGroup);
  }

  createFormControl(control: ControlBase<any>): FormControl {
    const newControl = new FormControl(control.value);
    const validators: ValidatorFn[] = [];
    if (control.required) {
      validators.push(Validators.required);
    }

    if (control.disabled) {
      newControl.disable();
    }

    if (control.validators) {
      validators.push(...control.validators);
    }
    newControl.setValidators(validators);
    return newControl;
  }

  resetValidators(formControl: AbstractControl, control: ControlBase<any>): void {
    const validators: ValidatorFn[] = [];
    formControl.clearValidators();
    if (control.required) {
      validators.push(Validators.required);
    }

    if (control.validators) {
      validators.push(...control.validators);
    }
    formControl.setValidators(validators);
    formControl.updateValueAndValidity();
  }
}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AllControlTypes } from '../controls/control-base';

@Component({
  selector: 'dyn-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
  @Input() control: AllControlTypes;
  @Input() form: FormGroup;

  get isValid() {
    if (this.form.controls[ this.control.key ]) {
      return this.form.controls[ this.control.key ].valid;
    }
    // control not in form group, return valid
    return true;
  }

  protected getErrorMessage(error: object, controlName: string): string {
    if (!error) {
      return;
    }
    const messages: { [ key: string ]: string } = {
      required: `${ controlName } is required`,
      minlength: `${ controlName } is too short`,
      maxlength: `${ controlName } is too long`,
      pattern: `${ controlName } is not a valid format`,
      email: `Please enter a valid email address`
    };
    const errorName: string = Object.keys(error)[ 0 ];
    return messages[ errorName ];
  }

  protected formatPlaceholder(control: AllControlTypes): string {
    if (control.required) {
      return `${ control.placeholder }*`;
    } else {
      return control.placeholder;
    }

  }
}

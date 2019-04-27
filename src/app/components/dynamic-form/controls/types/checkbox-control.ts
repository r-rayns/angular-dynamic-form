import { BasicControl, ControlBase } from '../control-base';
import { Control } from '../control-types-enums';

export class CheckboxControl extends ControlBase <string> {
  type: string;
  checked: boolean;

  constructor(options: CheckboxControlInterface) {
    super(Object.assign(options, { controlType: Control.CHECKBOX }));
    this.type = 'checkbox';
    this.checked = options.checked || false;
  }
}

export interface CheckboxControlInterface extends BasicControl<string> {
  checked?: boolean;
}

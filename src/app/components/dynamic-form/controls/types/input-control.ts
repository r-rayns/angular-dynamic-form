import { BasicControl, ControlBase } from '../control-base';
import { Control } from '../control-types-enums';

export class InputControl extends ControlBase <string> {
  type: string;

  constructor(options: InputControlInterface) {
    super(Object.assign(options, { controlType: Control.INPUT }));
    this.type = options.type || '';
  }
}

export interface InputControlInterface extends BasicControl<string> {
  type: string;
}

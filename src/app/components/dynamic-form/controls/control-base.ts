import { InputControlInterface } from './types/input-control';
import { SelectControlInterface } from './types/select-control';
import { CheckboxControlInterface } from './types/checkbox-control';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MultiSelectControlInterface } from './types/multi-select-control';
import { Control } from './control-types-enums';

export class ControlBase<T> {
  value: T;
  key: string;
  placeholder: string;
  visible: boolean;
  visibleIf: VisibleIf[];
  required: boolean;
  requiredIf: RequiredIf[];
  controlType: Control;
  disabled: boolean;
  disabledIf: DisabledIf[];
  childButton: { name: string, onClick: (control: AbstractControl) => void };
  validators: ValidatorFn[];

  constructor(options: BasicControl<T>) {
    this.value = options.value || null;
    this.key = options.key || '';
    this.placeholder = options.placeholder || '';
    this.visible = options.visible === undefined ? true : options.visible;
    this.visibleIf = options.visibleIf || null;
    this.required = !!options.required;
    this.requiredIf = options.requiredIf || null;
    this.controlType = options.controlType || null;
    this.disabled = options.disabled === undefined ? false : options.disabled;
    this.disabledIf = options.disabledIf || null;
    this.childButton = options.childButton || null;
    this.validators = options.validators || [];
  }
}

export interface BasicControl<T> {
  key: string;
  placeholder: string;
  visible?: boolean;
  visibleIf?: VisibleIf[];
  controlType?: Control;
  value?: T;
  required?: boolean;
  requiredIf?: RequiredIf[];
  disabled?: boolean;
  disabledIf?: DisabledIf[];
  childButton?: { name: string, onClick: (control: AbstractControl) => void };
  validators?: ValidatorFn[];
}

export interface VisibleIf {
  [ key: string ]: (value: any) => boolean;
}

export interface DisabledIf {
  [ key: string ]: (value: any) => boolean;
}

export interface RequiredIf {
  [ key: string ]: (value: any) => boolean;
}

export type ConditionalIf = VisibleIf | DisabledIf;

export type AllControlTypes =
  InputControlInterface &
  SelectControlInterface &
  CheckboxControlInterface &
  MultiSelectControlInterface;

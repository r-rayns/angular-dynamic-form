import { AfterViewInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { ConditionalIf, ControlBase } from '../controls/control-base';
import { ControlService } from '../controls/control.service';
import { SelectControl } from '../controls/types/select-control';
import { MultiSelectControl } from '../controls/types/multi-select-control';
import { Control } from '../controls/control-types-enums';

export class DynamicFormAbstract implements AfterViewInit {

  @Input() set controls(controls: ControlBase<any>[]) {
    if (controls && controls.length > 0) {
      this.formControls = controls;
      this.setupForm();
    }
  }

  public formControls: ControlBase<any>[] = [];
  private selectControls: Control[] = [ Control.SELECT, Control.MULTISELECT ];
  form: FormGroup;
  payLoad = '';

  constructor(protected controlService: ControlService) {
  }

  setupForm() {
    this.form = this.controlService.toFormGroup(this.formControls);
    this.formUpdateCycle();
    this.formControls.forEach((control) => {
      if (this.selectControls.includes(control.controlType) && control.visible) {
        this.updateSelectChoices(control as SelectControl);
      }
    });
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((changes) => {
      console.log(changes);
      this.formUpdateCycle();
    });

  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  formUpdateCycle(): void {
    this.formControls.forEach((control) => {
      if (control.visibleIf) {
        this.updateVisibleIf(control);
      }
      if (control.requiredIf) {
        this.updateRequiredIf(control);
      }
      if (control.disabledIf && this.form.get(control.key)) {
        this.updateDisabledIf(control);
      }
    });
  }

  updateVisibleIf(control: ControlBase<any>) {
    this.loopOverConditionalGroups(control, control.visibleIf, this.makeControlVisible, this.hideControl);
  }

  updateDisabledIf(control: ControlBase<any>): void {
    this.loopOverConditionalGroups(control, control.disabledIf, this.disableControl, this.enableControl);
  }

  updateRequiredIf(control: ControlBase<any>): void {
    this.loopOverConditionalGroups(control, control.requiredIf, this.makeControlRequired, this.makeControlOptional);
  }

  // Conditional Group(s) are defined on the control object. Each group is an array of objects, the keys in the object
  // are strings that relate to a key of a sibling control, the property assigned to each key is a function that
  // returns a boolean value. The function takes the value of the sibling control (defined in the key) as an argument
  // and uses it to evaluate the condition and returns a boolean value.
  // The outcome of the evaluation effects some properties on the control on which the conditional group(s) is/are defined.
  loopOverConditionalGroups(control: ControlBase<any>,
                            conditional: ConditionalIf[],
                            onConditionTrue: (control) => void,
                            onConditionFalse: (control) => void) {
    for (let i = 0; i < conditional.length; i++) {
      const siblingKeys: string[] = Object.keys(conditional[ i ]);
      if (this.checkValuesOfConditionalGroup(conditional[ i ], siblingKeys)) {
        onConditionTrue.call(this, control);
        return;
      } else if (i === conditional.length - 1) {
        // only performed when we have reached the last group without a truthy result
        onConditionFalse.call(this, control);
      }
    }
  }

  // Takes a conditional group and recursively evaluates each function assigned to each property in the object
  // Returns truthy if all functions (conditions) evaluate to true
  checkValuesOfConditionalGroup(conditionalGroup: ConditionalIf, siblingKeys: string[], index = 0): boolean {
    if (siblingKeys.length === index) {
      return true;
    }
    const siblingKey: string = siblingKeys[ index ];
    const siblingControl: AbstractControl = this.form.get(siblingKey);
    const conditionalFn = conditionalGroup[ siblingKey ];
    if (siblingControl && conditionalFn(siblingControl.value)) {
      return this.checkValuesOfConditionalGroup(conditionalGroup, siblingKeys, ++index);
    } else {
      return false;
    }
  }

  makeControlVisible(control: ControlBase<any>): void {
    control.visible = true;
    if (!this.form.get(control.key)) {
      const newControl: FormControl = this.controlService.createFormControl(control);
      this.form.addControl(control.key, newControl);
    }
  }

  hideControl(control: ControlBase<any>): void {
    control.visible = false;
    if (this.form.get(control.key)) {
      this.form.removeControl(control.key);
    }
  }

  makeControlRequired(control: ControlBase<any>): void {
    if (!control.required) {
      control.required = true;
      const formControl: AbstractControl = this.form.get(control.key);
      this.controlService.resetValidators(formControl, control);
    }
  }

  makeControlOptional(control: ControlBase<any>): void {
    if (control.required) {
      control.required = false;
      const formControl: AbstractControl = this.form.get(control.key);
      this.controlService.resetValidators(formControl, control);
    }
  }

  enableControl(control: ControlBase<any>): void {
    const formControl: AbstractControl = this.form.get(control.key);
    if (formControl.disabled) {
      formControl.enable();
    }
  }

  disableControl(control: ControlBase<any>): void {
    const formControl: AbstractControl = this.form.get(control.key);
    if (!formControl.disabled) {
      formControl.disable();
    }
  }

  updateSelectChoices(selectControl: SelectControl | MultiSelectControl) {
    if (selectControl.updateChoicesOnChange) {
      const siblingKey = selectControl.updateChoicesOnChange.siblingKey;
      this.form.get(siblingKey).valueChanges
        .subscribe((newValue) => {
          const updatedChoices = selectControl.updateChoicesOnChange.action(newValue);
          selectControl.choices = updatedChoices;
          this.form.patchValue({ [ selectControl.key ]: selectControl.value });
          this.form.updateValueAndValidity();
        });
      // force an update to the subscription above...
      // so correct value is used on load
      this.form.get(siblingKey).updateValueAndValidity();
    }
  }
}


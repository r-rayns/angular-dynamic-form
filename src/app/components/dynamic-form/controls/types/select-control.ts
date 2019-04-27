import { BasicControl, ControlBase } from '../control-base';
import { Control } from '../control-types-enums';

export class SelectControl extends ControlBase <any> {
  choices: {}[] = [];
  propertyNameForDisplay = '';
  onSelect: (event: any) => void;
  updateChoicesOnChange: { siblingKey: string, action: (siblingValue: any) => any };

  constructor(options: SelectControlInterface) {
    super(Object.assign(options, { controlType: Control.SELECT }));
    this.choices = options.choices || [];
    this.propertyNameForDisplay = options.propertyNameForDisplay,
      this.onSelect = options.onSelect || (() => {
      });
    this.updateChoicesOnChange = options.updateChoicesOnChange || null;
  }
}

export interface SelectControlInterface extends BasicControl<any> {
  choices: {}[];
  propertyNameForDisplay: string;
  onSelect?: (event: any) => void;
  updateChoicesOnChange?: { siblingKey: string, action: (siblingValue: any) => any };
}

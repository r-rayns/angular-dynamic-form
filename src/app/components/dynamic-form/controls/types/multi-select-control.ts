import { BasicControl, ControlBase } from '../control-base';
import { Control } from '../control-types-enums';

export class MultiSelectControl extends ControlBase <any> {
  choices: {}[] = [];
  propertyNameForDisplay = '';
  onSelect: (event: any) => void;
  updateChoicesOnChange: { siblingKey: string, action: (siblingValue: any) => any };

  constructor(options: MultiSelectControlInterface) {
    super(Object.assign(options, { controlType: Control.MULTISELECT }));
    this.choices = options.choices || [];
    this.propertyNameForDisplay = options.propertyNameForDisplay;
    this.onSelect = options.onSelect || (() => {
    });
    this.updateChoicesOnChange = options.updateChoicesOnChange || null;
  }
}

export interface MultiSelectControlInterface extends BasicControl<any> {
  choices: {}[];
  propertyNameForDisplay: string;
  onSelect?: (event: any) => void;
  updateChoicesOnChange?: { siblingKey: string, action: (siblingValue: any) => any };
}

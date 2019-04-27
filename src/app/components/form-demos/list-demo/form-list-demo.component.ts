import { Component } from '@angular/core';
import { BasicControl } from '../../dynamic-form/controls/control-base';
import { InputControl } from '../../dynamic-form/controls/types/input-control';
import { emailValidator, nameValidator } from '../../../utils/common-form-validators';
import { CheckboxControl } from '../../dynamic-form/controls/types/checkbox-control';
import { MultiSelectControl } from '../../dynamic-form/controls/types/multi-select-control';
import { SelectControl } from '../../dynamic-form/controls/types/select-control';

@Component({
  selector: 'form-list-demo',
  templateUrl: './form-list-demo.component.html',
  providers: []
})
export class FormListDemoComponent {
  controls: BasicControl<any>[];

  backpackEquipment: { item: string, description: string }[] = [
    {
      item: 'Rope',
      description: 'Helps you climb'
    },
    {
      item: 'Abacus',
      description: 'For sums'
    },
    {
      item: 'Bell',
      description: 'To alert!'
    },
    {
      item: 'Bedroll',
      description: 'For sleeping'
    },
    {
      item: 'Candle',
      description: 'For ambiance'
    },
    {
      item: 'Holy water',
      description: 'For the undead'
    },
    {
      item: 'Iron pot',
      description: 'For cooking'
    },
    {
      item: 'Bagpipes',
      description: 'For battle'
    }
  ];

  beltEquipment: { item: string, description: string }[] = [
    {
      item: 'Butter knife',
      description: 'For spreading butter'
    },
    {
      item: 'Purse',
      description: 'For money'
    },
    {
      item: 'Watch',
      description: 'To tell the time'
    }
  ];

  constructor() {
    this.controls = [
      new InputControl({
        key: 'firstName',
        placeholder: 'First Name with validation',
        type: 'text',
        required: true,
        value: '',
        validators: nameValidator()
      }),
      new InputControl({
        key: 'lastName',
        placeholder: 'Last Name with validation',
        type: 'text',
        required: true,
        value: '',
        validators: nameValidator(),
        disabledIf: [
          {
            disableLastName1: (value: boolean) => value === true,
            disableLastName2: (value: boolean) => value === true
          },
          {
            disableLastName3: (value: boolean) => value === true
          }
        ]
      }),
      new InputControl({
        key: 'email',
        placeholder: 'Email with validation',
        type: 'email',
        requiredIf: [
          {
            emailUpdates: (value: boolean) => value === true
          }
        ],
        value: 'example@example.org',
        validators: emailValidator()
      }),
      new InputControl({
        key: 'phone',
        placeholder: 'Phone',
        type: 'text',
        requiredIf: [
          {
            smsUpdates: (value: boolean) => value === true
          }
        ],
        value: ''
      }),
      new CheckboxControl({
        key: 'emailUpdates',
        placeholder: 'Make email required',
      }),
      new CheckboxControl({
        key: 'smsUpdates',
        placeholder: 'Make phone required',
      }),
      new CheckboxControl({
        key: 'backpack',
        placeholder: 'Change content of the multiselect'
      }),
      new MultiSelectControl({
        key: 'Equipment',
        placeholder: 'What equipment do you have?',
        choices: this.backpackEquipment,
        value: [ this.backpackEquipment[ 0 ], this.backpackEquipment[ 1 ] ],
        updateChoicesOnChange: {
          siblingKey: 'backpack',
          action: (value: boolean) => {
            if (value) {
              return this.backpackEquipment;
            } else {
              return this.beltEquipment;
            }
          }
        },
        propertyNameForDisplay: 'item'
      }),
      new SelectControl({
        key: 'booporblep',
        placeholder: 'Select boop to display an additional control',
        choices: [ { choice: 'boop' }, { choice: 'blep' } ],
        propertyNameForDisplay: 'choice'
      }),
      new InputControl({
        key: 'optional',
        placeholder: 'Now visible input',
        value: '',
        type: 'text',
        visibleIf: [
          {
            booporblep: (value: { choice: string }) => value && value.choice === 'boop'
          }
        ]
      }),
      new CheckboxControl({
        key: 'disableLastName1',
        placeholder: 'Check this control and...'
      }),
      new CheckboxControl({
        key: 'disableLastName2',
        placeholder: 'This control to disable Last Name control'
      }),
      new CheckboxControl({
        key: 'disableLastName3',
        placeholder: 'Or you can just check this control'
      })
    ];
  }
}

# An example of an Angular dynamic form 
This example project builds upon the dynamic form [guide](https://angular.io/guide/dynamic-form) from Angular.
In a dynamic form each form control is defined by an object. This is a quick and easy way to build complex forms in Angular. 

The example provided here uses Angular Material for the form components. Four controls are available, an input, checkbox, select and multi-select.
Each control has a VisibleIf, RequiredIf and DisabledIf property, respectively each property provides a way to conditionally display, require and disable a control based on the values of other controls within the form. 

The purpose of this is to provide an imperfect example of
a dynamic form that can process complex logic. Hopefully showing how it can 
dramatically simplify the process
of building forms in Angular. If you want to dive straight in
to looking at code start with
`src/app/components/form-demos/list-demo/form-list-demo.component.ts`
this shows how a form is defined.

## Controls
### Shared properties
- key: A unique identifier for the control
- placeholder: The text that is displayed above the control
- visible
- controlType: References an enum value for the controls type e.g. input or select
- value: The control's initial value can be set here
- required
- disabled
- childButton: Displays a button next to the control. Takes an object:
  - name: Text to display on the button
  - onClick: Function called when the button is pressed, the control is 
  passed in as an argument  
- validators: Takes a ValidatorFn array, for the controls validation
- visibleIf*
- disabledIf*
- requiredIf*
##### * VisibleIf, DisabledIf, RequiredIf:
Each of these properties accepts an array of objects.
The object has one or more keys that share a name of one 
of the other controls in the form. This key references a function 
that takes that control's value as an argument and
returns a boolean. This is best explained as an example:
  
``` 
form = [
    new InputControl ({
      key: 'username',
      placeholder: 'Username',
      type: 'text',
      required: true,
      value: ''
    }),
    new InputControl ({
      key: 'email',
      placeholder: 'Email',
      type: 'text',
      visibleIf: [
        {
          username: (value: string) => value.length > 0
        }
      ],
      requiredIf: [
        {
          newsletterOptIn: (value: boolean) => value === true
        }
      ]
    }),
    new CheckboxControl({
      key: 'newsletterOptIn',
      placeholder: 'Opt in to our news letter?',
      visibleIf: [
        {
          email: (value: string) => validEmail(value),
        }
      ]
    }),
    new InputControl({
      key: 'phoneNumber',
      placeholder: 'Phone Number',
      type: 'text'.
      visibleIf: [
        {
          username: (value: string) => value.length > 0
        }
      ]
    }),
    new InputControl({
      key: 'whereHeard',
      placeholder: 'Where did you hear about us?',
      type: 'text',
      visibleIf: [
        {
          phoneNumber: (value: string) => validNumber(value)
        },
        {
          email: (value: string) => validEmail(value),
          newsletterOptIn: (value: boolean) => value === true
        }
      ]
    })    
```
The code above creates a form with 5 controls;
- 4 inputs for username, email, phone number and where you heard
about the service.
- 1 Checkbox for a news letter opt in.

The major bits of logic in the example are:
- The email field will only appear whilst text is present in the 
username field.  
- The email field is only required only whilst the news 
letter opt in checkbox is checked.
- The final field 'where did you hear about us' appears if a valid phone
number has been entered AND/OR if a valid email was entered and the user opts in to 
 a newsletter.
 
 ### Input Control Properties
 - type: The input type e.g. text, number etc...
 
 ### Checkbox Control Properties
 - checked: True/False the initial checkbox state
 
 ### Select & Multiselect Control Properties
 - choices: The choices displayed in the select, must be an array of objects.
 - propertyNameForDisplay: The name of the property from the choices array to use for display
 - onSelect: Function called when selection occurs
 - updateChoicesOnChange: Changes the choices when a sibling control updates,
 takes an object:
    - siblingKey: The key of the sibling control
    - action: The function called when the sibling value changes
    the value is passed in as an argument.
 
```
...
new SelectControl({
  key: 'demoSelect',
  placeholder: 'Make a choice',
  choices: [ 
    { label: 'Ant', value: 0 }, 
    { label: 'Beetle', value: 1 }
  ],
  propertyNameForDisplay: 'label',
  updateChoicesOnChange: {
    siblingKey: 'activateAlternatives',
    action: (value: boolean) => {
      return value ? getBugList() : getBirdList()
    }
  }),
new CheckboxControl({
  key: 'activateAlternatives',
  placeholder: 'Do you like bugs?',
  })
  ... 
```

The example above is select control that displays a list of
bugs when the checkbox is checked and a list of birds when it 
is unchecked.

## Structure
The main chunk of the dynamic form implementation 
can be found under `src/app/components/dynamic-form`, here you have:

- controls
  - control.service.ts - Service to map between control objects and form controls.
  - control-base.ts - Abstract class containing common 
  control properties that other control types extend.
- controls/types - the four current control types, each extends the control-base
  - checkbox-control.ts,
  - input-control.ts,
  - multi-select-controls.ts,
  - select-control.ts
- form
  - dynamic-form.abstract.ts - Abstract class containing all the logic to 
  keep track on the state of the form. It's here we keep 
  tabs on each controls visibleIf, disabledIf and requiredIf conditions,
  updating where necessary.
  - dynamic-form-control.component.html - One big ngSwitch which
  loops over the form controls stamping 
  out the related HTML for each control.
  - dynamic-form-control.component.ts - Some functions
  required by the template.
- form-types - each type extends the abstract dynamic-form
  - list - a simple vertical form, with each control positioned below the each other.
- form-demos - for the purpose of this example, shows
how a form would be created and defined.

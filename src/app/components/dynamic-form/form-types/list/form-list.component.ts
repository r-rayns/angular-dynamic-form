import { Component, ViewEncapsulation } from '@angular/core';
import { ControlService } from '../../controls/control.service';
import { DynamicFormAbstract } from '../../form/dynamic-form.abstract';

@Component({
  selector: 'form-list',
  templateUrl: './form-list.component.html',
  providers: [ ControlService ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent extends DynamicFormAbstract {

  constructor(protected controlService: ControlService) {
    super(controlService);
  }

}


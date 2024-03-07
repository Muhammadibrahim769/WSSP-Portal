import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'maintenanceRecord.component.html' })
export class MaintenanceRecordComponent {
  user: User;
  model: NgbDateStruct;
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.accountService.userValue;
  }

  formValidationMessages = {
    txtVehicleNo: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtMaintenanceOrderNo: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtMaintenanceItem: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtLife: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtIssueCostPrice: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
  };
  ngOnInit() {
    this.form = this.formBuilder.group({
      txtVehicleNo: ['', Validators.required],
      txtMaintenanceOrderNo: ['', Validators.required],
      txtIssueDate: [''],
      txtMaintenanceItem: ['', Validators.required],
      txtUom: [''],
      txtRequiredQuantity: [''],
      txtIssuedQuantity: [''],
      txtLife: ['', Validators.required],
      txtIssueCostPrice: ['', Validators.required],
    });
  }

  onSubmit(form: any) {
    console.log(this.form.value);
  }
}

import { Component, HostListener } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap'; 

@Component({ templateUrl: 'addMaintenanceStandard.component.html' }) 
export class AddMaintenanceStandardComponent {
  user: User;
  model: NgbDateStruct;
  addForm: FormGroup;
  form: FormGroup;
  panelOpenState = false;
  checks=false;
  checked = false;indeterminate = false;
  
  allSelect(e){
if(e.target.checked==true){
  this.checks=true;
}
else{
  this.checks=false;
}
  }
  constructor(private accountService: AccountService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.user = this.accountService.userValue;
  }
  OnlyNumbersAllowed(event):boolean
  {

const charcode=(event.which)?event.which : event.keycode;

if(charcode > 31 &&(charcode <48 || charcode >57))
{
return false;

}

    return true;
  }
  
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size : 'xl'})
  }
  formValidationMessages = {
    txtVehicleId:[{
      type: "required",
      message:"This field is required"
    }],
    txtMaintenanceItem:[{
      type: "required",
      message:"This field is required"
    }],
    txtLife:[{
      type: "required",
      message:"This field is required"
    }]
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      txtMainCategory:[""],
      txtVehicleCategory:[""],
      txtVehicleSubcategory:[""],
      txtVehicleType:[""],
      txtVehicleId:[
        '',
        Validators.required
      ],
      txtVehicleName:[""],
      txtSerialNo:[""],
      txtMaintenanceItem:[
        '',
        Validators.required
      ],
      txtUom:[""],
      txtSpecification:[""], 
      txtCapacity:[""],
      txtLife:[
        '',
        Validators.required
      ],
      txtLastIssueDate:[""],
      txtLastIssueCostPrice:[""],
      txtNextEstimatedChangeDate:[""],
      txtNextEstimatedPurchasePrice:[""],
      txtDriverDesignation:[""],
      txtDescription:[""],
      txtDriverNo:[""],
      txtDriverName:[""],
      txtWithEffectFromDate:[""],
      txtDriverContact:[""],
      txtBranchId :[""],


      })
      this.addForm=this.formBuilder.group({
        txtMainCategory:[""],
        txtVehicleCategory:[""],
        txtVehicleSubcategory:[""],
        txtVehicleType:[""],
        txtVehicleId:[
          '',
          Validators.required
        ],
        txtVehicleName:[""],
        txtSerialNo:[""],
        txtMaintenanceItem:[
          '',
          Validators.required
        ],
        txtUom:[""],
        txtSpecification:[""],
        txtCapacity:[""],
        txtLife:[
          '',
          Validators.required
        ],
        txtLastIssueDate:[""],
        txtLastIssueCostPrice:[""],
        txtNextEstimatedChangeDate:[""],
        txtNextEstimatedPurchasePrice:[""],
        txtDescription:[""],
        txtDriverNo:[""],
        txtDriverName:[""],
        txtWithEffectFromDate:[""],
        txtDriverContact:[""],
        txtBranchId :[""],


      })

    }
    MaintenanceStandard=
    [
      {
        mainCategory:"TOYOTA",
      vehicleCategory:"Ravi", 
      vehicleSubCategory:"Ravi Mini",
      type:"Raw data",
      assetNumber:"11",
      name:"TOYOTA 123"},
      {
        mainCategory:"TOYOTA",
      vehicleCategory:"Ravi", 
      vehicleSubCategory:"Ravi Mini",
      type:"Raw data",
      assetNumber:"11",
      name:"TOYOTA 123"}
    ]

    onSubmit(form: any) {
      console.log(this.form.value);
    }
    onSave(addForm: any) {
      console.log(this.addForm.value);
    }
}

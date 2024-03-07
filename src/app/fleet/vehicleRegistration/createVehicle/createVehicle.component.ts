import { Component } from '@angular/core';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '@app/_services/crud.service';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
// import { debug } from 'node:console';
@Component({ 
  selector: 'app-dashboard',
  templateUrl: 'createVehicle.component.html' })
export class CreateVehicleComponent {
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  serviceInfoList:any[]=[];
  createVehicleForm: FormGroup;
  model;
  addForm: FormGroup;
  user: User;
  add: boolean = true;
  showSubCategory: boolean;
  isExpanded = true;
  constructor(private billingService: BillingService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private shared: CrudService, public dialog: MatDialog,
    private router: Router) {
  }
  formValidationMessages = {
    txtSerialNo: [{
        type: "required",
        message: "This field is required"
    }],
    txtVehicleId: [{
        type: "required",
        message: "This field is required"
    }],
    txtEngineNo: [{
        type: "required",
        message: "This field is required"
    }],
    txtChassisNo: [{
        type: "required",
        message: "This field is required"
    }]  
}
  // SubmitInfo(createVehicleInfo){
  // here you will set Employee data to your service object
  // this.shared.sharedcreateVehicleInfo =createVehicleInfo;// }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  addFunction() {
    this.add = true;
  }
  openSubmitDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Submit ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log("Dialog is closed");
        this.router.navigate(['fleet/vehicleRegistration']);
      }
    });

  }
  ngOnInit() {
    this.shared.currentMessage.subscribe(message => {
      debugger;
      console.log(message);
      // this.form.patchValue({message});
    });
   
    this.createVehicleForm = this.formBuilder.group({

      // courseControl: null,
      // txtMainCategory: ["Vehicle"],
      // txtVehicleCategory: [""],
      // txtVehicleSubCategory: [{ value: '', disabled: true }],
      // txtVehicleType: [{ value: '', disabled: true }],
      txtAssetType:[''],
      txtVehicleId: [
        '',
        Validators.required
      ],
      txtVehicleName: [
        '',
        Validators.required
      ],
      txtSerialNo: [
        '',
        Validators.required
      ],
      txtEngineNo: [
        '',
        Validators.required
      ],
      txtChassisNo: [
        '',
        Validators.required
      ],
      txtVehicleColor: [""],
      txtFuelType: [""],
      txtFuelCapacity: [""],
      txtAverageFuel: [""],
      txtVehicleLoadCapcity: [""],
      txtDescription: [""],
      branch: [
        ""
      ],
      txtbrand: ['', Validators.required],
      txtModel: ['', Validators.required],
      txtServicableTime: [""],
      txtUnServicableTime: [""],
      txtWithEffectFromDate: ['', Validators.required],
      txtEngineCylinder: [""],
      txtDriverNo: [""],
      txtEngineSize: [""],
      txtBodyType: [""],
      txtBodySize: [""],
      txtxCurrentCondition: [""],
      txtCurrentStatus: [""],
      txtReserveTankCapacity: [""],
      txtTotalRunning: [""],
      txtMeasurementUnit: [""],
      txtDriverDesignation: [""],
      txtWithEffectFrom: ["", Validators.required],
      txtDriverName: [""],
      unionCouncil:['']
    })
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];
      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
      console.log(response["serviceInfoList"]);
      this.serviceInfoList = response["serviceInfoList"];
    })
    // this.createVehicleForm.controls['txtVehicleCategory'].valueChanges.subscribe(
    //   value => {
    //     if (value == "") {
    //       this.createVehicleForm.controls.txtVehicleSubCategory.disable();
    //       this.createVehicleForm.controls.txtVehicleType.disable();
          
    //     }
    //     else if(value=="OwnedVehicles")
    //     {
    //       this.createVehicleForm.controls.txtVehicleSubCategory.enable();              
    //     }
    //     else if(value=="LeasedVehicles")
    //     {
    //       this.createVehicleForm.controls.txtVehicleSubCategory.enable();
    //       this.createVehicleForm.controls.txtVehicleType.reset();
    //       this.createVehicleForm.controls.txtVehicleType.disable();
            
    //     }
    //     else{
    //       this.createVehicleForm.controls.txtVehicleSubCategory.disable();
    //     }
    //   });
     
    // this.createVehicleForm.controls['txtVehicleSubCategory'].valueChanges.subscribe(
    //   value => {
    //     if (value == "") {
    //       this.createVehicleForm.controls.txtVehicleType.disable();
          
    //       console.log("value is empty" + value)
    //     }
    //     else {
    //       this.createVehicleForm.controls.txtVehicleType.enable();
    //       console.log("value isvalue " + value);
    //     }
    //   });
  }
  Enable() {
    this.createVehicleForm.controls.txtVehicleType.disabled;
  }
  clear() {
    this.createVehicleForm.controls.txtWithEffectFrom.reset('');
  }

  clearWEFD() {
    this.createVehicleForm.controls.txtWithEffectFromDate.reset('');
  }
  onSubmit(){    
    console.log(this.createVehicleForm.value); 
    debugger;
    // console.log("getCustomerListServiceByID");
    // this.billingService.getCustomerListServiceByID(16350).subscribe( response => {
    //   console.log(response);
    // })
    console.log("createVehicleRegistrationService");
    let formValue = this.createVehicleForm.value;

    formValue.branch = {"id": +this.createVehicleForm.controls.branch.value }
    formValue.unionCouncil = { "id": +this.createVehicleForm.controls.unionCouncil.value }
    this.billingService.createVehicleRegistrationService(this.createVehicleForm.value).subscribe(response => {
      response.data = this.createVehicleForm.value;
      debugger;
      console.log("response")
      console.log(response)
    })
    
    // this.router.navigate(['billing/newConnection']);
  }
  // onSubmit() {
    
  
  //   debugger;
  //   this.shared.changeMessage(this.createVehicleForm.value);
  //   this.createVehicleForm.reset();
  // }
  onSave() {
    // console.log(this.addForm.value); 
  }
  OnlyNumbersAllowed(event): boolean {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }

}
    // this.formBuilder.group({

    //   txtMainCategory :message.txtMainCategory,
    //   txtVehicleCategory  :message.txtVehicleCategory,
    //   txtVehicleSubCategory :message.txtVehicleSubCategory,
    //   txtVehicleType  : message.txtVehicleType,
    //   txtVehicleId  : message.txtVehicleId,
    //   txtVehicleName  : message.txtVehicleName,
    //   txtSerialNo : message.txtSerialNo,
    //   txtVehicleMake  : message.txtVehicleMake,
    //   txtEngineNo : message.txtEngineNo,
    //   txtChassisNo  : message.txtChassisNo,
    //   txtVehicleColor : message.txtVehicleColor,
    //   txtVehicleStatus  : message.txtVehicleStatus,
    //   txtFuelType : message.txtFuelType,
    //   txtFuelCapacity:message.txtFuelCapacity,
    //   txtAverageFuel: message.txtAverageFuel,
    //   txtVehicleLoadCapcity:message.txtVehicleLoadCapcity,
    //   txtDescription: message.txtDescription,
    //   txtBranchId: message.txtBranchId,
    //   txtbrand:message.txtbrand,
    //   txtModel:message.txtModel,
    //   txtServicableTime:message.txtServicableTime,
    //   txtUnServicableTime:message.txtUnServicableTime,
    //   txtWithEffectFromDate:.txtWithEffectFromDate,
    //   txtEngineCylinder: message.txtEngineCylinder,
    //   txtDriverNo: message.txtDriverNo,
    //   txtEngineSize: message.txtEngineSize,
    //   txtBodyType: message.txtBodyType,
    //   txtBodySize:message.txtBodySize,
    //   txtxCurrentCondition:message.txtxCurrentCondition,
    //   txtCurrentStatus: message.txtCurrentStatus,
    //   txtReserveTankCapacity:message.txtReserveTankCapacity,
    //   txtTotalRunning:message.txtTotalRunning,
    //   txtMeasurementUnit: message.txtMeasurementUnit,
    //   txtDriverDesignation:message.txtDriverDesignation,
    //   txtWithEffectFrom: message.txtWithEffectFrom,
    //   txtDriverName: message.txtDriverName



    //   });
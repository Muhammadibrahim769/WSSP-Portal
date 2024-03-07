
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { RejectModalComponent } from './rejectModal.component';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';


@Component({
  selector: 'app-editModal',
  templateUrl: './editModal.component.html'
})
export class EditModalComponent implements OnInit {
  operationBasicInfoForm: FormGroup;
  step = 0;
  test = "";
  editData: any;
  showDC = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    private billingService: BillingService,
    public dialogRef: MatDialogRef<EditModalComponent>, private dateFormat: DateFormatPipe
  ) { }
  Id: any;
  formValidationMessages = {
    numOfConnections: [{
      type: "required",
      message: "This field is required"
    }],
    txtMeterType: [{
      type: "required",
      message: "This field is required"
    }],
    numAvgDischargeVolume: [{
      type: "required",
      message: "This field is required"
    }],
  }
  ngOnInit(): void {
    
    this.test = this.data;
    console.log(this.test);
    this.operationBasicInfoForm = this.formBuilder.group({
      serTWBasicInfoId: [],
      serProductId: [],
      txtProductCode: [],
      txtProductName: [''],
      numOfConnections: ['', Validators.required],
      txtStatus: [''],
      blnIsFunctional: [false],
      blnIsMetered: [false],
      dteWarrenty: [],
      numAvgDischargeVolume: ['', Validators.required],
      blnMrpTwo: [''],
      blnIsActive: [''],
      txtRemarks: [''],
      blnSampleAvailable: [''],
      txtMeterNo: [''],
      blnStatus: [''],
      serBranchId: [],
      serLocationId: [],
      txtItemType: [''],
      numAvgDischargeunit: [],
      txtMeterType: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtTubewellRefNo: [''],
      numAvgPerHour:[],
      numAvgPerUnit:[]
    })
    this.getOperationBasicInfo();
  }
  getOperationBasicInfo() {
    

    this.billingService.getOperationBasicInfoByID(this.test).subscribe(response => {
      
      console.log("Reponse data by id");
      console.log(response);
      this.editData = response;
      console.log(this.editData);
      this.operationBasicInfoForm.controls['txtTubewellRefNo'].patchValue(this.editData.txtTubewellRefNo);
      this.operationBasicInfoForm.controls['txtProductCode'].patchValue(this.editData.txtProductCode);
      this.operationBasicInfoForm.controls['txtProductName'].patchValue(this.editData.txtProductName);
      this.operationBasicInfoForm.controls['numOfConnections'].patchValue(this.editData.numOfConnections);
      this.operationBasicInfoForm.controls['numAvgDischargeVolume'].patchValue(this.editData.numAvgDischargeVolume);
      this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue(this.editData.blnIsFunctional);
      this.operationBasicInfoForm.controls['blnIsMetered'].patchValue(this.editData.blnIsMetered);
      this.operationBasicInfoForm.controls['txtItemType'].patchValue(this.editData.txtItemType);
      this.operationBasicInfoForm.controls['txtBranchName'].patchValue(this.editData.txtBranchName);
      this.operationBasicInfoForm.controls['txtLocationName'].patchValue(this.editData.txtLocationName);
      this.operationBasicInfoForm.controls['serBranchId'].patchValue(this.editData.serBranchId);
      this.operationBasicInfoForm.controls['serLocationId'].patchValue(this.editData.serLocationId);
      this.operationBasicInfoForm.controls['txtMeterType'].patchValue(this.editData.txtMeterType);
      this.operationBasicInfoForm.controls.dteWarrenty.patchValue(this.editData.dteWarrenty);
      this.operationBasicInfoForm.controls.serProductId.patchValue(this.editData.serProductId);
      this.operationBasicInfoForm.controls.serTWBasicInfoId.patchValue(this.editData.serTWBasicInfoId);
      this.operationBasicInfoForm.controls.numAvgPerHour.patchValue(this.editData.numAvgPerHour);
      this.operationBasicInfoForm.controls.numAvgPerUnit.patchValue(this.editData.numAvgPerUnit);
      this.operationBasicInfoForm.controls['numAvgPerHour'].patchValue(this.editData.numAvgPerHour);
      this.operationBasicInfoForm.controls['numAvgPerUnit'].patchValue(this.editData.numAvgPerUnit);

    })
  }
  use(event) {
    
    console.log(event)
  }
  onUpdate() {

    if (this.operationBasicInfoForm.invalid) {
      // alert("Fill Mandatory Fields");
      return
    }
    // let dteWarrenty = this.dateFormat.transformOperation(this.operationBasicInfoForm.controls.dteWarrenty.value)
    // this.operationBasicInfoForm.controls.dteWarrenty.patchValue(dteWarrenty)

    if (this.editData.blnIsActive == null) {
      this.operationBasicInfoForm.controls['blnIsActive'].patchValue('false');
    }
    if (this.editData.blnIsFunctional == null) {
      this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue('false');
    }
    if (this.editData.blnIsMetered == null) {
      this.operationBasicInfoForm.controls['blnIsMetered'].patchValue('false');
    }
    if (this.editData.numOfConnections == null) {
      this.operationBasicInfoForm.controls['numOfConnections'].patchValue(0);
    }
    this.operationBasicInfoForm.controls['serTWBasicInfoId'].patchValue(this.test);
    console.log("updated form ");
    
    console.log(this.operationBasicInfoForm.value);
    console.log(this.test);
    this.billingService.updateBasicInfoServiceByID(this.operationBasicInfoForm.value).subscribe(response => {
      debugger;
      response["data"] = this.operationBasicInfoForm.value;
      console.log("response  of Update")
      console.log(response["data"])
      this.dialogRef.close();

    })
   
  }




  public shown = false;
  setStep(index: number) {
    this.step = index;
  }

  getErrorMessage() {
    if (this.operationBasicInfoForm.controls.numOfConnections.hasError('required')) {
      return 'You must enter a value';
    }
    return this.operationBasicInfoForm.controls.numOfConnections.hasError('numOfConnections') ? 'Not a valid email' : '';
  }
}

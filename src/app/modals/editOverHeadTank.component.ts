
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './editOverHeadTank.component.html'
})
export class EditOverHeadTankComponent implements OnInit {
  operationBasicInfoForm: FormGroup;
  step = 0;
  test = "";
  arrayFeedingTubewell: string[];
  feedingTubewell=new FormControl;
  fakeFeedingTubewell:any;
  editData: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private billingService: BillingService,public dialogRef: MatDialogRef<EditOverHeadTankComponent>) { }
  Id: any;
  tubeWellList: any[] = [];

  formValidationMessages = {
    txtFeedingTubewell: [{
      type: "required",
      message: "This field is required"
    }]
  }
  ngOnInit(): void {
    debugger;
    this.test = this.data;
    console.log(this.test);

    this.operationBasicInfoForm = this.formBuilder.group({
      serTWBasicInfoId: [],
      serProductId: [],
      txtProductCode: [],
      txtProductName: [''],
      numOfConnections: [],
      txtStatus: [''],
      blnIsFunctional: [],
      blnIsMetered: [],
      numAvgDischargeVolume: [''],
      blnMrpTwo: [''],
      blnIsActive: [''],
      txtRemarks: [''],
      blnSampleAvailable: [''],
      txtMeterNo: [''],
      blnStatus: [''],
      serBranchId: [],
      serLocationId: [],
      txtItemType: [''],
      numAvgDischargeunit: [''],
      txtFeedingTubewell:[''],      
      txtBranchName:[''],
      txtLocationName:[''],
   
    })
    this.getOperationBasicInfo();
    this.getTubeWellList();
  }


  getOperationBasicInfo() {
    this.billingService.getOperationBasicInfoByID(this.test).subscribe(response => {
      debugger;
      console.log("response Data by id")
      console.log(response)
      this.editData = response;
      console.log(this.editData);
      
      this.operationBasicInfoForm.controls['serTWBasicInfoId'].patchValue(this.test);
      // this.operationBasicInfoForm.controls.serTWBasicInfoId=this.test;
      console.log("serbacic info id ");
      console.log(this.operationBasicInfoForm.controls.serTWBasicInfoId.value);
      this.operationBasicInfoForm.controls['txtProductCode'].patchValue(this.editData.txtProductCode );
      this.operationBasicInfoForm.controls['txtProductName'].patchValue(this.editData.txtProductName );
      // this.operationBasicInfoForm.controls['numOfConnections'].patchValue(this.editData.numOfConnections );
      // this.operationBasicInfoForm.controls['numAvgDischargeVolume'].patchValue(this.editData.numAvgDischargeVolume );
      this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue(this.editData.blnIsFunctional);
      // this.operationBasicInfoForm.controls['blnIsMetered'].patchValue(this.editData.blnIsMetered );
      this.operationBasicInfoForm.controls['txtItemType'].patchValue(this.editData.txtItemType);
      this.operationBasicInfoForm.controls['txtBranchName'].patchValue(this.editData.txtBranchName);
      this.operationBasicInfoForm.controls['txtLocationName'].patchValue(this.editData.txtLocationName);
      this.operationBasicInfoForm.controls['serProductId'].patchValue(this.editData.serProductId);
      this.operationBasicInfoForm.controls['serLocationId'].patchValue(this.editData.serLocationId);
      this.operationBasicInfoForm.controls['serBranchId'].patchValue(this.editData.serBranchId);
     /* ------------------------- Feeding tubewell-----------------------------  */
     let stringFeedingTubewell = this.editData.txtFeedingTubewell;
     this.arrayFeedingTubewell = stringFeedingTubewell.split(',');
     /* ------------------------------------------------------  */
     this.feedingTubewell.patchValue(this.arrayFeedingTubewell);

    })
  }
  myArray:any[]=[];
  onSubmit() {
    debugger;
    this.myArray=  this.feedingTubewell.value;
    this.fakeFeedingTubewell= this.myArray.toString();

    this.operationBasicInfoForm.controls['txtFeedingTubewell'].patchValue(this.fakeFeedingTubewell);
    if(this.operationBasicInfoForm.invalid){
      // alert("Fill Mandatory Fields");
      return
     }
    if (this.editData.blnIsActive == null) {
      this.operationBasicInfoForm.controls['blnIsActive'].patchValue('false');
    }
    // if (this.editData.blnIsFunctional == null) {
    //   this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue('false');
    // }
    if (this.editData.blnIsMetered == null) {
      this.operationBasicInfoForm.controls['blnIsMetered'].patchValue('false');
    }
    if (this.editData.numOfConnections == null) {
      this.operationBasicInfoForm.controls['numOfConnections'].patchValue(0);
    }
    this.operationBasicInfoForm.controls['serTWBasicInfoId'].patchValue(this.test);
    console.log("updated form ");
    debugger;
    console.log(this.operationBasicInfoForm.value);
    console.log(this.test);
    this.billingService.updateBasicInfoServiceByID(this.operationBasicInfoForm.value).subscribe(response => {
      debugger;
      response = this.operationBasicInfoForm.value;
      console.log("response  of Update")
      console.log(response)
      // console.log(this.operationBasicInfoForm.controls.serTWBasicInfoId.value);
    })
    
  this.dialogRef.close();
  }
  tubeWellData: any[] = [];
  getTubeWellList() {
    this.billingService.getOperationBasicInfoService().subscribe(response => {
      console.log("operationBasicInfo")
      console.log(response.data);
      this.tubeWellData = response.data;

      this.tubeWellData.forEach(element => {
        this.tubeWellList.push([element["txtProductCode"]]);        
      })
    })
  }
  public shown = false;
  setStep(index: number) {
    this.step = index;
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './editWaterFilterationPlantModal.component.html'
})
export class EditWaterFilterationPlantModalComponent implements OnInit {
  operationBasicInfoForm: FormGroup;
  step = 0;
  test = ""; 
  editData: any;  
  tubeWellList: any[] = [];
  dateFormat: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private billingService: BillingService, public dialogRef: MatDialogRef<EditWaterFilterationPlantModalComponent>) { }
  Id: any; 
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
    
      blnIsFunctional: [],     
      numAvgDischargeVolume: [''],
      blnMrpTwo: [''],
      blnIsActive: [''],
      txtRemarks: [''],
      blnSampleAvailable: [''],
      txtMeterNo: [''],
      blnStatus: [''],
      serBranchId: [],
      numWaterProducedInUnit: [],
      serLocationId: [],
      numUnitConsumed: [],
      numMonthlyBill: [],
      txtAverageDischargePerUnit: [],
      numAvgDischargeunit: [''],
      txtFeedingTubewell:[''],      
      txtBranchName:[''],
      txtLocationName:[''],
      blnIsMetered:[true],
      txtItemType: ['FP'],
      txtMonth:[''],
   
    })   
    this.operationBasicInfoForm.controls['numWaterProducedInUnit'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.operationBasicInfoForm.controls['numWaterProducedInUnit'].value * this.operationBasicInfoForm.controls['txtAverageDischargePerUnit'].value

        this.operationBasicInfoForm.patchValue({

          numUnitConsumed: amount
        });
        console.log(amount);
        console.log("result")
        console.log(this.operationBasicInfoForm.controls.numUnitConsumed.value)
      }
    })
    this.getOperationBasicInfo();
    this.getTubeWellList();
  }
  


getOperationBasicInfo(){
  debugger;
  
  this.editData = this.data;
    console.log(this.editData);
    this.operationBasicInfoForm.controls['serTWBasicInfoId'].patchValue(this.editData.serTWBasicInfoId);
    this.operationBasicInfoForm.controls['txtProductCode'].patchValue(this.editData.txtProductCode );
    this.operationBasicInfoForm.controls['txtProductName'].patchValue(this.editData.txtProductName );
    // this.operationBasicInfoForm.controls['numOfConnections'].patchValue(this.editData.numOfConnections );
    // this.operationBasicInfoForm.controls['numAvgDischargeVolume'].patchValue(this.editData.numAvgDischargeVolume );
    this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue(this.editData.blnIsFunctional);
    this.operationBasicInfoForm.controls['numMonthlyBill'].patchValue(this.editData.numMonthlyBill); 
    // this.operationBasicInfoForm.controls['txtItemType'].patchValue(this.editData.txtItemType);
    this.operationBasicInfoForm.controls['txtBranchName'].patchValue(this.editData.txtBranchName);
    this.operationBasicInfoForm.controls['txtLocationName'].patchValue(this.editData.txtLocationName);
    this.operationBasicInfoForm.controls['serProductId'].patchValue(this.editData.serProductId);
    this.operationBasicInfoForm.controls['serLocationId'].patchValue(this.editData.serLocationId);
    this.operationBasicInfoForm.controls['txtAverageDischargePerUnit'].patchValue(this.editData.txtAverageDischargePerHour); 
    this.operationBasicInfoForm.controls['numWaterProducedInUnit'].patchValue(this.editData.numWaterProducedInUnit); 
    this.operationBasicInfoForm.controls['numUnitConsumed'].patchValue(this.editData.numUnitConsumed);    
    this.operationBasicInfoForm.controls['serBranchId'].patchValue(this.editData.serBranchId);
    this.operationBasicInfoForm.controls['txtMonth'].patchValue(this.editData.txtMonth);
    this.getPrevMonth();
   

}
myArray:any[]=[];
onSubmit() {
  if(this.operationBasicInfoForm.invalid){
    // alert("Fill Mandatory Fields");
    return
   }
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
  console.log("updated form ");
  debugger;
  console.log(this.operationBasicInfoForm.value);
  console.log(this.test);
  this.billingService.updateWSProductionService(this.operationBasicInfoForm.value).subscribe(response => {
    debugger;
    console.log(response["data"])
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
      this.tubeWellList.push([element["txtProductCode"]])
    })
  })
}
  public shown = false;
  setStep(index: number) {
    this.step = index;
  }
  isReadOnly: boolean = false
  prevM: any;
  prevMonth: any;
  getPrevMonth() {
    
    this.prevM = this.editData.txtMonth;
    var makeDate = new Date(this.prevM);
    // console.log('Original date: ', makeDate.toString());
    makeDate.setMonth(makeDate.getMonth() - 1);
    console.log('After subtracting a month: ', makeDate.toString());
    this.prevMonth = this.dateFormat.transform(makeDate.toString())
    console.log(' month: ', this.prevMonth);
    let txtMonth = this.prevM;
    let serProductId = this.editData.serProductId;
    let prevMonth = this.prevMonth;
    this.billingService.getMeterReading(txtMonth, serProductId, prevMonth).subscribe(response => {
      debugger;
      console.log(response["data"][0])
      if(response["data"].length > 0) {
        this.operationBasicInfoForm.controls['numPreviousMeterReading'].patchValue(response["data"][0].numCurrentMeterReading);
      }else {
        this.operationBasicInfoForm.controls['numPreviousMeterReading'].patchValue(0);
      }
      
    })
  }
}

// editWaterFilterationPlantModal
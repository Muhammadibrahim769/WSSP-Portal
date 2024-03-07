import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './billAdjustmentModal.component.html'
})
export class BillAdjustmentModalComponent implements OnInit {

  adjustmentForm: FormGroup;
  txtBillNo: any;
  txtCustomerCode: any;
  show = false;
  adjustmentBillDto: any = {};
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dateFormat: DateFormatPipe
  ,private formBuilder: FormBuilder, private billingService: BillingService, public dialogRef: MatDialogRef<BillAdjustmentModalComponent>) { }

  ngOnInit(): void {
    debugger;
    console.log(this.data);
    // this.txtBillNo = this.data.txtBillNo;
    this.txtCustomerCode = this.data.txtCustomerCode;
    this.adjustmentForm = this.formBuilder.group({
      dteBillFrom: [''],
      txtConsumerCode:[''],
      dteBillTo: [''],
      numTotalAmount: [''],
      numAdjustment: [ ],
      serBillAdjustmentId: [''],
      serBranchId: [''],
      serCurrentBillId: [''],
      serCustomerId: [''],
      serLocationId: [0],
      txtBillNo: [''],
      txtBusinessName: [''],
      txtCustomerCode: [''],
      billFrom:[''],
      billTo:['']
    })
    this.getAdjustmentFieldsData();
  }


  getAdjustmentFieldsData(){
    debugger;
    this.billingService.findBillByTxtCustomerCode( this.txtCustomerCode).subscribe( response => {
      console.log(response);
      this.adjustmentForm.controls['dteBillFrom'].patchValue(this.data.dteBillFrom);
      this.adjustmentForm.controls['dteBillTo'].patchValue(this.data.dteBillTo);
      this.adjustmentForm.controls['numTotalAmount'].patchValue(this.data.numPayableWithinDueDate);
      this.adjustmentForm.controls['numAdjustment'].patchValue(this.data.numAdjustment);
      this.adjustmentForm.controls['txtCustomerCode'].patchValue(this.data.txtCustomerCode);   
    })
  }
 
  onSubmit(){
    debugger;
    if(this.adjustmentForm.value.numAdjustment > this.adjustmentForm.value.numTotalAmount){
      this.show = true
      this.adjustmentForm.controls.numAdjustment.setErrors({'incorrect': true});
      return;
    }
    if(this.adjustmentForm.value.numAdjustment <= this.adjustmentForm.value.numTotalAmount){
      this.show = false;

      this.adjustmentBillDto = this.data;

      this.adjustmentBillDto.numAdjustment = this.adjustmentForm.controls.numAdjustment.value;
      this.adjustmentBillDto.txtBillNo = '';
      this.adjustmentBillDto.txtDistributorsCode = '';
      this.adjustmentBillDto.dteBillIssueDate = this.data.dteBillIssueDate;
      this.adjustmentBillDto.dteBillDueDate = '';
      this.adjustmentBillDto.numPayableAfterDueDate = 0;
      this.adjustmentBillDto.numLatePaymentSurcharge = 0;
      this.adjustmentBillDto.numPayableWithinDueDate = this.adjustmentForm.controls.numAdjustment.value;
      console.log(this.adjustmentBillDto);

      this.billingService.updateBillAdjustmentService(this.adjustmentBillDto).subscribe(response => {
        debugger;
        console.log(response);
        alert('Adjustment Successfull');
        this.dialogRef.close();
      })
    }
  }
}

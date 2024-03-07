import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./billInstallmentModal.component.html'
})

export class BillInstallmentModalComponent implements OnInit {

  installmentForm: FormGroup;
  txtBillNo: any;
  txtCustomerCode: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private billingService: BillingService, public dialogRef: MatDialogRef<BillInstallmentModalComponent>) { }

  ngOnInit(): void {
    debugger;
    console.log("this.data")
    console.log(this.data);
    this.txtBillNo = this.data.txtBillNo;
    this.txtCustomerCode = this.data.txtCustomerCode;
    this.installmentForm = this.formBuilder.group({
      dteBillTo: [''],
      dte_bill_from: [''],
      numInstallmentAmount: [],
      numInstallmentNumbers:[],
      numInstallmentRemainingAmount: [],
      numInstallmentRemainingNumber: [],
      numTotalAfterDueDate: [],
      numTotalAmount: [],
      serBillInstallmentId: [],
      serBranchId: [],
      serCurrentBillId: [],
      serCustomerId: [],
      serLocationId: [0],
      txtBillNo: [''],
      txtBusinessName: [''],
      txtCustomerCode: ['']
    })
    this.getAdjustmentFieldsData();

    this.installmentForm.controls['numInstallmentNumbers'].valueChanges.subscribe((value) => {
      debugger;
      if(value <= 0){
        alert('Enter Value greater than 0')
      }
      else{
        this.installmentForm.controls['numInstallmentAmount'].patchValue(this.data.numTotalAmount);
        let amount =  this.installmentForm.controls['numInstallmentAmount'].value / value
          this.installmentForm.patchValue({
            numInstallmentAmount: amount
          });
      }

    })
  }

  // --------------------------------------ngOnit ENDS-------------------------------------------------

  
  getAdjustmentFieldsData(){
    this.billingService.getCurrentBillService(this.txtBillNo, this.txtCustomerCode).subscribe( response => {
      console.log(response);
      this.installmentForm.controls['dteBillTo'].patchValue(this.data.dteBillTo);
      this.installmentForm.controls['numTotalAmount'].patchValue(this.data.numTotalAmount);
      this.installmentForm.controls['numInstallmentAmount'].patchValue(this.data.numTotalAmount);

      this.installmentForm.controls['dte_bill_from'].patchValue(this.data.dteBillFrom);
      this.installmentForm.controls['serCurrentBillId'].patchValue(this.data.serCurrentBillId);
      this.installmentForm.controls['serCustomerId'].patchValue(this.data.serCustomerId);
      this.installmentForm.controls['txtBillNo'].patchValue(this.data.txtBillNo);
      this.installmentForm.controls['txtBusinessName'].patchValue(this.data.txtBusinessName);
      this.installmentForm.controls['txtCustomerCode'].patchValue(this.data.txtCustomerCode);
    })
  }

  onSubmit(){
    debugger;
    console.log("this.installmentForm.value");
    console.log(this.installmentForm.value);
    this.billingService.createBillInstallmentService(this.installmentForm.value).subscribe(response => {
      debugger;
      response = this.installmentForm.value;
      alert('Installment Successfull');
      this.dialogRef.close();
    })
  }

}

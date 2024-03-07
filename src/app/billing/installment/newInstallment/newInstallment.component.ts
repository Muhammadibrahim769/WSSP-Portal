import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillInstallmentModalComponent } from '@app/modals/billInstallmentModal.component';
import { BillingService } from '@app/services/billing.service';


@Component({
  selector: 'app-dashboard',
  templateUrl:'./newInstallment.component.html'
})
export class NewInstallmentComponent implements OnInit {
  
  show = false;
  searchInstallmentForm:FormGroup
  step = 0;
  billInfo: any;

  setStep(index: number) {
    this.step = index;
  }
  constructor(public dialog: MatDialog,private formbuilder: FormBuilder, private billingService: BillingService) { }

  ngOnInit(): void {
    this.searchInstallmentForm = this.formbuilder.group({
      txtCustomerCode:['',Validators.required],
      txtBillNo : ['', Validators.required]
    })
  }
  onSearchInstallment(){
    debugger;
    console.log(this.searchInstallmentForm.value);
    let txtBillNo = this.searchInstallmentForm.controls.txtBillNo.value;
    let txtCustomerCode = this.searchInstallmentForm.controls.txtCustomerCode.value;
    this.billingService.getCurrentBillService(txtBillNo, txtCustomerCode).subscribe(response => {
      console.log(response);
      this.billInfo = response;
    })
    this.show= true;
  }

  openInstallmentDialog() {
    debugger;
    console.log("BillInstallmentModalComponent");
    const adjustModal = this.dialog.open(BillInstallmentModalComponent, {
      data: this.billInfo
    })
  }

  downloadPdf(printBill){
    debugger;
    console.log("downloadPdf");
    var printContents = document.getElementById(printBill).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}

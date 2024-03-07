import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { BillAdjustmentModalComponent } from '@app/modals/billAdjustmentModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import * as moment from 'moment';
import { Moment } from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './newAdjustment.component.html'
})
export class NewAdjustmentComponent implements OnInit {

  searchAdjustmentForm:FormGroup;
  billInfo: any;
  customerCode = "";
  show = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  constructor(public dialog: MatDialog,private formbuilder: FormBuilder, private dateFormat:DateFormatPipe ,private billingService: BillingService) { }
  ngOnInit(): void {
    this.searchAdjustmentForm = this.formbuilder.group({
      txtCustomerCode:['',Validators.required],
      billFrom: [moment()],
      billTo: [moment()]
    })
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue =this.searchAdjustmentForm.controls.billFrom.value;
    ctrlValue.year(normalizedYear.year());
    this.searchAdjustmentForm.controls.billFrom.setValue(ctrlValue);
  }

  
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue =this.searchAdjustmentForm.controls.billFrom.value;
    ctrlValue.month(normalizedMonth.month());
   this.searchAdjustmentForm.controls.billFrom.setValue(ctrlValue);
   console.log("ghjsdkasd");
   console.log( this.searchAdjustmentForm.controls.billFrom);
    datepicker.close();
  }

  chosenYearHandlerBillTo(normalizedYear: Moment) {
    const ctrlValue =this.searchAdjustmentForm.controls.billTo.value;
    ctrlValue.year(normalizedYear.year());
    this.searchAdjustmentForm.controls.billTo.setValue(ctrlValue);
  }
  chosenMonthHandlerBillTo(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    debugger;
    const ctrlValue =this.searchAdjustmentForm.controls.billTo.value;
    ctrlValue.month(normalizedMonth.month());
    this.searchAdjustmentForm.controls.billTo.setValue(ctrlValue);
    console.log( this.searchAdjustmentForm.controls.billTo);
    datepicker.close();
  }
  onSearchAdjustment(){
    debugger;
    console.log(this.searchAdjustmentForm.value);
    let dteBillFrom = this.dateFormat.transform( this.searchAdjustmentForm.controls.billFrom.value);
    let dteBillTo = this.dateFormat.transform( this.searchAdjustmentForm.controls.billTo.value);
    let txtCustomerCode = this.searchAdjustmentForm.controls.txtCustomerCode.value;
    this.billingService.findBillByTxtCustomerCodeBill( dteBillFrom,dteBillTo,txtCustomerCode).subscribe(response => {
      console.log(response);
      this.billInfo = response[0];
      let issueDate = response[0]["dteBillIssueDate"].split(" ");
      if(issueDate != undefined){
        this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];
      }
    })
    this.show= true;
  }

  openAdjustmentDialog() {
    debugger;
    console.log("openAdjustmentDialog");
    const adjustModal = this.dialog.open(BillAdjustmentModalComponent, {
      data: this.billInfo
     
    })

    adjustModal.afterClosed().subscribe(()=>{
      this.billingService.findBillByTxtCustomerCodeBill(this.dateFormat.transform( this.searchAdjustmentForm.controls.billFrom.value),
      this.dateFormat.transform(this.searchAdjustmentForm.controls.billTo.value),this.searchAdjustmentForm.controls.txtCustomerCode.value).subscribe(response => {
        console.log(response);
        this.billInfo = response[0];
      });
    })
    console.log("this.billInfo")
    console.log(this.billInfo)
  }

  downloadPdf(printBill){
    debugger;
    console.log("downloadPdf");
    // window.print();

    var printContents = document.getElementById(printBill).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}

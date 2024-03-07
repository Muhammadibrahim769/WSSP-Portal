import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './viewBillInstallment.component.html'
})
export class ViewBillInstallmentComponent implements OnInit {
  step = 0;
  
  constructor() { }

  ngOnInit(): void {
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
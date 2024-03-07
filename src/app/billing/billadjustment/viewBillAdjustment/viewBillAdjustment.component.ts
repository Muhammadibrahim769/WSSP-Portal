import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './viewBillAdjustment.component.html'
})
export class ViewBillAdjustmentComponent implements OnInit {
    Id: any = "";
    billInfo: any;
    step = 0;
    constructor(private route: ActivatedRoute, private billingService: BillingService, public dialog: MatDialog, private dateFormat: DateFormatPipe) {}
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
          this.Id = +params.get("id");
      });
      this.billingService.findBillAdjustmentById(this.Id).subscribe(response=>{
          debugger;
          this.billInfo = response;
          console.log(response);
          if(response["dteBillIssueDate"]){
            let issueDate = response["dteBillIssueDate"].split(" ");
            if(issueDate[5] != undefined){
              this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];
            }
          }
      })
  }
  setStep(index: number) {
    this.step = index;
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
    window.location.reload();

  }

}

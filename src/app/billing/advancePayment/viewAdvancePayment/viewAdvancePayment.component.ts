import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BillingService } from "@app/services/billing.service";

@Component({
    selector: 'app-advancePaymentList',
    templateUrl: './viewAdvancePayment.component.html'
  })
  
  export class ViewAdvancePaymentComponent implements OnInit {
    
    Id: any = "";
    billInfo: any;
    step = 0;
    constructor(private route: ActivatedRoute, private billingService: BillingService){}
    

    ngOnInit(){
        this.route.paramMap.subscribe((params) => {
            this.Id = +params.get("id");
        });

        this.billingService.findAdvancePaymentById(this.Id).subscribe(response=>{
            debugger;
            this.billInfo = response[0];
            console.log(response);
        })
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
    
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditBillModalComponent } from '@app/modals/editBillModal.component';
import { BillingService } from '@app/services/billing.service';

@Component({
    selector: 'app-editbillinfo',
    templateUrl: './editBillInfo.component.html'
  })
  export class EditBillInfoComponent implements OnInit {

    Id: any = "";
    billInfo: any;
    show = false;
    step = 0;
    billIssueDate: any;
    waterSupplyTotal = 0;

    constructor(private route: ActivatedRoute, private billingService: BillingService,
        private router: Router, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.Id = +params.get("id");
        });
        this.getList(this.Id);
    }

    getList(Id){
        this.billingService.findBillByTxtCustomerCode(Id).subscribe(response=>{
            this.billInfo = response;
            console.log(response);
            if(response["txtStatus"] === "PAID"){
                alert('Paid Bill cannot be updated');
                this.router.navigate(['billing/bill']);
                return;
            }
            debugger;
            let numTotal1 = response["numServicePrice1"] * response["numServiceQty1"];
            numTotal1 = numTotal1 || 0;
            let numTotal2 = response["numServicePrice2"] * response["numServiceQty2"];
            numTotal2 = numTotal2 || 0;
            let numTotal3 = response["numServicePrice3"] * response["numServiceQty3"];
            numTotal3 = numTotal3 || 0;
            let numTotal4 = response["numServicePrice4"] * response["numServiceQty4"];
            numTotal4 = numTotal4 || 0;
            let numTotal5 = response["numServicePrice5"] * response["numServiceQty5"];
            numTotal5 = numTotal5 || 0;
            let numTotal6 = response["numServicePrice6"] * response["numServiceQty6"];
            numTotal6 = numTotal6 || 0;
            let numTotal7 = response["numServicePrice7"] * response["numServiceQty7"];
            numTotal7 = numTotal7 || 0;
            let numTotal8 = response["numServicePrice8"] * response["numServiceQty8"];
            numTotal8 = numTotal8 || 0;
            let numTotal9 = response["numServicePrice9"] * response["numServiceQty9"];
            numTotal9 = numTotal9 || 0;
            let numTotal10 = response["numServicePrice10"] * response["numServiceQty10"];
            numTotal10 = numTotal10 || 0;
            let numTotal11 = response["numServicePrice11"] * response["numServiceQty11"];
            numTotal11 = numTotal11 || 0;
            let numTotal12 = response["numServicePrice12"] * response["numServiceQty12"];
            numTotal12 = numTotal12 || 0;
            let numTotal13 = response["numServicePrice13"] * response["numServiceQty13"];
            numTotal13 = numTotal13 || 0;
            let numTotal14 = response["numServicePrice14"] * response["numServiceQty14"];
            numTotal14 = numTotal14 || 0;
            let numTotal15 = response["numServicePrice15"] * response["numServiceQty15"];
            numTotal15 = numTotal15 || 0;
            let numTotal16 = response["numServicePrice16"] * response["numServiceQty16"];
            numTotal16 = numTotal16 || 0;

            this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
            let dteBillIssueDate = response["dteBillIssueDate"].split(" ");
            this.billInfo.dteBillIssueDate = dteBillIssueDate[2] + ' ' + dteBillIssueDate[1] + ', ' + dteBillIssueDate[5];
            this.show = true;
        })
    }

    setStep(index: number) {
        this.step = index;
    }

    openEditBillModalDialog(){
        console.log("openEditBillModalDialog");
        this.dialog.open(EditBillModalComponent, {
          data: this.billInfo
        })
        this.dialog.afterAllClosed.subscribe(()=>{
            this.getList(this.Id);
        })
    }
}
  
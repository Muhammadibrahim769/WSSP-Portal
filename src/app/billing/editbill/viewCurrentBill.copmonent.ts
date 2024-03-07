import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";
import { CrudService } from "@app/_services/crud.service";

@Component({
    selector: 'app-viewCurrentBill',
    templateUrl: './viewCurrentBill.copmonent.html'
})

export class ViewCurrentBillComponent implements OnInit {

    Id: any = "";
    billInfo: any;
    step = 0;
    waterSupplyTotal = 0;

    constructor(private route: ActivatedRoute, private billingService: BillingService,public billPass:CrudService, public dialog: MatDialog, private dateFormat: DateFormatPipe) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.Id = +params.get("id");
        });
        this.billingService.findBillByTxtCustomerCode(this.Id).subscribe(response=>{
            debugger;
            this.billInfo = response;
            console.log(response);
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
            let issueDate = response["dteBillIssueDate"].split(" ");
            this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];
        })
    }

    setStep(index: number) {
        this.step = index;
    }

    downloadPdf(printBill){
        debugger;
        console.log("downloadPdf");
        var printContents = document.getElementById(printBill).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        window.document.write(originalContents);
        window.location.reload();
        // this.billPass.changeMessage(printBill);
    }

}

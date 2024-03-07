// viewMultipleBills.component.


import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";
import { CrudService } from "@app/_services/crud.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './viewMultipleBills.component.html'
})

export class ViewMultipleBillsComponent implements OnInit {

    Id: any = "";
    billInfo: any;
    step = 0;
    waterSupplyTotal = 0;
    multiBill: any[] =[];
    billInfo0: any;
    billInfo1: any;
    billInfo2: any;
    billInfo3: any;
    billInfo4: any;
    billInfo5: any;
    billInfo6: any;
    billInfo7: any;
    billInfo8: any;
    billInfo9: any;
    billInfo10: any;
    billInfo11: any;
    billInfo12: any;
    billInfo13: any;
    constructor(private route: ActivatedRoute,private shared:CrudService, private billingService: BillingService, public billPass: CrudService, public dialog: MatDialog, private dateFormat: DateFormatPipe) { }

    ngOnInit(): void {
        debugger;
        this.shared.currentMessage.subscribe(message => {
            this.multiBill.push(message);
            console.log('hjghjgk');
            console.log(this.multiBill)
          })
        this.billingService.findCurrentBillServiceBy3Param('14545446', 'Sep-2021', 'Oct-2021').subscribe(response => {
            debugger;
            // this.multiBill = response
            console.log("multibill")
            console.log(this.multiBill[0])
           this.billInfo0 = this.multiBill[0]
           this.billInfo1 = this.multiBill[1]
           this.billInfo2 = this.multiBill[2]
           this.billInfo3 = this.multiBill[3]
           this.billInfo4 = this.multiBill[4]
           this.billInfo5 = this.multiBill[5]
           this.billInfo6 = this.multiBill[6]
           this.billInfo7 = this.multiBill[7]
           this.billInfo8 = this.multiBill[8]
           this.billInfo9 = this.multiBill[9]
           this.billInfo10 = this.multiBill[10]
           this.billInfo11 = this.multiBill[11]
           this.billInfo12= this.multiBill[12]
           this.billInfo13= this.multiBill[13]
            
        })
        this.getData0();
       

    }
    getData0() {
        debugger;
        
        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData1() {
        this.billInfo1 = this.multiBill[1];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData2() {
        this.billInfo2 = this.multiBill[2];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData3() {
        this.billInfo3 = this.multiBill[3];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData4() {
        this.billInfo4 = this.multiBill[4];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData5() {
        this.billInfo5 = this.multiBill[5];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData6() {
        this.billInfo6 = this.multiBill[6];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData7() {
        this.billInfo7 = this.multiBill[7];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData8() {
        this.billInfo8 = this.multiBill[8];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData9() {
        this.billInfo9 = this.multiBill[9];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData10() {
        this.billInfo10 = this.multiBill[10];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData11() {
        this.billInfo11 = this.multiBill[11];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData12() {
        this.billInfo12 = this.multiBill[12];

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }
    getData13() {
        this.billInfo12 = this.multiBill[13];
        console.log(this.billInfo12)

        let numTotal1 = this.multiBill["numServicePrice1"] * this.multiBill["numServiceQty1"];
        numTotal1 = numTotal1 || 0;
        let numTotal2 = this.multiBill["numServicePrice2"] * this.multiBill["numServiceQty2"];
        numTotal2 = numTotal2 || 0;
        let numTotal3 = this.multiBill["numServicePrice3"] * this.multiBill["numServiceQty3"];
        numTotal3 = numTotal3 || 0;
        let numTotal4 = this.multiBill["numServicePrice4"] * this.multiBill["numServiceQty4"];
        numTotal4 = numTotal4 || 0;
        let numTotal5 = this.multiBill["numServicePrice5"] * this.multiBill["numServiceQty5"];
        numTotal5 = numTotal5 || 0;
        let numTotal6 = this.multiBill["numServicePrice6"] * this.multiBill["numServiceQty6"];
        numTotal6 = numTotal6 || 0;
        let numTotal7 = this.multiBill["numServicePrice7"] * this.multiBill["numServiceQty7"];
        numTotal7 = numTotal7 || 0;
        let numTotal8 = this.multiBill["numServicePrice8"] * this.multiBill["numServiceQty8"];
        numTotal8 = numTotal8 || 0;
        let numTotal9 = this.multiBill["numServicePrice9"] * this.multiBill["numServiceQty9"];
        numTotal9 = numTotal9 || 0;
        let numTotal10 = this.multiBill["numServicePrice10"] * this.multiBill["numServiceQty10"];
        numTotal10 = numTotal10 || 0;
        let numTotal11 = this.multiBill["numServicePrice11"] * this.multiBill["numServiceQty11"];
        numTotal11 = numTotal11 || 0;
        let numTotal12 = this.multiBill["numServicePrice12"] * this.multiBill["numServiceQty12"];
        numTotal12 = numTotal12 || 0;
        let numTotal13 = this.multiBill["numServicePrice13"] * this.multiBill["numServiceQty13"];
        numTotal13 = numTotal13 || 0;
        let numTotal14 = this.multiBill["numServicePrice14"] * this.multiBill["numServiceQty14"];
        numTotal14 = numTotal14 || 0;
        let numTotal15 = this.multiBill["numServicePrice15"] * this.multiBill["numServiceQty15"];
        numTotal15 = numTotal15 || 0;
        let numTotal16 = this.multiBill["numServicePrice16"] * this.multiBill["numServiceQty16"];
        numTotal16 = numTotal16 || 0;

        this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16;
        // let issueDate = this.multiBill["dteBillIssueDate"].split(" ");
        // this.billInfo.dteBillIssueDate = issueDate[2] + ' ' + issueDate[1] + ', ' + issueDate[5];

    }

    setStep(index: number) {
        this.step = index;
    }

    downloadPdf(printBill) {
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

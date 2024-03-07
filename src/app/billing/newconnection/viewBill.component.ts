import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
    selector: 'app-viewBill',
    templateUrl: './viewBill.component.html'
})

export class ViewBillComponent implements OnInit {

  step = 0;
  billInfo: any;
  Id: any;
  show = false;
  branchList:any [] = [];
  unionCouncilList:any [] = [];
  waterSupplyTotal = 0;

  constructor(private route: ActivatedRoute, private billingService: BillingService){}
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");       
      });
      this.billingService.getAllCustomerTemplateService().subscribe( response=>{
        console.log("getAllCustomerTemplateService")
        this.branchList = response["branchList"];
        this.unionCouncilList = response["unionConcilList"];

        this.billingService.getNewConnectionBillService(this.Id, "CONN").subscribe(response => {
          console.log("getNewConnectionBillService");
          console.log(response);
          if(response !== undefined && response !== null){
            let branchName = this.branchList.filter(x=> x.id == response["serBranchId"]);
            let UCName = this.unionCouncilList.filter(x=> x.id == response["serLocationId"]);
            this.billInfo = response;
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
              let numTotal17 = response["numServicePrice17"] * response["numServiceQty17"];
              numTotal17 = numTotal17 || 0;
              let numTotal18 = response["numServicePrice18"] * response["numServiceQty18"];
              numTotal18 = numTotal18 || 0;
              let numTotal19 = response["numServicePrice19"] * response["numServiceQty19"];
              numTotal19 = numTotal19 || 0;
              let numTotal20 = response["numServicePrice20"] * response["numServiceQty20"];
              numTotal20 = numTotal20 || 0;
              let numTotal21 = response["numServicePrice21"] * response["numServiceQty21"];
              numTotal21 = numTotal21 || 0;
              let numTotal22 = response["numServicePrice22"] * response["numServiceQty22"];
              numTotal22 = numTotal22 || 0;
              let numTotal23 = response["numServicePrice23"] * response["numServiceQty23"];
              numTotal23 = numTotal23 || 0;
              let numTotal24 = response["numServicePrice24"] * response["numServiceQty24"];
              numTotal24 = numTotal24 || 0;
              let numTotal25 = response["numServicePrice25"] * response["numServiceQty25"];
              numTotal25 = numTotal25 || 0;

  
              this.waterSupplyTotal = numTotal1 + numTotal2 + numTotal3 + numTotal4 + numTotal5 + numTotal6 + numTotal7 + numTotal8 + numTotal9 + numTotal10 + numTotal11 + numTotal12 + numTotal13 + numTotal14 + numTotal15 + numTotal16 + numTotal17+ numTotal18+ numTotal19+ numTotal20+ numTotal21+ numTotal22+ numTotal23+ numTotal24+ numTotal25;
  
            this.billInfo.branchName = branchName[0]["name"];
            this.billInfo.UCName = UCName[0]["name"];
            // let dteBillDueDate = response["dteBillDueDate"].split(" ");
            // this.billInfo.dteBillDueDate = dteBillDueDate[2] + ' ' + dteBillDueDate[1] + ', ' + dteBillDueDate[5];
            this.show = true;
          }else{
            alert('No Bill Found');
          }
        },
          (error) => {
            this.show = false;
            // error = 'No Record Found.';s
            alert(error);
      })
      })


  }
}
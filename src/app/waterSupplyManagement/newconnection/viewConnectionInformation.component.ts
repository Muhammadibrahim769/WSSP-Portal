import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BillingService } from "@app/services/billing.service";

@Component({
  selector: 'app-dashboard',
    templateUrl:'./viewConnectionInformation.component.html'
  })
  export class ViewConnectionInformationComponent implements OnInit {

    Id: any = "";
    basicInfo: any;
    basicInfoDump: any;
    statusList: []=[];
    // showDump = true;
    // show = true;

    constructor(private route: ActivatedRoute, private billingService: BillingService) {}
    
    ngOnInit() {
      debugger;
      this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");
      });

      if(this.Id > 1000){
        debugger;
        this.billingService.getCustomerListServiceByID(this.Id).subscribe( response => {
          console.log(response)
          this.basicInfo = response;
      })
      }
      else{
        debugger;
        this.billingService.getDumpCustomerListServiceByID(this.Id).subscribe( response => {
          console.log(response)
          this.basicInfo = response;
      })
      }

    }
      
  }
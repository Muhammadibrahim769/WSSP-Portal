import { Component, OnInit } from '@angular/core';
import { BillingService } from '@app/services/billing.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./viewHHAndPopulationRecord.component.html',
})
export class ViewHHAndPopulationRecordComponent implements OnInit { 
  Id: any = "";
  houseHoldDetails: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute,private billingService: BillingService) { }
    
    ngOnInit() {
      debugger;
      this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");
      });
      this.billingService.getHouseHoldListServiceByID(this.Id).subscribe( response => {
        debugger;
          console.log(response)          
          this.houseHoldDetails = response;
      })
  }

}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector:'app-dashboard',
  templateUrl:'./viewSchedule.component.html'
})
export class ViewScheduleComponent implements OnInit {
  Id: any = "";
  scheduleDetail: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute,private billingService: BillingService) { }
  ngOnInit() {
   debugger;
   this.route.paramMap.subscribe((params) => {
     this.Id = +params.get("id");
   });
     this.billingService.getScheduleServiceByID(this.Id).subscribe( response => {
       debugger;
         console.log(response)
         
         this.scheduleDetail = response;
     })
   
}

}
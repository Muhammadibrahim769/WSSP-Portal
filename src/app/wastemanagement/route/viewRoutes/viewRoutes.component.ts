import { Component, OnInit } from '@angular/core';
import { BillingService } from '@app/services/billing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./viewRoutes.component.html',
})
export class ViewRoutesComponent implements OnInit { 

  Id: any = "";
    basicInfo: any;
    constructor(private billingService: BillingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.Id = +params.get("id");
    });
  this.billingService.getrouteServiceById(this.Id).subscribe(response =>{
      debugger;
      console.log(response);
      this.basicInfo = response;
  })
  }
}
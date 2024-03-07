import { Component, ViewChild,OnInit } from '@angular/core';

import { User } from './_models';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { BillingService } from './services/billing.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({ 
  selector: 'body',
  template: '<router-outlet></router-outlet>',})
export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  testId = 414;
  showFleet = true;
  showBilling = true;
  showWater = true;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  userName:any;
  showSubSubMenu: boolean = false;
  user: User;
  [x: string]: any;
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map((result) => result.matches),
  //     shareReplay()
  //   );
  someMethod() {
    this.trigger.openMenu();
  }

  step = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private billingService: BillingService
  ) {
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.accountService.logout();
  }
  ngOnInit(){
    // this.userName = this.accountService.user;
    // debugger;
    // this.billingService.getRolesService(this.testId).subscribe(response =>{
    //   debugger;
    //   console.log("response");
    //   console.log(response);
    //   if(response["0"].txt_module_name == "Fleet Management"){
    //     this.showFleet = true;
    //   }
    // })

  }
}

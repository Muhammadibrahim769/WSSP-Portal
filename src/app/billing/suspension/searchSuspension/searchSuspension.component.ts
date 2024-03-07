import { Component, OnInit } from '@angular/core';
import { AppLabelConstants } from '..//..//../appLabel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl:'./searchSuspension.component.html'
})
export class SearchSuspensionComponent implements OnInit {
  
  step = 0;
  show = false;
  searchForm: FormGroup;
  suspendInfo: any;

  suspendInfoList = [];

  public appLabelConstants = AppLabelConstants;


  constructor(private formbuilder: FormBuilder, private router: Router, private dialog: MatDialog, private billingService: BillingService) { }

  ngOnInit(): void {  
    this.searchForm = this.formbuilder.group({
      txtCustomerCode : ['', Validators.required]
    })
  }

  onSearch(){
    this.show= true;
  }
  onSearchSubmit(){
    debugger;
    let code = this.searchForm.controls.txtCustomerCode.value;
    this.billingService.getCustomerListServiceByCode(code).subscribe(response =>{
      debugger;
      console.log("getCustomerListServiceByID")
      console.log(response["data"]);
      this.suspendInfoList = response["data"];
      this.suspendInfoList.forEach(element => {
        debugger;
        this.suspendInfo = element;
      });
      console.log(this.suspendInfo);

      if(this.suspendInfo.txtStatus === "ACTIVE"){
        this.show= true;
      }
      else{
        alert("ID does not EXIST")
        this.suspendInfo = "";
        this.show= false;
      }
      
    })
  }

  openSuspendDialog() {
    // this.dialog.open(SuspendModalComponent)
    debugger;
    let id = this.suspendInfo.customerId;
    this.billingService.getCustomerListServiceByID(id).subscribe( data => {
      debugger;
      console.log("response");
      console.log(data);
      if(data["txtStatus"] === "ACTIVE"){
        data["txtStatus"] ="SUSPENSION"
        this.billingService.updateCustomerListServiceByID(id, data).subscribe(response =>{
          debugger;
          response = data;
          console.log(response);
        })
        this.show= true;
        console.log(data);
      }
      this.router.navigate(['billing/suspendConnection']);
    })
    
  }
}

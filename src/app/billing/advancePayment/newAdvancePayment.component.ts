import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AdvancePaymentModalComponent } from "@app/modals/advancePaymentModal.component";
import { BillingService } from "@app/services/billing.service";

@Component({
    selector: 'app-newAdvancePayment',
    templateUrl: './newAdvancePayment.component.html'
  })
  export class NewAdvancePaymentComponent implements OnInit {
    
    step = 0;
    searchForm: FormGroup;
    customerInfo: any;
    show = false;

    constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private billingService: BillingService) {}

    ngOnInit(){
      this.searchForm = this.formbuilder.group({
        txtCustomerCode : ['', Validators.required]
      })
    }

    onSearchSubmit(){
      console.log(this.searchForm.controls.txtCustomerCode.value);
      this.billingService.getCustomerListServiceByCode(this.searchForm.controls.txtCustomerCode.value).subscribe(response=>{
        console.log(response);
        this.customerInfo = response;
        this.show = true;
      })
    }

    openAdvancePaymentModalDialog(){
      console.log("openEditBillModalDialog");
      this.dialog.open(AdvancePaymentModalComponent,{
        data: this.customerInfo,
        height: '200px',
        width: '650px'
      })
      this.dialog.afterAllClosed.subscribe(()=>{
          // this.getList(this.Id);
      })
  }
  }
  
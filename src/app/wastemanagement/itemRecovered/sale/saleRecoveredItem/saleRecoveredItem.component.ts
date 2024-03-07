import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './saleRecoveredItem.component.html'
})
export class SaleRecoveredItemComponent implements OnInit {
  step = 0;
  user=""
  setStep(index: number) {
    this.step = index;
  }
  formValidationMessages = {
    numRate: [{
      type: "required",
      message: "This field is required"
    }],
    numAmount: [{
      type: "required",
      message: "This field is required"
    }],
    txtSaleItem: [{
      type: "required",
      message: "This field is required"
    }],
    serBranchId: [{
      type: "required",
      message: "This field is required"
    }],
    serLocationId: [{
      type: "required",
      message: "This field is required"
    }],
    txtSoldDate: [{
      type: "required",
      message: "This field is required"
    }]
  }
  addItemSoldForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private dateFormat:DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTxtDate() {
    this.addItemSoldForm.controls.txtSoldDate.reset('');
  }
  isEditable:boolean=false;
  ucList: any;
  balalnceRecord:any[]=[];
  numAvailableQuantity:any;
  getBranchId = [];
  getUClist = [];
  branchList: any;
  unionCouncilList: any[] = [];
  subCategoryList: any[] = [];
  serviceInfoList: any[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.addItemSoldForm = this.formBuilder.group({
      serBranchId: [,Validators.required],
      serLocationId: [,Validators.required],
      txtSoldDate: ['',Validators.required],
      numRate: [,Validators.required],   
      numAmount: [,Validators.required],      
      txtSaleItem: ['',Validators.required],    
      txtVendor: ['']      
    })
    this.getBranchList();   
    this.addItemSoldForm.controls['serBranchId'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }
        console.log("this.getBranchId");
        console.log(this.getBranchId);
      })
    })
    this.addItemSoldForm.controls['txtSaleItem'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getBySaleRecoveredItem(element).subscribe(response => {
        debugger
        this.balalnceRecord = response.data;
        this.numAvailableQuantity = this.balalnceRecord[0].numQuantity;
        console.log(this.numAvailableQuantity)
      })
    })
    // this.addItemSoldForm.controls['numAmount'].valueChanges.subscribe(element => {
    //   debugger;
    //   if(element<this.numAvailableQuantity)
    //   {
    //   alert('Enter Value greater than 0')
    //   }          
    // })
  }
  getBranchList() {
    console.log(this.user);
    console.log("user id " + this.user["serUserId"]);
    debugger;
    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
      debugger;
      console.log("getBranchService");
      console.log(response);
      this.branchList = response
    })
  }
  onSubmit() {
    if (this.addItemSoldForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
      let txtSoldDate = this.dateFormat.transformOperation(this.addItemSoldForm.controls.txtSoldDate.value);
      this.addItemSoldForm.controls['txtSoldDate'].patchValue(txtSoldDate);
   
    this.billingService.saveSaleItemRecovered(this.addItemSoldForm.value).subscribe(response => {
      debugger;
      console.log(response)
      this.router.navigate(['wasteManagement/saleRecoveredItemList']);
    })
  }
}
onBlurEvent(event) {

  if (event.target.value > this.numAvailableQuantity) {
        alert('Sale Amount Must Less from Available Quantity.');
        this.addItemSoldForm.controls['numAmount'].setErrors({'incorrect': true});
        console.log(this.addItemSoldForm.controls['numAmount'].status);
      }   
  }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './addItemRecovered.component.html'
})
export class AddItemRecoveredComponent implements OnInit {
  step = 0;
  user=""
  setStep(index: number) {
    this.step = index;
  }
  formValidationMessages = {
    numTotalRecovered: [{
      type: "required",
      message: "This field is required"
    }],
    txtRouteType: [{
      type: "required",
      message: "This field is required"
    }],
    txtItemRecovered: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalWasteRecieved: [{
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
    txtRecoveredDate: [{
      type: "required",
      message: "This field is required"
    }]
  }
  addItemRecoveredForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private dateFormat:DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTxtDate() {
    this.addItemRecoveredForm.controls.txtRecoveredDate.reset('');
  }
  isEditable:boolean=false;
  ucList: any;
  getBranchId = [];
  getUClist = [];
  branchList: any;
  unionCouncilList: any[] = [];
  subCategoryList: any[] = [];
  serviceInfoList: any[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.addItemRecoveredForm = this.formBuilder.group({
      serBranchId: [,Validators.required],
      serLocationId: [,Validators.required],
      txtRecoveredDate: ['',Validators.required],
      txtItemRecovered: ['',Validators.required],      
      numTotalWasteRecieved: [,Validators.required],
      numTotalRecovered:[,Validators.required] ,
      txtRouteType:['',Validators.required]     
    })
    this.getBranchList();   
    this.addItemRecoveredForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
    if (this.addItemRecoveredForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
      let txtRecoveredDate = this.dateFormat.transformOperation(this.addItemRecoveredForm.controls.txtRecoveredDate.value);
      this.addItemRecoveredForm.controls['txtRecoveredDate'].patchValue(txtRecoveredDate);
     this.billingService.saveItemRecovered(this.addItemRecoveredForm.value).subscribe(response => {
      debugger;
      console.log(response)
      this.router.navigate(['wasteManagement/quantityRecoveredItem']);
    })
  }
}
 
}

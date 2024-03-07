import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './createCompost.component.html'
})
export class CreateCompostComponent implements OnInit {
  step = 0;
  user = ""
  branchList: any;
  unionCouncilList: any;
  ucList: any;
  getUC = [];
  setStep(index: number) {
    this.step = index;
  }
  createCompostForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private dateFormat: DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTimeOut() {
    this.createCompostForm.controls.txtCompostDate.reset('');
  } 
  formValidationMessages = {
    // txtRawWasteRecieved: [{
    //   type: "required",
    //   message: "This field is required"
    // }],
    numSold: [{
      type: "required",
      message: "This field is required"
    }],
    numBalance: [{
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
   
    txtProduced: [{
      type: "required",
      message: "This field is required"
    }],
    numRate: [{
      type: "required",
      message: "This field is required"
    }],
    txtVendor: [{
      type: "required",
      message: "This field is required"
    }],
    numAmount: [{
      type: "required",
      message: "This field is required"
    }]
  }
  getBranchId = [];
  getUClist = [];
  subCategoryList: any[] = [];
  serviceInfoList: any[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.createCompostForm = this.formBuilder.group({
      serBranchId: [''],
      serLocationId: [''],
      txtCompostDate: [''],
      // txtRawWasteRecieved: ['Compost', Validators.required],
      txtProduced: ['', Validators.required],
      numRate: [, Validators.required],
      // txtModality: [''],      
      txtVendor: ['', Validators.required],
      numAmount: [, Validators.required],
      numBalance: [, Validators.required],
      numSold: [, Validators.required]
    })
    this.getBranchList();
    this.createCompostForm.controls['serBranchId'].valueChanges.subscribe(element => {
      
      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }        
      })
    })
   
  }
  getBranchList() {


    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
      this.branchList = response
    })
  }
  onSubmit() {
    debugger;
    if (this.createCompostForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
      // this.createCompostForm.value.branch = { "id": +this.createCompostForm.controls.serBranchId.value }
      // this.createCompostForm.value.unionCouncil = { "id": +this.createCompostForm.controls.serLocation.value }
      let txtCompostDate = this.dateFormat.transformOperation(this.createCompostForm.controls.txtCompostDate.value);
      this.createCompostForm.controls.txtCompostDate.patchValue(txtCompostDate);
      this.billingService.saveCompost(this.createCompostForm.value).subscribe(response => {
        debugger;
        console.log(response)
        this.router.navigate(['wasteManagement/compost']);
      })
    }
  }

}
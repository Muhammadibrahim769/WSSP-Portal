import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './createSweepingSchedule.component.html'
})
export class CreateSweepingScheduleComponent implements OnInit {
  step = 0;
  user = ""
  setStep(index: number) {
    this.step = index;
  }
  clearTxtDate() {
    this.createWasteCollectionForm.controls.txtDate.reset('');
  }
  createWasteCollectionForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private dateFormat:DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTimeOut() {
    this.createWasteCollectionForm.controls.txtDateServicePerformed.reset('');
  }
  formValidationMessages = {
    txtShift: [{
      type: "required",
      message: "This field is required"
    }],
    txtScheduleSweeping: [{
      type: "required",
      message: "This field is required"
    }],
    txtTypeOfArea: [{
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
    txtDate: [{
      type: "required",
      message: "This field is required"
    }],
    txtSweepingMode: [{
      type: "required",
      message: "This field is required"
    }],
    numLength: [{
      type: "required",
      message: "This field is required"
    }],
    numOfRequiredDays: [{
      type: "required",
      message: "This field is required"
    }],
    txtStaffDeputed: [{
      type: "required",
      message: "This field is required"
    }],
    txtStartPointCoord: [{
      type: "required",
      message: "This field is required"
    }],
    txtFinishPointCoord: [{
      type: "required",
      message: "This field is required"
    }]
  }
  ucList: any;
  getBranchId = [];
  getUClist = [];
  branchList: any;
  unionCouncilList: any[] = [];
  subCategoryList: any[] = [];
  serviceInfoList: any[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.createWasteCollectionForm = this.formBuilder.group({
      serBranchId: [, Validators.required],
      serLocationId: [, Validators.required],
      txtDate: ['', Validators.required],
      txtTypeOfArea: ['', Validators.required],
      txtSweepingMode: ['', Validators.required],
      numLength: [, Validators.required],
      numOfRequiredDays: ['', Validators.required],
      txtStartPointCoord: ['', Validators.required],
      txtFinishPointCoord: ['', Validators.required],
      txtStaffDeputed: ['', Validators.required],
      txtScheduleSweeping: ['', Validators.required],
      txtRemarks: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtShift:['', Validators.required]      
    })
    this.getBranchList();
    this.createWasteCollectionForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
    if (this.createWasteCollectionForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
      let txtDate = this.dateFormat.transformOperation(this.createWasteCollectionForm.controls.txtDate.value);
      this.createWasteCollectionForm.controls.txtDate.patchValue(txtDate)
      this.billingService.saveSweepingSchedule(this.createWasteCollectionForm.value).subscribe(response => {
        this.router.navigate(['/wasteManagement/sweepingSchedule']);
      })
    }
  }
}
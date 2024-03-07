import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './createDesiltationActivities.component.html'
})
export class CreateDesiltationActivitiesComponent implements OnInit {
  step = 0;
  user=""
  setStep(index: number) {
    this.step = index;
  }
  createWasteCollectionForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private dateFormat:DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTimeOut() {
    this.createWasteCollectionForm.controls.txtDateServicePerformed.reset('');
  }
  formValidationMessages = {
    txtCategory: [{
      type: "required",
      message: "This field is required"
    }],
    txtModeOfCollection: [{
      type: "required",
      message: "This field is required"
    }],
    txtFrequencyWasteCollection: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalWasteCollected: [{
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
    }], txtDateServicePerformed: [{
      type: "required",
      message: "This field is required"
    }],
    txtStreetName: [{
      type: "required",
      message: "This field is required"
    }],
    numStreetId: [{
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
    this.createWasteCollectionForm = this.formBuilder.group({
      serBranchId: [,Validators.required],
      serLocationId: [,Validators.required],
      txtDateServicePerformed: ['',Validators.required],
      txtCategory: ['',Validators.required],
      txtStreetName: ['',Validators.required],
      numStreetId: [,Validators.required],
      // txtModality: [''],      
      txtStartPointCoord: ['',Validators.required],
      txtFinishPointCoord: ['',Validators.required],
      numHouses: [''],
      txtModeOfCollection: ['',Validators.required],
      txtFrequencyWasteCollection: ['',Validators.required],
      numTotalWasteCollected: ['',Validators.required],
      txtActivity:['Desiltation']   
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
    debugger;
    if (this.createWasteCollectionForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
    let txtDateServicePerformed =this.dateFormat.transformDateTime(this.createWasteCollectionForm.controls.txtDateServicePerformed.value);
    this.createWasteCollectionForm.controls.txtDateServicePerformed.patchValue(txtDateServicePerformed);
    this.billingService.saveWasteCollection(this.createWasteCollectionForm.value).subscribe(response => {
      
 
      this.router.navigate(['wasteManagement/desiltationActivity']);
    })
  }
}
 
}
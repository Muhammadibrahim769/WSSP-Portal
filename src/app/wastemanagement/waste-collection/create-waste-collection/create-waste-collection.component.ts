import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { type } from 'os';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-waste-collection.component.html'
})
export class CreateWasteCollectionComponent implements OnInit {
  step = 0;
  user: any = "";
  setStep(index: number) {
    this.step = index;
  }
  formValidationMessages = {
    txtCollectionType: [{
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
    }],
    txtDateServicePerformed: [{
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
  isEditable: boolean = false;
  createWasteCollectionForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private dateFormat: DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTimeOut() {
    this.createWasteCollectionForm.controls.txtDateServicePerformed.reset('');
  }
  ucList: any;
  getBranchId = [];
  getUClist = [];
  branchList: any;
  ngOnInit(): void {
    this.createWasteCollectionForm = this.formBuilder.group({
      serBranchId: [, Validators.required],
      serLocationId: [, Validators.required],
      txtModeOfCollection: ['', Validators.required],
      txtFrequencyWasteCollection: ['', Validators.required],
      numTotalWasteCollected: [, Validators.required],
      txtCollectionType: ['', Validators.required],
      txtDateServicePerformed: ['', Validators.required],
      txtStreetName: ['', Validators.required],
      numStreetId: [, Validators.required],
      txtStartPointCoord: ['', Validators.required],
      txtFinishPointCoord: ['', Validators.required],
      txtModality:['', Validators.required],
      numHouses: [],

      txtActivity: ["Waste Collection"]
    })
    this.createWasteCollectionForm.controls['txtCollectionType'].valueChanges.subscribe(element => {
      if (element == 'Container') {
        this.createWasteCollectionForm.controls.numHouses.patchValue(0);
        this.isEditable = true;
        this.createWasteCollectionForm.controls.txtModality.patchValue('Container Management')
      }
      else {
        this.createWasteCollectionForm.controls.numHouses.patchValue('');
        this.isEditable = false;
        this.createWasteCollectionForm.controls.txtModality.patchValue('Door To Door')
      }
    })
    this.createWasteCollectionForm.controls['serBranchId'].valueChanges.subscribe(element => {

      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }

      })
    })
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getBranchList();
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
      let txtDateServicePerformed = this.dateFormat.transformDateTime(this.createWasteCollectionForm.controls.txtDateServicePerformed.value);
      this.createWasteCollectionForm.controls.txtDateServicePerformed.patchValue(txtDateServicePerformed);

      this.billingService.saveWasteCollection(this.createWasteCollectionForm.value).subscribe(response => {
        this.router.navigate(['wasteManagement/wasteCollection']);
      })
    }
  }
}
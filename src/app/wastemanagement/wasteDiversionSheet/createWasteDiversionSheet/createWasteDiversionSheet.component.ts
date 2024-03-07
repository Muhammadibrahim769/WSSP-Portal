import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './createWasteDiversionSheet.component.html'
})
export class CreateWasteDiversionSheetComponent implements OnInit {
  step = 0;
  user = ""
  setStep(index: number) {
    this.step = index;
  }
  clearTxtDate() {
    this.createGasCollectionForm.controls.txtDate.reset('');
  }
  createGasCollectionForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, private billingService: BillingService,private dateFormat:DateFormatPipe) { }
  clearTimeOut() {
    this.createGasCollectionForm.controls.txtDateServicePerformed.reset('');
  }
  formValidationMessages = {

    numTotalAmountRecieved: [{
      type: "required",
      message: "This field is required"
    }],
    serBranchId: [{
      type: "required",
      message: "This field is required"
    }],
    txtDate: [{
      type: "required",
      message: "This field is required"
    }],
    serLocationId: [{
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
    this.createGasCollectionForm = this.formBuilder.group({
      serBranchId: ['',Validators.required],
      serLocationId: ['',Validators.required],
      txtDate: ['',Validators.required],
      numTotalAmountRecieved: ['',Validators.required],
      numWasteCompostPlant: [''],
      numWasteSentToRdf: [''],
      numWasteSentSegregation: [''],
      numWasteSentToCell: [''],
      numTotalBalanace: ['']
    })
    this.getBranchList();
    this.createGasCollectionForm.controls['serBranchId'].valueChanges.subscribe(element => {
    
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
    this.createGasCollectionForm.controls['numWasteCompostPlant'].valueChanges.subscribe((value) => {
    
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let numTotalAmountRecieved = this.createGasCollectionForm.controls['numTotalAmountRecieved'].value
        let numWasteCompostPlant = this.createGasCollectionForm.controls['numWasteCompostPlant'].value
        let numWasteSentToRdf = this.createGasCollectionForm.controls['numWasteSentToRdf'].value
        let numWasteSentSegregation = this.createGasCollectionForm.controls['numWasteSentSegregation'].value
        let numWasteSentToCell = this.createGasCollectionForm.controls['numWasteSentToCell'].value
        let sum = numWasteCompostPlant + numWasteSentToRdf + numWasteSentSegregation + numWasteSentToCell
        let amount = numTotalAmountRecieved - sum
        this.createGasCollectionForm.patchValue({
          numTotalBalanace: amount
        });
      }
    })
    this.createGasCollectionForm.controls['numWasteSentToRdf'].valueChanges.subscribe((value) => {
    
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let numTotalAmountRecieved = this.createGasCollectionForm.controls['numTotalAmountRecieved'].value
        let numWasteCompostPlant = this.createGasCollectionForm.controls['numWasteCompostPlant'].value
        let numWasteSentToRdf = this.createGasCollectionForm.controls['numWasteSentToRdf'].value
        let numWasteSentSegregation = this.createGasCollectionForm.controls['numWasteSentSegregation'].value
        let numWasteSentToCell = this.createGasCollectionForm.controls['numWasteSentToCell'].value
        let sum = numWasteCompostPlant + numWasteSentToRdf + numWasteSentSegregation + numWasteSentToCell
        let amount = numTotalAmountRecieved - sum
        this.createGasCollectionForm.patchValue({
          numTotalBalanace: amount
        });
      }
    })
    this.createGasCollectionForm.controls['numWasteSentSegregation'].valueChanges.subscribe((value) => {
    
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let numTotalAmountRecieved = this.createGasCollectionForm.controls['numTotalAmountRecieved'].value
        let numWasteCompostPlant = this.createGasCollectionForm.controls['numWasteCompostPlant'].value
        let numWasteSentToRdf = this.createGasCollectionForm.controls['numWasteSentToRdf'].value
        let numWasteSentSegregation = this.createGasCollectionForm.controls['numWasteSentSegregation'].value
        let numWasteSentToCell = this.createGasCollectionForm.controls['numWasteSentToCell'].value
        let sum = numWasteCompostPlant + numWasteSentToRdf + numWasteSentSegregation + numWasteSentToCell
        let amount = numTotalAmountRecieved - sum
        this.createGasCollectionForm.patchValue({
          numTotalBalanace: amount
        });
      }
    })
    this.createGasCollectionForm.controls['numWasteSentToCell'].valueChanges.subscribe((value) => {
    
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }     
      else {
        let numTotalAmountRecieved = this.createGasCollectionForm.controls['numTotalAmountRecieved'].value
        let numWasteCompostPlant = this.createGasCollectionForm.controls['numWasteCompostPlant'].value
        let numWasteSentToRdf = this.createGasCollectionForm.controls['numWasteSentToRdf'].value
        let numWasteSentSegregation = this.createGasCollectionForm.controls['numWasteSentSegregation'].value
        let numWasteSentToCell = this.createGasCollectionForm.controls['numWasteSentToCell'].value
        let sum = numWasteCompostPlant + numWasteSentToRdf + numWasteSentSegregation + numWasteSentToCell
        let amount = numTotalAmountRecieved - sum
        this.createGasCollectionForm.patchValue({
          numTotalBalanace: amount
         
        }); 
      }
    })
  }
  getBranchList() {
    console.log(this.user);
    console.log("user id " + this.user["serUserId"]);
  
    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
    
      console.log("getBranchService");
      console.log(response);
      this.branchList = response
    })
  }
  onSubmit() {
    if (this.createGasCollectionForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
    let txtDate = this.dateFormat.transformOperation(this.createGasCollectionForm.controls.txtDate.value);
    this.createGasCollectionForm.controls['txtDate'].patchValue(txtDate);
    this.billingService.saveWasteDiversionSheet(this.createGasCollectionForm.value).subscribe(response => {
    
      console.log(response)
      this.router.navigate(['/wasteManagement/wasteDiversionSheet']);
    })
  }
}
}
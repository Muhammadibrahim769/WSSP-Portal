import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './createGasCollection.component.html'
})
export class CreateGasCollectionComponent implements OnInit {
  step = 0;
  user = ""
  setStep(index: number) {
    this.step = index;
  }
  clearTxtDate() {
    this.createGasCollectionForm.controls.txtDate.reset('');
  }
  createGasCollectionForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private formatDate: DateFormatPipe, private router: Router, private billingService: BillingService) { }
  clearTimeOut() {
    this.createGasCollectionForm.controls.txtDateServicePerformed.reset('');
  }
  formValidationMessages = {
    txtGasCollection: [{
      type: "required",
      message: "This field is required"
    }],
    numGasConsumed: [{
      type: "required",
      message: "This field is required"
    }],
    numRate: [{
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
    txtCellNo: [{
      type: "required",
      message: "This field is required"
    }],
    txtDate: [{
      type: "required",
      message: "This field is required"
    }],
    txtVentNo: [{
      type: "required",
      message: "This field is required"
    }],
    numBalance: [{
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
      serBranchId: [, Validators.required],
      serLocationId: [, Validators.required],
      txtDate: ['', Validators.required],
      txtVentNo: ['', Validators.required],
      txtCellNo: ['', Validators.required],
      txtGasCollection: ['', Validators.required],
      numGasConsumed: ['', Validators.required],
      numRate: ['', Validators.required],
      numBalance: [, Validators.required],
      numTotal: ['']
    })
    this.getBranchList();
    this.createGasCollectionForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
    this.createGasCollectionForm.controls['numGasConsumed'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.createGasCollectionForm.controls['numGasConsumed'].value * this.createGasCollectionForm.controls['numRate'].value

        this.createGasCollectionForm.patchValue({

          numTotal: amount
        });
      }
    })
    this.createGasCollectionForm.controls['numRate'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.createGasCollectionForm.controls['numRate'].value * this.createGasCollectionForm.controls['numGasConsumed'].value

        this.createGasCollectionForm.patchValue({

          numTotal: amount
        });
      }
    })
    this.createGasCollectionForm.controls['numGasConsumed'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.createGasCollectionForm.controls['txtGasCollection'].value - this.createGasCollectionForm.controls['numGasConsumed'].value

        this.createGasCollectionForm.patchValue({

          numBalance: amount
        });
      }
    })
    this.createGasCollectionForm.controls['txtGasCollection'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.createGasCollectionForm.controls['txtGasCollection'].value - this.createGasCollectionForm.controls['numGasConsumed'].value

        this.createGasCollectionForm.patchValue({

          numBalance: amount
        });
      }
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
    debugger;
    if (this.createGasCollectionForm.invalid) {
      alert('Please must filled all the required fields');
      return
    }
    else {
      let txtDate = this.formatDate.transformOperation(this.createGasCollectionForm.controls.txtDate.value);
      this.createGasCollectionForm.controls.txtDate.patchValue(txtDate)
      // this.createGasCollectionForm.controls.txtDate.reset('');
      this.billingService.saveGAsCollectionSheet(this.createGasCollectionForm.value).subscribe(response => {
        debugger;
        console.log(response)
        this.router.navigate(['/wasteManagement/gasCollection']);
      })
    }
  }

}
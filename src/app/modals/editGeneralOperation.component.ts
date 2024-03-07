import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './editGeneralOperation.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditGeneralOperationComponent implements OnInit {
  editGeneralOperationForm: FormGroup;
  step = 0;
  test = "";
  editData: any;
  totalRunningHR: number;
  totalRunningHr: any;

  date = new FormControl(moment());
  public myDates: any = {};
  @ViewChild('picker') datePickerElement = MatDatepicker;
  total: number;
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.editGeneralOperationForm.controls.txtMonth.value;

    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.editGeneralOperationForm.controls.txtMonth.value;

    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  handleYearSelected(normalizedYear: Moment) {
    console.log("normalizedYear: ", normalizedYear.toDate());
  }
  handleMonthSelected(normalizedMonth: Moment) {
    console.log("normalizedMonth: ", normalizedMonth.toDate());
  }
  OnlyNumbersAllowed(event): boolean {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
  clearAvgDischarge() {
    this.editGeneralOperationForm.controls.dateAvgDischarge.reset('');
  }
  clearPeriod() {
    this.date.reset('');
  }
  public shown = false;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dateFormat: DateFormatPipe, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditGeneralOperationComponent>, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private billingService: BillingService) { }
  Id: any;
  formValidationMessages = {
    numPriMhRepaired: [{
      type: "required",
      message: "This field is required"
    }],
    numPriSewerageLinesRepaired: [{
      type: "required",
      message: "This field is required"
    }],
    numPriDrainageLinesRepaired: [{
      type: "required",
      message: "This field is required"
    }],
    numPriMhCleaned: [{
      type: "required",
      message: "This field is required"
    }],
    numSecMhCleaned: [{
      type: "required",
      message: "This field is required"
    }],
    numTerMhCleaned: [{
      type: "required",
      message: "This field is required"
    }],
    numPriSewerageLinesCleaned: [{
      type: "required",
      message: "This field is required"
    }]
  }
  ngOnInit() {
    debugger;
    console.log(this.data)
    // this.test = this.data;
    console.log(this.test);
    this.editGeneralOperationForm = this.formBuilder.group({
      txtBranchName: [''],
      txtLocationName: [''],
      numPriMhRepaired: [, Validators.required],
      numSecMhRepaired: [''],
      numTerMhRepaired: [],
      serGenOperationId: [],
      txtMonth: [''],
      serBranchId: [],
      serLocationId: [],
      numPriMhCleaned: [],
      numSecMhCleaned: [],
      numTerMhCleaned: [], 
      numOfBillDistributed:[],
      numPriSewerageLineDiscelitation:[],
      numPriSewerageLinesRepaired: [, Validators.required],    
      numPriSewerageLinesCleaned:[],
      numSecSewerageLineDiscelitation:[],
      numSecSewerageLineRepaired:[],
      numSecSewerageLineCleaned:[],
      numPriDrainageLinesCleaned: [],
      numPriDrainageLinesDiscelitation:[],
      numPriDistributionLinesDiscelitation:[],
      numPriDistributionLinesRepaired:[],
      numPriDistributionLinesCleaned:[],
      numSecDistributionLinesRepaired:[],
      numSecDistributionLinesCleaned:[],
      numSecDistributionLinesDiscelitation:[],
      numPriDrainageLinesRepaired: [],
      numSecDrainageLinesRepaired: [],
      numSecDrainageLinesCleaned: [],
      numSecDrainageLinesDiscelitation: [],
       numDrainageLinesDiscelitation:[],    
      


    })
    this.getWaterProductionFieldsData();
  }
  getWaterProductionFieldsData() {
    this.editData = this.data;
    debugger;
    console.log("editData")
    console.log(this.editData)
    this.editGeneralOperationForm.controls['numOfBillDistributed'].patchValue(this.editData.numOfBillDistributed);

    this.editGeneralOperationForm.controls['txtMonth'].patchValue(this.editData.txtMonth);
    this.editGeneralOperationForm.controls['serGenOperationId'].patchValue(this.editData.serGenOperationId);
    this.editGeneralOperationForm.controls['serBranchId'].patchValue(this.editData.serBranchId);
    this.editGeneralOperationForm.controls['serLocationId'].patchValue(this.editData.serLocationId);
    this.editGeneralOperationForm.controls['txtBranchName'].patchValue(this.editData.txtBranchName);
    this.editGeneralOperationForm.controls['txtLocationName'].patchValue(this.editData.txtLocationName);
    this.editGeneralOperationForm.controls['numTerMhRepaired'].patchValue(this.editData.numTerMhRepaired);
    this.editGeneralOperationForm.controls['numPriMhRepaired'].patchValue(this.editData.numPriMhRepaired);
    this.editGeneralOperationForm.controls['numSecMhRepaired'].patchValue(this.editData.numSecMhRepaired);
    this.editGeneralOperationForm.controls['numPriSewerageLinesRepaired'].patchValue(this.editData.numPriSewerageLinesRepaired);
    this.editGeneralOperationForm.controls['numPriMhCleaned'].patchValue(this.editData.numPriMhCleaned);
    this.editGeneralOperationForm.controls['numSecMhCleaned'].patchValue(this.editData.numSecMhCleaned);
    this.editGeneralOperationForm.controls['numTerMhCleaned'].patchValue(this.editData.numTerMhCleaned);
    this.editGeneralOperationForm.controls['numPriDrainageLinesRepaired'].patchValue(this.editData.numPriDrainageLinesRepaired);
    this.editGeneralOperationForm.controls['numPriSewerageLinesCleaned'].patchValue(this.editData.numPriSewerageLinesCleaned);
    this.editGeneralOperationForm.controls['numPriDrainageLinesCleaned'].patchValue(this.editData.numPriDrainageLinesCleaned);
    this.editGeneralOperationForm.controls['numPriDrainageLinesDiscelitation'].patchValue(this.editData.numPriDrainageLinesDiscelitation);
    this.editGeneralOperationForm.controls['numPriSewerageLineDiscelitation'].patchValue(this.editData.numPriSewerageLineDiscelitation);
    this.editGeneralOperationForm.controls['numSecDistributionLinesRepaired'].patchValue(this.editData.numSecDistributionLinesRepaired);
    this.editGeneralOperationForm.controls['numSecDistributionLinesCleaned'].patchValue(this.editData.numSecDistributionLinesCleaned);
    this.editGeneralOperationForm.controls['numSecDistributionLinesDiscelitation'].patchValue(this.editData.numSecDistributionLinesDiscelitation);
    this.editGeneralOperationForm.controls['numSecSewerageLineRepaired'].patchValue(this.editData.numSecSewerageLineRepaired);
    this.editGeneralOperationForm.controls['numSecSewerageLineCleaned'].patchValue(this.editData.numSecSewerageLineCleaned);
    this.editGeneralOperationForm.controls['numSecSewerageLineDiscelitation'].patchValue(this.editData.numSecSewerageLineDiscelitation);
    this.editGeneralOperationForm.controls['numDrainageLinesDiscelitation'].patchValue(this.editData.numDrainageLinesDiscelitation);

  }
  onUpdate() {
    debugger;
    if (this.editGeneralOperationForm.invalid) {
      // alert("Fill Mandatory Fields");
      return
    }
    this.billingService.updateGeneralOperation(this.editGeneralOperationForm.value).subscribe(Response => {
      console.log(Response);
    })
    this.dialogRef.close(true);
    // this.router.navigate(['/operationManagement/generalOperation']);

  }

}

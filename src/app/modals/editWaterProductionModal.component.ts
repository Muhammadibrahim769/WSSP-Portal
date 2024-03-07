import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDatepicker } from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
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
  templateUrl: './editWaterProductionModal.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditWaterProductionModalComponent implements OnInit {
  editWaterProductionForm: FormGroup;
  step = 0;
  test = '';
  showErrorMessage = false;
  editData: any;
  isDisabled = false;
  totalRunningHR: number;
  totalRunningHr: any;

  date = new FormControl(moment());
  public myDates: any = {};
  @ViewChild('picker') datePickerElement = MatDatepicker;
  total: number;
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.editWaterProductionForm.controls.txtMonth.value;

    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.editWaterProductionForm.controls.txtMonth.value;

    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  handleYearSelected(normalizedYear: Moment) {
    console.log('normalizedYear: ', normalizedYear.toDate());
  }
  handleMonthSelected(normalizedMonth: Moment) {
    console.log('normalizedMonth: ', normalizedMonth.toDate());
  }

  clearAvgDischarge() {
    this.editWaterProductionForm.controls.dateAvgDischarge.reset('');
  }
  clearPeriod() {
    this.date.reset('');
  }
  formValidationMessages = {
    numCurrentMeterReading: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
  };
  Message: false;

  public shown = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dateFormat: DateFormatPipe,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditWaterProductionModalComponent>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private billingService: BillingService
  ) {}
  Id: any;
  ngOnInit() {
    console.log(this.data);
    // this.test = this.data;
    console.log(this.test);
    this.editWaterProductionForm = this.formBuilder.group({
      blnIsActive: [],
      blnIsFunctional: [],
      blnIsMetered: [],
      blnStatus: [],
      dteCreatedDate: [''],
      numMonthlyBill: [],
      numTotalRunningHours: [],
      numUnitConsumed: [],
      numWaterProducedInHour: [],
      numWaterProducedInUnit: [, [Validators.required]],
      serBranchId: [],
      txtTubewellRefNo: [''],
      serLocationId: [],
      serProductId: [],
      serWaterSourceId: [],
      txtAverageDischargePerHour: [],
      txtAverageDischargePerUnit: [],
      txtMonth: [''],
      txtProductCode: [''],
      txtProductName: [''],
      txtRemarks: [''],
      txtStatus: [''],
      numPreviousMeterReading: [],
      numCurrentMeterReading: [, Validators.required],
      txtDischargeCalculation: [''],
      txtItemType: ['TW'],
      txtElectricityMeterReading: [''],
    });
    this.getWaterProductionFieldsData();

    // CALCULATE FUNCTION
    this.editWaterProductionForm.controls[
      'numCurrentMeterReading'
    ].valueChanges.subscribe((value) => {
      this.isDisabled = false;
      if (value <= 0) {
        this.showErrorMessage = true;
      } else {
        let total =
          this.editWaterProductionForm.controls.numCurrentMeterReading.value -
          this.editWaterProductionForm.controls.numPreviousMeterReading.value;
        this.editWaterProductionForm.controls[
          'numWaterProducedInUnit'
        ].patchValue(total);
        if (
          this.editWaterProductionForm.controls['numWaterProducedInUnit']
            .value < 0
        ) {
          this.isDisabled = true;
        }
      }
    });
    this.editWaterProductionForm.controls[
      'numPreviousMeterReading'
    ].valueChanges.subscribe((value) => {
      this.isDisabled = false;
      let total =
        this.editWaterProductionForm.controls.numCurrentMeterReading.value -
        this.editWaterProductionForm.controls.numPreviousMeterReading.value;
      this.editWaterProductionForm.controls[
        'numWaterProducedInUnit'
      ].patchValue(total);
      if (
        this.editWaterProductionForm.controls['numWaterProducedInUnit'].value <
        0
      ) {
        this.isDisabled = true;
      }
    });

    this.editWaterProductionForm.controls[
      'txtAverageDischargePerHour'
    ].valueChanges.subscribe((value) => {
      if (value <= 0) {
        // alert('Enter Value greater than 0')
      } else {
        let amount =
          this.editWaterProductionForm.controls['numTotalRunningHours'].value *
          this.editWaterProductionForm.controls['txtAverageDischargePerHour']
            .value;

        this.editWaterProductionForm.patchValue({
          numWaterProducedInHour: amount,
        });

        console.log(amount);
        console.log('result');
        console.log(
          this.editWaterProductionForm.controls.numWaterProducedInHour.value
        );
      }
    });
    this.editWaterProductionForm.controls[
      'numTotalRunningHours'
    ].valueChanges.subscribe((value) => {
      if (value <= 0) {
        // alert('Enter Value greater than 0')
      } else {
        let amount =
          this.editWaterProductionForm.controls['numTotalRunningHours'].value *
          this.editWaterProductionForm.controls['txtAverageDischargePerHour']
            .value;

        this.editWaterProductionForm.patchValue({
          numWaterProducedInHour: amount,
        });

        console.log(amount);
        console.log('result');
        console.log(
          this.editWaterProductionForm.controls.numWaterProducedInHour.value
        );
      }
    });
    this.editWaterProductionForm.controls[
      'numWaterProducedInUnit'
    ].valueChanges.subscribe((value) => {
      if (value <= 0) {
        // alert('Enter Value greater than 0')
      } else {
        // this.editWaterProductionForm.controls['txtAverageDischargePerUnit'].value
        let amount =
          this.editWaterProductionForm.controls['numWaterProducedInUnit']
            .value * 1;
        this.editWaterProductionForm.patchValue({
          numUnitConsumed: amount,
        });
        console.log(amount);
        console.log('result');
        console.log(
          this.editWaterProductionForm.controls.numUnitConsumed.value
        );
      }
    });
    this.editWaterProductionForm.controls.txtDischargeCalculation.valueChanges.subscribe(
      (value) => {
        if (value === 'Flow Meter') {
          this.isReadOnly = true;
          // this.editWaterProductionForm.controls.numWaterProducedInUnit.disabled
        } else {
          this.isReadOnly = false;
        }
      }
    );
  }
  public isInvalid: boolean = false;
  // onChange(event): boolean {

  //   this.editWaterProductionForm.controls['numCurrentMeterReading'].valueChanges.subscribe((value) => {

  //     if (value < this.editWaterProductionForm.controls.numPreviousMeterReading.value) {
  //       this.isInvalid = true;
  //     }
  //     else {
  //       this.isInvalid = false;
  //     }
  //   })
  //   return true;
  // }
  // onChange(event: any): void {
  //   this.isInvalid = this.editWaterProductionForm.controls.numCurrentMeterReading.value > this.editWaterProductionForm.controls.numPreviousMeterReading.value;
  // }
  isReadOnly: boolean = false;
  prevM: any;
  prevMonth: any;
  getPrevMonth() {
    this.prevM = this.editData.txtMonth;
    var makeDate = new Date(this.prevM);
    // console.log('Original date: ', makeDate.toString());
    makeDate.setMonth(makeDate.getMonth() - 1);
    console.log('After subtracting a month: ', makeDate.toString());
    this.prevMonth = this.dateFormat.transform(makeDate.toString());
    console.log(' month: ', this.prevMonth);
    let txtMonth = this.prevM;
    let serProductId = this.editData.serProductId;
    let prevMonth = this.prevMonth;
    this.billingService
      .getMeterReading(txtMonth, serProductId, prevMonth)
      .subscribe((response) => {
        console.log(response['data'][0]);
        if (response['data'].length > 0) {
          this.editWaterProductionForm.controls[
            'numPreviousMeterReading'
          ].patchValue(response['data'][0].numCurrentMeterReading);
        } else {
          this.editWaterProductionForm.controls[
            'numPreviousMeterReading'
          ].patchValue(0);
        }
      });
  }
  getWaterProductionFieldsData() {
    this.editData = this.data;
    console.log('editData');
    console.log(this.editData);

    this.editWaterProductionForm.controls[
      'txtAverageDischargePerHour'
    ].patchValue(this.editData.txtAverageDischargePerHour);
    this.editWaterProductionForm.controls['txtMonth'].patchValue(
      this.editData.txtMonth
    );
    this.editWaterProductionForm.controls['serProductId'].patchValue(
      this.editData.serProductId
    );
    this.editWaterProductionForm.controls['txtProductCode'].patchValue(
      this.editData.txtProductCode
    );
    this.editWaterProductionForm.controls['txtProductName'].patchValue(
      this.editData.txtProductName
    );
    this.editWaterProductionForm.controls['blnIsFunctional'].patchValue(
      this.editData.blnIsFunctional
    );
    this.editWaterProductionForm.controls['blnIsMetered'].patchValue(
      this.editData.blnIsMetered
    );
    this.getPrevMonth();
    this.editWaterProductionForm.controls['txtTubewellRefNo'].patchValue(
      this.editData.txtTubewellRefNo
    );
    this.editWaterProductionForm.controls['blnIsActive'].patchValue(
      this.editData.blnIsActive
    );
    this.editWaterProductionForm.controls['serBranchId'].patchValue(
      this.editData.serBranchId
    );
    this.editWaterProductionForm.controls['serLocationId'].patchValue(
      this.editData.serLocationId
    );
    this.editWaterProductionForm.controls['numTotalRunningHours'].patchValue(
      this.editData.numTotalRunningHours
    );
    this.editWaterProductionForm.controls['numWaterProducedInHour'].patchValue(
      this.editData.numWaterProducedInHour
    );
    this.editWaterProductionForm.controls['serWaterSourceId'].patchValue(
      this.editData.serWaterSourceId
    );
    this.editWaterProductionForm.controls[
      'txtAverageDischargePerUnit'
    ].patchValue(this.editData.txtAverageDischargePerUnit);
    this.editWaterProductionForm.controls['numMonthlyBill'].patchValue(
      this.editData.numMonthlyBill
    );
    this.editWaterProductionForm.controls['numCurrentMeterReading'].patchValue(
      this.editData.numCurrentMeterReading
    );
    debugger;
    this.editWaterProductionForm.controls['txtDischargeCalculation'].patchValue(
      this.editData.txtDischargeCalculation
    );
    this.editWaterProductionForm.controls['numUnitConsumed'].patchValue(
      this.editData.numUnitConsumed
    );
    this.editWaterProductionForm.controls['numWaterProducedInUnit'].patchValue(
      this.editData.numWaterProducedInUnit
    );

    if (this.editData.blnIsMetered) {
      let total =
        this.editWaterProductionForm.controls.numCurrentMeterReading.value -
        this.editWaterProductionForm.controls.numPreviousMeterReading.value;
      this.editWaterProductionForm.controls[
        'numWaterProducedInUnit'
      ].patchValue(total);
      console.log(total);
    }
    // this.editWaterProductionForm.controls['txtItemType'].patchValue(this.editData.txtItemType);
  }

  onSubmit() {
    if (
      this.editWaterProductionForm.controls.blnIsMetered.value === true &&
      this.editWaterProductionForm.controls.txtDischargeCalculation.value ===
        undefined
    ) {
      alert('Plz enter discharge tube');
      this.dialogRef.disableClose = true;
      return;
    }
    if (this.editData.blnIsActive == null) {
      this.editWaterProductionForm.controls['blnIsActive'].patchValue('false');
    }
    if (this.editData.blnIsMetered == null) {
      this.editWaterProductionForm.controls['blnIsMetered'].patchValue('false');
    }
    if (this.editData.blnStatus == null) {
      this.editWaterProductionForm.controls['blnStatus'].patchValue('false');
    }
    this.billingService
      .updateWSProductionService(this.editWaterProductionForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.dialogRef.close();
  }
  openSaveModal() {
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Save ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('Dialog is closed');
        // this.router.navigate(['operationManagement/waterRunningSource']);
      }
    });
  }
}

// this.billingService.getWaterProductionByID(this.test).subscribe(response => {
//
//   console.log("response Data by id")
//   console.log(response)
//
//   this.editData = response;
//   console.log(this.editData);
//   this.editWaterProductionForm.controls['serProductId'].patchValue(this.test);
//   debugger
//   console.log(this.editWaterProductionForm.controls.serWaterSourceId.value);
//

//   this.editWaterProductionForm.controls['serProductId'].patchValue(this.editData.serProductId);
//   this.editWaterProductionForm.controls['txtMonth'].patchValue(this.editData.txtMonth);
//   this.editWaterProductionForm.controls['txtProductCode'].patchValue(this.editData.txtProductCode);
//   this.editWaterProductionForm.controls['txtProductName'].patchValue(this.editData.txtProductName);

//   this.editWaterProductionForm.controls['numTotalRunningHours'].patchValue(this.editData.numTotalRunningHours);
//   this.editWaterProductionForm.controls['numAvgDischargeVolume'].patchValue(this.editData.numAvgDischargeVolume );
//   this.editWaterProductionForm.controls['blnStatus'].patchValue(this.editData.blnStatus);
//   this.editWaterProductionForm.controls['blnIsActive'].patchValue(this.editData.blnIsActive);
//   this.editWaterProductionForm.controls['txtMonth'].patchValue(this.editData.txtMonth );
//   this.editWaterProductionForm.controls['numMonthlyBill'].patchValue(this.editData.numMonthlyBill );
//   this.editWaterProductionForm.controls['txtAverageDischargePerUnit'].patchValue(this.editData.txtAverageDischargePerUnit);
//   this.editWaterProductionForm.controls['txtAverageDischargePerHour'].patchValue(this.editData.txtAverageDischargePerHour);
// })

// this.editWaterProductionForm.controls['numTotalRunningHours'].valueChanges.subscribe((value) => {
//
//   {
//     let amount =  this.editWaterProductionForm.controls['numTotalRunningHours'].value * this.editWaterProductionForm.controls['txtAverageDischargePerHour'].value
//     this.editWaterProductionForm.patchValue({

//       numWaterProducedInHour: amount
//       });

//  console.log(amount);
//  console.log("result")
//  console.log(this.editWaterProductionForm.controls.numWaterProducedInHour.value)
// }
// })

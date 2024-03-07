import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
// import * as moment from 'moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-y',
  },
  display: {
    dateInput: 'MMM-y',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.less'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddComplaintComponent implements OnInit {
  createComplaintForm: FormGroup;
  branchList: any;
  
  unionCouncilList: any;
  ucList: any;
  getUC = [];
  waterQualityList = [
    'BoD',
    'CoD',
    'Phosphorous',
    'Nitrogen',
    'TDS',
    'Ammonia',
    'Coliform',
    'E-Coli',
    'F-Coli',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private billingService: BillingService,
    private router: Router,
    private dateFormat: DateFormatPipe
  ) {}

  ngOnInit() {
    this.createComplaintForm = this.formBuilder.group({
      serBranchId: [''],
      serLocationId: [''],
      numTotalComplaints: [''],
      numTotalWaterComplaints: [''],


      // numWasteWaterComplaints:[""],
      numTotalSolidWasteComplaint:[""],
      numResolvedComplaintsWater:[""],
      numResolvedComplaintsWaste:[""],
      numResolvedComplaintsSolidWaste:[""],
      numTotalDrainageInspections:[""],
      numTotalInspections:[""],

      txtTotalInspection:[''],
      numDogsStrayed:[''],
      numSpray:[''],
      numBillsDistributed:[''],
      numRatsKilled:[''],
      txtMonth: [moment(), Validators.required],
    });
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        
        this.branchList = response['branchList'];
        this.unionCouncilList = response['unionConcilList'];
      });

    this.createComplaintForm.controls['serBranchId'].valueChanges.subscribe(
      (element) => {
        
        this.billingService.getBranchIdForRoutes(element).subscribe((data) => {
          this.ucList = data;
          this.getUC = [];
          for (let getBranch of this.ucList) {
            this.getUC.push(getBranch);
          }
        });
      }
    );
  }

  clearTo() {
    this.createComplaintForm.controls.txtMonth.reset('');
  }
  clearPeriod() {
    this.createComplaintForm.controls.txtMonth.reset('');
  }

  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.createComplaintForm.controls.txtMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.createComplaintForm.controls.txtMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.createComplaintForm.controls.txtMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.createComplaintForm.controls.txtMonth.setValue(ctrlValue);
    console.log("ghjsdkasd");
    console.log(this.createComplaintForm.controls.txtMonth);
    datepicker.close();
  }
  clearSamplingDate() {
    this.createComplaintForm.controls.txtMonth.reset('');
  }
  onSumbit() {
    
    let txtMonth = this.dateFormat.transform(this.createComplaintForm.controls.txtMonth.value);
    this.createComplaintForm.controls.txtMonth.patchValue(txtMonth);
    // this.createComplaintForm.value.branch = {
    //   id: +this.createComplaintForm.controls.branch.value,
    // };
    // this.createComplaintForm.value.unionCouncil = {
    //   id: +this.createComplaintForm.controls.unionCouncil.value,
    // };

    const formdata: FormData = new FormData();
    formdata.append('serBranchId', this.createComplaintForm.value.serBranchId);
    formdata.append(
      'txtBranchName',
      this.createComplaintForm.value.txtBranchName
    );

    formdata.append(
      'serLocationId',
      this.createComplaintForm.value.serLocationId
    );
    formdata.append(
      'txtLocationName',
      this.createComplaintForm.value.txtLocationName
    );

    formdata.append(
      'numDogsStrayed',
      this.createComplaintForm.value.numDogsStrayed
    );
    formdata.append(
      'numSpray',
      this.createComplaintForm.value.numSpray
    );
    formdata.append(
      'numBillsDistributed',
      this.createComplaintForm.value.numBillsDistributed
    );
    formdata.append(
      'numRatsKilled',
      this.createComplaintForm.value.numRatsKilled
    );

    formdata.append(
      'numTotalComplaints',
      this.createComplaintForm.value.numTotalComplaints
    );
    formdata.append(
      'numTotalWaterComplaints',
      this.createComplaintForm.value.numTotalWaterComplaints
    );
    formdata.append(
      'numTotalSolidWasteComplaint',
      this.createComplaintForm.value.numTotalSolidWasteComplaint
    );
    formdata.append(
      'numResolvedComplaintsWater',
      this.createComplaintForm.value.numResolvedComplaintsWater
    );
    formdata.append(
      'numResolvedComplaintsWaste',
      this.createComplaintForm.value.numResolvedComplaintsWaste
    );
    formdata.append(
      'numResolvedComplaintsSolidWaste',
      this.createComplaintForm.value.numResolvedComplaintsSolidWaste
    );
    formdata.append(
      'numTotalDrainageInspections',
      this.createComplaintForm.value.numTotalDrainageInspections
    );

    formdata.append(
      'numTotalInspections',
      this.createComplaintForm.value.numTotalInspections
    );
    
    
    formdata.append('txtMonth', this.createComplaintForm.value.txtMonth);
    console.log('formdata');
    console.log(formdata.getAll('files'));

    this.billingService.addComplaintService(formdata).subscribe((data) => {
      console.log(data);
      alert('Record Added Successfully');
      this.router.navigate(['maintenanceAndEveluation/complaints']);
    });
  }
}

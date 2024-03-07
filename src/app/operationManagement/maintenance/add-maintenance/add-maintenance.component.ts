import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.less'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class AddMaintenanceComponent implements OnInit {
  createMaintainceForm: FormGroup;
  branchList: any;
  pageSizeOptions: number[] = [10, 20, 50];
  showDC = false;
  isLoading = false;
  dataSource = null;
  showField = false
  showField1=false
  operationBasicInfoColumns: string[] = ['txtLattitude', 'txtLongitude', 'Actions'];
  operationBasicInfo = new MatTableDataSource();
  @ViewChild("operationBasicInfoSort", { static: true }) operationBasicInfoSort: MatSort;
  @ViewChild("operationBasicInfoPaginator", { static: true }) operationBasicInfoPaginator: MatPaginator;
  getMaintaincesList: any[] = [];
  unionCouncilList: any;
  ucList: any;
  getUC = [];
  getTubeWells = [];
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
  zId: any;
  locId: any;

  constructor(
    private formBuilder: FormBuilder,
    private billingService: BillingService,
    private router: Router,
    private dateFormat: DateFormatPipe
  ) { }

  ngOnInit() {
    this.createMaintainceForm = this.formBuilder.group({
      serBranchId: ['', Validators.required],
      txtLineType: ['', Validators.required],
      numDiameter: [],
      numLength: [],
      txtMaterial: [''],
      txtMaintainanceReferenceNo: ["", Validators.required],
      txtCategory: [""],
      
      txtLocationName:[""],
      txtBranchName:[""],
      dteInstallationDate: [""],
      dteMaintainanceDate: [""],
      txtConnectedTubeWell: [""],
      lstMaintainanceCoordinatesDto: [],
      txtLattitude: [""],
      txtLongitude: [""],
      txtArea: [""],
      serLocationId: ['', Validators.required],
    });
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {

        this.branchList = response['branchList'];
        this.unionCouncilList = response['unionConcilList'];
      });
    this.createMaintainceForm.controls.lstMaintainanceCoordinatesDto.patchValue(this.getMaintaincesList)
    this.createMaintainceForm.controls['serBranchId'].valueChanges.subscribe(
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
    this.createMaintainceForm.controls.txtMonth.reset('');
  }
  change(e) {
    if (e === "Sewerage") {
      this.showField = true;
    } else {
      this.showField=false;
    }
    
    if(e==="Drainage") {
      this.showField1 = true;
    } else{
      this.showField1=false;
    }
    
  }
  onDelete(index) {
    debugger;
    this.operationBasicInfo.data.splice(index, 1);
    this.operationBasicInfo._updateChangeSubscription();
  }
  tableColumn: string[] = [
    "txtLattitude",
    "txtLongitude",
  ];
  selection = new FormControl([
    "txtLattitude",
    "txtLongitude",
  ]);
  selectingColumns() {

    if (this.selection.value.length > 0) {
      this.tableColumn.forEach(singleColumn => {
        let display = "";
        if (singleColumn !== "sr") {
          let columnSelected = this.selection.value.findIndex(x => x === singleColumn)
          if (columnSelected >= 0) {
            display = "table-cell";
          } else {
            display = "none";
          }
          const slides = document.getElementsByClassName('mat-column-' + singleColumn);
          for (let i = 0; i < slides.length; i++) {
            const slide = slides[i] as HTMLElement;
            slide.style.display = display;
          }
        }
      });
    }
  }
  clearPeriod() {
    this.createMaintainceForm.controls.txtMonth.reset('');
  }

  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.createMaintainceForm.controls.txtMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.createMaintainceForm.controls.txtMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.createMaintainceForm.controls.txtMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.createMaintainceForm.controls.txtMonth.setValue(ctrlValue);
    console.log("ghjsdkasd");
    console.log(this.createMaintainceForm.controls.txtMonth);
    datepicker.close();
  }
  clearSamplingDate() {
    this.createMaintainceForm.controls.txtMonth.reset('');
  }
  addItem() {
    debugger;
    this.getMaintaincesList.push({
      txtLattitude: this.createMaintainceForm.controls.txtLattitude.value,
      txtLongitude: this.createMaintainceForm.controls.txtLongitude.value,
    })

    this.dataSource = this.getMaintaincesList;
    this.operationBasicInfo = new MatTableDataSource(this.getMaintaincesList);
    this.operationBasicInfo.sort = this.operationBasicInfoSort;
    this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
  }
  getBranchIdValue(e) {
    debugger;
    this.zId = e;
    for(let c of this.branchList){
      if(c.id == this.zId){      
        this.createMaintainceForm.controls.txtBranchName.patchValue(c.name);
      }
    }
  }
  getLocationIdValue(e) {
    debugger;
    this.locId = e;
    for(let c of this.getUC) 
    {
     if(c.id == this.locId){    
       this.createMaintainceForm.controls.txtLocationName.patchValue(c.name);
     }
    }
    this.billingService.getOperationBasicInfoServiceByParamsList(this.zId, this.locId).subscribe(Response => {
      debugger;
      this.getTubeWells = Response["data"];
    })
  }
  onSumbit() {
    if (this.createMaintainceForm.invalid) {
      alert("Please Fill required Fields")
    } else {
      delete this.createMaintainceForm.value.txtLattitude;
      delete this.createMaintainceForm.value.txtLongitude;
      this.billingService.addMaintainceService(this.createMaintainceForm.value).subscribe((data) => {
        console.log(data);
        alert('Record Added Successfully');
        this.router.navigate(['operationManagement/maintenance']);
      });
    }
  }
}


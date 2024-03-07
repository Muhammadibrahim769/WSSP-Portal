import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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
  templateUrl: './editMaintenance.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditMaintenanceComponent implements OnInit {
  createMaintainceForm: FormGroup;
  step = 0;
  test = "";
  editData: any;
  totalRunningHR: number;
  totalRunningHr: any;
  unionCouncilList: any;
  date = new FormControl(moment());
  public myDates: any = {};
  pageSizeOptions: number[] = [10, 20, 50];
  showDC = false;
  getMaintaincesList: any[] = [];
  isLoading = false;
  getTubeWells = [];
  dataSource = null;
  ucList: any;
  branchList: any;
  getUC = [];
  showField = false
  operationBasicInfoColumns: string[] = ['txtLattitude', 'txtLongitude', 'Actions'];
  operationBasicInfo = new MatTableDataSource();
  @ViewChild("operationBasicInfoSort", { static: true }) operationBasicInfoSort: MatSort;
  @ViewChild("operationBasicInfoPaginator", { static: true }) operationBasicInfoPaginator: MatPaginator;
  @ViewChild('picker') datePickerElement = MatDatepicker;
  total: number;
    zId: any;
    locId: any;
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.createMaintainceForm.controls.txtMonth.value;

    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.createMaintainceForm.controls.txtMonth.value;

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
    this.createMaintainceForm.controls.dateAvgDischarge.reset('');
  }
  clearPeriod() {
    this.date.reset('');
  }
  public shown = false;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dateFormat: DateFormatPipe, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditMaintenanceComponent>, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private billingService: BillingService) { }
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
    this.createMaintainceForm = this.formBuilder.group({
        serMaintainanceId:[],
        serBranchId: ['', Validators.required],
        txtLine: ['', Validators.required],
        numDiameter: [],
        numLength: [],
        txtMaterial: [''],
        txtBranchName:[""],
        txtLocationName:[""],
        txtMaintainanceReferenceNo: ["", Validators.required],
        txtCategory: [""],
        dteInstallationDate: [""],
        dteMaintainanceDate: [""],
        txtConnectedTubeWell: [""],
        lstMaintainanceCoordinatesDto: [],
        txtLattitude: [""],
        txtLongitude: [""],
        txtArea: [""],
        serLocationId: ['', Validators.required],
    })
    this.billingService
    .getAllCustomerTemplateService()
    .subscribe((response) => {

      this.branchList = response['branchList'];
      this.unionCouncilList = response['unionConcilList'];
    });
  
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
    this.getMaintenanceFieldsData();
  }
  getMaintenanceFieldsData() {
    debugger;
    this.editData = this.data;
    this.createMaintainceForm.controls.txtLine.patchValue(this.editData.txtLine);
    this.createMaintainceForm.controls.serMaintainanceId.patchValue(this.editData.serMaintainanceId);
    this.createMaintainceForm.controls.txtCategory.patchValue(this.editData.txtCategory);
    this.createMaintainceForm.controls.numDiameter.patchValue(this.editData.numDiameter);
    this.createMaintainceForm.controls.numLength.patchValue(this.editData.numLength);
    this.createMaintainceForm.controls.txtMaintainanceReferenceNo.patchValue(this.editData.txtMaintainanceReferenceNo);
   
    this.createMaintainceForm.controls.txtMaterial.patchValue(this.editData.txtMaterial);
    this.createMaintainceForm.controls.dteInstallationDate.patchValue(this.editData.dteInstallationDate);
    this.createMaintainceForm.controls.dteMaintainanceDate.patchValue(this.editData.dteMaintainanceDate);
    // this.createMaintainceForm.controls.txtConnectedTubeWell.patchValue(this.editData.txtConnectedTubeWell);
    this.createMaintainceForm.controls.txtArea.patchValue(this.editData.txtArea);
    // this.createMaintainceForm.controls.serBranchId.patchValue(this.editData.txtBranchName);
    // this.createMaintainceForm.controls.serLocationId.patchValue(this.editData.txtLocationName);
    this.getMaintaincesList = this.editData["lstMaintainanceCoordinatesDto"];
    // this.getMaintaincesList.push(
    this.dataSource = this.getMaintaincesList;
    this.operationBasicInfo = new MatTableDataSource(this.getMaintaincesList);
    this.operationBasicInfo.sort = this.operationBasicInfoSort;
    this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
  }
  onUpdate() {
      debugger;
        this.createMaintainceForm.controls.lstMaintainanceCoordinatesDto.patchValue(this.getMaintaincesList);
    delete this.createMaintainceForm.value.txtLattitude;
    delete this.createMaintainceForm.value.txtLongitude;
    if (this.createMaintainceForm.invalid) {
      // alert("Fill Mandatory Fields");
      return
    }
    this.billingService.addMaintainceService(this.createMaintainceForm.value).subscribe(Response => {
      console.log(Response);
    })
    this.dialogRef.close(true);
    // this.router.navigate(['/operationManagement/generalOperation']);

  }
  change(e) {
    if (e === "Sewerage") {
      this.showField = true;
    } else {
      this.showField = false;
    }
  }
  onDelete(index) {

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
  addItem() {

    this.getMaintaincesList.push({
      txtLattitude: this.createMaintainceForm.controls.txtLattitude.value,
      txtLongitude: this.createMaintainceForm.controls.txtLongitude.value,
    })

    this.dataSource = this.getMaintaincesList;
    this.operationBasicInfo = new MatTableDataSource(this.getMaintaincesList);
    this.operationBasicInfo.sort = this.operationBasicInfoSort;
    this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
  }

}

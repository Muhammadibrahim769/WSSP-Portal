import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from '@app/_services/crud.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { MatDatepicker } from '@angular/material/datepicker';
import { UtilsFunctions } from '@app/utils/utilsFunctions';
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
  selector:'app-dashboard',
  templateUrl:'./editSchedule.component.html', providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EditScheduleComponent implements OnInit {
    editSchedulerForm: FormGroup;
    step = 0;
    user: any = "";
    responseList: any[] = [];
    branchList: any;
    ucList:any;
    editScheduleData:any;
    Id: any = "";
    unionCouncilList: any[] = [];
    selectStatusList: any[] = [];
    getBranchId = [];
    constructor(private formBuilder: FormBuilder, private billingService: BillingService,
      public dialog: MatDialog, private shared: CrudService,
      private router: Router,private route: ActivatedRoute,private dateFormat:DateFormatPipe,private utilFunction: UtilsFunctions) { }
    clearScheduleDate() {
      this.editSchedulerForm.controls.dteScheduleDate.reset('');
    }
    clearBillLastDate() {
      this.editSchedulerForm.controls.dteBillLastDate.reset('');
    }
    clearBillFrom(){
      this.editSchedulerForm.controls.billFrom.reset('');
    }
    clearBillTo(){
      this.editSchedulerForm.controls.billTo.reset('');
    }
    chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue =this.editSchedulerForm.controls.billFrom.value;
      ctrlValue.year(normalizedYear.year());
      this.editSchedulerForm.controls.billFrom.setValue(ctrlValue);
    }
  
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue =this.editSchedulerForm.controls.billFrom.value;
      ctrlValue.month(normalizedMonth.month());
     this.editSchedulerForm.controls.billFrom.setValue(ctrlValue);
     console.log("ghjsdkasd");
     console.log( this.editSchedulerForm.controls.billFrom);
      datepicker.close();
    }
    chosenYearHandlerBillTo(normalizedYear: Moment) {
      const ctrlValue =this.editSchedulerForm.controls.billTo.value;
      ctrlValue.year(normalizedYear.year());
      this.editSchedulerForm.controls.billTo.setValue(ctrlValue);
    }
  
    chosenMonthHandlerBillTo(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue =this.editSchedulerForm.controls.billTo.value;
      ctrlValue.month(normalizedMonth.month());
     this.editSchedulerForm.controls.billTo.setValue(ctrlValue);
     console.log("ghjsdkasd");
     console.log( this.editSchedulerForm.controls.billTo);
      datepicker.close();
    }
    OnlyNumbersAllowed(event): boolean {
  
      const charcode = (event.which) ? event.which : event.keycode;
  
      if (charcode > 31 && (charcode < 48 || charcode > 57)) {
        return false;
      }
      return true;
    }
    formValidationMessages = {
      dteScheduleDate: [{
        type: "required",
        message: "This field is required"
      }],
      dteBillLastDate: [{
        type: "required",
        message: "This field is required"
      }]
    }
    ngOnInit(): void {
      this.editSchedulerForm = this.formBuilder.group({
        dteScheduleDate: [''],
        serbranchId: [],
        serLocationId: [],
        dteBillLastDate: [''],
        numLatePayment: [''],
        referenceCodeStart: [],
        referenceCodeEnd: [],
        serScheduleId:[],
        txtStatus: ['NEW'],
        billFrom :[moment()],
      billTo:[moment()],
      editScheduleDatesDto: this.formBuilder.group(
        {
         
          dteScheduleDate: [new Date(), [Validators.required]],
         
        })
      })
      this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");
      });
      this.user = JSON.parse(sessionStorage.getItem('user'));
      debugger;
      console.log(this.user); 
      this.editSchedulerForm.controls['serbranchId'].valueChanges.subscribe(element => {
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
      this.getBranch();
      this. fetchDataById();
     
      
    }
    getBranch() {
      debugger;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      debugger;
      console.log("user id " + this.user.serUserId);
      this.billingService.getBranchService(this.user.serUserId).subscribe(response => {
        debugger;
        console.log(response["branchList"]);
        this.branchList = response;
        this.selectStatusList = [];
        console.log(response);
        this.responseList = response.data
      })
    }
    get ScheduleDate() { return <FormGroup>this.editScheduleData.get("editScheduleDatesDto"); }

    fetchDataById(){
        this.billingService.getScheduleServiceByID(this.Id).subscribe( response => {
            debugger;
            this.formatDate()
              console.log(response)              
              this.editScheduleData = response;  
              this.editSchedulerForm.controls.serScheduleId.patchValue(this.editScheduleData.serScheduleId);
              this.editSchedulerForm.controls['serbranchId'].patchValue(this.editScheduleData.serBranchId+'');
              this.editSchedulerForm.controls['serLocationId'].patchValue(this.editScheduleData.serLocationId+'');
              this.editSchedulerForm.controls.dteBillLastDate.patchValue(this.editScheduleData.dteBillLastDate);
             
              this.editSchedulerForm.controls.numLatePayment.patchValue(this.editScheduleData.numLatePayment);
              this.editSchedulerForm.controls.referenceCodeStart.patchValue(this.editScheduleData.referenceCodeStart);
              this.editSchedulerForm.controls.referenceCodeEnd.patchValue(this.editScheduleData.referenceCodeEnd);
              this.editSchedulerForm.controls.billFrom.patchValue(this.editScheduleData.billFrom);
              this.editSchedulerForm.controls.billTo.patchValue(this.editScheduleData.billTo);
        })
    }
    onUpdateSchedule(){
      if(this.editSchedulerForm.invalid){
        return
      }     
      debugger;
      // let formValue = this.editSchedulerForm.value;  
      // formValue.branch = { "id": +this.editSchedulerForm.controls.serbranchId.value }
      // formValue.unionCouncil = { "id": +this.editSchedulerForm.controls.serLocationId.value }
      this.billingService.updateScheduleServiceById(this.Id, this.editSchedulerForm.value).subscribe(response => {
        response["data"] = this.editSchedulerForm.value;
        console.log("response");
        console.log(response.data);
      })
      this.router.navigate(['billing/scheduler']);
    }
    formatDate(){
      let startDate = this.utilFunction.transformDate(this.ScheduleDate.get('dteScheduleDate').value);

      // let startDate = this.dateFormat.transformDateTime(this.editScheduleData.dteScheduleDate);
      this.ScheduleDate.get('dteScheduleDate').patchValue(startDate);

      // this.editSchedulerForm.controls.dteScheduleDate.patchValue(startDate);
    }
}
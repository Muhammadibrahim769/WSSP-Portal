import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillingService } from '@app/services/billing.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/_services/crud.service';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';

import { Moment } from 'moment'; import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './createSchedule.component.html'
})
export class CreateScheduleComponent implements OnInit {
  createSchedulerForm: FormGroup;
  step = 0;
  user: any = "";
  branchList: any;
  ucList: any;
  unionCouncilList: any[] = [];
  selectStatusList: any[] = [];
  getBranchId = [];
  constructor(private formBuilder: FormBuilder, private billingService: BillingService,
    public dialog: MatDialog, private shared: CrudService, private router: Router, private dateFormat: DateFormatPipe) { }

  ngOnInit(): void {
    this.createSchedulerForm = this.formBuilder.group({
      serBranchId: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      serLocationId: [''],
      dteScheduleDate: ['', Validators.required],
      dteBillLastDate: ['', Validators.required],
      numLatePayment: ['10', Validators.required],
      // referenceCodeStart: ['', Validators.required],
      referenceCodeEnd: [],
      txtStatus: ['NEW'],
      billFrom: [moment(), Validators.required],
      billTo: [moment(), Validators.required],
      dteBillValidityDate: [moment(), Validators.required]
    }, { validator: this.checkDates })

    this.user = JSON.parse(sessionStorage.getItem('user'));
    debugger;
    console.log(this.user);
    this.createSchedulerForm.controls['serBranchId'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }
      })
    })
    this.getBranch();
    // this.getAllLocation();
  }
  allLocation: any = "";
  // getAllLocation() {
  //   debugger;
  //   this.billingService.getAllLocation().subscribe(response => {
  //     this.allLocation = response
  //     debugger;
  //     this.allLocation.forEach(element => {
  //       console.log("All time")
  //       console.log(element)
  //     });
  //   })

  // }

  checkDates(group: FormGroup) {
    debugger;
    if (group.controls.dteBillLastDate.value < group.controls.dteScheduleDate.value) {
      return { notValid: true }
    }
    else if (group.controls.dteBillValidityDate.value < group.controls.dteBillLastDate.value) {
      return { notVal: true }
    }
    return null;
  }

  onSubmit() {
    debugger;
    if (this.createSchedulerForm.invalid) {
      alert('Invalid Form')
      return
    }
    debugger;
    this.billingService.getAllLocation().subscribe(response => {
      this.allLocation = response
      console.log("All Locations")
      console.log(this.allLocation)
      this.allLocation.forEach(element => {
        console.log(element)
        if (element.id === 103) {

          var currentDate = this.createSchedulerForm.controls.dteScheduleDate.value;
          this.createSchedulerForm.controls["dteScheduleDate"].patchValue(futureDate)
          this.createSchedulerForm.controls["serBranchId"].patchValue(element.branch.id)
          this.createSchedulerForm.controls["txtBranchName"].patchValue(element.branch.name)
          this.createSchedulerForm.controls["txtLocationName"].patchValue(element.name)
          this.createSchedulerForm.controls["serLocationId"].patchValue(element.id)
          // let dteScheduleDate = this.dateFormat.transformToStandardDateTime(this.createSchedulerForm.controls.dteScheduleDate.value);
          let txtBillTo = this.dateFormat.transform(this.createSchedulerForm.controls.billTo.value);
          let txtBillFrom = this.dateFormat.transform(this.createSchedulerForm.controls.billFrom.value);
          let txtValidityDate = this.dateFormat.transformToStandardDateTime(this.createSchedulerForm.controls.dteBillValidityDate.value);
          this.createSchedulerForm.controls.billFrom.patchValue(txtBillFrom);
          this.createSchedulerForm.controls.billTo.patchValue(txtBillTo);
          this.createSchedulerForm.controls.dteBillValidityDate.patchValue(txtValidityDate);
          this.createSchedulerForm.controls.dteScheduleDate.patchValue(currentDate);
          console.log(this.createSchedulerForm.value);
          this.billingService.createScheduleService(this.createSchedulerForm.value).subscribe(response=>{
            console.log(response)
          })


        }
        else {

          var minutesToAdd = 5;
          var currentDate = this.createSchedulerForm.controls.dteScheduleDate.value;
          var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
          this.createSchedulerForm.controls["dteScheduleDate"].patchValue(futureDate)
          this.createSchedulerForm.controls["serBranchId"].patchValue(element.branch.id)
          this.createSchedulerForm.controls["txtBranchName"].patchValue(element.branch.name)
          this.createSchedulerForm.controls["txtLocationName"].patchValue(element.name)
          this.createSchedulerForm.controls["serLocationId"].patchValue(element.id)
          // let dteScheduleDate = this.dateFormat.transformToStandardDateTime(this.createSchedulerForm.controls.dteScheduleDate.value);
          let txtBillTo = this.dateFormat.transform(this.createSchedulerForm.controls.billTo.value);
          let txtBillFrom = this.dateFormat.transform(this.createSchedulerForm.controls.billFrom.value);
          let txtValidityDate = this.dateFormat.transformToStandardDateTime(this.createSchedulerForm.controls.dteBillValidityDate.value);
          this.createSchedulerForm.controls.billFrom.patchValue(txtBillFrom);
          this.createSchedulerForm.controls.billTo.patchValue(txtBillTo);
          this.createSchedulerForm.controls.dteBillValidityDate.patchValue(txtValidityDate);
          // this.createSchedulerForm.controls.dteScheduleDate.patchValue(dteScheduleDate);
          console.log(this.createSchedulerForm.value);
          this.billingService.createScheduleService(this.createSchedulerForm.value).subscribe(response=>{
            console.log(response)
          })
        }
      })
      this.router.navigate(['/billing/scheduler']);
    })
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
    })
  }
  onBlurEvent(event) {
    debugger
    if (event.target.value > 99){
      alert('Late Payment Must be Less than 100');
      this.createSchedulerForm.controls['numLatePayment'].setErrors({ 'incorrect': true });
      console.log(this.createSchedulerForm.controls['numLatePayment'].status);
    }
  }
  clearScheduleDate() {
    this.createSchedulerForm.controls.dteScheduleDate.reset('');
  }
  clearBillLastDate() {
    this.createSchedulerForm.controls.dteBillLastDate.reset('');
  }
  clearBillFrom() {
    this.createSchedulerForm.controls.billFrom.reset('');
  }
  clearBillTo() {
    this.createSchedulerForm.controls.billTo.reset('');
  }
  clearValidityDate() {
    this.createSchedulerForm.controls.dteBillValidityDate.reset('');
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.createSchedulerForm.controls.billFrom.value;
    ctrlValue.year(normalizedYear.year());
    this.createSchedulerForm.controls.billFrom.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.createSchedulerForm.controls.billFrom.value;
    ctrlValue.month(normalizedMonth.month());
    this.createSchedulerForm.controls.billFrom.setValue(ctrlValue);
    console.log("ghjsdkasd");
    console.log(this.createSchedulerForm.controls.billFrom);
    datepicker.close();
  }
  chosenYearHandlerBillTo(normalizedYear: Moment) {
    const ctrlValue = this.createSchedulerForm.controls.billTo.value;
    ctrlValue.year(normalizedYear.year());
    this.createSchedulerForm.controls.billTo.setValue(ctrlValue);
  }
  chosenMonthHandlerBillTo(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    debugger;
    const ctrlValue = this.createSchedulerForm.controls.billTo.value;
    ctrlValue.month(normalizedMonth.month());
    this.createSchedulerForm.controls.billTo.setValue(ctrlValue);
    console.log("ghjsdkasd");
    console.log(this.createSchedulerForm.controls.billTo);
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
    }],
    dteBillValidityDate: [{
      type: "required",
      message: "This field is required"
    }]
  }

}

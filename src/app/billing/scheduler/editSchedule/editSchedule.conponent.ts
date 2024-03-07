import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from '@app/_services/crud.service';

@Component({
  selector:'app-dashboard',
  templateUrl:'./editSchedule.component.html'
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
      public dialog: MatDialog, private shared: CrudService, private router: Router,private route: ActivatedRoute) { }
    clearScheduleDate() {
      this.editSchedulerForm.controls.dteScheduleDate.reset('');
    }
    clearBillLastDate() {
      this.editSchedulerForm.controls.dteBillLastDate.reset('');
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
        branch: [''],
        unionCouncil: [''],
        dteBillLastDate: [''],
        numLatePayment: [''],
        referenceCodeStart: [],
        referenceCodeEnd: [],
        serScheduleId:[]
      })
      this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");
      });
      this.user = JSON.parse(sessionStorage.getItem('user'));
      debugger;
      console.log(this.user); 
      this.editSchedulerForm.controls['branch'].valueChanges.subscribe(element => {
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
    fetchDataById(){
        this.billingService.getScheduleServiceByID(this.Id).subscribe( response => {
            debugger;
              console.log(response)              
              this.editScheduleData = response;  
              this.editSchedulerForm.controls.serScheduleId.patchValue(this.editScheduleData.serScheduleId);
              this.editSchedulerForm.controls['branch'].patchValue(this.editScheduleData.serBranchId+'');
              this.editSchedulerForm.controls['unionCouncil'].patchValue(this.editScheduleData.serLocationId+'');
              this.editSchedulerForm.controls.dteBillLastDate.patchValue(this.editScheduleData.dteBillLastDate);
              this.editSchedulerForm.controls.dteScheduleDate.patchValue(this.editScheduleData.dteScheduleDate);
              this.editSchedulerForm.controls.numLatePayment.patchValue(this.editScheduleData.numLatePayment);
              this.editSchedulerForm.controls.referenceCodeStart.patchValue(this.editScheduleData.referenceCodeStart);
              this.editSchedulerForm.controls.referenceCodeEnd.patchValue(this.editScheduleData.referenceCodeEnd);
         })
    }
    onUpdateSchedule(){
      if(this.editSchedulerForm.invalid){
        return
      }     
      debugger;
      let formValue = this.editSchedulerForm.value;  
      formValue.branch = { "id": +this.editSchedulerForm.controls.branch.value }
      formValue.unionCouncil = { "id": +this.editSchedulerForm.controls.unionCouncil.value }
      this.billingService.updateScheduleServiceById(this.Id, this.editSchedulerForm.value).subscribe(response => {
        response["data"] = this.editSchedulerForm.value;
        console.log("response");
        console.log(response.data);
      })
      this.router.navigate(['billing/scheduler']);
    }
}
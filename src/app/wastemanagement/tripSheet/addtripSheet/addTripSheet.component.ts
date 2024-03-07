import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './addTripSheet.component.html'
})
export class AddTripSheetComponent implements OnInit {
  addTripSheetForm: FormGroup;
  addForm: FormGroup;
  user: any = "";
  getAllNameCode = [];
  getAllBatchCode = [];
  getBatchCode = [];
  selectStatusList: any[] = [];
  responseList: any[] = [];
  branchList: any;
  driverName: any;
  model: NgbDateStruct;
  constructor(public dialog: MatDialog, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private billingService: BillingService) {
  }
  clearTimeOut() {
    this.addTripSheetForm.controls.txtVehicleTimeOut.reset('');
  }
  clearTimeIn() {
    this.addTripSheetForm.controls.txtVehicleTimeIn.reset('');
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  OnlyNumbersAllowed(event): boolean {

    const charcode = (event.which) ? event.which : event.keycode;

    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }

    return true;
  }
  openSubmitDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Submit ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log("Dialog is closed");
        this.router.navigate(['fleet/TripSheet']);
      }
    });
  }
  // unionCouncilList: any[] = [];
  routesLIst: any[] = [];
  batchLIst: any[] = [];
  ngOnInit() {
    this.addTripSheetForm = this.formBuilder.group({
      // serProductId:[],
      // serRouteId:[],
      txt_route_no: ['', Validators.required],
      numOdometerOut: [],
      numOdometerIn: [''],
      dteDate: ['2021-05-06'],
      dteTimeout: [''],
      dteTimein: [],
      numRouteDistance: [],
      numCoveredDistance: [],
      numGarbageDisposed: [],
      serBranchId: [],
      // serLocationId: [],
      blnStatus: [true],
      serBatchNo: [''],
      txtDriverName: ['']
    })
    this.getBranch();
    this.getRouteList();
    
    this.addTripSheetForm.controls['numOdometerIn'].valueChanges.subscribe((value) => {
      debugger;
      if (value <= 0) {
        alert('Enter Value greater than numOdometerIn')
      }
      else {
        let amount = this.addTripSheetForm.controls['numOdometerIn'].value - this.addTripSheetForm.controls['numOdometerOut'].value
        this.addTripSheetForm.patchValue({
          numCoveredDistance: amount
        });
        console.log(amount);
        console.log("result")
        console.log(this.addTripSheetForm.controls.numCoveredDistance.value)
      }
    })
    this.onChange("sd");
  }
  onSubmit() {
    console.log(this.addTripSheetForm.value.txtTestingType);
    console.log(this.addTripSheetForm.value.txtTestingType);
    this.billingService.createTripSheetService(this.addTripSheetForm.value).subscribe(response => {
      debugger;
      response.data = this.addTripSheetForm.value;
    })

    this.router.navigate(['/fleet/tripSheet']);
  }
  getBranch() {
    debugger;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    debugger;
    console.log("user id " + this.user.serUserId);
    this.billingService.getBranchService(this.user.serUserId).subscribe(response => {
      debugger;
      // console.log(response["branchList"]);

      this.branchList = response;
      console.log("this.branchList");
      console.log(this.branchList);
      this.selectStatusList = [];
      console.log(response);
      this.responseList = response.data
      // this.responseList.forEach(element => {
      //   debugger;
      // this.selectStatusList.push(element)  
      // this.waterSourceProduction = new MatTableDataSource(this.selectStatusList);
      // this.waterSourceProduction.sort = this.waterSourceProductionSort;
      // this.waterSourceProduction.paginator = this.waterSourceProductionPaginator;
      // });
    })
  }
  clearWEFD() {
    this.addTripSheetForm.controls.dteDate.reset('');
  }
  getRouteList() {
    debugger;
    this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
      debugger;
      console.log(response["routesLIst"]);
      this.batchLIst = response["data"];
      for (let getTxtNameCode of this.batchLIst) {
        this.getBatchCode.push(getTxtNameCode);
      }
    })
  }
  onSave(addForm: any) {
    console.log(this.addForm.value);
  }
  onChange(event) {
    debugger
    this.billingService.getBatchService(this.addTripSheetForm.controls['serBatchNo'].value).subscribe(response => {
      debugger;
      console.log("response");
      debugger;
      console.log(response["routesLIst"]);
      this.batchLIst = response["data"];
      if (this.batchLIst.length != 0) {
        for (let getTxtBatchCode of this.batchLIst) {
          this.getBatchCode.push(getTxtBatchCode);
        }
        debugger;
        console.log(this.getBatchCode);
        this.getBatchCode.forEach((element) => {
          this.driverName = '';
          this.driverName = element.txt_employee_name;
        });
      }
      else {
        this.billingService.getBatchedService(this.addTripSheetForm.controls['serBatchNo'].value).subscribe(response => {
          debugger;
          console.log("response");
          debugger;
          console.log(response["routesLIst"]);
          this.batchLIst = response;
          if (this.batchLIst != null) {
              this.addTripSheetForm.controls.txtDriverName.patchValue(this.batchLIst["txtEmployeeName"]);
              this.addTripSheetForm.controls['serBranchId'].patchValue(this.batchLIst["serBranchId"]);

              console.log(this.addTripSheetForm.controls.value)
          }
        })
      }
    })
    }
      onChangeRoute(event){
        debugger;
        this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
          debugger;
          console.log(response["routesLIst"]);

          this.batchLIst = response["data"];
          // for (let getTxtNameCode of this.batchLIst) {
          //   this.getBatchCode.push(getTxtNameCode);
          // }
          debugger;
          console.log(this.getBatchCode);
          this.batchLIst.forEach((element) => {
            if (event.value = element.txt_code) {
              this.addTripSheetForm.controls["numRouteDistance"].patchValue(element.num_distance);
            }
          })
        })
      }
    }

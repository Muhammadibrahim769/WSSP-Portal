import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import * as _moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { VehicleService } from '@app/fleet/vehicleRegistration/vehicle-service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './addTripSheet.component.html'
})
export class AddTripSheetComponent implements OnInit {
  addTripSheetForm: FormGroup;
  currenctVehicle: any = '';
  addForm: FormGroup;
  user: any = "";
  getAllNameCode = [];
  getAllBatchCode = [];
  getBatchCode = [];
  getBatchNolist = [];
  selectStatusList: any[] = [];
  responseList: any[] = [];
  branchList: any;
  driverName: any;
  numRouteDistance: any;
  txtRouteType: any

  txtBranchName: any;
  txtLocationName: any;
  model: NgbDateStruct;
  constructor(public dialog: MatDialog, private router: Router, private modalService: NgbModal, private dateFormat: DateFormatPipe, private formBuilder: FormBuilder, private billingService: BillingService, private vehicleService: VehicleService) {
  }
  myFilter = (d: Date | null): boolean => {
    debugger;
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  clearTimeOut() {
    this.addTripSheetForm.controls.dteTimeout.reset('');
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
  OnlyNumbersAllowed(event) {
    console.log(event);    
    this.addTripSheetForm.controls['numOdometerIn'].valueChanges.subscribe((value) => {
      debugger;

      if (value <= 0) {
        alert('Enter Value greater than 0')
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
  unionCouncil: any[] = [];
  routesLIst: any[] = [];
  batchLIst: any[] = [];
  ucList: any;
  getBranchId = [];
  ngOnInit() {
    this.addTripSheetForm = this.formBuilder.group({
      txtRouteNo: [''],
      numOdometerOut: [],
      numOdometerIn: [],
      dteDate: [''],
      dteTimeout: [],
      dteTimein: [],
      numRouteDistance: [],
      numCoveredDistance: [],
      numGarbageDisposed: [],
      txtBranchName: [''],
      txtLocationName: [''],
      serBranchId: [''],
      txtRouteName:[''],
      serLocationId: [''],
      blnStatus: [true],
      txtBatchNo: [''],
      txtDriverName: [''],
      txtRouteType: [''],
    serRouteId:[]
    })
    this.getBranch();
    this.getRouteList();
    this.getBatchList();
  }
  onSubmit() {
    debugger;
    //  let timeOut=this.dateFormat.transformDateTime(this.addTripSheetForm.controls.dteTimeout.value)
    //  let timeIn=this.dateFormat.transformDateTime(this.addTripSheetForm.controls.dteTimein.value)   
    console.log(this.addTripSheetForm.value)
    let txtMonth = this.dateFormat.transformOperation(this.addTripSheetForm.controls.dteDate.value);
    console.log(txtMonth);
    this.addTripSheetForm.controls.dteDate.patchValue(txtMonth)
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
  getBatchNo: any;
  getUnionCouncilList: any;
  getBranchList: any;
  getBatchList() {
    debugger;
    this.billingService.getFleetService("", "").subscribe(response => {
      console.log("getFleetService");
      console.log(response);
      this.getBatchNo = response
      this.getBatchNo.forEach(element => {
        this.getBatchNolist.push(
          [element["txtBatchNo"]],
        )
      })
    }
    )
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
    let txtBatchNo = this.addTripSheetForm.controls['txtBatchNo'].value
    this.billingService.getBatchFleetService(txtBatchNo).subscribe(response => {
      debugger;
      this.batchLIst = response["data"];
      if (this.batchLIst = null) {
        for (let getTxtBatchCode of this.batchLIst) {
          this.getBatchCode.push(getTxtBatchCode);
        }
        this.getBatchCode.forEach((element) => {
          debugger;
          this.driverName = '';
          this.txtBranchName = '';
          this.txtLocationName = '';
          this.driverName = element.txt_employee_name;

        });
      }
      else {
        this.billingService.getBatchFleetService(this.addTripSheetForm.controls['txtBatchNo'].value).subscribe(response => {
          debugger;
          console.log("response");

          this.batchLIst = response;
          if (this.batchLIst != null) {
            this.addTripSheetForm.controls.txtDriverName.patchValue(this.batchLIst["txtEmployeeName"]);
            this.addTripSheetForm.controls['txtBatchNo'].patchValue(this.batchLIst["txtBatchNo"]);
          }
        })
        this.getOdometerByBatchNo();

      }
    })
  }
  onChangeRoute(event) {
    debugger;

    this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
      debugger;
      this.batchLIst = response["data"];
      this.batchLIst.forEach(element => {
        debugger
        if (event.value === element.code) {
          this.addTripSheetForm.controls["numRouteDistance"].patchValue(element.totalDistance);
          this.addTripSheetForm.controls["txtRouteType"].patchValue(element.txtRouteType);
          this.addTripSheetForm.controls["txtBranchName"].patchValue(element.txtBranchName);
          this.addTripSheetForm.controls["txtLocationName"].patchValue(element.txtLocationName);
          this.addTripSheetForm.controls["txtRouteName"].patchValue(element.name);
          this.addTripSheetForm.controls["serRouteId"].patchValue(element.id);          
          this.addTripSheetForm.controls.serBranchId.patchValue(element.serBranchId);
          this.addTripSheetForm.controls.serLocationId.patchValue(element.serLocationId);
        }
      })
    })
    // this.batchLIst = response["data"];   
    // for (let item of this.batchLIst) {
    //   this.getBatchCode.push(item)
    //         }            
    // debugger;
    // this.getBatchCode.forEach((element) => {
    //   if (event.value = element.code) {
    //     this.addTripSheetForm.controls["numRouteDistance"].patchValue(element.totalDistance);
    //     this.addTripSheetForm.controls["txtRouteType"].patchValue(element.txtRouteType);
    //   }
    // })

  }
  clear() {
    debugger;
    this.addTripSheetForm.controls.dteTimein.reset('');
  }
  batchData: any
  getOdometerByBatchNo() {
    debugger;
    let txtBatchNo = this.addTripSheetForm.controls.txtBatchNo.value;
    this.billingService.getBatchByParam(txtBatchNo).subscribe(response => {
      debugger;
      console.log("batch response");
      console.log(response["data"]);
      this.batchData = response['data'];
      for (let item of this.batchData) {
        this.addTripSheetForm.controls.numOdometerOut.patchValue(item.numOdometerOut);
        this.addTripSheetForm.controls.numOdometerIn.patchValue(item.numOdometerIn);
      }
    })
  }
}

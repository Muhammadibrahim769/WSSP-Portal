import { Component, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { CrudService } from '@app/_services/crud.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { VehicleService } from '@app/fleet/vehicleRegistration/vehicle-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'editFleet.component.html'
})
export class EditFleetComponent {
  model;
  serviceInfoList: any[] = [];

  editVehicleForm: FormGroup;
  currenctVehicle: any = '';
  // user: User;
  user = "";

  add: boolean = true;
  ucList: any;
  getBranchId = [];
  getUClist = [];
  branchList: any;
  isExpanded = true;
  constructor(private vehicleService: VehicleService, private shared: CrudService, private formBuilder: FormBuilder, private modalService: NgbModal, public dialog: MatDialog, private router: Router, private billingService: BillingService, private dateFormat: DateFormatPipe) {

  }
  openUpdateDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Update ?',
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
        this.router.navigate(['fleet/vehicleRegistration']);
      }
    });

  }
  maintenanceColumn: string[] = ['sr', 'txtItemCode', 'txtItemName', 'numDueInDistance', 'numDueInMonths'];
  // 'startPoint', 'endPoint'
  maintenanceListData = new MatTableDataSource();
  @ViewChild("maintenanceSort", { static: true }) maintenanceSort: MatSort;
  @ViewChild("maintenancePaginator", { static: true }) maintenancePaginator: MatPaginator;
  editable = true;

  viewData: any = "";
  assettypeList: any[] = [];
  ngOnInit() {
    debugger;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.shared.currentMessage.subscribe(message => {
      this.viewData = message;
      console.log('hjghjgk');
      console.log(this.viewData)
    })
    this.editVehicleForm = this.formBuilder.group({
      serProductId: [],
      serFleetAttributesId: [],
      txtAssetType: [''],
      txtProductCode: [''],
      txtProductName: [''],
      txtProductSerialNo: [''],
      txtEngineNo: ['', Validators.required],
      txtChassisNo: ['', Validators.required],
      txtColor: [''],
      txtFuelType: [''],
      numFuelCapacity: [''],
      numAvgFuelConsumption: [''],
      numReserveTankCapacity: [''],
      txtLoadCapacity: [''],
      txtDescription: [''],
      serBranchId: [''],
      txtBrand: [''],
      txtModel: [''],
      dteServiceStartDate: [''],
      dteCreatedDate: [''],
      // dteServiceStartDate: [this.currenctVehicle.dteServiceStartDate, Validators.required],
      txtEngineCylinder: [''],
      txtDriverNo: [''],
      txtEngineSize: [''],
      txtBodyType: [''],
      txtBodySize: [''],
      txtCurrentCondition: [''],
      txtCurrentStatus: [''],
      // numTotalRunning: [this.currenctVehicle.numTotalRunning],
      txtUom: [''],
      txtDriverDesignation: [''],
      txtEmployeeName: [''],
      serLocationId: [''],
      txtBatchNo: [''],
      serBatchNo: [''],
      lstMaintainanceStandardDto: this.formBuilder.array([]),
      // dteServiceKm: [''],
      blnStatus: ['']
    })
    this.getDistinctAsset();
    this.editVehicleForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
    this.getBranchList();
    this.getFleetByTxtBatchNo();
  }
  getDistinctAsset() {
    this.billingService.getDistinctAsset().subscribe(response => {
      console.log("response");
      console.log(response);
      this.assettypeList = response

    })
  }
  getBranchList() {
    console.log(this.user);
    console.log("user id " + this.user["serUserId"]);
    debugger;
    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
      debugger;
      console.log("getBranchService");
      console.log(response);
      this.branchList = response
    })
  }
  updateVehicle() {
    debugger
    if (this.editVehicleForm.invalid) {
      alert('Form is INVALID');
      return
    }
    else {

      let dteServiceStartDate = this.dateFormat.transformOperation(this.editVehicleForm.controls.dteServiceStartDate.value)
      this.editVehicleForm.controls["dteServiceStartDate"].patchValue(dteServiceStartDate)
      this.billingService.updateVehicleService(this.editVehicleForm.value).subscribe(response => {
        debugger
        console.log("updateVehicleService");
        console.log(response["data"]);
      })
      alert('Record added successfully');
      this.router.navigate(['/fleet/vehicleRegistration']);
    }
  }
  txtItemName: any = ""
  editFleet: any = "";
  getFleetByTxtBatchNo() {
    let txtBatchNo = this.viewData.txtBatchNo;
    this.billingService.getFleetByTxtBatchNo(txtBatchNo).subscribe(response => {
      console.log("response BatchNo");
      console.log(response)
      this.editFleet = response;
      //  this.txtItemName =  this.viewData.lstMaintainanceStandardDto.txtItemName;
      // this.editVehicleForm.controls['oilChangeKm'].patchValue(this.viewData.oilChangeKm );
      // this.editVehicleForm.controls['dteOilCahnge'].patchValue(this.viewData.dteOilCahnge);
      // this.editVehicleForm.controls['filterChangeKm'].patchValue(this.viewData.filterChangeKm);
      // this.editVehicleForm.controls['dteFilterCahnge'].patchValue(this.viewData.dteFilterCahnge);
      this.editVehicleForm.controls['serBranchId'].patchValue(this.viewData.serBranchId + '');
      this.editVehicleForm.controls['serLocationId'].patchValue(this.viewData.serLocationId + '');
      // this.editVehicleForm.controls['serviceKm'].patchValue(this.viewData.serviceKm);
      // this.editVehicleForm.controls['dteServiceKm'].patchValue(this.viewData.dteServiceKm);
      this.editVehicleForm.controls['serProductId'].patchValue(this.viewData.serProductId);
      this.editVehicleForm.controls['txtBrand'].patchValue(this.viewData.txtBrand);
      this.editVehicleForm.controls['numFuelCapacity'].patchValue(this.viewData.numFuelCapacity);
      this.editVehicleForm.controls['numAvgFuelConsumption'].patchValue(this.viewData.numAvgFuelConsumption);
      this.editVehicleForm.controls['numReserveTankCapacity'].patchValue(this.viewData.numReserveTankCapacity);
      this.editVehicleForm.controls['txtLoadCapacity'].patchValue(this.viewData.txtLoadCapacity);
      this.editVehicleForm.controls['txtModel'].patchValue(this.viewData.txtModel);
      this.editVehicleForm.controls['serFleetAttributesId'].patchValue(this.viewData.serFleetAttributesId);
      this.editVehicleForm.controls['txtAssetType'].patchValue(this.viewData.txtAssetType);
      this.editVehicleForm.controls['txtProductCode'].patchValue(this.viewData.txtProductCode);
      this.editVehicleForm.controls['txtProductName'].patchValue(this.viewData.txtProductName);
      this.editVehicleForm.controls['txtProductSerialNo'].patchValue(this.viewData.txtProductSerialNo);
      this.editVehicleForm.controls['txtEngineNo'].patchValue(this.viewData.txtEngineNo);
      this.editVehicleForm.controls['txtChassisNo'].patchValue(this.viewData.txtChassisNo);
      this.editVehicleForm.controls['txtColor'].patchValue(this.viewData.txtColor);
      this.editVehicleForm.controls['txtFuelType'].patchValue(this.viewData.txtFuelType);
      this.editVehicleForm.controls['txtDescription'].patchValue(this.viewData.txtDescription);
      this.editVehicleForm.controls['txtEngineCylinder'].patchValue(this.viewData.txtEngineCylinder);
      this.editVehicleForm.controls['txtDriverNo'].patchValue(this.viewData.txtDriverNo);
      this.editVehicleForm.controls['txtEngineSize'].patchValue(this.viewData.txtEngineSize);
      this.editVehicleForm.controls['txtBodyType'].patchValue(this.viewData.txtBodyType);
      this.editVehicleForm.controls['txtBodySize'].patchValue(this.viewData.txtBodySize);
      this.editVehicleForm.controls['txtCurrentCondition'].patchValue(this.viewData.txtCurrentCondition);
      this.editVehicleForm.controls['txtCurrentStatus'].patchValue(this.viewData.txtCurrentStatus);
      this.editVehicleForm.controls['txtUom'].patchValue(this.viewData.txtUom);
      this.editVehicleForm.controls['txtDriverDesignation'].patchValue(this.viewData.txtDriverDesignation);
      this.editVehicleForm.controls['dteCreatedDate'].patchValue(this.viewData.dteCreatedDate);
      this.editVehicleForm.controls['txtEmployeeName'].patchValue(this.viewData.txtEmployeeName);
      this.editVehicleForm.controls['txtBatchNo'].patchValue(this.viewData.txtBatchNo);
      this.editVehicleForm.controls['serBatchNo'].patchValue(this.viewData.serBatchNo);
      this.editVehicleForm.controls['blnStatus'].patchValue(this.viewData.blnStatus);
      console.log("lstMaintainanceStandardDto");
      console.log(this.editFleet.lstMaintainanceStandardDto)
      this.editFleet.lstMaintainanceStandardDto.forEach(element => {
        this.lstMaintainanceStandardDto.push(
          this.formBuilder.group({
            serMaintainanceItemId: element.serMaintainanceItemId,
            numDueInDistance: element.numDueInDistance,
            numDueInMonths: element.numDueInMonths,
            txtItemCode: element.txtItemCode,
            txtItemName: element.txtItemName,
            txtBatchNo: this.editVehicleForm.controls.txtBatchNo.value
          })
        );
      });
      this.maintenanceListData = new MatTableDataSource(this.editFleet.lstMaintainanceStandardDto);
      this.maintenanceListData.sort = this.maintenanceSort;
      this.maintenanceListData.paginator = this.maintenancePaginator;
    })
  }
  get lstMaintainanceStandardDto(): FormArray {
    return this.editVehicleForm.get('lstMaintainanceStandardDto') as FormArray;
  }
  Enable() {
    this.editVehicleForm.controls.txtVehicleType.disabled;
  }
  clear() {
    this.editVehicleForm.controls.dteCreatedDate.reset('');
  }
  clearUnServicable() {
    this.editVehicleForm.controls.dteCreatedDate.reset('');

  }
  clearServicableTime() {
    this.editVehicleForm.controls.dteServiceStartDate.reset('');
  }
  // onSubmit() {
  //   console.log(this.editVehicleForm.value);
  //   debugger;
  //   console.log("createVehicleRegistrationService");
  //   let formValue = this.editVehicleForm.value;

  //   formValue.branch = { "id": +this.editVehicleForm.controls.branch.value }
  //   formValue.unionCouncil = { "id": +this.editVehicleForm.controls.unionCouncil.value }
  //   this.billingService.createVehicleRegistrationService(this.editVehicleForm.value).subscribe(response => {
  //     response.data = this.editVehicleForm.value;
  //     debugger;
  //     console.log("response")
  //     console.log(response)
  //   })

  // }
  OnlyNumbersAllowed(event): boolean {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }

}


import { Component, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { User } from '@app/_models';
// import { AccountService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { CrudService } from '@app/_services/crud.service';
import { BillingService } from '@app/services/billing.service';
import { createMaintenanceSheet } from '@app/fleet/maintenanceStandard/createMaintenanceStandard/createMaintenanceStandard.component';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';


@Component({
  selector: 'app-dashboard',
  templateUrl: './createMaintenanceSheet.component.html'
})
export class CreateMaintenanceSheetComponent {
  form: FormGroup;
  user = "";
  ucList: any;
  branchList: any;
  getBranchId = [];
  productList: any = "";
  unionCouncilList: any[] = [];
  selectStatusList: any[] = [];
  assettypeList: any[] = [];
  model;
  addForm: FormGroup;

  add: boolean = true;
  checks = false;
  checked = false; indeterminate = false;
  constructor(
    // private accountService: AccountService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private shared: CrudService,
    private billingService: BillingService,
    private router: Router,
    private dateFormat: DateFormatPipe
  ) { }
  maintenanceSheetColumns: string[] = ['select', 'txtBranchName', 'txtLocationName', 'txtBatchNo', 'txtProductName', 'numOdometerReading', 'numItemQuantity',
    'num_item_price', 'numTotal'];
  createMaintenance = new MatTableDataSource();
  @ViewChild("createMaintenanceSort", { static: true }) createMaintenanceSort: MatSort;
  @ViewChild("createMaintenancePaginator", { static: true }) createMaintenancePaginator: MatPaginator;

  selection = new SelectionModel<any>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.createMaintenance.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.createMaintenance.data.forEach(row => {
        this.selection.select(row)
      });
  }
  checkboxLabel(row, event) {


  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }


  clear() {
    this.form.controls.dateFromFilter.reset('');
  }
  startDate: Date;

  clearToDate() {
    this.form.controls.dateToFilter.reset('');
  }

  totalDistance = new FormControl();
  total: any;
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.form = this.formBuilder.group({
      serLocationId: [],
      totalDistance: [],
      serBranchId: [],
      serMaintainanceItemId: [''],
      txtItemCode: [''],
      txtItemName: [''],
      txtUom: [''],
      serUomId: [''],
      txtBatchNo: [''],
      txtProductName: [''],
      dte_maintainance_date: [''],
      numTotal: [],
      serviceInfoList: this.formBuilder.array([]),
      serviceInfoListFrontend: this.formBuilder.array([])
    });

    this.getFleetList();
    this.form.controls['serBranchId'].valueChanges.subscribe(element => {

      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }
      })
    })


    this.form.controls.serviceInfoListFrontend.valueChanges.subscribe((element) => {

      let array: any[] = element
      array.forEach(valueOf => {

        valueOf.numTotal = valueOf.numItemQuantity * valueOf.num_item_price
        this.total = valueOf.numTotal
        valueOf.txtProductName = valueOf.txtProductName;
        // this.serviceInfoListFrontend["numTotal"] = valueOf.numTotal
        // valueOf.get('numTotal').setValue(this.total)     
        // this.form.controls["numTotal"].patchValue(valueOf.numTotal);
      });

    })
    this.form.controls['serviceInfoListFrontend'].valueChanges.subscribe((value) => {
      this.total = 0;
      value.forEach((currentValue) => {
        this.total = currentValue.numItemQuantity * currentValue.num_item_price
        // this.total = this.total + currentValue.routeDistance;
        if (this.total > 0) {
          debugger;
          this.totalDistance = this.total;
          this.form.patchValue({ totalDistance: this.total.toString() });
        }

      });
    });


    this.getDistinctAsset();
    this.getBranchList();
    this.getMaintenanceItemList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.createMaintenance.filter = filterValue.trim().toLowerCase();
  }
  get f() {
    return this.form.controls;
  }
  get stationsName() {
    return this.f.stationsName as FormArray;
  }
  get serviceInfoListFrontend(): FormArray {
    return this.form.get("serviceInfoListFrontend") as FormArray;
  }
  get serviceInfoList(): FormArray {
    return this.form.get("serviceInfoList") as FormArray;
  }
  maintenanceItem: any[] = []
  getMaintenanceItemList() {

    this.billingService.getMaintenanceItemList().subscribe(response => {

      this.maintenanceItem = response
    })
  }
  txtItemCode: any;
  txtItemName: any;
  txtUom: any;
  serUomId: any
  onMaintenanceItemChange(event) {

    this.billingService.getMaintenanceItemList().subscribe(response => {

      this.maintenanceItem.push(response)
      this.maintenanceItem.forEach(element => {

        if (event.value == element.serMaintainanceItemId) {

          this.form.controls["txtItemCode"].patchValue(element.txtItemCode)
          this.form.controls["txtItemName"].patchValue(element.txtItemName)
          this.form.controls["txtUom"].patchValue(element.txtUom)
          this.form.controls["serUomId"].patchValue(element.serUomId)
        }
      })
    })
  }
  getBranchList() {


    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {


      this.branchList = response
    })
  }
  getDistinctAsset() {
    this.billingService.getDistinctAsset().subscribe(response => {

      this.assettypeList = response
    })
  }
  date: any;
  onSubmit() {

    this.date = this.dateFormat.transformOperation(this.form.controls.dte_maintainance_date.value)

    if (this.form.invalid) {
      alert('Form is INVALID');
      return
    }
    else {
      this.serviceInfoListFrontend.controls.forEach(element => {

        if (element["controls"].checked.value == true) {
          this.serviceInfoList.push(element);
        }
      });

      let formValue = this.form.value;
      formValue.serBranchId = { "id": +this.form.controls.serBranchId.value }
      formValue.serLocationId = { "id": +this.form.controls.serLocationId.value }
      formValue.dte_maintainance_date = this.date


      for (let control of this.serviceInfoList.controls) {
        control.value["dte_maintainance_date"] = this.date

      }


      this.billingService.createMaintainanceSheet(this.serviceInfoList.value).subscribe(response => {


        alert('Record added successfully');
        this.router.navigate(['fleet/maintenanceSheet']);
      })
    }
  }
  getFleetList() {
    this.billingService.getFleetService("", "").subscribe(response => {
      console.log(response)
      this.productList = response;
      this.createMaintenance = new MatTableDataSource(this.productList);
      this.createMaintenance.sort = this.createMaintenanceSort;
      this.createMaintenance.paginator = this.createMaintenancePaginator;
      this.productList.forEach(element => {
        this.serviceInfoListFrontend.push(this.formBuilder.group({


          checked: [false],
          serBranchId: [element["serBranchId"]],
          serLocationId: [element["serLocationId"]],
          // serRate: [],
          numItemQuantity: [element["numItemQuantity"]],
          num_item_price: [element["num_item_price"]],
          numTotal: [element["numTotal"]],
          txt_batch_no: [element["txtBatchNo"]],
          txtProductName: [element["txtProductName"]],
          serFleetAttributesId: [element["serFleetAttributesId"]],
          txt_product_code: [element["txtProductCode"]],
          numOdometerReading: [element["numOdometerReading"]],
          serMaintainanceId: [element["serMaintainanceId"]],
          txtStatus: ['active'],
          ser_uom_id: this.form.controls.serUomId,
          serMaintainanceItemId: this.form.controls.serMaintainanceItemId,
          txt_item_code: this.form.controls.txtItemCode,
          txt_item_name: this.form.controls.txtItemName,
          txt_uom: this.form.controls.txtUom,
          dte_maintainance_date: this.dateFormat.transformOperation(this.form.controls.dte_maintainance_date.value),


        }));
      })
    })
  }
  onBranchChange(event) {
    let txtBatchNo = this.form.controls.txtBatchNo.value
    let txtProductName = this.form.controls.txtProductName.value
    if (!(txtProductName == '')) {
     
      this.form.controls["txtProductName"].patchValue('')
    }
    else if(!(txtBatchNo == '')){
      this.form.controls["txtBatchNo"].patchValue('')
    }
      let serBranchId = event.value
      this.billingService.getFleetByBranchId(serBranchId).subscribe(response => {
        this.productList = response;
        this.createMaintenance = new MatTableDataSource(this.productList);
        this.createMaintenance.sort = this.createMaintenanceSort;
        this.createMaintenance.paginator = this.createMaintenancePaginator;
      })
    
  }
  onVehicleName(event) {
    let txtProductName = event.target.value
    this.billingService.getFleetByVehicleName(txtProductName).subscribe(response => {
      this.productList = response;
      this.createMaintenance = new MatTableDataSource(this.productList);
      this.createMaintenance.sort = this.createMaintenanceSort;
      this.createMaintenance.paginator = this.createMaintenancePaginator;
    })
  }
  onBatchNoChange(event) {
    let txtBatchNo = event.target.value
    this.billingService.getMaintenanceByTxtBatchNo(txtBatchNo).subscribe(response => {
      this.productList = response;
      this.createMaintenance = new MatTableDataSource(this.productList);
      this.createMaintenance.sort = this.createMaintenanceSort;
      this.createMaintenance.paginator = this.createMaintenancePaginator;
    })
  }
  onLocationChange(event) {
    let txtBatchNo = this.form.controls.txtBatchNo.value
    let txtProductName = this.form.controls.txtProductName.value
    if (!(txtProductName == '')) {
     
      this.form.controls["txtProductName"].patchValue('')
    }
    else if(!(txtBatchNo == '')){
      this.form.controls["txtBatchNo"].patchValue('')
    }
    // || (!(txtBatchNo == ''))
   
      let serLocationId = event.value
      this.billingService.getFleetByLocationId(serLocationId).subscribe(response => {
        this.productList = response;
        this.createMaintenance = new MatTableDataSource(this.productList);
        this.createMaintenance.sort = this.createMaintenanceSort;
        this.createMaintenance.paginator = this.createMaintenancePaginator;
      })
    
  }
  onSearch() {
    let txtBatchNo = this.form.controls.txtBatchNo.value
    let txtProductName = this.form.controls.txtProductName.value
    let serBranchId = this.form.controls.serBranchId.value
    let serLocationId = this.form.controls.serLocationId.value
    this.billingService.getFleetMaintenanceByParam(serBranchId, serLocationId, txtBatchNo, txtProductName).subscribe(response => {
      debugger
      this.productList = response;
      this.createMaintenance = new MatTableDataSource(this.productList);
      this.createMaintenance.sort = this.createMaintenanceSort;
      this.createMaintenance.paginator = this.createMaintenancePaginator;
    })
  }

}


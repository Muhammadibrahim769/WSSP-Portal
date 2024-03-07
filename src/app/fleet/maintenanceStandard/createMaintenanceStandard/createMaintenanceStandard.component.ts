import { Component, HostListener,AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

import { User } from '@app/_models';
// import { AccountService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '@app/_services/crud.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import { BillingService } from '@app/services/billing.service';


export interface createMaintenanceSheet {

  sNo: number;

  Asset_Main_Category: string;
  Asset_Type: string;
  Asset_No: string;
  Asset_Category: string;
  sub_Category: string;
  Asset_Name: string;
}
const ELEMENT_DATA: createMaintenanceSheet[] = [
  {
    sNo: 1, Asset_Main_Category: 'A', Asset_Type: "Truck", Asset_No: 'kpk-134',
    Asset_Category: 'Dumper', sub_Category: 'Honda', Asset_Name: "toyota"
  },
  {
    sNo: 2, Asset_Main_Category: 'B', Asset_Type: "Dumper", Asset_No: 'kpk-123',
    Asset_Category: 'Truck', sub_Category: 'XLI', Asset_Name: "truck"
  },

]

@Component({ templateUrl: 'createMaintenanceStandard.component.html' })
export class CreateMaintenanceStandardComponent  implements AfterViewInit{
  user: User;
  model: NgbDateStruct;
  addForm: FormGroup;
  form: FormGroup;
  panelOpenState = false;
  checks = false;
  checked = false;
  indeterminate = false;
  branchList: any[] = [];

  constructor(private shared: CrudService, private modalService: NgbModal, private formBuilder: FormBuilder,private billingService: BillingService) {
    
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] =
    ['select', 'sNo', 'Asset_Main_Category', 'Asset_Category', 'sub_Category', 'Asset_Type', 'Asset_No', 'Asset_Name'];
  dataSource = new MatTableDataSource<createMaintenanceSheet>(ELEMENT_DATA);
  selection = new SelectionModel<createMaintenanceSheet>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: createMaintenanceSheet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sNo + 1}`;
  }
  OnlyNumbersAllowed(event): boolean {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
  }
  formValidationMessages = {
    txtVehicleId: [{
      type: "required",
      message: "required field"
    }],
    txtMaintenanceItem: [{
      type: "required",
      message: "required field"
    }],
    txtItemCategory: [{
      type: "required",
      message: " required field"
    }],
    txtLife: [{
      type: "required",
      message: "required field",
    }],
    txtItemSubCategory: [{
      type: "required",
      message: "required field"
    }],
    txtLifeMeasurement: [{
      type: "required",
      message: "required field"
    }]
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      txtMainCategory: [""],
      txtVehicleCategory: [""],
      txtVehicleSubCategory: [""],
      txtVehicleType: [""],
      txtVehicleName: [""],
      txtSerialNo: [""],
      txtMaintenanceItem: [
        '',
        Validators.required
      ],
      txtItemCategory: ['', Validators.required],
      txtItemSubCategory: ['', Validators.required],
      txtUom: [""],
      txtSpecification: [""],
      txtCapacity: [""],
      txtLife: [
        '',
        Validators.required
      ],
      txtLifeMeasurement: [
        '', Validators.required
      ],
      txtLastIssueDate: [""],
      txtLastIssueCostPrice: [""],
      txtNextEstimatedChangeDate: [""],
      txtNextEstimatedPurchasePrice: [""],
      txtDriverDesignation: [""],
      txtDescription: [""],
      txtDriverNo: [""],
      txtDriverName: [""],
      txtWithEffectFromDate: [""],
      txtDriverContact: [""],
      txtBranch: [""],
    })

    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];
    })
  }
  onSubmit(form: any) {
    this.shared.changeMessage(this.form.value);
    console.log(this.form.value);
    // console.log(this.form.value);
  }
  onSave(addForm: any) {
    console.log(this.addForm.value);
  }
}

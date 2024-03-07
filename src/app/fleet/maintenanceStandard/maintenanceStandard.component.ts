import { AfterViewInit, Component, HostListener } from '@angular/core';
import { User } from '@app/_models';
// import { AccountService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '@app/_services/crud.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { BillingService } from '@app/services/billing.service';
export interface PeriodicElement {  
  VehicleType:string;
  VehicleId:string;
  VehicleName:string;
  MaintenanceItem:string;
  Uom:string;
  Life:string;
  ItemSubCategory:string;
  ItemName:string;
  Quantity:string;
  LifeUOM:string;
  Description:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
   VehicleType:'Truck',VehicleId:'kpk-2323',VehicleName:'Mini Dumper',
    MaintenanceItem:'light',Uom:'Abc',Life:'6 months',ItemSubCategory:'led light',
    ItemName:'head light',Quantity:'2 pieces',LifeUOM:'3 months',Description:'xyz'
  },
  {
    VehicleType:'Truck',VehicleId:'kpk-2323',VehicleName:'Mini Dumper',
    MaintenanceItem:'light',Uom:'Abc',Life:'6 months',ItemSubCategory:'led light',
    ItemName:'head light',Quantity:'2 pieces',LifeUOM:'3 months',Description:'xyz'
  },
]
@Component({ templateUrl: 'maintenanceStandard.component.html' }) 
export class MaintenanceStandardComponent implements AfterViewInit{
  user: User;
  model: NgbDateStruct;
  addForm: FormGroup;
  myform: FormGroup;
  panelOpenState = true;
  page=1; 
  pageSize=5;
  message:any;
  subscription: Subscription;
  MaintenanceStandard: any[] = []; 
  branchList: any[] = [];

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private shared:CrudService,private billingService: BillingService) {
    
  }
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  OnlyNumbersAllowed(event):boolean
  {
const charcode=(event.which)?event.which : event.keycode;
if(charcode > 31 &&(charcode <48 || charcode >57))
{
return false;
}
    return true;
  } 
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size : 'xl'})
  }
  tableColumn: string[] = [
    "sr",
    "VehicleType",
    "VehicleId",
    "VehicleName", 
    "MaintenanceItem",
    "Uom",
    "Life",  
    "ItemSubCategory",
    "ItemName",
    "Quantity",
    "LifeUOM",
    "Description"
  ];
  selection = new FormControl([
    "sr",
    "VehicleType",
    "VehicleId",
    "VehicleName", 
    "MaintenanceItem",
    "Uom",
    "Life",  
    "ItemSubCategory",
    "ItemName",
    "Quantity",
    "LifeUOM",
    "Description"
  ]);
    selectingColumns() {
      debugger;
      if (this.selection.value.length > 0) {  
        this.tableColumn.forEach(singleColumn => {
          let display = "";
          if (singleColumn !== "VehicleType") {
            let columnSelected = this.selection.value.findIndex((x: any)  => x === singleColumn)            
            if (columnSelected >= 0) {
              display = "table-cell";
            } else  {
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
    form = this.formBuilder.group({   
      txtBranch: [''],   
      txtMainCategory:[""],
      txtVehicleCategory:[""],
      txtVehicleSubCategory:[""],
      txtVehicleType:[""],
      txtVehicleId:[
        '',
        // Validators.required
      ],
      txtVehicleName:[""],
      txtSerialNo:[""],
      txtMaintenanceItem:[
        '',
        // Validators.required
      ],
      txtUom:[""],
      txtSpecification:[""],
      txtCapacity:[""],
      txtLife:[
        '',
        // Validators.required
      ],
      txtbrand:[""],
      txtLastIssueDate:[""],
      txtLastIssueCostPrice:[""],
      txtNextEstimatedChangeDate:[""],
      txtNextEstimatedPurchasePrice:[""],
      txtDriverNo:[""],
      txtWithEffectFromDate:[""],
      txtDriverName:[""],
      txtDriverDesignation:[""],
      txtDriverContact:[""]
      })
    downloadPDF() {
      let tableHeader: any[] = []
      this.selection.value.forEach((element: string) => {
        if (element === "sr") {
          tableHeader.push({ text: 'Sr#', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "VehicleType") {
          tableHeader.push({ text: 'Asset Type', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "VehicleId") {
          tableHeader.push({ text: 'Asset No', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "VehicleName") {
          tableHeader.push({ text: 'Vehicle Name', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "MaintenanceItem") {
          tableHeader.push({ text: 'Maintenance Item', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "Uom") {
          tableHeader.push({ text: 'Uom', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "Life") {
          tableHeader.push({ text: 'Life', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "ItemSubCategory") {
          tableHeader.push({ text: 'Item Sub Category', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "ItemName") {
          tableHeader.push({ text: 'Item Name', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "Quantity") {
          tableHeader.push({ text: 'Quantity', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "LifeUOM") {
          tableHeader.push({ text: 'Life UOM:', bold: true, fillColor: '#dddddd', alignment: 'center' });
        } else if (element === "Description") {
          tableHeader.push({ text: 'Description:', bold: true, fillColor: '#dddddd', alignment: 'center' });
        }
      });
    }
  formValidationMessages = {
    txtVehicleId:[{
      type: "required",
      message:"This field is required"
    }],
    txtMaintenanceItem:[{
      type: "required",
      message:"This field is required"
    }],
    txtLife:[{
      type: "required",
      message:"This field is required"
    }]
  }
  ngOnInit() {
    this.shared.currentMessage.subscribe(message =>{
      this.MaintenanceStandard.push(message);
      // console.log(this.MaintenanceStandard)
      // debugger;
    })
    this.myform = this.formBuilder.group({
      txtMainCategory:[""],
      txtVehicleCategory:[""],
      txtVehicleSubCategory:[""],
      txtVehicleType:[""],
      txtVehicleId:[
        '',
        Validators.required
      ],
      txtVehicleName:[""],
      txtSerialNo:[""],
      txtMaintenanceItem:[
        '',
        Validators.required
      ],
      txtUom:[""],
      txtSpecification:[""],
      txtCapacity:[""],
      txtLife:[
        '',
        Validators.required
      ],
      txtLastIssueDate:[""],
      txtLastIssueCostPrice:[""],
      txtNextEstimatedChangeDate:[""],
      txtNextEstimatedPurchasePrice:[""],
      txtDriverNo:[""],
      txtWithEffectFromDate:[""],
      txtDriverName:[""],
      txtDriverDesignation:[""],
      txtDriverContact:[""],
      txtBranch :[""],
      })

      this.billingService.getAllCustomerTemplateService().subscribe(response => {
        debugger;
        console.log(response["branchList"]);
        this.branchList = response["branchList"];
      })
    }
    onSubmit() {}
    onSave() {}
}


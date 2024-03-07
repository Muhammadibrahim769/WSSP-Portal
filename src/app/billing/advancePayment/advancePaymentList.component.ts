import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BillingService } from "@app/services/billing.service";

@Component({
  selector: 'app-advancePaymentList',
  templateUrl: './advancePaymentList.component.html'
})

export class AdvancePaymentListComponent implements OnInit {
  
  searchForm: FormGroup;
  step = 0;
  branchList: any[] = [];
  neighborhoodUcList: any;
  getLocationId = [];
  user: any;
  billAdjustmentData: any;

  advancePaymentColumns: string[] = ['txtCustomerCode', 'txtZone', 'txtUnionCouncil', 'txtCustomerCategory', 'txtBusinessName', 'numCredit', 'dteBillIssueDate', 'Actions'];
  advancePaymentListData = new MatTableDataSource();
  @ViewChild("advancePaymentPaginator", { static: true }) advancePaymentPaginator: MatPaginator;
  @ViewChild("advancePaymentSort", { static: true }) advancePaymentSort: MatSort;
  
  selection = new FormControl([
    "sr",
    "txtCustomerCode",
    "txtZone",
    "txtUnionCouncil",
    "txtCustomerCategory",
    "txtBusinessName",
    "numCredit",
    "dteBillIssueDate",
    "Actions"
  ]);
  tableColumn: string[] = [
    "sr",
    "txtCustomerCode",
    "txtZone",
    "txtUnionCouncil",
    "txtCustomerCategory",
    "txtBusinessName",
    "numCredit",
    "dteBillIssueDate",
    "Actions"
  ];

  constructor(private formbuilder: FormBuilder, private billingService: BillingService) {}

  ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.searchForm = this.formbuilder.group({
      serBranchId: [''],
      serLocationId: [''],
      txtCustomerCode: [''],
      numAdvancePayment: ['']
    })

    this.getBranchList();
    this.getAdvancePaymentBill();

    this.searchForm.controls['serBranchId'].valueChanges.subscribe(element => {
      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        debugger;
        this.neighborhoodUcList = data;
        this.getLocationId = [];
        for (let getUClist of this.neighborhoodUcList) {
          this.getLocationId.push(getUClist);
        }
      })
    })
  }

  getAdvancePaymentBill(){
    this.billingService.getAllAdjustmentsService().subscribe( response =>{
      debugger;
      console.log(response);
      this.billAdjustmentData = response;
      let data = this.billAdjustmentData.filter(x=>(x["txtBillType"] === "ADV"));
      this.advancePaymentListData = new MatTableDataSource(data);
      this.advancePaymentListData.paginator = this.advancePaymentPaginator
      this.advancePaymentListData.sort = this.advancePaymentSort;
    })
  }

  getBranchList() {
    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
      let data = [];
      debugger;
      data.push(response);
      data[0].forEach(element => {
        this.branchList.push(element);
      });
    })
  }

  onSearch() {
    debugger;
    console.log(this.searchForm.value);
    let serBranchId = +this.searchForm.controls.serBranchId.value;
    let serLocationId = +this.searchForm.controls.serLocationId.value;
    let txtCustomerCode = this.searchForm.controls.txtCustomerCode.value;
    let numAdvancePayment = this.searchForm.controls.numAdvancePayment.value;
    debugger
    this.billingService.getAdvancePaymentByParams(txtCustomerCode, serBranchId, serLocationId, numAdvancePayment).subscribe(response=>{
      debugger;
      console.log(response);
      if(response === null){
        this.advancePaymentListData = new MatTableDataSource([]);
      }
      else {
        let data:any [] = [];
        data.push(response);
        console.log(data)
        this.advancePaymentListData = new MatTableDataSource(data[0]);
      }
      
    })
  }  

  onReset(){
    this.searchForm.controls.serBranchId.reset();
    this.searchForm.controls.serLocationId.reset();
    this.searchForm.controls.txtCustomerCode.reset();
    this.searchForm.controls.numAdvancePayment.reset(null);
    this.billingService.getAdvancePaymentByParamsReset().subscribe(response=>{
      let data:any [] = [];
      data.push(response);
      this.advancePaymentListData = new MatTableDataSource(data[0]);
    })
  }

  selectingColumns() {
    debugger;
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
}
  
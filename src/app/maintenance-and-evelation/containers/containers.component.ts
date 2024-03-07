import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BillingService } from '@app/services/billing.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-dashboard',
  templateUrl: './containers.component.html'
})
export class ContainersComponent implements OnInit {

  factorForm:FormGroup;
  step = 0; 
  branchList: any;
  getBranchId = [];
  user: any = "";
  isLoading = true;
dataSource = null;
  selectFactorList:any[]=[];
  searchFactorData:any;
  factorCode:any[]=[];
  constructor(private formBuilder: FormBuilder,private billingService:BillingService) { }
 factorColumns: string[] = [ 'txtBranchName', 'txtLocationName','txtDate','txtContainerNo','txtContainerLocation','txtCleanlinessSurrounding','txtCleanlinessContainer'
 , 'Actions'
];
 factorListData = new MatTableDataSource();
  @ViewChild("factorSort", { static: true }) factorSort: MatSort;
  @ViewChild("factorPaginator", { static: true }) factorPaginator: MatPaginator;  
  OnlyNumbersAllowed(event): boolean {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
  clearTimeOut(){}
  ngOnInit(): void {
    this.factorForm = this.formBuilder.group({     
      serBranchId:[''],
      serLocationId:[''],
      txtDate:[''],
      txtContainerNo:[''],
      txtContainerLocation:['']
    })  
  
  this.onGetAllFactor();
  this.onGetFactorCode();
  }
  getBranchList() {
    console.log(this.user);
    console.log("user id " + this.user["serUserId"]);

    this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {

      console.log("getBranchService");
      console.log(response);
      this.branchList = response
    })
  }
  onSearch(){
    // let serFactorId = this.factorForm.controls.serFactorId.value;
    // let txtFactorName = this.factorForm.controls.txtFactorName.value;
    // this.factor.getFactorByParams(serFactorId, txtFactorName).subscribe(response => {
    //   this.searchFactorData = response["data"];
    //   console.log("response");
    //   console.log(response);
    //   this.selectFactorList = [];
    //   this.factorListData = new MatTableDataSource(response["data"]);
    //   this.factorListData.sort = this.factorSort;
    //   this.factorListData.paginator = this.factorPaginator;
  // }) 

}
onGetFactorCode(){
  // this.factor.getFactorFindAll().subscribe(Response=>{
  //   this.factorCode = Response["data"];
  //   console.log("factor code ")
  //   console.log(this.factorCode)

  // })
}
onGetAllFactor(){
  // this.factor.getFactorFindAll().subscribe(Response=>{
  //   this.searchFactorData = Response["data"];
  //   console.log("Response");
  //   console.log(Response);
  //   this.isLoading = false;
  //   this.dataSource = Response["data"];
  //   this.selectFactorList = [];
  //   this.factorListData = new MatTableDataSource(Response["data"]);
  //   this.factorListData.sort = this.factorSort;
  //   this.factorListData.paginator = this.factorPaginator;

  // })
}
onReset(){
  this.factorForm.controls.serFactorId.reset('')
  this.factorForm.controls.txtFactorName.reset('')
  this.onGetAllFactor();
}

downloadPDF(){}
tableColumn: string[] = [
  "sr",
  'txtBranchName', 'txtLocationName','txtDate','txtContainerNo','txtContainerLocation','txtCleanlinessSurrounding','txtCleanlinessContainer'
];
selection = new FormControl([
  "sr",
  'txtBranchName', 'txtLocationName','txtDate','txtContainerNo','txtContainerLocation','txtCleanlinessSurrounding','txtCleanlinessContainer'
]);
selectingColumns() {

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

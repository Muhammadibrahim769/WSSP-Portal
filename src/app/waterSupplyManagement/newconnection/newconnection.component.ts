import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { BillingService } from '@app/services/billing.service';
import { CrudService } from '@app/_services/crud.service';
import { UtilsService } from '@app/_services/utils.service';
import { element } from 'protractor';


@Component({
  selector: 'app-dashboard',
  templateUrl: './newconnection.component.html'
})
export class NewconnectionComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  newConnectionForm: FormGroup;
  step = 0;
  productFamilyName = "Water Services";
  productName: any;

  branchList: []=[];
  unionCouncilList: []=[];
  connectionTypeList: []=[];
  neighborhoodUCList: []=[];
  categoryList: []=[];
  subCategoryList: []=[];
  productList: []=[]; 
  arrayProductresult : string[] =[];
  testProduct: []=[];

  progressInfos = [];
  pppp = [];
  isFileShow = false;
  rate = '';

  productSourceColumns: string[] = ['select', 'txtProductCode', 'serUomId', 'txtProductName', 'numSalePrice'];
  productSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  @ViewChild("productSourceSort", { static: true }) productSourceSort: MatSort;
  @ViewChild("productSourcePaginator", { static: true }) productSourcePaginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private router: Router, private utilService: UtilsService,private shared:CrudService,private billingService: BillingService) { }

  ngOnInit() {
    this.newConnectionForm = this.formBuilder.group({
      branch: [''],
      unionCouncil: [''],
      neighborhoodUnionCouncil: [''],
      txtConnectionType: [''],
      dteCreatedDate: [''],
      txtMetered: [''],
      longitude: [0],
      latitude: [0],
      txtReferenceCode: [''],
      txtBusinessName:[''],
      txtCnicNo: [''],
      category: [''],
      subCategory: [''],
      txtNtnNo: [''],
      txtStnNo: [''],
      txtShippingAddress: [''],
      txtMohallah: [''],
      txtHouseNo: [''],
      txtStreetNo: [''],
      txtMobileNo: [''],
      txtPhoneNo: [''],
      txtEmailAddress: ['',Validators.email],
      // txtDoc: [],
      serviceInfoList: this.formBuilder.array([]),
    })
    this.getBranchList();
    this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getCategoryList();
    this.getSubCategoryList();
    this.getProductList();
    
  }

  // -------------------------------- ngOnInit() ENDS   ----------------------------------------------
  
  get serviceInfoList(): FormArray {
    return this.newConnectionForm.get("serviceInfoList") as FormArray;
  }

  getBranchList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      console.log(response)
      console.log(response["branchList"]);
      this.branchList = response["branchList"];
    })
  }

  getUnionCouncilList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      debugger;
      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
    })
  }

  getConnectionTypeList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      console.log(response["connectionTypeList"]);
      this.connectionTypeList = response["connectionTypeList"];
    })
  }

  getNeighborhoodUCList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      console.log(response["neighborhoodUnionConcilList"]);
      this.neighborhoodUCList = response["neighborhoodUnionConcilList"];
    })
  }

  getCategoryList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      console.log(response["categoryList"]);
      this.categoryList = response["categoryList"];
    })
  }

  getSubCategoryList(){
    this.billingService.getAllCustomerTemplateService().subscribe( response=> {
      console.log(response["subCategoryList"]);
      this.subCategoryList = response["subCategoryList"];
    })
  }
  page:any
  rowPerPage:any
  getProductList(){
    debugger;
    this.billingService.getProductService(this.rowPerPage,this.page,this.productFamilyName, this.productName).subscribe( response => {
     
     debugger;
      console.log("getProductService");
      console.log(response["data"]);
      this.productList = response["data"];
      this.productSource = new MatTableDataSource(this.productList);
      this.productSource.sort = this.productSourceSort;
      this.productSource.paginator = this.productSourcePaginator;
    })
  }


  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.progressInfos[i] = { value: [i+1], fileName: selectedFiles[i].name };
      this.pppp.push(this.progressInfos[i])
      // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
    }
    
  }
  clearStartDate(){
    this.newConnectionForm.controls.txtStartDate.reset('');
  }

  // this.result += 'File N0: '+ [i+1]+ '' + selectedFiles[i].name;
  //     this.result += '<br>';
  // onSubmit() {
  //   debugger;
  //   console.log(this.newConnectionForm.value)
  //     this.utilService.createConnectionService(this.newConnectionForm.value).subscribe(response =>{
  //     debugger;
  //     console.log(response);
  //     response = this.newConnectionForm.value;
  //   })
  // }
  onSubmit(){    
    console.log(this.newConnectionForm.value); 
    debugger;
    console.log("createNewConnectionServiceCus");
    let formValue = this.newConnectionForm.value;
    formValue.branch = {"id": +this.newConnectionForm.controls.branch.value }
    formValue.unionCouncil = { "id": +this.newConnectionForm.controls.unionCouncil.value }
    formValue.neighborhoodUnionCouncil = { "id": +this.newConnectionForm.controls.neighborhoodUnionCouncil.value }
    formValue.category = { "id": +this.newConnectionForm.controls.category.value }
    formValue.subCategory = { "id": +this.newConnectionForm.controls.subCategory.value }
    this.billingService.createNewConnectionServiceCus(this.newConnectionForm.value).subscribe(response => {
      response = this.newConnectionForm.value;
      debugger;
      console.log("response")
      console.log(response)
    })
    this.router.navigate(['waterSupplyManagement/newConnection']);
  }

  openSubmitDialog(){
    // this.dialog.open(SubmitModalComponent);
    const document= this.dialog.open(RejectModalComponent, {
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
      // this.onSubmit(); 
      if (confirmed) {
        console.log("Dialog is closed");
        this.router.navigate(['waterSupplyManagement/newConnection']);
      }
    });

  }


// --------------------------------------  SELECT GRID ROW  ------------------------------------

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.productSource.data.forEach(row => {
      this.selection.select(row)
    });
  }

  checkboxLabel(row,event) {
    debugger;
    console.log(row.serProductId);
    console.log(event.checked);

    if(event.checked == true){
      this.arrayProductresult.push(row);
      debugger;
      this.serviceInfoList.push(this.formBuilder.group({
        prductFamilyId: [row["serProductFamilyId"]],
        productId: [row["serProductId"]],
        rate: [],
        // rate: [""+row["numSalePrice"]],
        serviceName: [row["txtProductName"]],
        serviceType: [row["txtProductCode"]],
        uom: [""+row["serUomId"]]
      }));
      console.log("FormControl")
      console.log(this.newConnectionForm.controls["serviceInfoList"].value);
    }

    if(event.checked == false){
      let index = this.arrayProductresult.indexOf(row)
      this.arrayProductresult.splice(index, 1);
      console.log(row.serProductId);
      this.serviceInfoList.removeAt(index);
      console.log("deleted");
      console.log(this.newConnectionForm.controls["serviceInfoList"].value);
      // console.log(this.newConnectionForm.controls.serviceInfoList.value[index]);
    }
    // console.log(this.newConnectionForm.controls["serviceInfoList"].value);
  //  return (!row)
  //    ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
  //    : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  
  }

}

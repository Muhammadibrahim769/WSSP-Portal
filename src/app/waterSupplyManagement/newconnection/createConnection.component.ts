import { SelectionModel } from '@angular/cdk/collections';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  templateUrl: './createConnection.component.html'
})
export class CreateConnectionComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  createConnectionForm: FormGroup;
  step = 0;
  productFamilyName = "Water Services";
  productName = "";
  pageNo = 1;
  rowPerPage = 50;

  branchList: any;
  ucList: any;
  neighborhoodUcList: any;
  unionCouncilList: [] = [];
  connectionTypeList: [] = [];
  neighborhoodUCList: [] = [];
  categoryList: [] = [];
  subCategoryList: [] = [];
  productList: [] = [];
  arrayProductresult: string[] = [];
  testProduct: [] = [];
  getBranchId = [];
  getUClist = [];
  getLocationId = [];
  user = "";

  progressInfos = [];
  pppp = [];
  isFileShow = false;
  rate = '';

  productSourceColumns: string[] = ['select', 'txtProductCode', 'serUomId', 'txtProductName', 'numSalePrice'];
  productSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  @ViewChild("productSourceSort", { static: true }) productSourceSort: MatSort;
  @ViewChild("productSourcePaginator", { static: true }) productSourcePaginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, private utilService: UtilsService, private shared: CrudService, private billingService: BillingService) { }
  formValidationMessages = {
    branch: [{
      type: "required",
      message: "This field is required"
    }],    
    unionCouncil: [{
      type: "required",
      message: "This field is required"
    }],
    txtCustomerCode: [{
      type: "required",
      message: "This field is required"
    }],
    txtConnectionType: [{
      type: "required",
      message: "This field is required"
    }],
    dteCreatedDate: [{
      type: "required",
      message: "This field is required"
    }],
    category: [{
      type: "required",
      message: "This field is required"
    }],
    subCategory: [{
      type: "required",
      message: "This field is required"
    }],
    txtMobileNo: [{
      type: "required",
      message: "This field is required"
    }],
    txtCnicNo: [{
      type: "required",
      message: "This field is required"
    }],
    txtBusinessName:[{
      type: "required",
      message: "This field is required"
    }]
  }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.createConnectionForm = this.formBuilder.group({
      branch: ['', Validators.required],
      unionCouncil: ['', Validators.required],
      neighborhoodUnionCouncil: [''],
      txtCustomerCode: ['', [Validators.required, Validators.maxLength(12)]],
      txtBusinessName: ['',Validators.required],
      txtConnectionType: ['', Validators.required],
      dteCreatedDate: ['' , Validators.required],
      txtMetered: [''],
      longitude: [0],
      latitude: [0],
      txtReferenceCode: [''],
      txtCnicNo: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      txtNtnNo: [''],
      txtStnNo: [''],
      txtShippingAddress: [''],
      txtMohallah: [''],
      txtHouseNo: [''],
      txtStreetNo: [''],
      txtMobileNo: ['', Validators.required],
      txtPhoneNo: [''],
      txtEmailAddress: ['', Validators.email],
      // txtDoc: [],
      serviceInfoList: this.formBuilder.array([]),
      serviceInfoListFrontend: this.formBuilder.array([])
    })
    this.getBranchList();
    // this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getCategoryList();
    this.getSubCategoryList();
    this.getProductList();

    this.createConnectionForm.controls['branch'].valueChanges.subscribe(element => {
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
    this.createConnectionForm.controls['unionCouncil'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getNeighborhoodUnionCouncilForUnionCouncil(element).subscribe(data => {
        this.neighborhoodUcList = data;
        this.getLocationId = [];
        for (let getUClist of this.neighborhoodUcList) {
          this.getLocationId.push(getUClist);
        }
        console.log("this.getLocationId");
        console.log(this.getLocationId);
      })
    })

    // this.createConnectionForm.controls['txtConnectionType'].valueChanges.subscribe(element => {
    //   debugger;
    //   this.billingService.getBranchIdForRoutes(element).subscribe(data => {
    //     this.ucList = data;
    //     this.getBranchId = [];
    //     for (let getBranch of this.ucList) {
    //       this.getBranchId.push(getBranch);
    //     }
    //     console.log("this.getBranchId");
    //     console.log(this.getBranchId);
    //   })
    // })

  }
  // -------------------------------- ngOnInit() ENDS   ----------------------------------------------
  get serviceInfoListFrontend(): FormArray {
    return this.createConnectionForm.get("serviceInfoListFrontend") as FormArray;
  }

  get serviceInfoList(): FormArray {
    return this.createConnectionForm.get("serviceInfoList") as FormArray;
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

  // getUnionCouncilList(){
  //   this.billingService.getAllCustomerTemplateService().subscribe( response=> {
  //     debugger;
  //     console.log(response["unionConcilList"]);
  //     this.unionCouncilList = response["unionConcilList"];
  //   })
  // }

  getConnectionTypeList() {
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      console.log(response["connectionTypeList"]);
      this.connectionTypeList = response["connectionTypeList"];
    })
  }
  getNeighborhoodUCList() {
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      console.log(response["neighborhoodUnionConcilList"]);
      this.neighborhoodUCList = response["neighborhoodUnionConcilList"];
    })
  }

  getCategoryList() {
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      console.log(response["categoryList"]);
      this.categoryList = response["categoryList"];
    })
  }

  getSubCategoryList() {
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      console.log(response["subCategoryList"]);
      this.subCategoryList = response["subCategoryList"];
    })
  }
  getProductList() {
    debugger;
    this.billingService.getProductService(this.pageNo, this.productFamilyName, this.productName, this.rowPerPage).subscribe(response => {

      debugger;
      console.log("getProductService");
      console.log(response["data"]);
      this.productList = response["data"];
      this.productSource = new MatTableDataSource(this.productList);
      this.productSource.sort = this.productSourceSort;
      this.productSource.paginator = this.productSourcePaginator;

      this.productList.forEach(element => {
        this.serviceInfoListFrontend.push(this.formBuilder.group({
          checked: [false],
          prductFamilyId: [element["serProductFamilyId"]],
          productId: [element["serProductId"]],
          // rate: [],
           rate: [""+element["numSalePrice"]],
          serviceName: [element["txtProductName"]],
          serviceType: [element["txtProductCode"]],
          uom: ["" + element["serUomId"]]
        }));
      })


    })


  }


  // onChange(event) {
  //   this.isFileShow = true;
  //   var selectedFiles = event.target.files;
  //   for (var i = 0; i < selectedFiles.length; i++) {
  //     this.progressInfos[i] = { value: [i+1], fileName: selectedFiles[i].name };
  //     this.pppp.push(this.progressInfos[i])
  //      this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
  //     this.billingService.uploadFileNewConnectionService(i,this.file,this.progressInfos[i].fileName).subscribe(response => {
  //       debugger;
  //       console.log('File: ' + response)
  //       debugger;
  //     console.log("response")
  //     console.log(response)
  //   })
  //   }

  // }

  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.progressInfos[i] = { value: [i + 1], fileName: selectedFiles[i].name };
      this.pppp.push(this.progressInfos[i])
      // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
    }

  }
  onConnectionChange(event){
    debugger;
    let firstChar = "("+ event.value.charAt(0) +")";
    let newProductList: any[]= [];
    this.productList.forEach((element: any) => {
      debugger;
      let lastChar = element.txtProductName.substr(-3,3);
      let thirdLChar = "("+ element.txtProductName.substr(-3,1) +")";
      if(firstChar == lastChar){
        newProductList.push(element);
      }
      else if(firstChar == thirdLChar){
        newProductList.push(element);
      }
    });
    this.productSource = new MatTableDataSource(newProductList);
    this.productSource.sort = this.productSourceSort;
    this.productSource.paginator = this.productSourcePaginator;

    newProductList.forEach(element => {
      this.serviceInfoListFrontend.push(this.formBuilder.group({
        checked: [false],
        prductFamilyId: [element["serProductFamilyId"]],
        productId: [element["serProductId"]],
        // rate: [],
         rate: [""+element["numSalePrice"]],
        serviceName: [element["txtProductName"]],
        serviceType: [element["txtProductCode"]],
        uom: ["" + element["serUomId"]]
      }));
    })
  }

  clearStartDate() {
    this.createConnectionForm.controls.txtStartDate.reset('');
  }

  // this.result += 'File N0: '+ [i+1]+ '' + selectedFiles[i].name;
  //     this.result += '<br>';
  // onSubmit() {
  //   debugger;
  //   console.log(this.createConnectionForm.value)
  //     this.utilService.createConnectionService(this.createConnectionForm.value).subscribe(response =>{
  //     debugger;
  //     console.log(response);
  //     response = this.createConnectionForm.value;
  //   })
  // }
  onSubmit() {
    debugger;
    if(this.createConnectionForm.invalid){
      alert('Form is INVALID');
      return
    }
    else{
      this.serviceInfoListFrontend.controls.forEach(element => {
        // debugger;
        if (element["controls"].checked.value == true) {
          this.serviceInfoList.push(element);
        }
      });
      console.log("createNewConnectionServiceCus");
      debugger;
      let formValue = this.createConnectionForm.value;
      formValue.branch = { "id": +this.createConnectionForm.controls.branch.value }
      formValue.unionCouncil = { "id": +this.createConnectionForm.controls.unionCouncil.value }
      formValue.neighborhoodUnionCouncil = { "id": +this.createConnectionForm.controls.neighborhoodUnionCouncil.value }
      formValue.category = { "id": +this.createConnectionForm.controls.category.value }
      formValue.subCategory = { "id": +this.createConnectionForm.controls.subCategory.value }
      console.log(this.createConnectionForm.value);
      this.billingService.createNewConnectionServiceCus(this.createConnectionForm.value).subscribe(response => {
        response = this.createConnectionForm.value;
        debugger;
        console.log("response");
        console.log(response);
        alert('Record added successfully');
        this.router.navigate(['waterSupplyManagement/connectionList']);
      })
      
    }
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

  checkboxLabel(row, event) {
    debugger;
    console.log(row.serProductId);
    console.log(event.checked);

    if (event.checked == true) {
      debugger;
      console.log("FormControl: serviceInfoListFrontend")
      console.log(this.createConnectionForm.controls["serviceInfoListFrontend"].value);
    }

  }

}

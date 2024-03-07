import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentUploadDialogComponent } from "@app/modals/documentUploadModal.component";
import { SubmitModalComponent } from "@app/modals/submitModal.component";
import { BillingService } from "@app/services/billing.service";

@Component({
  selector: 'app-editUpdatedConnection',
  templateUrl: './editUpdatedConnection.component.html'
})

export class EditUpdatedConnectionComponent implements OnInit {

  Id: any = "";
  user: any = "";
  updateForm: FormGroup;
  basicInfoList = [];
  ucList: any;
  branchList: any;
  neighborhoodUcList: any;
  connectionTypeList: [] = [];
  neighborhoodUCList: [] = [];
  categoryList: [] = [];
  subCategoryList: [] = [];
  productList: [] = [];
  getLocationId = [];
  productFamilyName = "Water Services";
  productName = "";
  pageNo = 1;
  rowPerPage = 50;
  documentTypeList: any[] = [];
  fileListData = new MatTableDataSource();
  showFile = false;
  getBranchId = [];
  basicInfo: any;
  files: any[] = [];
  isFileShow = false;
  show = false;
  isLoading = true;
  called = 0;


  fileColumns: string[] = ['documentName', 'txtDocumentReferenceNo', 'Actions'];

  productSourceColumns: string[] = ['select', 'txtProductCode', 'serUomId', 'txtProductName', 'numSalePrice'];
  productSource = new MatTableDataSource();

  @ViewChild("productSourceSort", { static: true }) productSourceSort: MatSort;
  @ViewChild("productSourcePaginator", { static: true }) productSourcePaginator: MatPaginator;
  selection = new SelectionModel<any>(true, []);

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private billingService: BillingService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      debugger;
      this.Id = +params.get("id");
    });
    this.updateForm = this.formBuilder.group({
      txtCustomerCode: [''],
      id: [''],
      branch: ['', Validators.required],
      unionCouncil: ['', Validators.required],
      neighborhoodUnionCouncil: [''],
      txtConnectionType: ['', Validators.required],
      dteModifiedDate: ['', Validators.required],
      dteCreatedDate: [''],
      txtMetered: [''],
      longitude: [0],
      latitude: [0],
      txtReferenceCode: [''],
      txtBusinessName: ['', Validators.required],
      txtCnicNo: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: [''],
      txtNtnNo: [''],
      txtStnNo: [''],
      txtShippingAddress: [''],
      txtMohallah: [''],
      txtHouseNo: [''],
      txtStreetNo: [''],
      txtMobileNo: ['', Validators.required],
      txtPhoneNo: [''],
      txtEmailAddress: ['', Validators.email],
      serviceInfoList: this.formBuilder.array([]),
      serviceInfoListFrontend: this.formBuilder.array([]),
      lstCustomerDocumentDto: this.formBuilder.array([]),
    })
    this.getProductList();
    this.getBranchList();
    // this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getCategoryList();
    this.getSubCategoryList();



    this.updateForm.controls['txtConnectionType'].valueChanges.subscribe(element => {
      debugger;
      let event = {
        value: ""
      };
      event.value = element;
      this.onConnectionChange(event);
    })

    this.updateForm.controls['branch'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getBranchIdForRoutes(element).subscribe(data => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }
      })
    })

    this.updateForm.controls['unionCouncil'].valueChanges.subscribe(element => {

      this.billingService.getNeighborhoodUnionCouncilForUnionCouncil(element).subscribe(data => {

        this.neighborhoodUcList = data;
        this.getLocationId = [];
        for (let getUClist of this.neighborhoodUcList) {
          this.getLocationId.push(getUClist);
        }
      })
    })

  }

  // ------------------- ngOninit() END ---------------------------------------

  get serviceInfoListFrontend(): FormArray {
    return this.updateForm.get("serviceInfoListFrontend") as FormArray;
  }

  get serviceInfoList(): FormArray {
    return this.updateForm.get("serviceInfoList") as FormArray;
  }

  get getCustomerDocument() {
    return this.updateForm.get('lstCustomerDocumentDto') as FormArray;
  }

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
    dteModifiedDate: [{
      type: "required",
      message: "This field is required"
    }],
    category: [{
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
    txtBusinessName: [{
      type: "required",
      message: "This field is required"
    }]
  }

  getProductList() {
    this.billingService.getProductService(this.pageNo, this.productFamilyName, this.productName, this.rowPerPage).subscribe(response => {
      console.log("getProductService");
      console.log(response["data"]);
      this.productList = response["data"];
      this.called = 1;
      this.productSource = new MatTableDataSource(this.productList);
      this.productSource.sort = this.productSourceSort;
      this.productSource.paginator = this.productSourcePaginator;
      this.productList.forEach(element => {
        this.serviceInfoListFrontend.push(this.formBuilder.group({
          checked: [false],
          prductFamilyId: [element["serProductFamilyId"]],
          productId: [element["serProductId"]],
          serRate: ["" + element["numSalePrice"]],
          serviceName: [element["txtProductName"]],
          serviceType: [element["txtProductCode"]],
          uom: ["" + element["serUomId"]]
        }));
      })
      this.patchValues();
    })
  }

  getBranchList() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.billingService.getBranchService(this.user.serUserId).subscribe(response => {
      this.branchList = response;
    })

    this.updateForm.controls['unionCouncil'].valueChanges.subscribe(element => {
      debugger;
      this.billingService.getNeighborhoodUnionCouncilForUnionCouncil(element).subscribe(data => {
        debugger;
        this.neighborhoodUcList = data;
        this.getLocationId = [];
        for (let getUClist of this.neighborhoodUcList) {
          this.getLocationId.push(getUClist);
        }
      })
    })
  }

  getConnectionTypeList() {
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      console.log("connectionTypeList");
      console.log(response["connectionTypeList"]);
      this.connectionTypeList = response["connectionTypeList"];
      console.log(this.connectionTypeList)
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

  patchValues(){
    this.billingService.getDumpCustomerListServiceByID(this.Id).subscribe(response => {
      debugger;
      console.log("patchValues");
      console.log(response);
      this.basicInfo = response;
      this.files = response["lstCustomerDocumentDto"];
      this.files.forEach(element => {
        this.getCustomerDocument.push(this.formBuilder.group({
          txtDocumentReferenceNo: element.txtDocumentReferenceNo,
          documentSize: element.numDocumentSize,
          byteDocumentFile: element.byteDocumentFile,
          documentName: element.documentName,
          fileType: element.txtDocumentFileType,
        }));
      })

      this.fileListData = new MatTableDataSource(this.files);
      debugger;
      this.updateForm.controls['id'].patchValue(this.basicInfo?.id);
      this.updateForm.controls['txtCustomerCode'].patchValue(this.basicInfo.txtCustomerCode);
      this.updateForm.controls['branch'].patchValue(this.basicInfo.branch?.id + "");
      this.updateForm.controls['unionCouncil'].patchValue(this.basicInfo.unionCouncil?.id + "");
      this.updateForm.controls['neighborhoodUnionCouncil'].patchValue(this.basicInfo.neighborhoodUnionCouncil?.id + "");
      this.updateForm.controls.txtConnectionType.patchValue(this.basicInfo.txtConnectionType);
      this.updateForm.controls['txtMetered'].patchValue(this.basicInfo.txtMetered + "");
      this.updateForm.controls.category.patchValue(this.basicInfo?.category?.id + "");
      this.updateForm.controls.subCategory.patchValue(this.basicInfo?.subCategory?.id + "");
      this.updateForm.controls.txtReferenceCode.patchValue(this.basicInfo.txtReferenceCode);
      this.updateForm.controls.txtCnicNo.patchValue(this.basicInfo.txtCnicNo);
      this.updateForm.controls.txtNtnNo.patchValue(this.basicInfo.txtNtnNo);
      this.updateForm.controls.txtStnNo.patchValue(this.basicInfo.txtStnNo);
      this.updateForm.controls.dteCreatedDate.patchValue(this.basicInfo.dteCreatedDate);
      this.updateForm.controls.dteModifiedDate.patchValue(this.basicInfo.dteModifiedDate);
      this.updateForm.controls.txtBusinessName.patchValue(this.basicInfo.txtBusinessName + "");
      this.updateForm.controls.txtShippingAddress.patchValue(this.basicInfo.txtShippingAddress + "");
      this.updateForm.controls.txtMohallah.patchValue(this.basicInfo.txtMohallah + "");
      this.updateForm.controls.txtMobileNo.patchValue(this.basicInfo?.txtMobileNo + "");
      this.updateForm.controls.txtPhoneNo.patchValue(this.basicInfo?.txtPhoneNo + "");
      if (this.basicInfo?.txtHouseNo) {
        this.updateForm.controls.txtHouseNo.patchValue(this.basicInfo?.txtHouseNo + "");
      }
      if (this.basicInfo?.txtStreetNo) {
        this.updateForm.controls.txtStreetNo.patchValue(this.basicInfo?.txtStreetNo + "");
      }
      if (this.basicInfo?.txtEmailAddress) {
        this.updateForm.controls.txtEmailAddress.patchValue(this.basicInfo?.txtEmailAddress + "");
      }
      this.isLoading = false;
      this.show = true;
    })
  }

  initDocument(singleDocument: any) {
    debugger;
    console.log(singleDocument)
    return this.formBuilder.group({
      txtDocumentReferenceNo: singleDocument.txtDocumentReferenceNo,
      documentSize: singleDocument.numDocumentSize,
      byteDocumentFile: singleDocument.byteDocumentFile.__zone_symbol__value,
      documentName: singleDocument.txtDocumentFileName,
      fileType: singleDocument.txtDocumentFileType,
    });
  }

  addBillingDocument(row: any, i: number) {
    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      data: { row: row, documentTypeList: this.documentTypeList }
    });

    dialogRef.afterClosed().subscribe(document => {
      debugger;
      if (document.numDocumentSize < 100000000) {
        this.getCustomerDocument.push(this.initDocument(document));
        this.fileListData = new MatTableDataSource(this.getCustomerDocument.value);
        this.showFile = true;
        console.log(this.updateForm.value);
      }
      else
        alert('File is too big.')
    })
  }

  onDelete(documentName: string) {
    const document = this.dialog.open(SubmitModalComponent, {
      data: {
        message: 'Are you sure want to remove document from the list?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        let index = this.getCustomerDocument.controls.findIndex(x => ((x.get("documentName").value === documentName)));

        if (index >= 0) {
          this.getCustomerDocument.removeAt(index);
        }
        let DTList: any[] = [];
        DTList = this.getCustomerDocument.value;
        this.fileListData = new MatTableDataSource(DTList);
        if (DTList.length == 0) {
          this.showFile = false;
        } else
          this.showFile = true;

      }
      console.log(this.updateForm.value);
    })
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      alert('Fill the form Correctly')
      return
    }
    else {
      this.serviceInfoListFrontend.controls.forEach(element => {
        // debugger;
        if (element["controls"].checked.value == true) {
          this.serviceInfoList.push(element);
        }
      });
      console.log("response");
      console.log(this.updateForm.value);
      let id = this.updateForm.value.id;
      console.log(id);
      let branchId = this.updateForm.controls.branch.value;
      let updateFormValue = this.updateForm.value;
      updateFormValue.branch = { "id": +branchId }
      updateFormValue.unionCouncil = { "id": +this.updateForm.controls.unionCouncil.value }
      updateFormValue.neighborhoodUnionCouncil = { "id": +this.updateForm.controls.neighborhoodUnionCouncil.value }
      updateFormValue.category = { "id": +this.updateForm.controls.category.value }
      updateFormValue.subCategory = { "id": +this.updateForm.controls.subCategory.value }
      updateFormValue.txtStatus = "UPDATED";

      this.billingService.updateCustomerListServiceByID(id, this.updateForm.value).subscribe(response => {
        debugger;
        response = this.updateForm.value;
        console.log(response);
        this.router.navigate(['billing/updateConnectionList']);
      })
    }
  }

  onConnectionChange(event) {
    debugger;
    let firstChar = "(" + event.value.charAt(0) + ")";
    if (firstChar == '(A)') {
      firstChar = '(A' + event.value.substr(-1, 1) + ')';
    }
    let newProductList: any[] = [];
    this.productList.forEach((element: any) => {
      debugger;
      let lastChar = element.txtProductName.substr(-3, 3);
      let thirdLChar = "(" + element.txtProductName.substr(-3, 2) + ")";
      if (firstChar == lastChar) {
        newProductList.push(element);
      }
      else if (firstChar == thirdLChar) {
        newProductList.push(element);
      }
    });

    debugger;
    this.serviceInfoListFrontend.clear();
    newProductList.forEach(element => {
      if (element.txtProductName.substring(0, 14) === 'New Connection') {
        this.serviceInfoListFrontend.push(this.formBuilder.group({
          checked: [true],
          serProductFamilyId: [element["serProductFamilyId"]],
          serProductId: [element["serProductId"]],
          // serRate: [],
          serRate: ["" + element["numSalePrice"]],
          txtServiceName: [element["txtProductName"]],
          serServiceType: [element["txtProductCode"]],
          serUom: ["" + element["serUomId"]],
          ser_gl_sales_account_id: [element["serSalesAccountId"]]
        }));
      }
      else {
        this.serviceInfoListFrontend.push(this.formBuilder.group({
          checked: [false],
          serProductFamilyId: [element["serProductFamilyId"]],
          serProductId: [element["serProductId"]],
          // serRate: [],
          serRate: ["" + element["numSalePrice"]],
          txtServiceName: [element["txtProductName"]],
          serServiceType: [element["txtProductCode"]],
          serUom: ["" + element["serUomId"]],
          ser_gl_sales_account_id: [element["serSalesAccountId"]]
        }));
      }

    })
    this.productSource = new MatTableDataSource(newProductList);
    this.productSource.sort = this.productSourceSort;
    this.productSource.paginator = this.productSourcePaginator;
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  clearStartDate() {
    this.updateForm.controls.txtStartDate.reset('');
  }
  clearConnectionDate() {
    this.date.reset('');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.productSource.data.forEach(row => this.selection.select(row));
  }
}
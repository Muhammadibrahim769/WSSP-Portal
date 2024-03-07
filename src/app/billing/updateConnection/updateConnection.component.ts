import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppLabelConstants } from '@app/appLabel';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { UpdateModalComponent } from '@app/modals/updateModal.component';
import { BillingService } from '@app/services/billing.service';
import { last } from 'rxjs/operators';

export interface PeriodicElement {
  servicesType: string;
  servicesName: string;
  Rate: number;
  UOM: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    Rate: 100,
    servicesName: 'Severage',
    UOM: 'Rs',
    servicesType: 'Water Supply/ Severage',
  },
  {
    Rate: 230,
    servicesName: 'No of Trips',
    UOM: 'Rs',
    servicesType: 'Solid Waste Management Services',
  },
  {
    Rate: 300,
    servicesName: 'Water Charges',
    UOM: 'Rs',
    servicesType: 'Ground Water Abstraction/Aquifer',
  },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './updateConnection.component.html',
})
export class UpdateConnectionComponent implements OnInit {
  basicInfo: any;
  searchForm: FormGroup;
  updateForm: FormGroup;
  getBranchId = [];
  branchList: any;
  unionCouncilList: [] = [];
  user: any = '';
  show = false;
  shortLink: string = '';
  loading: boolean = false;
  file: File = null;
  newConnectionForm: FormGroup;
  step = 0;
  productFamilyName = 'Water Services';
  productName = '';
  pageNo = 1;
  rowPerPage = 50;
  basicInfoList = [];
  ucList: any;
  neighborhoodUcList: any;
  connectionTypeList: [] = [];
  neighborhoodUCList: [] = [];
  categoryList: [] = [];
  subCategoryList: [] = [];
  productList: [] = [];
  arrayProductresult: string[] = [];
  testProduct: [] = [];
  documentTypeList: any[] = [];
  files: any[] = [];

  fileColumns: string[] = ['documentName', 'txtDocumentReferenceNo', 'Actions'];
  fileListData = new MatTableDataSource();
  showFile = false;

  progressInfos = [];
  pppp = [];
  isFileShow = false;
  rate = '';
  public appLabelConstants = AppLabelConstants;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private formbuilder: FormBuilder,
    private billingService: BillingService
  ) {}
  branchLIst: any;
  getLocationId = [];
  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      txtCustomerCode: ['', Validators.required],
    });
    this.updateForm = this.formbuilder.group({
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
    });

    this.getProductList();
    this.getBranchList();
    // this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getCategoryList();
    this.getSubCategoryList();

    this.updateForm.controls['txtConnectionType'].valueChanges.subscribe(
      (element) => {
        debugger;
        let event = {
          value: '',
        };
        event.value = element;
        this.onConnectionChange(event);
      }
    );

    this.updateForm.controls['branch'].valueChanges.subscribe((element) => {
      debugger;
      this.billingService.getBranchIdForRoutes(element).subscribe((data) => {
        this.ucList = data;
        this.getBranchId = [];
        for (let getBranch of this.ucList) {
          this.getBranchId.push(getBranch);
        }
        console.log('this.getBranchId');
        console.log(this.getBranchId);
      });
    });

    this.updateForm.controls['unionCouncil'].valueChanges.subscribe(
      (element) => {
        debugger;
        this.billingService
          .getNeighborhoodUnionCouncilForUnionCouncil(element)
          .subscribe((data) => {
            debugger;
            this.neighborhoodUcList = data;
            this.getLocationId = [];
            for (let getUClist of this.neighborhoodUcList) {
              this.getLocationId.push(getUClist);
            }
            console.log('this.getLocationId');
            console.log(this.getLocationId);
          });
      }
    );
  }
  get serviceInfoListFrontend(): FormArray {
    return this.updateForm.get('serviceInfoListFrontend') as FormArray;
  }

  get serviceInfoList(): FormArray {
    return this.updateForm.get('serviceInfoList') as FormArray;
  }

  get getCustomerDocument() {
    return this.updateForm.get('lstCustomerDocumentDto') as FormArray;
  }

  formValidationMessages = {
    branch: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    unionCouncil: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtCustomerCode: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtConnectionType: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    dteModifiedDate: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    category: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtMobileNo: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtCnicNo: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
    txtBusinessName: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
  };
  getBranchList() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.billingService
      .getBranchService(this.user.serUserId)
      .subscribe((response) => {
        console.log(response);
        this.branchList = response;
        console.log('this.branchList');
        console.log(this.branchList);
      });

    this.updateForm.controls['unionCouncil'].valueChanges.subscribe(
      (element) => {
        debugger;
        this.billingService
          .getNeighborhoodUnionCouncilForUnionCouncil(element)
          .subscribe((data) => {
            debugger;
            this.neighborhoodUcList = data;
            this.getLocationId = [];
            for (let getUClist of this.neighborhoodUcList) {
              this.getLocationId.push(getUClist);
            }
            console.log('this.getLocationId');
            console.log(this.getLocationId);
          });
      }
    );
  }
  getProductList() {
    this.billingService
      .getProductService(
        this.pageNo,
        this.productFamilyName,
        this.productName,
        this.rowPerPage
      )
      .subscribe((response) => {
        console.log('getProductService');
        console.log(response['data']);
        this.productList = response['data'];
        this.productSource = new MatTableDataSource(this.productList);
        this.productSource.sort = this.productSourceSort;
        this.productSource.paginator = this.productSourcePaginator;
        this.productList.forEach((element) => {
          this.serviceInfoListFrontend.push(
            this.formBuilder.group({
              checked: [false],
              prductFamilyId: [element['serProductFamilyId']],
              productId: [element['serProductId']],
              serRate: ['' + element['numSalePrice']],
              serviceName: [element['txtProductName']],
              serviceType: [element['txtProductCode']],
              uom: ['' + element['serUomId']],
            })
          );
        });
      });
  }
  getConnectionTypeList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        console.log('connectionTypeList');
        console.log(response['connectionTypeList']);
        this.connectionTypeList = response['connectionTypeList'];
        console.log(this.connectionTypeList);
      });
  }

  getNeighborhoodUCList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        console.log(response['neighborhoodUnionConcilList']);
        this.neighborhoodUCList = response['neighborhoodUnionConcilList'];
      });
  }

  getCategoryList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        console.log(response['categoryList']);
        this.categoryList = response['categoryList'];
      });
  }

  getSubCategoryList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        console.log(response['subCategoryList']);
        this.subCategoryList = response['subCategoryList'];
      });
  }

  onConnectionChange(event) {
    let firstChar = '(' + event.value.charAt(0) + ')';
    if (firstChar == '(A)') {
      firstChar = '(A' + event.value.substr(-1, 1) + ')';
    }
    let newProductList: any[] = [];
    this.productList.forEach((element: any) => {
      let lastChar = element.txtProductName.substr(-3, 3);
      let thirdLChar = '(' + element.txtProductName.substr(-3, 2) + ')';
      if (firstChar == lastChar) {
        newProductList.push(element);
      } else if (firstChar == thirdLChar) {
        newProductList.push(element);
      }
    });
    console.log(newProductList);
    this.serviceInfoListFrontend.clear();
    newProductList.forEach((value, index) => {
      if (value.txtProductName.substring(0, 14) === 'New Connection') {
        newProductList.splice(index, 1);
      }
    });
    newProductList.forEach((element) => {
      if (element.txtProductName.substring(0, 17) === 'Change of Profile') {
        this.serviceInfoListFrontend.push(
          this.formBuilder.group({
            checked: [true],
            serProductFamilyId: [element['serProductFamilyId']],
            serProductId: [element['serProductId']],
            // serRate: [],
            serRate: ['' + element['numSalePrice']],
            txtServiceName: ['Change of Profie' + firstChar],
            serServiceType: [element['txtProductCode']],
            serUom: ['' + element['serUomId']],
            ser_gl_sales_account_id: [element['serSalesAccountId']],
          })
        );
      } else {
        this.serviceInfoListFrontend.push(
          this.formBuilder.group({
            checked: [false],
            serProductFamilyId: [element['serProductFamilyId']],
            serProductId: [element['serProductId']],
            // serRate: [],
            serRate: ['' + element['numSalePrice']],
            txtServiceName: [element['txtProductName']],
            serServiceType: [element['txtProductCode']],
            serUom: ['' + element['serUomId']],
            ser_gl_sales_account_id: [element['serSalesAccountId']],
          })
        );
      }
    });
    this.productSource = new MatTableDataSource(newProductList);
    this.productSource.sort = this.productSourceSort;
    this.productSource.paginator = this.productSourcePaginator;
  }

  onSearchSubmit() {
    debugger;
    let code = this.searchForm.controls.txtCustomerCode.value;
    this.billingService.getCustomerListServiceByCode(code).subscribe(
      (response) => {
        this.basicInfoList = response;
        this.basicInfo = this.basicInfoList;
        console.log('this.basicInfo');
        console.log(this.basicInfo);
        this.files = response['lstCustomerDocumentDto'];
        this.files.forEach((element) => {
          this.getCustomerDocument.push(
            this.formBuilder.group({
              txtDocumentReferenceNo: element.txtDocumentReferenceNo,
              documentSize: element.numDocumentSize,
              byteDocumentFile: element.byteDocumentFile,
              documentName: element.documentName,
              fileType: element.txtDocumentFileType,
            })
          );
        });
        this.fileListData = new MatTableDataSource(this.files);
        this.updateForm.controls['id'].patchValue(this.basicInfo?.id);
        this.updateForm.controls['txtCustomerCode'].patchValue(
          this.searchForm.controls.txtCustomerCode.value
        );
        this.updateForm.controls['branch'].patchValue(
          this.basicInfo.branch?.id + ''
        );
        this.updateForm.controls['unionCouncil'].patchValue(
          this.basicInfo.unionCouncil?.id + ''
        );
        this.updateForm.controls['neighborhoodUnionCouncil'].patchValue(
          this.getLocationId[0]?.id + ''
        );
        this.updateForm.controls.txtConnectionType.patchValue(
          this.basicInfo.txtConnectionType
        );
        this.updateForm.controls['txtMetered'].patchValue(
          this.basicInfo.txtMetered + ''
        );
        this.updateForm.controls.category.patchValue(
          this.basicInfo?.category?.id + ''
        );
        this.updateForm.controls.subCategory.patchValue(
          this.basicInfo?.subCategory?.id + ''
        );
        this.updateForm.controls.txtReferenceCode.patchValue(
          this.basicInfo.txtReferenceCode
        );
        this.updateForm.controls.txtCnicNo.patchValue(this.basicInfo.txtCnicNo);
        this.updateForm.controls.txtNtnNo.patchValue(this.basicInfo.txtNtnNo);
        this.updateForm.controls.txtStnNo.patchValue(this.basicInfo.txtStnNo);
        this.updateForm.controls.dteCreatedDate.patchValue(
          this.basicInfo.dteCreatedDate + ''
        );
        this.updateForm.controls.dteModifiedDate.patchValue(
          this.basicInfo.dteCreatedDate + ''
        );
        this.updateForm.controls.txtBusinessName.patchValue(
          this.basicInfo.txtBusinessName + ''
        );
        this.updateForm.controls.txtShippingAddress.patchValue(
          this.basicInfo.txtShippingAddress + ''
        );
        this.updateForm.controls.txtMohallah.patchValue(
          this.basicInfo.txtMohallah + ''
        );
        this.updateForm.controls.txtMobileNo.patchValue(
          this.basicInfo?.txtMobileNo + ''
        );
        this.updateForm.controls.longitude.patchValue(
          this.basicInfo?.longitude + ''
        );
        this.updateForm.controls.latitude.patchValue(
          this.basicInfo?.latitude + ''
        );
        if (this.basicInfo?.txtPhoneNo) {
          this.updateForm.controls.txtPhoneNo.patchValue(
            this.basicInfo?.txtPhoneNo + ''
          );
        }
        if (this.basicInfo?.txtHouseNo) {
          this.updateForm.controls.txtHouseNo.patchValue(
            this.basicInfo?.txtHouseNo + ''
          );
        }
        if (this.basicInfo?.txtStreetNo) {
          this.updateForm.controls.txtStreetNo.patchValue(
            this.basicInfo?.txtStreetNo + ''
          );
        }
        if (this.basicInfo?.txtEmailAddress) {
          this.updateForm.controls.txtEmailAddress.patchValue(
            this.basicInfo?.txtEmailAddress + ''
          );
        }
        // this.updateForm.controls.txtHouseNo.patchValue(this.basicInfo?.txtHouseNo + "");
        // this.updateForm.controls.txtEmailAddress.patchValue(this.basicInfo?.txtEmailAddress + "");
        // this.updateForm.controls.txtStreetNo.patchValue(this.basicInfo?.txtStreetNo + "");
        this.show = true;

        // console.log(this.updateForm.value);
      },
      (error) => {
        debugger;
        error = 'Record Not found';
        alert(error);
      }
    );
  }

  onSubmit() {
    debugger;
    if (this.updateForm.invalid) {
      alert('Fill the form Correctly');
      return;
    } else {
      this.serviceInfoListFrontend.controls.forEach((element) => {
        // debugger;
        if (element['controls'].checked.value == true) {
          this.serviceInfoList.push(element);
        }
      });
      console.log('response');
      console.log(this.updateForm.value);
      let id = this.updateForm.value.id;
      console.log(id);
      let branchId = this.updateForm.controls.branch.value;
      let updateFormValue = this.updateForm.value;
      updateFormValue.branch = { id: +branchId };
      updateFormValue.unionCouncil = {
        id: +this.updateForm.controls.unionCouncil.value,
      };
      updateFormValue.neighborhoodUnionCouncil = {
        id: +this.updateForm.controls.neighborhoodUnionCouncil.value,
      };
      updateFormValue.category = {
        id: +this.updateForm.controls.category.value,
      };
      updateFormValue.subCategory = {
        id: +this.updateForm.controls.subCategory.value,
      };
      updateFormValue.txtStatus = 'UPDATED';

      this.billingService
        .updateCustomerListServiceByID(id, this.updateForm.value)
        .subscribe((response) => {
          debugger;
          response = this.updateForm.value;
          console.log(response);
          this.router.navigate(['billing/updateConnectionList']);
        });
    }
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  clearStartDate() {
    this.updateForm.controls.txtStartDate.reset('');
  }
  clearConnectionDate() {
    this.date.reset('');
  }
  openUpdateDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Update ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log('Dialog is closed');
        this.router.navigate(['billing/updateConnection']);
      }
    });
  }
  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;

    for (var i = 0; i < selectedFiles.length; i++) {
      this.progressInfos[i] = {
        value: [i + 1],
        fileName: selectedFiles[i].name,
      };
      this.pppp.push(this.progressInfos[i]);
      // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
    }
  }
  productSourceColumns: string[] = [
    'select',
    'txtProductCode',
    'serUomId',
    'txtProductName',
    'numSalePrice',
  ];
  productSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  @ViewChild('productSourceSort', { static: true }) productSourceSort: MatSort;
  @ViewChild('productSourcePaginator', { static: true })
  productSourcePaginator: MatPaginator;

  initDocument(singleDocument: any) {
    debugger;
    console.log(singleDocument);
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
      data: { row: row, documentTypeList: this.documentTypeList },
    });

    dialogRef.afterClosed().subscribe((document) => {
      debugger;
      if (document.numDocumentSize < 100000000) {
        this.getCustomerDocument.push(this.initDocument(document));
        this.fileListData = new MatTableDataSource(
          this.getCustomerDocument.value
        );
        this.showFile = true;
        console.log(this.updateForm.value);
      } else alert('File is too big.');
    });
  }

  onDelete(documentName: string) {
    const document = this.dialog.open(SubmitModalComponent, {
      data: {
        message: 'Are you sure want to remove document from the list?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        let index = this.getCustomerDocument.controls.findIndex(
          (x) => x.get('documentName').value === documentName
        );

        if (index >= 0) {
          this.getCustomerDocument.removeAt(index);
        }
        let DTList: any[] = [];
        DTList = this.getCustomerDocument.value;
        this.fileListData = new MatTableDataSource(DTList);
        if (DTList.length == 0) {
          this.showFile = false;
        } else this.showFile = true;
      }
      console.log(this.updateForm.value);
    });
  }

  /** Whether the number of selected elements matches the total number of rows.*/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.productSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row, event) {
    debugger;
    console.log(row.serProductId);
    console.log(event.checked);

    if (event.checked == true) {
      this.arrayProductresult.push(row);
      debugger;
      this.serviceInfoList.push(
        this.formBuilder.group({
          prductFamilyId: [row['serProductFamilyId']],
          productId: [row['serProductId']],
          serRate: ['' + row['numSalePrice']],
          serviceName: [row['txtProductName']],
          serviceType: [row['txtProductCode']],
          uom: ['' + row['serUomId']],
        })
      );
      console.log('FormControl');
      console.log(this.updateForm.controls['serviceInfoList'].value);
    }

    if (event.checked == false) {
      let index = this.arrayProductresult.indexOf(row);
      this.arrayProductresult.splice(index, 1);
      console.log(row.serProductId);
      this.serviceInfoList.removeAt(index);
      console.log('deleted');
      console.log(this.updateForm.controls['serviceInfoList'].value);
      // console.log(this.createConnectionForm.controls.serviceInfoList.value[index]);
    }
    // console.log(this.createConnectionForm.controls["serviceInfoList"].value);
    //  return (!row)
    //    ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
    //    : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

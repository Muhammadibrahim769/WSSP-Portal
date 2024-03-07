import { SelectionModel } from '@angular/cdk/collections';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { BillingService } from '@app/services/billing.service';
import { CrudService } from '@app/_services/crud.service';
import { UtilsService } from '@app/_services/utils.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { escapeLeadingUnderscores } from 'typescript';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './createConnection.component.html',
})
export class CreateConnectionComponent implements OnInit {
  shortLink: string = '';
  loading: boolean = false;
  file: File = null;
  createConnectionForm: FormGroup;
  step = 0;
  productFamilyName = 'Water Services';
  productName = '';
  pageNo = 1;
  rowPerPage = 50;
  preFixNum: any = '';
  branchList: any;
  ucList: any;
  neighborhoodUcList: any;
  unionCouncilList: [] = [];
  connectionTypeList: [] = [];
  neighborhoodUCList: [] = [];
  categoryList: any[] = [];
  categoryListTest: any[] = [];
  subCategoryList: [] = [];
  productList: [] = [];
  arrayProductresult: string[] = [];
  testProduct: [] = [];
  getBranchId = [];
  getUClist = [];
  getLocationId = [];
  user = '';
  filesList: any[] = [];

  progressInfos = [];
  pppp = [];
  isFileShow = false;
  serRate = '';
  showFile = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

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

  fileColumns: string[] = ['documentName', 'txtDocumentReferenceNo', 'Actions'];
  fileListData = new MatTableDataSource();
  filelist: any[] = [];
  documentTypeList: any[] = [];
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
    dteCreatedDate: [
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
    dteRequestDate: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private utilService: UtilsService,
    private shared: CrudService,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.createConnectionForm = this.formBuilder.group({
      branch: ['', Validators.required],
      unionCouncil: ['', Validators.required],
      neighborhoodUnionCouncil: [''],
      txtCustomerCode: ['', [Validators.required, Validators.minLength(11)]],
      txtBusinessName: ['', Validators.required],
      txtConnectionType: ['', Validators.required],
      dteCreatedDate: ['', Validators.required],
      dteRequestDate: ['', Validators.required],
      txtMetered: [''],
      longitude: [],
      latitude: [],
      txtReferenceCode: [''],
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
      numAdvancePayment: [],
      // txtDoc: [],
      serviceInfoList: this.formBuilder.array([]),
      serviceInfoListFrontend: this.formBuilder.array([]),
      lstCustomerDocumentDto: this.formBuilder.array([]),
      numDiscount: [],
    });
    this.getBranchList();
    // this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getSubCategoryList();
    this.getProductList();
    this.getCategoryList();

    this.createConnectionForm.controls['branch'].valueChanges.subscribe(
      (element) => {
        this.billingService.getBranchIdForRoutes(element).subscribe((data) => {
          this.ucList = data;
          this.getBranchId = [];
          for (let getBranch of this.ucList) {
            this.getBranchId.push(getBranch);
          }
        });
        if (element == '14545446') {
          this.preFixNum =
            this.createConnectionForm.controls['txtCustomerCode'].patchValue(1);
        }
        if (element == '14545447') {
          this.preFixNum =
            this.createConnectionForm.controls['txtCustomerCode'].patchValue(2);
        }
        if (element == '14545448') {
          this.preFixNum =
            this.createConnectionForm.controls['txtCustomerCode'].patchValue(3);
        }
        if (element == '14545449') {
          this.preFixNum =
            this.createConnectionForm.controls['txtCustomerCode'].patchValue(4);
        }
        if (element == '14545445') {
          this.preFixNum =
            this.createConnectionForm.controls['txtCustomerCode'].patchValue(5);
        }
      }
    );
    this.createConnectionForm.controls['unionCouncil'].valueChanges.subscribe(
      (element) => {
        this.billingService
          .getNeighborhoodUnionCouncilForUnionCouncil(element)
          .subscribe((data) => {
            this.neighborhoodUcList = data;
            this.getLocationId = [];
            for (let getUClist of this.neighborhoodUcList) {
              this.getLocationId.push(getUClist);
            }
          });
      }
    );

    // this.createConnectionForm.controls['txtConnectionType'].valueChanges.subscribe(element => {
    //
    //   this.billingService.getBranchIdForRoutes(element).subscribe(data => {
    //     this.ucList = data;
    //     this.getBranchId = [];
    //     for (let getBranch of this.ucList) {
    //       this.getBranchId.push(getBranch);
    //     }
    //   })
    // })
  }
  // -------------------------------- ngOnInit() ENDS   ----------------------------------------------
  get serviceInfoListFrontend(): FormArray {
    return this.createConnectionForm.get(
      'serviceInfoListFrontend'
    ) as FormArray;
  }

  get serviceInfoList(): FormArray {
    return this.createConnectionForm.get('serviceInfoList') as FormArray;
  }

  get getCustomerDocument() {
    return this.createConnectionForm.get('lstCustomerDocumentDto') as FormArray;
  }
  onBlurEvent(event) {
    if (event.target.value != '') {
      this.billingService
        .checkCustomerByCodeService(event.target.value)
        .subscribe((response) => {
          if (response['data'] === 'isDuplicate') {
            alert('Customer already exist. Enter different code.');
            this.createConnectionForm.controls['txtCustomerCode'].setErrors({
              incorrect: true,
            });
          }
        });
    }
  }
  getBranchList() {
    this.billingService
      .getBranchService(this.user['serUserId'])
      .subscribe((response) => {
        this.branchList = response;
      });
  }

  getConnectionTypeList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        this.connectionTypeList = response['connectionTypeList'];
      });
  }
  getNeighborhoodUCList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        this.neighborhoodUCList = response['neighborhoodUnionConcilList'];
      });
  }

  getCategoryList() {
    this.billingService.getCategoryList().subscribe((response) => {
      response.data.forEach((element) => {
        this.categoryListTest.push(element);
      });
    });
  }

  getSubCategoryList() {
    this.billingService
      .getAllCustomerTemplateService()
      .subscribe((response) => {
        this.subCategoryList = response['subCategoryList'];
      });
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
        this.productList = response['data'];
        this.productSource = new MatTableDataSource(this.productList);
        this.productSource.sort = this.productSourceSort;
        this.productSource.paginator = this.productSourcePaginator;

        this.productList.forEach((element) => {
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
        });
      });
  }

  initDocument(singleDocument: any) {
    return this.formBuilder.group({
      txtDocumentReferenceNo: singleDocument.txtDocumentReferenceNo,
      documentSize: singleDocument.numDocumentSize,
      byteDocumentFile: singleDocument.byteDocumentFile.__zone_symbol__value,
      documentName: singleDocument.txtDocumentFileName,
      fileType: singleDocument.txtDocumentFileType,
    });
  }

  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.progressInfos[i] = {
        value: [i + 1],
        documentName: selectedFiles[i].name,
      };
      this.pppp.push(this.progressInfos[i]);
    }
  }

  onConnectionChange(event) {
    this.categoryList = [];
    let category = this.categoryListTest.filter(
      (x) => x['txtConnectionType'] === event.value
    );
    category.forEach((data) => {
      this.categoryList.push(data);
    });
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

    this.serviceInfoListFrontend.clear();
    newProductList.forEach((element) => {
      if (element.txtProductName.substring(0, 14) === 'New Connection') {
        this.serviceInfoListFrontend.push(
          this.formBuilder.group({
            checked: [true],
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

  clearStartDate() {
    this.createConnectionForm.controls.dteCreatedDate.reset('');
  }

  clearRequestDate() {
    this.createConnectionForm.controls.dteRequestDate.reset('');
  }

  addBillingDocument(row: any, i: number) {
    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      data: { row: row, documentTypeList: this.documentTypeList },
    });

    dialogRef.afterClosed().subscribe((document) => {
      if (document.numDocumentSize < 100000000) {
        this.getCustomerDocument.push(this.initDocument(document));
        this.fileListData = new MatTableDataSource(
          this.getCustomerDocument.value
        );
        this.showFile = true;
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
    });
  }

  selectedMutipleFiles: FileList;
  progressInfosMultiple = [];
  message = '';

  fileInfos: Observable<any>;

  selectMutipleFiles(event) {
    this.progressInfosMultiple = [];
    this.selectedMutipleFiles = event.target.files;

    for (var i = 0; i < this.selectedMutipleFiles.length; i++) {
      this.filelist.push({
        filePath: this.selectedMutipleFiles[i].name,
        byteDocumentFile: this.toBase64(this.selectedMutipleFiles[i]),
      });
    }
    this.fileListData = new MatTableDataSource(this.filelist);
    this.showFile = true;
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.slice(28));
      };
      reader.onerror = (error) => reject(error);
    });

  onSubmit() {
    if (this.createConnectionForm.invalid) {
      alert('Form is INVALID');
      return;
    } else {
      console.log(this.createConnectionForm.value);
      this.billingService
        .checkCustomerByCodeService(
          this.createConnectionForm.controls.txtCustomerCode.value
        )
        .subscribe((response) => {});
      this.serviceInfoListFrontend.controls.forEach((element) => {
        //
        if (element['controls'].checked.value == true) {
          this.serviceInfoList.push(element);
        }
      });
      let formValue = this.createConnectionForm.value;
      formValue.branch = {
        id: +this.createConnectionForm.controls.branch.value,
      };
      formValue.unionCouncil = {
        id: +this.createConnectionForm.controls.unionCouncil.value,
      };
      formValue.neighborhoodUnionCouncil = {
        id: +this.createConnectionForm.controls.neighborhoodUnionCouncil.value,
      };
      formValue.category = {
        id: +this.createConnectionForm.controls.category.value,
      };
      formValue.subCategory = {
        id: +this.createConnectionForm.controls.subCategory.value,
      };
      this.billingService
        .createNewConnectionServiceCus(this.createConnectionForm.value)
        .subscribe((response) => {
          alert('Record added successfully');
          this.router.navigate(['billing/connectionList']);
        });
      // this.router.navigate(['billing/connectionList']);
    }
  }

  openSubmitDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Submit ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      // this.onSubmit();
      if (confirmed) {
        this.router.navigate(['billing/newConnection']);
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.productSource.data.forEach((row) => {
          this.selection.select(row);
        });
  }

  checkboxLabel(row, event) {}

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedMutipleFiles.length; i++) {
      this.uploadMutiple(i, this.selectedMutipleFiles[i]);
    }
  }

  uploadMutiple(idx, file) {
    this.progressInfosMultiple[idx] = { value: 0, documentName: file.name };

    this.billingService.uploadMultiple(file).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfosMultiple[idx].value = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this.billingService.getFiles();
          alert('File Successfully Uploaded');
        }
      },
      (err) => {
        this.progressInfosMultiple[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      }
    );
  }
}

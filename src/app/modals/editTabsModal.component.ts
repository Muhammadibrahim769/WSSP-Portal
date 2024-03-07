
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { RejectModalComponent } from './rejectModal.component';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-editModal',
  templateUrl: './editTabsModal.component.html'
})
export class EditTabsModalComponent implements OnInit {
  operationBasicInfoForm: FormGroup;
  step = 0;
  test = "";
  getItems: any[] = [];
  editData: any;
  dataSource = null;
  isLoading = false;
  
  pageSizeOptions: number[] = [10, 20, 50];
  showDC = false;
  operationBasicInfoColumns: string[] = ['txtItemNo', 'txtItemName','dtePurchaseDate', 'dteWarrantyExpiryDate','Actions'];
  operationBasicInfo = new MatTableDataSource();
  @ViewChild("operationBasicInfoSort", { static: true }) operationBasicInfoSort: MatSort;
  @ViewChild("operationBasicInfoPaginator", { static: true }) operationBasicInfoPaginator: MatPaginator;
  getwarItemList: any [] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    private billingService: BillingService,
    public dialogRef: MatDialogRef<EditTabsModalComponent>, private dateFormat: DateFormatPipe
  ) { }
  Id: any;
  formValidationMessages = {
    numOfConnections: [{
      type: "required",
      message: "This field is required"
    }],
    txtMeterType: [{
      type: "required",
      message: "This field is required"
    }],
    numAvgDischargeVolume: [{
      type: "required",
      message: "This field is required"
    }],
  }
  ngOnInit(): void {
    this.onGet();
    this.test = this.data;
    console.log(this.test);
    this.operationBasicInfoForm = this.formBuilder.group({
      serTWBasicInfoId: [],
      serProductId: [],
      txtProductCode: [],
      txtProductName: [''],
      numOfConnections: ['', Validators.required],
      txtStatus: [''],
      blnIsFunctional: [''],
      blnIsMetered: [''],
      blnChamberAvailable:[''],
      dteWarrenty: [],
      dteInstallationDate:[],
      numAvgDischargeVolume: ['', Validators.required],
      blnMrpTwo: [''],
      blnIsActive: [''],
      txtRemarks: [''],
      blnSampleAvailable: [''],
      txtMeterNo: [''],
      blnStatus: [''],
      serBranchId: [],
      serLocationId: [],
      txtItemType: [''],
      numAvgDischargeunit: [],
      txtMeterType: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtTubewellRefNo: [''],
      txtPumpingMachineryType:[''],
      numPumpingDepth:[''],
      numTransformerCapacity:[''],
      lattitude:[''],
      longitude:[''],
      numPumpingPower:[''],
      txtItemNo:[''],
      txtItemName:[''],
      dtePurchaseDate:[''],
      dteWarrantyExpiryDate:[''],
      
      warrantyItemsList: [],
    })
    this.getOperationBasicInfo();
  }
  tableColumn: string[] = [
    "sr",
    "txtItemNo",
    "txtItemName",
    "dtePurchaseDate",
    "dteWarrantyExpiryDate",
  ];
  selection = new FormControl([
    "sr",
    "txtItemNo",
    "txtItemName",
    "dtePurchaseDate",
    "dteWarrantyExpiryDate",
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
  getOperationBasicInfo() {
    

    this.billingService.getOperationBasicInfoByID(this.test).subscribe(response => {
      debugger;
      console.log("Reponse data by id");
      console.log(response);
      this.editData = response;
      console.log(this.editData);
      this.operationBasicInfoForm.controls['numPumpingDepth'].patchValue(this.editData.numPumpingDepth);
      this.operationBasicInfoForm.controls['numTransformerCapacity'].patchValue(this.editData.numTransformerCapacity);
      this.operationBasicInfoForm.controls['lattitude'].patchValue(this.editData.lattitude);
      this.operationBasicInfoForm.controls['longitude'].patchValue(this.editData.longitude);
      this.operationBasicInfoForm.controls['numPumpingPower'].patchValue(this.editData.numPumpingPower);
      this.operationBasicInfoForm.controls['txtPumpingMachineryType'].patchValue(this.editData.txtPumpingMachineryType);
      this.operationBasicInfoForm.controls['txtTubewellRefNo'].patchValue(this.editData.txtTubewellRefNo);
      this.operationBasicInfoForm.controls['txtProductCode'].patchValue(this.editData.txtProductCode);
      this.operationBasicInfoForm.controls['txtProductName'].patchValue(this.editData.txtProductName);
      this.operationBasicInfoForm.controls['numOfConnections'].patchValue(this.editData.numOfConnections);
      this.operationBasicInfoForm.controls['numAvgDischargeVolume'].patchValue(this.editData.numAvgDischargeVolume);
      this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue(this.editData.blnIsFunctional);
      this.operationBasicInfoForm.controls['blnChamberAvailable'].patchValue(this.editData.blnChamberAvailable);
      this.operationBasicInfoForm.controls['blnIsMetered'].patchValue(this.editData.blnIsMetered);
      this.operationBasicInfoForm.controls['txtItemType'].patchValue(this.editData.txtItemType);
      this.operationBasicInfoForm.controls['txtBranchName'].patchValue(this.editData.txtBranchName);
      this.operationBasicInfoForm.controls['txtLocationName'].patchValue(this.editData.txtLocationName);
      this.operationBasicInfoForm.controls['serBranchId'].patchValue(this.editData.serBranchId);
      this.operationBasicInfoForm.controls['serLocationId'].patchValue(this.editData.serLocationId);
      this.operationBasicInfoForm.controls['txtMeterType'].patchValue(this.editData.txtMeterType);
      this.operationBasicInfoForm.controls.dteWarrenty.patchValue(this.editData.dteWarrenty);
      this.operationBasicInfoForm.controls.dteInstallationDate.patchValue(this.editData.dteInstallationDate);
      this.operationBasicInfoForm.controls.serProductId.patchValue(this.editData.serProductId);
      this.operationBasicInfoForm.controls.serTWBasicInfoId.patchValue(this.editData.serTWBasicInfoId);
    })
  }
  use(event) {
    
    console.log(event)
  }
  onUpdate() {

    delete this.operationBasicInfoForm.value.txtItemNo;
    delete this.operationBasicInfoForm.value.txtItemName;
    delete this.operationBasicInfoForm.value.dtePurchaseDate;
    delete this.operationBasicInfoForm.value.dteWarrantyExpiryDate;
    // if (this.operationBasicInfoForm.invalid) {
     
    //   return
    // }
    // let dteWarrenty = this.dateFormat.transformOperation(this.operationBasicInfoForm.controls.dtePurchaseDate.value)
    // this.operationBasicInfoForm.controls.dtePurchaseDate.patchValue(dteWarrenty)

    // let dteWarrentyExpiry = this.dateFormat.transformOperation(this.operationBasicInfoForm.controls.dteWarrantyExpiryDate.value)
    // this.operationBasicInfoForm.controls.dteWarrantyExpiryDate.patchValue(dteWarrentyExpiry)
    this.operationBasicInfoForm.controls.warrantyItemsList.patchValue(this.getwarItemList)
    if (this.editData.blnIsActive == null) {
      this.operationBasicInfoForm.controls['blnIsActive'].patchValue('false');
    }
    if (this.editData.blnIsFunctional == null) {
      this.operationBasicInfoForm.controls['blnIsFunctional'].patchValue('false');
    }
    if (this.editData.blnChamberAvailable == null) {
      this.operationBasicInfoForm.controls['blnChamberAvailable'].patchValue('false');
    }
    if (this.editData.blnIsMetered == null) {
      this.operationBasicInfoForm.controls['blnIsMetered'].patchValue('false');
    }
    if (this.editData.numOfConnections == null) {
      this.operationBasicInfoForm.controls['numOfConnections'].patchValue(0);
    }
    this.operationBasicInfoForm.controls['serTWBasicInfoId'].patchValue(this.test);
    console.log("updated form ");
    
    console.log(this.operationBasicInfoForm.value);
    console.log(this.test);
    this.billingService.updateBasicInfoServiceByID(this.operationBasicInfoForm.value).subscribe(response => {
      
      response["data"] = this.operationBasicInfoForm.value;
      this.dataSource = Response["data"];
      this.operationBasicInfo = new MatTableDataSource(Response["data"]);
      this.operationBasicInfo.sort = this.operationBasicInfoSort;
      this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
      console.log("response  of Update")
      console.log(response["data"])

    })
    this.dialogRef.close();
  }


 
  addItem() {
    debugger;
    this.getwarItemList.push({
      txtItemNo: this.operationBasicInfoForm.controls.txtItemNo.value,
      txtItemName:this.operationBasicInfoForm.controls.txtItemName.value,
      dtePurchaseDate: this.dateFormat.transformOperation(this.operationBasicInfoForm.controls.dtePurchaseDate.value),
      dteWarrantyExpiryDate:this.dateFormat.transformOperation(this.operationBasicInfoForm.controls.dteWarrantyExpiryDate.value)
    })
 
    this.dataSource = this.getwarItemList;
    this.operationBasicInfo = new MatTableDataSource(this.getwarItemList);
    this.operationBasicInfo.sort = this.operationBasicInfoSort;
    this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
  }


  public shown = false;
  setStep(index: number) {
    this.step = index;
  }

  getErrorMessage() {
    if (this.operationBasicInfoForm.controls.numOfConnections.hasError('required')) {
      return 'You must enter a value';
    }
    return this.operationBasicInfoForm.controls.numOfConnections.hasError('numOfConnections') ? 'Not a valid email' : '';
  }
  onDelete(index){
    debugger;
    this.operationBasicInfo.data.splice(index, 1);
    this.operationBasicInfo._updateChangeSubscription();
  }
  onGet() {
    debugger;
    this.billingService.getOperationBasicInfoService().subscribe(response => {
      console.log("operationBasicInfo")
      console.log(response.data);
      debugger;
      this.isLoading = false;
      for(let c of response.data){
        if(c['warrantyItemsList'].length != 0){
          this.dataSource = c['warrantyItemsList'];
          this.operationBasicInfo = new MatTableDataSource(c['warrantyItemsList']);
          this.operationBasicInfo.sort = this.operationBasicInfoSort;
          this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
        }
      }
    
      // this.isLoading = false;
      // response['data'].forEach((element) =>{
      // if(element['warrantyItemsList'] != undefined){
      //   this.getwarItemList.push(element['warrantyItemsList']);
      // }
      // })
      // this.dataSource = this.getwarItemList;
      // this.operationBasicInfo = new MatTableDataSource(this.getwarItemList);
      // this.operationBasicInfo.sort = this.operationBasicInfoSort;
      // this.operationBasicInfo.paginator = this.operationBasicInfoPaginator;
     
      // this.pdfImplementation();
      // this.changeDetectorRefs.detectChanges();
    })
  }

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AppLabelConstants } from '@app/appLabel';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';



export interface PeriodicElement {
  servicesType: string;
  servicesName:string;
  Rate: number;
  UOM: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Rate: 100, servicesName: 'Severage', UOM: 'Rs', servicesType: 'Water Supply/ Severage'},
  {Rate: 230, servicesName: 'No of Trips', UOM: 'Rs', servicesType: 'Solid Waste Management Services'},
  {Rate: 300, servicesName: 'Water Charges', UOM: 'Rs', servicesType: 'Ground Water Abstraction/Aquifer'}
  ]
@Component({
  selector: 'app-dashboard',
  templateUrl:'./update.component.html'
})
export class UpdateComponent implements OnInit {

  basicInfo:any;
  searchForm: FormGroup;
  updateForm: FormGroup;
  branchList: []=[];
  unionCouncilList: []=[];
  connectionTypeList: []=[];
  neighborhoodUCList: []=[];
  categoryList: []=[];
  subCategoryList: []=[];
  status: []=[];
  branchid ="";
  selected = 'A';
  // branch = 'A';
  unionCouncil = 'B';
  neighbourhoodUC = 'A';
  connectionType = 'Commercial';
  step = 0;
  show = false;
  progressInfos = [];
  updateConnection = [];
  basicInfoList = [];
  isFileShow = false;
  public appLabelConstants = AppLabelConstants;

  constructor(private dialog: MatDialog,private router: Router,private formbuilder: FormBuilder, private billingService: BillingService) { }
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
    txtConsumerName:[{
      type: "required",
      message: "This field is required"
    }]
  }
  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      txtCustomerCode : ['', Validators.required]
    })
    this.updateForm = this.formbuilder.group({
      id: [''],
      branch: [''],
      unionCouncil: [''],
      neighborhoodUnionCouncil: [''],
      txtConnectionType: [''],
      txtStatus: [''],
      txtCustomerCode: [''],
      dteCreatedDate: [''],
      txtMetered: [''],
      longitude: [''],
      latitude: [''],
      txtReferenceCode: [''],
      txtBusinessName: [''],
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
      txtDoc: []
    })
    this.getBranchList();
    this.getUnionCouncilList();
    this.getConnectionTypeList();
    this.getNeighborhoodUCList();
    this.getCategoryList();
    this.getSubCategoryList();
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

  onSearchSubmit(){
    debugger;
    let code = this.searchForm.controls.txtCustomerCode.value;
    this.billingService.getCustomerListServiceByCode(code).subscribe(response =>{
      debugger;
      console.log(response["data"]);
      this.basicInfoList = response["data"];
      this.basicInfoList.forEach(element => {
        debugger;
        this.basicInfo = element;
      });
      console.log(this.basicInfo)
      // this.updateForm.patchValue(this.basicInfo);
      this.updateForm.controls['id'].patchValue(this.basicInfo.id);
      this.updateForm.controls['txtCustomerCode'].patchValue(this.searchForm.controls.txtCustomerCode.value);
      this.updateForm.controls['branch'].patchValue(this.basicInfo.branch.id +"");
      this.updateForm.controls['unionCouncil'].patchValue(this.basicInfo.unionCouncil.id +"");
      this.updateForm.controls['txtConnectionType'].patchValue(this.basicInfo.txtConnectionType+"");
      this.updateForm.controls['txtMetered'].patchValue(this.basicInfo.txtMetered+"");
      this.updateForm.controls['txtReferenceCode'].patchValue(this.basicInfo.txtReferenceCode+"");
      this.updateForm.controls['txtBusinessName'].patchValue(this.basicInfo.txtBusinessName+"");
      this.updateForm.controls['txtShippingAddress'].patchValue(this.basicInfo.txtShippingAddress+"");
      this.updateForm.controls['txtMohallah'].patchValue(this.basicInfo.txtMohallah+"");
      this.updateForm.controls['txtHouseNo'].patchValue(this.basicInfo.txtHouseNo+"");
      this.updateForm.controls['txtStreetNo'].patchValue(this.basicInfo.txtStreetNo+"");
      this.show= true;
    })
  }

  onSubmit(){
    debugger;
    console.log("response");
    console.log(this.updateForm.value);
    let id = this.updateForm.value.id;
    console.log(id);
    let branchId = this.updateForm.controls.branch.value;
    let updateFormValue = this.updateForm.value;
    updateFormValue.branch = {"id": +branchId }
    updateFormValue.unionCouncil = { "id": +this.updateForm.controls.unionCouncil.value }
    updateFormValue.neighborhoodUnionCouncil = { "id": +this.updateForm.controls.neighborhoodUnionCouncil.value }
    updateFormValue.category = { "id": +this.updateForm.controls.category.value }
    updateFormValue.subCategory = { "id": +this.updateForm.controls.subCategory.value }
    updateFormValue.txtStatus = "UPDATED";

    this.billingService.updateCustomerListServiceByID(id, this.updateForm.value).subscribe( response => {
      debugger;
      response = this.updateForm.value;
      console.log(response)
    })
  }
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  clearStartDate(){
    this.updateForm.controls.txtStartDate.reset('');
  }

  clearConnectionDate(){
    this.date.reset('');
  }
 



  openUpdateDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Update ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log("Dialog is closed");
        this.router.navigate(['billing/updateConnection']);
      }
    });
  } 
  pppp = [];
  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;

    for (var i = 0; i < selectedFiles.length; i++) {
      
      this.progressInfos[i] = { value: [i+1], fileName: selectedFiles[i].name };
      this.pppp.push(this.progressInfos[i])
      // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
    }
    
  }
  displayedColumns: string[] = ['select', 'servicesType', 'UOM', 'servicesName','Rate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Rate + 1}`;
  }

}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MASK_FLAGS } from 'igniteui-angular/lib/directives/mask/mask-parsing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { format } from 'path';
import { DocumentDialogTestComponent } from '@app/modals/documentDialogTest.component.';
import { LongDateFormatKey } from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './newTest.component.html',
})
export class NewTestComponent implements OnInit {
  file: File = null;
  step = 0;
  ucList: any;
  toppingList: String[] = ['Chemical', 'Biological', 'Physical'];
  newTestForm: FormGroup;
  documentTypeList: any[] = [];
  showFile: boolean;
  selectedFiles: FileList;
  filelist: any[] = [];
  Long: any;
  
;

  constructor(private formBuilder:  FormBuilder, public dialog: MatDialog, private dateFormat: DateFormatPipe, private router: Router, private billingService: BillingService,) { }

  @ViewChild('attachments') attachment: any;
  fileColumns: string[] = ['txtDocumentFileName','Actions'];
  formValidationMessages = {
    txtSamplingDate: [{
      type: "required",
      message: "This field is required"
    }],
    txtResultSubmissionDate: [{
      type: "required",
      message: "This field is required"
    }],
    numWaterTestId: [{
      type: "required",
      message: "This field is required"
    }],
    numConsumerNo: [{
      type: "required",
      message: "This field is required"
    }],
    serBranchId: [{
      type: "required",
      message: "This field is required"
    }],
    serLocationId: [{
      type: "required",
      message: "This field is required"
    }],
    numLongitude: [{
      type: "required",
      message: "This field is required"
    }],
    numLatitude: [{
      type: "required",
      message: "This field is required"
    }],
    txtBranchName: [{
      type: "required",
      message: "This field is required"
    }],

    txtLocationName: [{
      type: "required",
      message: "This field is required"
    }],

    txtAddress: [{
      type: "required",
      message: "This field is required"
    }],

    txtConsumerType: [{
      type: "required",
      message: "This field is required"
    }],

    txtConsumerName: [{
      type: "required",
      message: "This field is required"
    }],

    txtStreetName: [{
      type: "required",
      message: "This field is required"
    }],

    txtSamplingPoint: [{
      type: "required",
      message: "This field is required"
    }],

    txtTestingAgency: [{
      type: "required",
      message: "This field is required"
    }],

    txtTestingType: [{
      type: "required",
      message: "This field is required"
    }],
    txtTestResult: [{
      type: "required",
      message: "This field is required"
    }],
    testingType: [{
      type: "required",
      message: "This field is required"
    }],


 
    
  }
  fileListData = new MatTableDataSource();
  
  user = "";
  progressInfos = [];
  pppp = [];
  getBranchId = [];
  getUClist = [];
  branchList: any;
  fileList: File[] = [];
  listOfFiles  = [];
  requestObj: any;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.newTestForm = this.formBuilder.group({
      numWaterTestId: [''],
      numConsumerNo: [''],
      serBranchId: ['',Validators.required],
      serLocationId: ['',Validators.required],
      numLongitude: [''],
      numLatitude: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtAddress: [''],
      txtAssetType: ['',Validators.required],
      txtComments: [''],
      txtConsumerType: ['',Validators.required],
      txtConsumerName: [''],
      txtResultSubmissionDate: ['',Validators.required],
      txtSamplingDate: ['',Validators.required],
      txtStreetName: ['',Validators.required],
      txtSamplingPoint: ['',Validators.required],
      txtTestingAgency: ['',Validators.required],
      txtTestingType: [''],
      testingType: ['',Validators.required],
      txtTestResult: ['',Validators.required],
      files: [],
      dteCreatedDate: [''],
      lstWaterTestingDocuments: this.formBuilder.array([]),
     
    })
    
    this.getBranchList();
    this.newTestForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
  // downloadFile() {
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', '_File_Saved_Path');
  //   link.setAttribute('download', 'file_name.pdf');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }

  get getCustomerDocument() {
    return this.newTestForm.get('lstWaterTestingDocuments') as FormArray;
  }
  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
      debugger;
    }
    const formdata: FormData = new FormData();
    formdata.append('files', JSON.stringify(this.fileList[0]));
    this.billingService.uploadFileNewConnectionService(formdata).subscribe();
    this.attachment.nativeElement.value = '';

  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }
  

  addBillingDocument(row: any, i: number) {
    const dialogRef = this.dialog.open(DocumentDialogTestComponent, {
      data: { row: row, documentTypeList: this.documentTypeList }
    });                  

    dialogRef.afterClosed().subscribe(document => {
      if (document.numDocumentSize < 100000000) {
        this.getCustomerDocument.push(this.initDocument(document));
        this.fileListData = new MatTableDataSource(this.getCustomerDocument.value);
        this.showFile = true;
      }
      else
        alert('File is too big.')
    })
  }
  
  initDocument(singleDocument: any) {
    return this.formBuilder.group({
      // txtDocumentReferenceNo: singleDocument.txtDocumentReferenceNo,
      // documentSize: singleDocument.numDocumentSize,
      numWaterTestId:[],
      serDocumentId:[],
      byteDocumentFile: singleDocument.byteDocumentFile.__zone_symbol__value,
      txtDocumentFileName: singleDocument.txtDocumentFileName,
      txtDocumentFileType: singleDocument.txtDocumentFileType,
    });
  }
  onChange(event) {
    this.isFileShow = true;
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.progressInfos[i] = { value: [i + 1], txtDocumentFileName: selectedFiles[i].name };
      this.pppp.push(this.progressInfos[i])
    }
  }
  clearSamplingDate() {
    this.newTestForm.controls.txtSamplingDate.reset('');
  }

  ResultSubmissionDate() {
    this.newTestForm.controls.txtResultSubmissionDate.reset('');
  }

 
  onDelete(txtDocumentFileName: string) {
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

      if (confirmed) {
        let index = this.getCustomerDocument.controls.findIndex(x => ((x.get("txtDocumentFileName").value === txtDocumentFileName)));

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
    })
  }

  onSubmit() {
    debugger;
    if (this.newTestForm.invalid) {
      alert('Form is INVALID');
      return;
    }
    else{
      console.log(this.newTestForm.value.txtTestingType);

      if(this.newTestForm.value.testingType != ""){
          
        this.newTestForm.value.testingType.forEach(element => {
          debugger;
          if (element == 'Physical')
            this.newTestForm.value.txtTestingType = this.newTestForm.value.txtTestingType + element;
          else
            this.newTestForm.value.txtTestingType = this.newTestForm.value.txtTestingType + element + ",";
        });
      }
      debugger
  let txtSamplingDate = this.dateFormat.transformtoStandard(this.newTestForm.controls.txtSamplingDate.value);
  this.newTestForm.controls.txtSamplingDate.patchValue(txtSamplingDate);
  let txtResultSubmissionDate =this.dateFormat.transformtoStandard(this.newTestForm.controls.txtResultSubmissionDate.value);
  this.newTestForm.controls.txtResultSubmissionDate.patchValue(txtResultSubmissionDate);
  
//  let numLatitude = this.Long.parseLong(this.newTestForm.controls.numLatitude.value);
// this.newTestForm.controls.numLatitude.patchValue(numLatitude);
// let numLongitude = this.Long.parseLong(this.newTestForm.controls.numLongitude.value);
// this.newTestForm.controls.numLongitude.patchValue(numLongitude);
      // this.newTestForm.value.txtTestingType = +this.newTestForm.value.txtTestingType;
      // let formValue = this.newTestForm.value;
      // console.log("formValue", formValue)
  
      // formValue.branch = { "id": +this.newTestForm.controls.branch.value }
      // formValue.unionCouncil = { "id": +this.newTestForm.controls.unionCouncil.value }
      // formValue.neighborhoodUnionCouncil = { "id": +this.newTestForm.controls.neighborhoodUnionCouncil.value }
      // formValue.category = { "id": +this.newTestForm.controls.category.value }
      // formValue.subCategory = { "id": +this.newTestForm.controls.subCategory.value }
  
  
  
      // const formdata: FormData = new FormData();
      // for(let i=0; i <=  this.selectedMutipleFiles.length; i++){
      //   formdata.append('files', this.selectedMutipleFiles[i]);
      // }
      
      // formdata.append('serBranchId', this.newTestForm.value.serBranchId)
      // formdata.append('txtBranchName', this.newTestForm.value.txtBranchName)
  
      // formdata.append('serLocationId', this.newTestForm.value.serLocationId)
      // formdata.append('txtLocationName', this.newTestForm.value.txtLocationName)
      
      // formdata.append('txtTestingAgency', this.newTestForm.value.txtTestingAgency)
      // formdata.append('txtTestingType', this.newTestForm.value.txtTestingType)
  
      // formdata.append('txtSamplingDate', this.newTestForm.controls.txtSamplingDate.value)
      // formdata.append('txtAssetType', this.newTestForm.value.txtAssetType)
      
      // formdata.append('txtSamplingPoint', this.newTestForm.value.txtSamplingPoint)
      // formdata.append('txtConsumerName', this.newTestForm.value.txtConsumerName)
      
      // formdata.append('txtAddress', this.newTestForm.value.txtAddress)
      // formdata.append('txtStreetName', this.newTestForm.value.txtStreetName)
  
      // formdata.append('txtConsumerType', this.newTestForm.value.txtConsumerType)
      // formdata.append('txtTestResult', this.newTestForm.value.txtTestResult)
  
      // formdata.append('txtResultSubmissionDate', this.newTestForm.controls.txtResultSubmissionDate.value)
      // formdata.append('txtComments', this.newTestForm.value.txtComments);
  
      this.billingService.createWaterTestService(this.newTestForm.value).subscribe(response => {
        debugger;
        console.log(response);
        alert("Record added successfully");
        this.router.navigate(['waterSupplyManagement/waterTesting']);
      })
    }
    
  }


  setStep(index: number) {
    this.step = index;
  }
  isFileShow = false;
  index: number;



  selectedMutipleFiles: FileList;
  progressInfosMultiple = [];
  message = '';

  fileInfos: Observable<any>;


  selectMutipleFiles(event) {
    debugger;
    this.progressInfosMultiple = [];
    this.selectedMutipleFiles = event.target.files;   
  }
  toBase64 = file => new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.slice(28));
    };
    reader.onerror = error => reject(error);
  });


  p:any [] = [];
  uploadFiles(id) {
    this.message = '';

    for (let i = 0; i < this.selectedMutipleFiles.length; i++) {
      this.uploadMutiple(i, this.selectedMutipleFiles[i],id);
    }
  }

  uploadMutiple(idx, file,id) {
    debugger;
    this.progressInfosMultiple[idx] = { value: 0, txtDocumentFileName: file.name };

    this.billingService.uploadWaterTestingDoc(file,id).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfosMultiple[idx].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        // this.fileInfos = this.billingService.getFiles();
        alert('File Successfully Uploaded');
      }
    },
      err => {
        this.progressInfosMultiple[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
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

      // this.onSubmit(); 
      if (confirmed) {
        this.router.navigate(['/waterSupplyManagement/waterTesting']);
        
      }
      
    });

  }
}



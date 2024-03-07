import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentDialogTestComponent } from '@app/modals/documentDialogTest.component.';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import { element } from 'protractor';

@Component({
  selector: "app-dashboard",
  templateUrl: './editWaterTesting.component.html'
})
export class EditWaterTestingComponent implements OnInit {

  Id: any = "";
  basicInfo: any;
  step = 0;
  arrayTestingType: string[];
  updateArrayTestingType: string[];
  toppingList: String[] = ['Chemical', 'Biological', 'Physical'];
  editForm: FormGroup;
  fileColumns: string[] = ['txtDocumentFileName','Actions'];
  // editWaterTestColumns: string[] = ['txtDocumentFileName', 'Actions'];
  editWaterTestListData = new MatTableDataSource();

  testingType = new FormControl;
  fakeTestingType: any;
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  myArray: any[] = [];
  filelist: any[] = [];
  documentTypeList: any;
  fileListData = new MatTableDataSource();
  showFile: boolean;

  constructor(private formbuilder: FormBuilder,private dateFormat: DateFormatPipe, 
    private billingService: BillingService, private route: ActivatedRoute, 
    private router: Router, private dialog: MatDialog) {

  }
  get getCustomerDocument() {
    return this.editForm.get('lstWaterTestingDocuments') as FormArray;
  }

  ngOnInit() {
    this.editForm = this.formbuilder.group({
      numWaterTestId: [''],
      numConsumerNo: [],
      // // numLongitude: [],
      // numLatitude: [],
      txtComments: [''],
      txtConsumerType: [''],
      txtAssetType: [''],
      txtTestingAgency: [''],
      txtTestingType: [''],
      txtSamplingDate: [],
      txtSamplingPoint: [''],
      txtConsumerName: [''],
      txtAddress: [''],
      txtStreetName: [''],
      txtTestResult: [''],
      serBranchId: [],
      serLocationId: [],
      numLongitude: [''],
      numLatitude: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtResultSubmissionDate: [],
      files: [],
      lstWaterTestingDocuments: this.formbuilder.array([]),

      // testingType: ['']
    })
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];

      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
    })
    this.route.paramMap.subscribe((params) => {
      this.Id = +params.get("id");
    });
    // this.billingService.updateWaterTestServiceById(this.Id , this.basicInfo ).subscribe( response => {
    //   console.log(response)
    // })
    this.billingService.getWaterTestServiceById(this.Id).subscribe(response => {
      debugger;
      console.log(response);
      this.basicInfo = response;
      /*---------------------open convert comma seperated string in to array -------------------*/
      /*---------------------close convert comma seperated string in to array -------------------*/
      this.editForm.controls.numWaterTestId.patchValue(this.basicInfo.numWaterTestId);
      this.editForm.controls.txtTestingAgency.patchValue(this.basicInfo.txtTestingAgency);
      this.editForm.controls.txtConsumerType.patchValue(this.basicInfo.txtConsumerType);
      this.editForm.controls.txtAssetType.patchValue(this.basicInfo.txtAssetType);
      this.editForm.controls.txtSamplingDate.patchValue(this.basicInfo.txtSamplingDate);
      this.editForm.controls.txtSamplingPoint.patchValue(this.basicInfo.txtSamplingPoint);
      this.editForm.controls.numConsumerNo.patchValue(this.basicInfo.numConsumerNo);
      this.editForm.controls.txtConsumerName.patchValue(this.basicInfo.txtConsumerName);
      this.editForm.controls.numLatitude.patchValue(this.basicInfo.numLatitude);
      this.editForm.controls.numLongitude.patchValue(this.basicInfo.numLongitude);
      this.editForm.controls.txtAddress.patchValue(this.basicInfo.txtAddress);
      this.editForm.controls.txtStreetName.patchValue(this.basicInfo.txtStreetName);
      this.editForm.controls.serBranchId.patchValue(this.basicInfo.serBranchId + '');
      this.editForm.controls.serLocationId.patchValue(this.basicInfo.serLocationId + '');
   
      this.editForm.controls['txtBranchName'].patchValue(this.basicInfo.txtBranchName);
      this.editForm.controls['txtLocationName'].patchValue(this.basicInfo.txtLocationName);
      this.editForm.controls['txtTestResult'].patchValue(this.basicInfo.txtTestResult);
      this.editForm.controls.txtResultSubmissionDate.patchValue(this.basicInfo.txtResultSubmissionDate);
      this.editForm.controls.txtComments.patchValue(this.basicInfo.txtComments);
      let stringTestingType = this.basicInfo.txtTestingType;
      this.arrayTestingType = stringTestingType.split(',');
      this.testingType.patchValue(this.arrayTestingType);
      console.log("doc");
      console.log(response["lstWaterTestingDocuments"]);
      this.filelist = response["lstWaterTestingDocuments"];
      this.fileListData = new MatTableDataSource(this.filelist);
    })
  }

  clearResultSubissionDate() {
    this.editForm.controls.txtResultSubmissionDate.reset('')
  }
  clearSamplingDate() {
    this.editForm.controls.txtSamplingDate.reset('')
  }

  name(name: any) {
    if(name != undefined){
      var n = name.lastIndexOf('/');
      var result = name.substring(n + 1);
      return result;
    }
    return null
  }
  addBillingDocument(row: any, i: number) {
    debugger
    const dialogRef = this.dialog.open(DocumentDialogTestComponent, {
      data: { row: row, documentTypeList: this.documentTypeList }
    
    });                  

    dialogRef.afterClosed().subscribe(document => {
      console.log("Document after close ",document)

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
    debugger
    return this.formbuilder.group({
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
  onUpdate() {
    debugger;
    if(this.testingType.value != null){
      this.myArray = this.testingType.value;
      this.fakeTestingType = this.myArray.toString();
      this.editForm.controls['txtTestingType'].patchValue(this.fakeTestingType);
    }
    debugger
    let txtSamplingDate = this.dateFormat.transformtoStandard(this.editForm.controls.txtSamplingDate.value);
    this.editForm.controls.txtSamplingDate.patchValue(txtSamplingDate);
    let txtResultSubmissionDate =this.dateFormat.transformtoStandard(this.editForm.controls.txtResultSubmissionDate.value);
    this.editForm.controls.txtResultSubmissionDate.patchValue(txtResultSubmissionDate);
    // const formdata: FormData = new FormData();
    // if(this.selectedMutipleFiles != undefined){
    //   for(let i=0; i < this.selectedMutipleFiles.length; i++){
    //     formdata.append('files', this.selectedMutipleFiles[i]);
    //   }
    // }
    // if(this.filelist.length != 0){
    //   for(let i=0; i < this.filelist.length; i++){
    //     debugger;
    //     formdata.append('files', this.createFile(this.filelist[i]));
    //   }
    // }
    
    // formdata.append('serBranchId', this.editForm.value.serBranchId)
    // formdata.append('txtBranchName', this.editForm.value.txtBranchName)

    // formdata.append('serLocationId', this.editForm.value.serLocationId)
    // formdata.append('txtLocationName', this.editForm.value.txtLocationName)
    
    // formdata.append('txtTestingAgency', this.editForm.value.txtTestingAgency)
    // formdata.append('txtTestingType', this.editForm.value.txtTestingType)

    // // let txtSamplingDate = this.dateFormat.transformToStandardDateTime(this.editForm.controls.txtSamplingDate.value);
    // formdata.append('txtSamplingDate', this.editForm.controls.txtSamplingDate.value)
    // formdata.append('txtAssetType', this.editForm.value.txtAssetType)
    
    // formdata.append('txtSamplingPoint', this.editForm.value.txtSamplingPoint)
    // formdata.append('txtConsumerName', this.editForm.value.txtConsumerName)
    
    // formdata.append('txtAddress', this.editForm.value.txtAddress)
    // formdata.append('txtStreetName', this.editForm.value.txtStreetName)

    // formdata.append('txtConsumerType', this.editForm.value.txtConsumerType)
    // formdata.append('txtTestResult', this.editForm.value.txtTestResult)

    // // let txtResultSubmissionDate = this.dateFormat.transformToStandardDateTime(this.editForm.controls.txtResultSubmissionDate.value);
    // formdata.append('txtResultSubmissionDate', this.editForm.controls.txtResultSubmissionDate.value)
    // formdata.append('txtComments', this.editForm.value.txtComments)

    this.billingService.updateWaterTestServiceById(this.Id ,this.editForm.value).subscribe(response => {
      // response["data"] = this.editForm.value;
      console.log("response");
      console.log(response);
      this.router.navigate(['waterSupplyManagement/waterTesting']);
    })
    
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



  setStep(index: number) {
    this.step = index;
  }
  progressInfos = [];
  pppp = [];
  isFileShow = false;

  selectedMutipleFiles: FileList;
  progressInfosMultiple = [];
  message = '';

  emptyList:any[] = [];
  // selectMutipleFiles(event) {
  //   debugger;
  //   console.log(this.filelist);
  //   this.progressInfosMultiple = [];
  //   this.selectedMutipleFiles = event.target.files;
  //   for (var i = 0; i < this.selectedMutipleFiles.length; i++) {
  //     var reader = new FileReader();
  //     reader.onload = (event) => {
  //         const byte = event.target.result;          
  //     };
  //     this.filelist.push({ txtDocumentFileName: this.selectedMutipleFiles[i].name, byteDocumentFile: reader.readAsBinaryString(this.selectedMutipleFiles[i])});
  //   }
    
  //   console.log(this.filelist);
  //   this.editWaterTestListData = new MatTableDataSource(this.filelist);

  // }

  // createFile(element){
  //   debugger;
  //   console.log(element);
  //   var n = element.txtDocumentFileName.lastIndexOf('/');
  //   var name = element.txtDocumentFileName.substring(n + 1);

  //   var m = element.txtDocumentFileName.lastIndexOf('.');
  //   var type = element.txtDocumentFileName.substring(m + 1);
  //   var output = atob(element.byteDocumentFile);
  //   var length = output.length;
  //   var arrayBuffer = new ArrayBuffer(length);
  //   var uintArray = new Uint8Array(arrayBuffer);
  //   for (var i = 0; i < length; i++) {
  //       uintArray[i] = output.charCodeAt(i);
  //   }
  //   debugger;
  //   var file = new File([uintArray], name, {type: type, lastModified: Date.now()});
  //   return file;

  //   // let  file:any;
  //   // file = new Blob([uintArray], { type: "application/"+resultType });
  //   // file.lastModifiedDate = new Date();
  //   // file.name = result;
  // }


  // onDownload(element){
  //   debugger;
  //   console.log(element);
  //   var n = element.txtDocumentFileName.lastIndexOf('/');
  //   var result = element.txtDocumentFileName.substring(n + 1);
  //   var output = atob(element.byteDocumentFile);
  //   var length = output.length;
  //   var arrayBuffer = new ArrayBuffer(length);
  //   var uintArray = new Uint8Array(arrayBuffer);
  //   for (var i = 0; i < length; i++) {
  //       uintArray[i] = output.charCodeAt(i);
  //   }
  //   let file = new Blob([uintArray], { type: "application/octet-stream" });
  //   const a = document.createElement('a');
  //   var fileURL = URL.createObjectURL(file);
  //   a.href = fileURL;
  //   a.download = result;
  //   a.click();
  //   window.URL.revokeObjectURL(fileURL);
  // }

  // onChange(event) {

  //   this.isFileShow = true;
  //   var selectedFiles = event.target.files;

  //   for (var i = 0; i < selectedFiles.length; i++) {

  //     this.progressInfos[i] = { value: [i + 1], fileName: selectedFiles[i].name };
  //     this.pppp.push(this.progressInfos[i])
  //     // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
  //   }

  // }


}
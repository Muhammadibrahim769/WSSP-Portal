import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './newTest.component.html',
})
export class NewTestComponent implements OnInit {
  file: File = null;
  step = 0;
  toppingList: String[] = ['Chemical', 'Biological', 'WR'];
  newTestForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private billingService: BillingService) { }

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  requestObj: any;

  branchList: any[] = [];
  unionCouncilList: any[] = [];
  ngOnInit(): void {
    this.newTestForm = this.formBuilder.group({
      numWaterTestId: [''],
      numConsumerNo: [''],
      serBranchId: [],
      serLocationId: [],
      // numLongitude: [''],
      // numLatitude: [''],
      txtBranchName: [''],
      txtLocationName: [''],
      txtAddress: [''],
      txtAssetType: [''],
      txtComments: [''],
      txtConsumerType: [''],
      txtConsumerName: [''],
      txtResultSubmissionDate: [''],
      txtSamplingDate: [''],
      txtStreetName: [''],
      txtSamplingPoint: [''],
      txtTestingAgency: [''],
      txtTestingType: [''],
      testingType: [''],
      txtTestResult: ['']
    })
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];

      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
    })
  }

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
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

  clearSamplingDate() {
    this.newTestForm.controls.txtSamplingDate.reset('');
  }

  ResultSubmissionDate() {
    this.newTestForm.controls.txtResultSubmissionDate.reset('');
  }

  onSubmit() {
    debugger;
    console.log(this.newTestForm.value.txtTestingType);
    this.newTestForm.value.testingType.forEach(element => {
      debugger;
      if (element == 'WR')
        this.newTestForm.value.txtTestingType = this.newTestForm.value.txtTestingType + element;
      else
        this.newTestForm.value.txtTestingType = this.newTestForm.value.txtTestingType + element + ",";
    });
    console.log(this.newTestForm.value.txtTestingType);
    console.log(this.newTestForm.value);
    this.billingService.createWaterTestService(this.newTestForm.value).subscribe(response => {
      debugger;
      console.log(response);
      alert("Record added successfully");
      this.uploadFiles();
      this.router.navigate(['waterSupplyManagement/waterTesting']);
    })
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
    this.progressInfosMultiple = [];
    this.selectedMutipleFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    debugger;
    for (let i = 0; i < this.selectedMutipleFiles.length; i++) {
      this.uploadMutiple(i, this.selectedMutipleFiles[i]);
    }
  }

  uploadMutiple(idx, file) {
    this.progressInfosMultiple[idx] = { value: 0, fileName: file.name };
  
    this.billingService.uploadWaterTestingDoc(file, 7).subscribe(event => {
      debugger;
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
}



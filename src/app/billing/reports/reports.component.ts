import { Component, OnInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector:'app-dashboard',
  templateUrl:'./reports.component.html'
})
export class ReportsComponent implements OnInit {

  constructor() { }
  // value = { "avgDischargeHr": 15, "child": 10, "numTotalRunningHours":0 , "childcount":0};
  // calculate() : any {
  //      return this.value.avgDischargeHr * this.value.numTotalRunningHours
  // }

  ngOnInit(): void {
  }
  // @ViewChild('attachments') attachment: any;

  // fileList: File[] = [];
  // listOfFiles: any[] = [];
  
  // onFileChanged(event: any) {
  //     for (var i = 0; i <= event.target.files.length - 1; i++) {
  //       var selectedFile = event.target.files[i];
  //       this.fileList.push(selectedFile);
  //       this.listOfFiles.push(selectedFile.name)
  //   }
  
  //   this.attachment.nativeElement.value = '';
  // }
  
  
  
  // removeSelectedFile(index) {
  //  // Delete the item from fileNames list
  //  this.listOfFiles.splice(index, 1);
  //  // delete file from FileList
  //  this.fileList.splice(index, 1);
  // }
}

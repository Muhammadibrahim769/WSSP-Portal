import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BillingService } from '@app/services/billing.service';
import { UtilsFunctions } from '@app/utils/utilsFunctions';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.less'],
})
export class UploadCsvComponent implements OnInit {
  lines = []; //for headings
  linesR = []; // for rows
  postDataDB = [];

  isLoadingErrorScroll: boolean;
  isLoadingPdfFiles: boolean;
  isLoadingDistributorFiles: boolean;

  documentColumnBill: string[] = [
    'fileName',
    'fileType',
    'byteDocumentFile',
  ];
  documentDatasourceBill = new MatTableDataSource();

  documentColumn: string[] = [
    'fileName',
    'fileType',
    'byteDocumentFile',
  ];
  documentDatasource = new MatTableDataSource();

  errorDocumentColumn: string[] = [
    'fileName',
    'fileType',
    'byteDocumentFile',
  ];
  errorDocumentDatasource = new MatTableDataSource();
  // ---------------------------------------------------------------- Pagination
  p = 1;
  count = 20;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private billingService: BillingService,
    private utilsFunctions: UtilsFunctions
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      serDocumentId: [null],
      byteDocumentFile: ['', Validators.required],
      txtDocumentFileName: ['', [Validators.maxLength(100)]],
      txtDocumentFileType: [''],
    });
  }

   //File upload function
   changeListener(files: FileList){
     debugger;
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          let collection = [];
          allTextLines = csv.split(/\r|\n|\r/);
         //Table Headings
          let headers = allTextLines[0].split(',');
          let data = headers;
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          //Pusd headinf to array variable
          this.lines.push(tarr);
          // Table Rows
          let tarrR = [];
          //Create formdata object
          var myFormData = new FormData();
          let arrl = allTextLines.length;
          let rows = [];
          
          for(let i = 1; i < arrl; i++){
          rows.push(allTextLines[i].split(','));
          if(allTextLines[i]!=""){
          // Save file data into formdata varibale  
          myFormData.append("data"+i, allTextLines[i]);
   
        }
       
          }

     
          for (let j = 0; j < arrl; j++) {
              tarrR.push(rows[j]);
              tarrR = tarrR.filter(function(i){ return i != ""; });
              // Begin assigning parameters
          }
 
         //Push rows to array variable
         
          this.linesR.push(tarrR);
          debugger;
          for(let c of this.linesR[0]){
            if(c === undefined){
              
            }
     else { 
      this.postDataDB.push({
        txtCustomerCode:c[1],
        txtDistrubutorCode:c[2],
        txtDueDate:c[3]
  })
     }
          }
            
      }
    }
  }

  submitData(){
    debugger;
    if(this.postDataDB.length === 0){
      alert('Choose File To Upload');
    }
    else {
      this.billingService.uploadCSVRecordService(this.postDataDB).subscribe((data) => {               
        console.log(data);
        alert('Record Added Successfully');
      });
    }

  }

  
  onErrorScrollDownloadClick(){
    this.isLoadingErrorScroll = true;
    this.billingService.getFilesUPdloadDownload().subscribe(response=>{
      console.log(response);
      this.isLoadingErrorScroll = false;
      if(response.length === 0){
        this.documentDatasourceBill = new MatTableDataSource([])
        alert('No record Found')
        return
      }else {
        let errorScroll: any[]= [];
        response.forEach(x=>{
          if(x["fileType"] === 'Errorrs in Scrolls'){
            errorScroll.push(x)
          }
        })
        this.documentDatasourceBill = new MatTableDataSource(errorScroll)
      }
     
    }, error=>{
      alert('Error');
      this.isLoadingErrorScroll = false;
    })
  }
  
  onDownloadClick(){
    this.isLoadingPdfFiles = true;
    this.billingService.getFilesUPdloadDownload().subscribe(response=>{
      console.log(response);
      this.isLoadingPdfFiles = false;
      if(response.length === 0){
        this.documentDatasource = new MatTableDataSource([])
        alert('No record Found');
        return;
      }else {
        let pdfBill: any[]= [];
        response.forEach(x=>{
          if(x["fileType"] === 'PDF Files for Bills'){
            pdfBill.push(x)
          }
        })
        this.documentDatasource = new MatTableDataSource(response)
      }
   
    }, error=>{
      alert('Error');
      this.isLoadingPdfFiles = false;
    })
  }


  onErrorDistributorDownloadClick(){
    this.isLoadingDistributorFiles = true;
    this.billingService.getFilesUPdloadDownload().subscribe(response=>{
      console.log(response);
      this.isLoadingDistributorFiles = false;
      if(response.length === 0){
        this.errorDocumentDatasource = new MatTableDataSource([])
        alert('No record Found')
        return
      }else{
        let errorDistributorBill: any[]= [];
        response.forEach(x=>{
          if(x["fileType"] === 'Distrubutor Code Error Files'){
            errorDistributorBill.push(x)
          }
        })
        this.errorDocumentDatasource = new MatTableDataSource(errorDistributorBill)
      }
     
    }, error=>{
      alert('Error');
      this.isLoadingDistributorFiles = false;
    })
  }
  downloadFile(fileData: any, filetype: string) {
    debugger;
    console.log(fileData);
    console.log(filetype);
    this.utilsFunctions.downloadFile(fileData, filetype);
  }

  onSubmit() {
    let value = this.form.controls.byteDocumentFile.value;
    this.form.controls.byteDocumentFile.patchValue(value.__zone_symbol__value);
    this.billingService
      .uploadBankScrollFile(this.form.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  onUpload(event: any) {
    console.log(event);
    let fileToUpload: File = null;
    fileToUpload = event.target.files.item(0);
    if (fileToUpload !== null) {
      if (fileToUpload.size < 100000000) {
        var name = fileToUpload.name.slice(
          0,
          fileToUpload.name.lastIndexOf('.')
        );
        this.form.controls.txtDocumentFileName.patchValue(name);
        this.form.controls.txtDocumentFileType.patchValue(fileToUpload.type);
        this.form.controls.byteDocumentFile.patchValue(
          this.toBase64(fileToUpload)
        );
      } else {
        alert('File size is big');
        return;
      }
    } else {
      alert('Please select file.');
      return;
    }
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(
          (<string>reader.result).substring(
            (<string>reader.result).indexOf(',') + 1
          )
        );
      };
      reader.onerror = (error) => reject(error);
    });
}

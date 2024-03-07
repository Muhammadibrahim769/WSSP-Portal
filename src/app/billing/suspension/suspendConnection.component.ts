import { Component, OnInit } from '@angular/core';
// import { AppLabelConstants } from '..//..//../appLabel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { SuspendModalComponent } from '@app/modals/suspendModal.component';
import { BillingService } from '@app/services/billing.service';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./suspendConnection.component.html'
})
export class SuspendConnectionComponent implements OnInit {
  step = 0;
  show = false;
  searchForm: FormGroup;
  suspendInfo: any;

  suspendInfoList = [];
  fileColumns: string[] = ['documentName', 'txtDocumentReferenceNo', 'Actions'];
  fileListData = new MatTableDataSource();
  filelist: any[] = [];
  documentTypeList: any[] = [];
  docList = [];

  // public appLabelConstants = AppLabelConstants;


  constructor(private formbuilder: FormBuilder, private router: Router, private dialog: MatDialog, private billingService: BillingService) { }

  ngOnInit(): void {  
    this.searchForm = this.formbuilder.group({
      txtCustomerCode : ['', Validators.required]
    })
  }

  onSearch(){
    this.show= true;
  }
  onSearchSubmit(){
    debugger;
    let code = this.searchForm.controls.txtCustomerCode.value;
    this.billingService.getCustomerListServiceByCode(code).subscribe(response =>{
      debugger;
      console.log("getCustomerListServiceByID")
      console.log(response);
      this.suspendInfo = response;
      this.fileListData = new MatTableDataSource(response["lstCustomerDocumentDto"]);
      this.docList = response["lstCustomerDocumentDto"];
      this.show= true;
    },
    (error)=>{
      debugger;
      error = 'Record Not found';
      alert(error);
    })
  }

  openSuspendDialog() {
    // this.dialog.open(SuspendModalComponent)
    debugger;
    let id = this.suspendInfo.txtCustomerCode;
    this.suspendInfo.lstCustomerDocumentDto = this.docList;
    console.log(this.suspendInfo)
    this.billingService.suspendConnectionService(id, this.suspendInfo).subscribe( response => {
      debugger;
      console.log("response");
      console.log(response);
      this.router.navigate(['billing/suspendedList']);
    })
  }


  initDocument(singleDocument: any) {
    return {
      txtDocumentReferenceNo: singleDocument.txtDocumentReferenceNo,
      documentSize: singleDocument.numDocumentSize,
      byteDocumentFile: singleDocument.byteDocumentFile.__zone_symbol__value,
      documentName: singleDocument.txtDocumentFileName,
      fileType: singleDocument.txtDocumentFileType,
    };
  }

  addBillingDocument(row: any, i: number) {
    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      data: { row: row, documentTypeList: this.documentTypeList }
    });

    dialogRef.afterClosed().subscribe(document => {
      debugger;
      console.log(document)
      if (document.numDocumentSize < 100000000) {
        this.docList.push(this.initDocument(document));
        this.fileListData = new MatTableDataSource(this.docList);
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
      debugger
      if (confirmed) {
        let index = this.docList.findIndex(x => (x["documentName"] === documentName));

        if (index >= 0) {
          this.docList.splice(index, 1)
        }
        this.fileListData = new MatTableDataSource(this.docList);
      }
    })
  }

}

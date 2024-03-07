import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { SubmitModalComponent } from '@app/modals/submitModal.component';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-closeConnection',
  templateUrl: './closeConnection.component.html'
})
export class CloseConnectionComponent implements OnInit {

  step = 0;
  show = false;
  searchForm: FormGroup;
  closureInfo: any;
  fileColumns: string[] = ['documentName', 'txtDocumentReferenceNo', 'Actions'];
  fileListData = new MatTableDataSource();
  filelist: any[] = [];
  documentTypeList: any[] = [];
  docList = [];

  closureInfoList = [];
  
  constructor(private formbuilder: FormBuilder, private router: Router, private dialog: MatDialog, private billingService: BillingService) { }

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      txtCustomerCode : ['', Validators.required]
    })
  }

  onSearchSubmit(){
    debugger;
    let code = this.searchForm.controls.txtCustomerCode.value;
    this.billingService.getCustomerListServiceByCode(code).subscribe(response =>{
      debugger;
      console.log("getCustomerListServiceByID")
      console.log(response);
      this.closureInfo = response;
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

  openClosureDialog() {    
    debugger;
    let id = this.closureInfo.txtCustomerCode;
    this.closureInfo.lstCustomerDocumentDto = this.docList;
    this.billingService.closeConnectionByCodeService(id,this.closureInfo).subscribe( response => {
      debugger;
      console.log("response");
      console.log(response);
      this.router.navigate(['billing/closedConnectionList']);
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

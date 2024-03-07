import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BillingService } from "@app/services/billing.service";
import { UtilsFunctions } from "@app/utils/utilsFunctions";
import { CrudService } from "@app/_services/crud.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-viewCloseInfo',
    templateUrl:'./viewCloseConnection.component.html'
  })
  export class ViewCloseComponent implements OnInit {

    Id: any = "";
    basicInfo: any;
    basicInfoDump: any;
    doccolumn: string[] = [ 'sr', 'documentName', 'txtDocumentReferenceNo', 'download'];
    documentDatasource = new MatTableDataSource();

    constructor(private route: ActivatedRoute, private billingService: BillingService,
      private shared:CrudService,private utilsFunctions: UtilsFunctions) {}
    
    ngOnInit() {
      debugger;
      this.route.paramMap.subscribe((params) => {
        this.Id = +params.get("id");
      });

      this.shared.currentMessage.subscribe(response => {
        debugger;
        this.billingService.getClosedCustomerByCode(response["txtCustomerCode"]).subscribe(data=>{
          this.basicInfo= data;
          this.documentDatasource = new MatTableDataSource(data["lstCustomerDocumentDto"])
          console.log(data);
        })

      })

    }

    downloadFile(fileData: any, filetype: string) {
      debugger;
      console.log(fileData);
      console.log(filetype);
      this.utilsFunctions.downloadFile(fileData, filetype);
    }

    downloadPDF(){}
  }
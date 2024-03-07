import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';
import { RejectModalComponent } from './rejectModal.component';


@Component({
  selector: 'app-dashboard',
    templateUrl: './connectionRejected.component.html'
  })
  export class ConnectionRejectedComponent implements OnInit {
    Id: any = "";
    consumerCode:any
      message = "Are you sure?"
      confirmButtonText = "Yes"
      cancelButtonText = "Cancel"
      // @output data = []
      constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<ConnectionRejectedComponent>,private billingService:BillingService) {
          if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
              this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
              this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
          }
        }
      ngOnInit() {
        debugger;
        console.log("test")
        console.log(this.data.element)
        console.log("test id") 
        console.log(this.data.element.txtCustomerCode)
        console.log(this.data.element.txtStatus)
        this.data.element.txtStatus='REJECTED'
        console.log(this.data.element.txtStatus)
        // console.log(this.data.element.txtCustomerCode)  
      }
      onConfirmClick(): void {
        this.dialogRef.close(true);
        console.log("Hy this is Ejaz ");
        debugger
        // if(this.data.element.id > 1000){
        //   debugger;
        //   this.billingService.getCustomerRejectListServiceByID(this.data.element.id).subscribe( response => {
        //     console.log(response)
        //     this.dialogRef.close();
        // })
        // }
        // else{
          debugger;
          this.billingService.connectionRejectedService(this.data.element.txtCustomerCode).subscribe( response => {
            console.log(response)
            this.dialogRef.close();
        })
        
        // this.billingService.getCustomerRejectListServiceByID(this).subscribe(response => {
        //   debugger;
        //   console.log(response)
        //   this.dialogRef.close();
        // })
        // service call krni haa agr data ahie response mi aus data ko 
      }
    
  }
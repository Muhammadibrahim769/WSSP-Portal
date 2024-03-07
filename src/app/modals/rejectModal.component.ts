import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './rejectModal.component.html'
})
export class RejectModalComponent implements OnInit {
  Id: any = "";
consumerCode:any
  message = "Are you sure  ?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  // @output data = []
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private router: Router,private dialogRef: MatDialogRef<RejectModalComponent>,private billingService:BillingService) {
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
    console.log(this.data.element.id)
    console.log(this.data.element.txtStatus)
    this.data.element.txtStatus='REJECTED'
    console.log(this.data.element.txtStatus)
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Hy this is Ejaz ");
    debugger
      debugger;
      this.billingService.getCustomerRejectListServiceByCustomerCode(this.data.element.txtCustomerCode).subscribe( response => {
        console.log(response)
        this.dialogRef.close();
    })
  }
}
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-suspendRejectModal',
    templateUrl:'./suspendRejectModal.component.html'
  })
  export class SuspendRejectModalComponent implements OnInit {
    form: FormGroup;
    message='Are you Sure To Reject Suspend?'
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<SuspendRejectModalComponent>,private formBuilder: FormBuilder,private billingService:BillingService) { 
  }
  ngOnInit(): void {
    debugger;
    console.log("test")
    console.log(this.data)
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Suspend Reject Modal");

    this.billingService.rejectSuspendConnectionService(this.data.element.txtCustomerCode).subscribe(response=>{
        console.log(response);
        this.dialogRef.close();
    })
  }
  }
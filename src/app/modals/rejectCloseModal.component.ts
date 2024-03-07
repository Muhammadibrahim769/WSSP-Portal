import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-RejectCloseModal',
    templateUrl:'./rejectCloseModal.component.html'
  })
  export class RejectCloseModalComponent implements OnInit {
    form: FormGroup;
    message='Are you Sure To Reject Close?'
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<RejectCloseModalComponent>,private formBuilder: FormBuilder,private billingService:BillingService) { 
  }
  ngOnInit(): void {
    debugger;
    console.log("test")
    console.log(this.data)
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Close Reject Modal");

    this.billingService.rejectCloseConnectionService(this.data.element.txtCustomerCode).subscribe(response=>{
        console.log(response);
        this.dialogRef.close();
    })
  }
  }
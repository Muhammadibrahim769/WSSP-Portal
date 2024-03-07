import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-suspendApproveModal',
    templateUrl:'./suspendApproveModal.component.html'
  })
  export class SuspendApprovedModalComponent implements OnInit {
    form: FormGroup;
    message='Are you Sure To Suspend?'
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<SuspendApprovedModalComponent>,private formBuilder: FormBuilder,private billingService:BillingService) { 
  }
  ngOnInit(): void {
    debugger;
    console.log("suspendApproveModal")
    console.log(this.data)
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Suspend Approve Modal");
    this.billingService.approveSuspendConnectionService(this.data.element.txtCustomerCode).subscribe(response =>{
      console.log(response)
      this.dialogRef.close();
    })
  }
  }
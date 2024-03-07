import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-connectionApproved',
    templateUrl:'./connectionApproved.component.html'
  })
  export class ConnectionApprovedComponent implements OnInit {
    form: FormGroup;
    message='Are you Sure To Approve ?'
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<ConnectionApprovedComponent>,private formBuilder: FormBuilder,private billingService:BillingService) { 
  }
  ngOnInit(): void {
    debugger;
    console.log("test")
    console.log(this.data.element)
    console.log("test customer code") 
    console.log(this.data.element.txtCustomerCode)
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Hy this is Ejaz ");
      debugger;
      this.billingService.connectionApprovedListService(this.data.element.txtCustomerCode).subscribe( response => {
        console.log(response)
        this.dialogRef.close();
    })
    
  }
  }
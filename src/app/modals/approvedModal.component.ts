import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './approvedModal.component.html'
})
export class ApprovedModalComponent implements OnInit {
  message = "Are you sure you want to Approve?"
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private router: Router,private dialogRef: MatDialogRef<ApprovedModalComponent>,private formBuilder: FormBuilder,private billingService:BillingService) { 
  }
  ngOnInit(): void {
    debugger;
    console.log("test")
    console.log(this.data.element)
    console.log("test id") 
    console.log(this.data.element.id)
    this.form = this.formBuilder.group({
      txtConnectionProvider: ['']
    })
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Hy this is Ejaz ");
      debugger;
      this.billingService.getCustomerApproveListServiceByCustomerCode(this.data.element.txtCustomerCode).subscribe( response => {
        console.log(response);
        this.dialogRef.close();
       // this.router.navigate(['billing/connectionList']);
    })
    
  }
}

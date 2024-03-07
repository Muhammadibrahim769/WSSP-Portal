import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from '@app/services/billing.service';


@Component({
  selector: 'app-dashboard',
    templateUrl: './performanceAreaModal.component.html'
  })
  export class PerformanceAreaModalComponent implements OnInit {
    performanceAreaForm:FormGroup
    constructor( private formBuilder: FormBuilder,private router: Router, public dialogRef: MatDialogRef<PerformanceAreaModalComponent>, public dialog: MatDialog,private performanceArea:BillingService) { }
    
    ngOnInit(){
      this.performanceAreaForm = this.formBuilder.group({
        txtAreaCode: [],
        txtAreaName: [],
        txtDescription: [],
      })
    }
    onSubmit(){
      console.log(this.performanceAreaForm.value);
      this.performanceArea.savePerformanceArea(this.performanceAreaForm.value).subscribe(response => {
        debugger; 
        console.log(response)
  })
  this.dialogRef.close();

    
}
  }
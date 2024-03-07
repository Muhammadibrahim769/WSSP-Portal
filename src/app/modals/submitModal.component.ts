import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
    templateUrl: './submitModal.component.html'
  })
  export class SubmitModalComponent implements OnInit {
    message: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<SubmitModalComponent>) { 
      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
    }
    
    ngOnInit(){
    }

    onConfirmClick(): void {
      this.dialogRef.close(true);
    }
    
  }
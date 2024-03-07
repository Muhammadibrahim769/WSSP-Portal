// documentDialogTest.component.html
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessageConstants } from '@app/_constants/ErrorMessgeConstants';
import { DefaultLists } from '@app/_helpers/ApplicationHelperDTO';


@Component({
  selector: 'app-dashboard',
    templateUrl: './documentDialogTest.component.html'
  })
  export class DocumentDialogTestComponent implements OnInit {


    public defaultList = new DefaultLists();
    public errorMessage = ErrorMessageConstants;
    form: FormGroup;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DocumentDialogTestComponent>, private formBuilder: FormBuilder) { }
    ngOnInit() {
      this.form = this.formBuilder.group({
        serDocumentId: [null],
        // txtDocumentReferenceNo: ['', [Validators.required, Validators.maxLength(20)]],
        byteDocumentFile: ['', Validators.required],
        txtDocumentFileName: ['', [Validators.required, Validators.maxLength(100)]],
        txtDocumentFileType: [''],
        numDocumentSize: [0]
      });
      if (this.data.row !== null)
        this.form.patchValue(this.data.row);
    }
    /* -----------------------------------------------------------------------------------------------------------------
                                           UPLOAD FILE DOCUMENT
  --------------------------------------------------------------------------------------------------------------------*/
    onSelectFile(event) {
      debugger
  
      let fileToUpload: File = null;
      fileToUpload = event.target.files.item(0);
      if (fileToUpload !== null) {
        if (fileToUpload.size < 100000000) {
          var name = fileToUpload.name.slice(0, fileToUpload.name.lastIndexOf('.'));
          this.form.controls.txtDocumentFileName.patchValue(name);
          this.form.controls.txtDocumentFileType.patchValue(fileToUpload.type);
          this.form.controls.numDocumentSize.patchValue(fileToUpload.size);
          this.form.controls.byteDocumentFile.patchValue(this.toBase64(fileToUpload));
        }
      } else {
        this.form.controls.txtDocumentFileName.patchValue('');
        this.form.controls.txtDocumentFileType.patchValue('');
        this.form.controls.numDocumentSize.patchValue(0);
        this.form.controls.byteDocumentFile.patchValue('');
  
      }
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    toBase64 = file => new Promise((resolve, reject) => {
      debugger;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{ 
        resolve(reader.result.slice(28));
      };
      reader.onerror = error => reject(error);
    });
  }
  
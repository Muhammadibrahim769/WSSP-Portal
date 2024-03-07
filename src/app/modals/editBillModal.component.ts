import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";

@Component({
    selector: 'app-editBillModal',
      templateUrl: './editBillModal.component.html'
    })
    export class EditBillModalComponent implements OnInit {

    updateForm: FormGroup;
    info: any;

    constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data, 
    private billingService: BillingService, private dateFormat: DateFormatPipe,private dialogRef: MatDialogRef<EditBillModalComponent>) {
        this.dialogRef.disableClose = true;
        this.info = data;
    }

    ngOnInit(): void {
        console.log("EditBillModalComponent.data");
        console.log(this.data);
        let difference = this.data.numPayableWithinDueDate - this.data.numDiscount;
        difference = difference || 0;
        this.updateForm = this.formBuilder.group({
            txtCustomerCode: [this.data.txtCustomerCode],
            numDiscount: [this.data.numDiscount],
            numPayableWithinDueDate: [this.data.numPayableWithinDueDate],
            numLatePaymentSurcharge: [this.data.numLatePaymentSurcharge],
            numPayableAfterDueDate: [this.data.numPayableAfterDueDate],
            dteBillDueDate: [this.dateFormat.transformToStandardDateTime(this.data.dteBillDueDate)],
            numDifference: [difference],
            txtSelectValue: ['']
        })

        this.updateForm.controls.numDiscount.valueChanges.subscribe(value=>{
            debugger;
            let difference = this.data.numPayableWithinDueDate - value;
            this.updateForm.controls.numDifference.patchValue(difference);
            this.updateForm.controls.numPayableAfterDueDate.patchValue(this.data.numLatePaymentSurcharge+difference)
        })

        this.updateForm.controls.txtSelectValue.valueChanges.subscribe(value=>{
            debugger
            if(value === 'false'){
                this.data.numDiscount = this.data.numDiscount || 0;
                this.updateForm.controls.numDiscount.patchValue(this.data.numDiscount);
                this.updateForm.controls.numDifference.patchValue(this.data.numPayableWithinDueDate - this.data.numDiscount);
                this.updateForm.controls.numPayableAfterDueDate.patchValue(this.data.numPayableAfterDueDate);    
            }
            if(value === 'true'){
                this.updateForm.controls.dteBillDueDate.patchValue(this.data.dteBillDueDate);
                // : [this.dateFormat.transformToStandardDateTime(this.data.dteBillDueDate)],
            }
        })

        this.updateForm.controls.dteBillDueDate.valueChanges.subscribe(value=>{
            debugger;
            let dateChanged = this.dateFormat.transformToStandardDateTime(value);
            let dateBefore = this.dateFormat.transformToStandardDateTime(this.data.dteBillDueDate);
            if(dateChanged < dateBefore){
                alert('Please select date correctly')
                this.updateForm.controls.dteBillDueDate.setErrors({'incorrect': true});
            }else
            if(dateChanged > dateBefore){
                this.updateForm.controls.numPayableAfterDueDate.patchValue(this.data.numPayableWithinDueDate);
            }

        })
    }

    onSubmit(){
        debugger;
        if(this.updateForm.status === 'INVALID'){
            alert('Please Recheck your data');
            return;
        }
        let dateBefore = this.dateFormat.transformToStandardDateTime(this.data.dteBillDueDate);
        let dteBillDueDate = this.dateFormat.transformToStandardDateTime(this.updateForm.controls.dteBillDueDate.value);
        if((dateBefore != dteBillDueDate) && (this.data.numDiscount != this.updateForm.controls.numDiscount.value)){
            alert('Either give Discount OR Extend Due Date');
            return;
        }
        let discount = this.updateForm.controls.numDiscount.value;
        let billFrom = this.data.dteBillFrom;
        let billTo = this.data.dteBillTo;
        let txtCustomerCode = this.data.txtCustomerCode;
        let payableWithinDueDate = this.updateForm.controls.numDifference.value;
        let payableAfterDueDate = this.updateForm.controls.numPayableAfterDueDate.value
        console.log(this.updateForm.value)
        this.billingService.updateBillDiscount(txtCustomerCode, discount, dteBillDueDate, billFrom, billTo, payableWithinDueDate, payableAfterDueDate).subscribe(response=>{
            debugger;
            this.dialogRef.close();
            console.log(response);
        })
    }

    clearDueDate() {
        this.updateForm.controls.dteBillDueDate.reset('');
    }

    onBlurEvent(event) {
        if(event.target.value > this.updateForm.controls.numPayableWithinDueDate.value){
            this.updateForm.controls['numDiscount'].setErrors({'incorrect': true});
            alert('Discount must be less than Payable Amount');
        }
    }
}
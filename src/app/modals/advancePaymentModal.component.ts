import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BillingService } from "@app/services/billing.service";

@Component({
    selector: 'app-advancePaymentModal',
    templateUrl:'./advancePaymentModal.component.html'
})
export class AdvancePaymentModalComponent implements OnInit {
    
    advancePaymentForm: FormGroup;
    info: any;
    currentBillDto :any = {};

    constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data,
    private billingService: BillingService, public dialogRef: MatDialogRef<AdvancePaymentModalComponent>) {
        this.info = data;
    }

    ngOnInit() {
        this.advancePaymentForm = this.formBuilder.group({
            numAdvancePayment: [],
            numDiscount: []
        })
    }

    onSubmit(){
        this.currentBillDto.txtZone = this.info.branch.name;
        this.currentBillDto.serBranchId = this.info.branch.id;

        this.currentBillDto.serLocationId = this.info.unionCouncil.id;
        this.currentBillDto.txtUnionCouncil = this.info.unionCouncil.name;

        this.currentBillDto.txtCustomerCategory = this.info.category.name;
        this.currentBillDto.numAdvancePayment = this.info.numAdvancePayment;

        this.currentBillDto.txtBusinessName = this.info.txtBusinessName;
        this.currentBillDto.txtConnectionType = this.info.txtConnectionType;
        this.currentBillDto.txtCustomerCode = this.info.txtCustomerCode;

        this.currentBillDto.txtSectorMohallah = this.info.txtMohallah;
        this.currentBillDto.txtArea = this.info.txtShippingAddress;
        this.currentBillDto.txtStatus = this.info.txtStatus;
        this.currentBillDto.numAdvancePayment = this.advancePaymentForm.controls.numAdvancePayment.value;
        this.currentBillDto.numDiscount = this.advancePaymentForm.controls.numDiscount.value;

        this.currentBillDto.txtReferenceCode = this.info.txtReferenceCode;

        this.currentBillDto.txtMobileNo = this.info.txtMobileNo;
        this.currentBillDto.txtHouseNo = this.info.txtHouseNo;
        this.currentBillDto.txtCnicNo = this.info.txtCnicNo;
        this.currentBillDto.txtSubCategory = this.info.subCategory.name;
        this.currentBillDto.txtStreetNo = this.info.txtStreetNo;
        this.currentBillDto.serCustomerId = this.info.id;
        this.billingService.advancePaymentService(this.currentBillDto).subscribe(response=>{
           this.dialogRef.close(); 
        });
    }

}
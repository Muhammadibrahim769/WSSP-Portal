import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";
import * as moment from "moment";
import { Moment } from 'moment';

@Component({
    selector: 'app-fundsTransfer',
    templateUrl: './fundsTransfer.component.html'
})
export class FundsTransferComponent implements OnInit {
    searchForm: FormGroup;
    searchFormA: FormGroup;
    searchFormB: FormGroup;
    currentBillData: any;
    historyBillData: any;
    showCurrent = false;
    showHistory = false;
    formValidationMessages = {
        txtCustomerCodeA: [{
          type: "required",
          message: "This field is required"
        }],
        txtCustomerCodeB: [{
            type: "required",
            message: "This field is required"
        }],
      }

    constructor(private formbuilder: FormBuilder, private dateFormat: DateFormatPipe, private billingService: BillingService) {}

    ngOnInit() {
        this.searchForm = this.formbuilder.group({
            dteBillFrom: [''],
            dteBillTo: [''],
        })
        this.searchFormA = this.formbuilder.group({
            dteBillFrom: [''],
            dteBillTo: [''],
            txtCustomerCodeA: ['', [Validators.required, Validators.minLength(11)]],
            txtCustomerCode: ['']
        })
        this.searchFormB = this.formbuilder.group({
            dteBillFrom: [''],
            dteBillTo: [''],
            txtCustomerCodeB: ['', [Validators.required, Validators.minLength(11)]],
            txtCustomerCode: ['']
        })
    }

    onSearch() {
        console.log(this.searchForm.value);
    }
    onSearchA() {
        debugger;
        let txtCustomerCode =  this.searchFormA.controls.txtCustomerCodeA.value;
        let dteBillFrom =  this.dateFormat.transform(this.searchForm.controls.dteBillFrom.value);
        let dteBillTo =  this.dateFormat.transform(this.searchForm.controls.dteBillTo.value);
        console.log(this.searchFormA.value);
        if(dteBillFrom === null || dteBillTo === null){
            alert('Select month period.')
            this.currentBillData = "";
            this.showCurrent = false;
            return
        }else{
            this.billingService.getCurrentBillByParams(dteBillFrom, dteBillTo, txtCustomerCode).subscribe(response=>{
                debugger;
                console.log("getCurrentBillByParams");
                console.log(response);
                if(response[0]){
                    this.currentBillData = response[0];
                    this.showCurrent = true;
                }else{
                    alert('No Record Found');
                    this.showCurrent = false;
                }
            })
        }
    }
    onSearchB() {
        debugger;
        let txtCustomerCode = this.searchFormB.controls.txtCustomerCodeB.value;
        let dteBillFrom = this.dateFormat.transform(this.searchForm.controls.dteBillFrom.value);
        let dteBillTo = this.dateFormat.transform(this.searchForm.controls.dteBillTo.value);
        if(dteBillFrom === null || dteBillTo === null){
            alert('Select month period.')
            this.historyBillData = "";
            this.showHistory = false;
            return
        }else{
            this.billingService.getHistoryBillByParams(dteBillFrom, dteBillTo, txtCustomerCode).subscribe(response=>{
                console.log("getHistoryBillByParams");
                console.log(response);
                if(response[0]){
                    this.historyBillData = response[0];
                    this.showHistory = true;
                }else{
                    this.showHistory = false;
                    alert('No Record Found');
                }
            })
        }
    }
    onTransfer(){
        debugger;
        let tranferDto:any ={};
        let dteBillFrom = this.dateFormat.transform(this.searchForm.controls.dteBillFrom.value);
        let dteBillTo = this.dateFormat.transform(this.searchForm.controls.dteBillTo.value);
        let txtCustomerCodeFrom = this.searchFormA.controls.txtCustomerCodeA.value;
        let txtCustomerCodeTo = this.searchFormB.controls.txtCustomerCodeB.value;
        if(dteBillFrom === null || dteBillTo === null || txtCustomerCodeFrom === "" || txtCustomerCodeTo === ""){
            alert('Form is INVALID');
            return;
        }else{
            tranferDto.dteBillFrom = dteBillFrom;
            tranferDto.dteBillTo = dteBillTo;
            tranferDto.txtCustomerCodeFrom = txtCustomerCodeFrom;
            tranferDto.txtCustomerCodeTo = txtCustomerCodeTo;
            this.billingService.fundsTransferService(tranferDto).subscribe(response=>{
                console.log(response);
            });
        }
    }
    chosenYearHandler(normalizedYear: Moment) {
        debugger;
        const ctrlValue = this.searchForm.controls.dteBillFrom.value;
        ctrlValue.year(normalizedYear.year());
        this.searchForm.controls.dteBillFrom.setValue(ctrlValue);
    }
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        debugger;
        const ctrlValue = this.searchForm.controls.dteBillFrom.value;
        ctrlValue.month(normalizedMonth.month());
        this.searchForm.controls.dteBillFrom.setValue(ctrlValue);
        console.log("ghjsdkasd");
        console.log(this.searchForm.controls.dteBillFrom);
        datepicker.close();
    }
    chosenYearHandlerBillTo(normalizedYear: Moment) {
        debugger;
        const ctrlValue = this.searchForm.controls.dteBillTo.value;
        ctrlValue.year(normalizedYear.year());
        this.searchForm.controls.dteBillTo.setValue(ctrlValue);
    }
    chosenMonthHandlerBillTo(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        debugger;
        const ctrlValue = this.searchForm.controls.dteBillTo.value;
        ctrlValue.month(normalizedMonth.month());
        this.searchForm.controls.dteBillTo.setValue(ctrlValue);
        console.log(this.searchForm.controls.dteBillTo);
        datepicker.close();
    }
    clearBillToDate() {
        this.searchForm.controls.dteBillTo.reset('');
    }
    clearBillFromDate(){
        this.searchForm.controls.dteBillFrom.reset('');
    }
}

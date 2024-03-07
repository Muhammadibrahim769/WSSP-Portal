import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
    selector: 'app-dashboard',
    templateUrl: './editSaleItem.component.html'
})
export class EditSaleItemComponent implements OnInit {
    step = 0;
    user = ""
    Id: any = "";
    viewRecoveredItem: any;
    setStep(index: number) {
        this.step = index;
    }
    addItemSoldForm: FormGroup
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, private dateFormat: DateFormatPipe, private router: Router, private billingService: BillingService) { }
    clearTxtDate() {
        this.addItemSoldForm.controls.txtRecoveredDate.reset('');
    }
    isEditable: boolean = false;
    ucList: any;
    getBranchId = [];
    getUClist = [];
    branchList: any;
    unionCouncilList: any[] = [];
    subCategoryList: any[] = [];
    serviceInfoList: any[] = [];
    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.route.paramMap.subscribe((params) => {
            this.Id = +params.get("id");
        });
        this.addItemSoldForm = this.formBuilder.group({
            serBranchId: [''],
            serLocationId: [''],
            txtSoldDate: [''],
            numRate: [],
            numAmount: [],
            txtSaleItem: [''],
            txtVendor: ['']
        })
        this.getSaleItemItemByID();
        this.getBranchList();
        this.addItemSoldForm.controls['serBranchId'].valueChanges.subscribe(element => {
            debugger;
            this.billingService.getBranchIdForRoutes(element).subscribe(data => {
                this.ucList = data;
                this.getBranchId = [];
                for (let getBranch of this.ucList) {
                    this.getBranchId.push(getBranch);
                }
                console.log("this.getBranchId");
                console.log(this.getBranchId);
            })
        })
    }
    getSaleItemItemByID() {
        debugger;
        this.billingService.getSaleItemItemByID(this.Id).subscribe(response => {
            debugger;
            this.viewRecoveredItem = response[0];
            console.log(this.viewRecoveredItem)
            this.addItemSoldForm.controls['serBranchId'].patchValue(this.viewRecoveredItem.serBranchId+'')
            this.addItemSoldForm.controls['serLocationId'].patchValue(this.viewRecoveredItem.serLocationId+'')
            this.addItemSoldForm.controls['txtSoldDate'].patchValue(this.viewRecoveredItem.txtSoldDate)
            this.addItemSoldForm.controls['numRate'].patchValue(this.viewRecoveredItem.numRate)
            this.addItemSoldForm.controls['numAmount'].patchValue(this.viewRecoveredItem.numAmount)
            this.addItemSoldForm.controls['txtSaleItem'].patchValue(this.viewRecoveredItem.txtSaleItem)
            this.addItemSoldForm.controls['txtVendor'].patchValue(this.viewRecoveredItem.txtVendor)
        })
    }
    getBranchList() {
        console.log(this.user);
        console.log("user id " + this.user["serUserId"]);
        debugger;
        this.billingService.getBranchService(this.user["serUserId"]).subscribe(response => {
            debugger;
            console.log("getBranchService");
            console.log(response);
            this.branchList = response
        })
    }
    onSubmit() {
        debugger;
        let txtSoldDate = this.dateFormat.transformOperation(this.addItemSoldForm.controls.txtSoldDate.value);
        this.addItemSoldForm.controls.txtSoldDate.patchValue(txtSoldDate);
        // let wasteDTO = this.addItemSoldForm.value;
        this.billingService.saveSaleItemRecovered(this.addItemSoldForm.value).subscribe(response => {
            debugger;
            console.log(response)
            this.router.navigate(['wasteManagement/saleRecoveredItemList']);
        })
    }

}
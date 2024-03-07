import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';

@Component({
    selector: 'app-dashboard',
    templateUrl: './editRecoveredItem.component.html'
})
export class EditRecoveredItemComponent implements OnInit {
    step = 0;
    user = ""
    Id: any = "";
    viewRecoveredItem: any;
    setStep(index: number) {
        this.step = index;
    }
    addItemRecoveredForm: FormGroup
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, private dateFormat: DateFormatPipe, private router: Router, private billingService: BillingService) { }
    clearTxtDate() {
        this.addItemRecoveredForm.controls.txtRecoveredDate.reset('');
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
        this.addItemRecoveredForm = this.formBuilder.group({
            serBranchId: [''],
            serLocationId: [''],
            txtRecoveredDate: [''],
            txtItemRecovered: [''],      
            numTotalWasteRecieved: [],
            numTotalRecovered:[]   ,
            serRecoveredItemId:[] 
        })
        this.getQuantityRecoveredItemByID();
        this.getBranchList();
        this.addItemRecoveredForm.controls['serBranchId'].valueChanges.subscribe(element => {
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
    getQuantityRecoveredItemByID() {
        debugger;
        this.billingService.getQuantityRecoveredItemByID(this.Id).subscribe(response => {
            debugger;
            this.viewRecoveredItem = response[0];
            console.log(this.viewRecoveredItem)
            this.addItemRecoveredForm.controls['serBranchId'].patchValue(this.viewRecoveredItem.serBranchId+'')
            this.addItemRecoveredForm.controls['serLocationId'].patchValue(this.viewRecoveredItem.serLocationId+'')
           
            this.addItemRecoveredForm.controls['txtItemRecovered'].patchValue(this.viewRecoveredItem.txtItemRecovered)
            this.addItemRecoveredForm.controls['numTotalWasteRecieved'].patchValue(this.viewRecoveredItem.numTotalWasteRecieved)
            this.addItemRecoveredForm.controls['numTotalRecovered'].patchValue(this.viewRecoveredItem.numTotalRecovered)
            this.addItemRecoveredForm.controls.serRecoveredItemId.patchValue(this.viewRecoveredItem.serRecoveredItemId)
            let currentDate = new Date(this.viewRecoveredItem.txtRecoveredDate);
            console.log("currentDate");
            console.log(currentDate);
            this.addItemRecoveredForm.controls['txtRecoveredDate'].patchValue(currentDate)
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
        let txtRecoveredDate = this.dateFormat.transformOperation(this.addItemRecoveredForm.controls.txtRecoveredDate.value);
        this.addItemRecoveredForm.controls.txtRecoveredDate.patchValue(txtRecoveredDate);
        this.billingService.updateItemRecovered(this.addItemRecoveredForm.controls.serRecoveredItemId,this.addItemRecoveredForm.value).subscribe(response => {
            debugger;
            console.log(response)
            this.router.navigate(['wasteManagement/quantityRecoveredItem']);
        })
    }

}
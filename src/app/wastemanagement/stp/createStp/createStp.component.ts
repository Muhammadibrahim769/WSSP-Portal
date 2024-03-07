import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";

@Component({
    selector: 'app-stp',
    templateUrl: './createStp.component.html'
})

export class CreateStpComponent implements OnInit {

    createStpForm: FormGroup;
    branchList: any;
    unionCouncilList: any;
    ucList: any;
    getUC = [];
    waterQualityList = ['BoD', 'CoD', 'Phosphorous', 'Nitrogen', 'TDS', 'Ammonia', 'Coliform', 'E-Coli', 'F-Coli']

    constructor(private formBuilder: FormBuilder, private billingService: BillingService, 
        private router: Router, private dateFormat: DateFormatPipe) { }

    ngOnInit() {
        this.createStpForm = this.formBuilder.group({
            branch: [''],
            unionCouncil: [''],
            txtWaterQuality: [''],
            txtInflowQuantity: [''],
            txtOutflowQuantity: [''],
            txtSlitRemoved: [''],
            dteStp: []
        })
        this.billingService.getAllCustomerTemplateService().subscribe(response => {
            debugger;
            this.branchList = response["branchList"];
            this.unionCouncilList = response["unionConcilList"];
        })

        this.createStpForm.controls['branch'].valueChanges.subscribe(element => {
            debugger;
            this.billingService.getBranchIdForRoutes(element).subscribe(data => {
              this.ucList = data;
              this.getUC = [];
              for (let getBranch of this.ucList) {
                this.getUC.push(getBranch);
              }
            })
        })
    }

    clearTo() {
        this.createStpForm.controls.dteStp.reset('');
    }
    onSumbit() {
        debugger;
        let dteStp = this.dateFormat.transformOperation(this.createStpForm.controls.dteStp.value);
        this.createStpForm.controls.dteStp.patchValue(dteStp);
        this.createStpForm.value.branch = { "id": +this.createStpForm.controls.branch.value }
        this.createStpForm.value.unionCouncil = { "id": +this.createStpForm.controls.unionCouncil.value }
        console.log(this.createStpForm.value);

        this.billingService.createStpService(this.createStpForm.value).subscribe(data=>{
            console.log(data);
            alert('Record Added Successfully');
            this.router.navigate(['wasteManagement/stp']);
        })
    }
}
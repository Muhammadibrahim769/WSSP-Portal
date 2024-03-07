import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BillingService } from "@app/services/billing.service";
import { DateFormatPipe } from "@app/_helpers/date-format.pipe";

@Component({
    selector: 'app-createRdf',
    templateUrl: './createrdf.component.html'
})

export class CreateRdfComponent implements OnInit {

    createform: FormGroup;
    branchList: any;
    unionCouncilList: any;
    ucList: any;
    getUC = [];

    constructor(private formBuilder: FormBuilder, private billingService: BillingService,
        private router: Router, private dateFormat: DateFormatPipe){}

    ngOnInit(){
        this.createform = this.formBuilder.group({
            branch: [''],
            unionCouncil: [''],
            dteRdf: [''],
            txtSegregatedRecieved: [''],
            txtPalletProduced: [''],
            txtRdfSold: [''],
            txtRate: [''],
            txtVendor: [''],
            numAmount: [''],
            numRdfBalance: ['']
          })

          this.billingService.getAllCustomerTemplateService().subscribe( response=>{
            debugger;
            console.log(response)
            console.log(response["branchList"]);
            this.branchList = response["branchList"];
      
            console.log(response["unionConcilList"]);
            this.unionCouncilList = response["unionConcilList"];
          })
          this.createform.controls['branch'].valueChanges.subscribe(element => {
            debugger;
            this.billingService.getBranchIdForRoutes(element).subscribe(data => {
              this.ucList = data;
              this.getUC = [];
              for (let getBranch of this.ucList) {
                this.getUC.push(getBranch);
              }
              console.log("this.getUC");
              console.log(this.getUC);
            })
        })

        this.createform.controls['txtPalletProduced'].valueChanges.subscribe((value) => {
          debugger;
          if (value <= 0) {
            alert('Enter Value greater than 0')
          }
          else {
            let amount = value - this.createform.controls.txtRdfSold.value
            this.createform.patchValue({
              numRdfBalance: amount
            });
          }
        })
        this.createform.controls['txtRdfSold'].valueChanges.subscribe((value) => {
          debugger;
          if (value <= 0) {
            alert('Enter Value greater than 0')
          }
          else {
            let amount =this.createform.controls.txtPalletProduced.value- value 
            this.createform.patchValue({
              numRdfBalance: amount
            });
          }
        })
    }

    clearTo() {
        this.createform.controls.dteRdf.reset('');
      }

    onSumbit(){
        let dteRdf = '';
        if(this.createform.controls.dteRdf.value != ""){
            dteRdf = this.dateFormat.transformOperation(this.createform.controls.dteRdf.value);
            this.createform.controls.dteRdf.patchValue(dteRdf);
        }
        this.createform.value.branch = { "id": +this.createform.controls.branch.value }
        this.createform.value.unionCouncil = { "id": +this.createform.controls.unionCouncil.value }
        console.log(this.createform.value);

        this.billingService.createRdfService(this.createform.value).subscribe(response=>{
            console.log(response);
            alert('Record Added Successfully');
            this.router.navigate(['wasteManagement/rdf']);
        })
    }
    numAvailableQuantity:any;
    onBlurEvent(event) {

      if (event.target.value > this.createform.controls.txtPalletProduced.value) {
            alert('Sale Amount Must Less from Produced.');
            this.createform.controls['txtRdfSold'].setErrors({'incorrect': true});
            console.log(this.createform.controls['txtRdfSold'].status);
            this.createform.invalid
          }   
      }
}
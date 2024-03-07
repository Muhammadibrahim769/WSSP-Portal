import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './editHHAndPopulationRecord.component.html'
})
export class EditHHAndPopulationRecordComponent implements OnInit {
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  step = 0;
  testAmount: number;
  householdDetails: any;
  Id: any = "";
  test = "";
  editHHAndPopulationForm: FormGroup
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private billingService: BillingService) { }
  clearDate() {
    this.editHHAndPopulationForm.controls.txtDate.reset('');
  }

  openUpdateDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Update ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log("Dialog is closed");
        this.router.navigate(['operationManagement/householdAndPopulationRecord']);
      }
    });
  }
  formValidationMessages = {
    numTotalMainholes: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalSewerageLines: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalPopulation: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalHouseHold: [{
      type: "required",
      message: "This field is required"
    }],
    numTotalSecondarySewerageLines: [{
      type: "required",
      message: "This field is required"
    }],
  }
  ngOnInit(): void {
    this.editHHAndPopulationForm = this.formBuilder.group({
      blnIsActive: [true],
      dteCreateddate: [''],
      txtStatus: [true],
      serPopulationId: [],
      numTotalSewerageLines: [, Validators.required],
      numTotalHouseHold: [, Validators.required],
      numTotalPopulation: [, Validators.required],
      txtRemarks: [],
      numTotalMainholes: [, Validators.required],
      numTotalSecMainholes: [],
      numTotalTerMainholes: [],
      txtBranchName: [''],
      txtLocationName: [''],
      serLocationId: [],
      serBranchId: [],
      avgMemberPerHouse: [],
      numTotalSecondarySewerageLines: [''],
      numPriDistributedNetworkLines: [],
      numSecDistributedNetworkLines: [],
      numPriDrainageLines: [],
      numSecDrainageLines: []
    })
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];
      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
      console.log(response["subCategoryList"]);
    })
    this.route.paramMap.subscribe((params) => {
      this.Id = +params.get("id");
    });
    // this.billingService.updateWaterTestServiceById(this.Id , this.basicInfo ).subscribe( response => {
    //   console.log(response)
    // })

    this.billingService.getHouseHoldServiceById(this.Id).subscribe(response => {
      debugger;
      console.log(response);
      this.householdDetails = response;
      this.editHHAndPopulationForm.controls.serPopulationId.patchValue(this.householdDetails.serPopulationId);
      this.editHHAndPopulationForm.controls.txtBranchName.patchValue(this.householdDetails.txtBranchName);
      this.editHHAndPopulationForm.controls.txtLocationName.patchValue(this.householdDetails.txtLocationName);
      this.editHHAndPopulationForm.controls.serBranchId.patchValue(this.householdDetails.serBranchId);
      this.editHHAndPopulationForm.controls.serLocationId.patchValue(this.householdDetails.serLocationId);
      this.editHHAndPopulationForm.controls.numTotalSewerageLines.patchValue(this.householdDetails.numTotalSewerageLines);
      this.editHHAndPopulationForm.controls.numTotalHouseHold.patchValue(this.householdDetails.numTotalHouseHold);
      this.editHHAndPopulationForm.controls.avgMemberPerHouse.patchValue(this.householdDetails.avgMemberPerHouse);
      this.editHHAndPopulationForm.controls.avgMemberPerHouse.patchValue(this.householdDetails.avgMemberPerHouse);
      this.editHHAndPopulationForm.controls.numTotalMainholes.patchValue(this.householdDetails.numTotalMainholes);
      this.editHHAndPopulationForm.controls.numTotalSecMainholes.patchValue(this.householdDetails.numTotalSecMainholes);
      this.editHHAndPopulationForm.controls.numTotalTerMainholes.patchValue(this.householdDetails.numTotalTerMainholes);
      this.editHHAndPopulationForm.controls.numTotalSecondarySewerageLines.patchValue(this.householdDetails.numTotalSecondarySewerageLines);
      this.editHHAndPopulationForm.controls.txtRemarks.patchValue(this.householdDetails.txtRemarks);
      this.editHHAndPopulationForm.controls.numTotalPopulation.patchValue(this.householdDetails.numTotalPopulation);
      this.editHHAndPopulationForm.controls.numPriDistributedNetworkLines.patchValue(this.householdDetails.numPriDistributedNetworkLines);
      this.editHHAndPopulationForm.controls.numSecDistributedNetworkLines.patchValue(this.householdDetails.numSecDistributedNetworkLines);

      this.editHHAndPopulationForm.controls.numPriDrainageLines.patchValue(this.householdDetails.numPriDrainageLines);
      this.editHHAndPopulationForm.controls.numSecDrainageLines.patchValue(this.householdDetails.numSecDrainageLines);

    })
    this.editHHAndPopulationForm.controls['numTotalPopulation'].valueChanges.subscribe((value) => {
      debugger;
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.editHHAndPopulationForm.controls['numTotalPopulation'].value / this.editHHAndPopulationForm.controls['numTotalHouseHold'].value

        this.editHHAndPopulationForm.patchValue({

          avgMemberPerHouse: amount

        });
        console.log(amount);
        console.log("result")
        console.log(this.editHHAndPopulationForm.controls.avgMemberPerHouse.value)
      }
    })
    this.editHHAndPopulationForm.controls['numTotalHouseHold'].valueChanges.subscribe((value) => {
      debugger;
      if (value <= 0) {
        alert('Enter Value greater than 0')
      }
      else {
        let amount = this.editHHAndPopulationForm.controls['numTotalPopulation'].value / this.editHHAndPopulationForm.controls['numTotalHouseHold'].value

        this.editHHAndPopulationForm.patchValue({

          avgMemberPerHouse: amount
        });

        console.log(amount);
        console.log("result")
        console.log(this.editHHAndPopulationForm.controls.avgMemberPerHouse.value)
      }
    })
  }
  submitted: boolean;
  onUpdate() {

    // this.editHHAndPopulationForm.markAllAsTouched();
    if (this.editHHAndPopulationForm.invalid) {
      return
    }
    debugger;
    console.log(this.editHHAndPopulationForm.value);
    this.billingService.updateHouseHoldServiceByDto(this.editHHAndPopulationForm.value).subscribe(response => {
      debugger;
      console.log("response");
      console.log(response.data);
    })

    this.router.navigate(['operationManagement/householdAndPopulationRecord']);

  }


}

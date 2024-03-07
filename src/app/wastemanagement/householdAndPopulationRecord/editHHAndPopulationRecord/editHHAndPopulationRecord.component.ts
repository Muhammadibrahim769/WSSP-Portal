import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./editHHAndPopulationRecord.component.html'
})
export class EditHHAndPopulationRecordComponent implements OnInit {
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  step = 0;
  testAmount:number;
  householdDetails: any;
  Id: any = "";
  test = "";
  editHHAndPopulationForm:FormGroup
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private route: ActivatedRoute,private router: Router,private billingService: BillingService) { }
  clearDate(){
    this.editHHAndPopulationForm.controls.txtDate.reset('');
  }
 
  openUpdateDialog(){
// this.dialog.open(SubmitModalComponent);
const document= this.dialog.open(RejectModalComponent, {
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
  ngOnInit(): void {
    this.editHHAndPopulationForm = this.formBuilder.group({
      blnIsActive:[true],
      dteCreateddate:[''],
      txtStatus:[''],
      serPopulationId:[''],   
      numTotalSewerageLines:[],
      numTotalHouseHold:[],
      numTotalPopulation:[],
      txtRemarks:[],
      numTotalMainholes:[''],
      txtBranchName:[''],
      txtLocationName:[''],
      serLocationId:[],
      serBranchId:[],
      avgMemberPerHouse:[],
      avgMemberPerHouseNaN:[0]
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

  this.billingService.getHouseHoldServiceById(this.Id).subscribe(response =>{
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
    // this.editHHAndPopulationForm.controls.avgMemberPerHouse.patchValue(this.householdDetails.avgMemberPerHouse);
    this.editHHAndPopulationForm.controls.numTotalMainholes.patchValue(this.householdDetails.numTotalMainholes);
    this.editHHAndPopulationForm.controls.txtRemarks.patchValue(this.householdDetails.txtRemarks);
    this.editHHAndPopulationForm.controls.numTotalPopulation.patchValue(this.householdDetails.numTotalPopulation);
})
this.editHHAndPopulationForm.controls['numTotalPopulation'].valueChanges.subscribe((value) => {
  debugger;
  
  if(value <= 0){
    alert('Enter Value greater than 0')
  }
  else{
    let amount =  this.editHHAndPopulationForm.controls['numTotalHouseHold'].value / this.editHHAndPopulationForm.controls['numTotalPopulation'].value
    
    this.editHHAndPopulationForm.patchValue({
       
        avgMemberPerHouse: amount
      });
 
 console.log(amount);
 console.log("result")
 console.log(this.editHHAndPopulationForm.controls.avgMemberPerHouse.value)
}
})
  }
  onUpdate(){
    debugger;
    console.log(this.editHHAndPopulationForm.value);
      this.billingService.updateHouseHoldServiceByDto(this.editHHAndPopulationForm.value).subscribe( response => {
        debugger;
        response["data"] = this.editHHAndPopulationForm.value;
        
      console.log("response");
      console.log(response.data);
    })
    this.router.navigate(['operationManagement/householdAndPopulationRecord']);
  }
 
 
}

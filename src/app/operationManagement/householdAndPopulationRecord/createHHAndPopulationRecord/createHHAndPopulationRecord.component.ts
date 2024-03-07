import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './createHHAndPopulationRecord.component.html'
})
export class CreateHHAndPopulationRecordComponent implements OnInit {
  step = 0;
  createHHAndPopulationForm:FormGroup
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private router: Router,private billingService: BillingService) { }
  clearDate(){
    this.createHHAndPopulationForm.controls.txtDate.reset('');
  }
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  subCategoryList: any[] = [];
  serviceInfoList:any[]=[];
  ngOnInit(): void {
    this.createHHAndPopulationForm = this.formBuilder.group({
      txtBranch: [''],     
      txtUnionCouncil: [''],
      txtDate:[''],
      txtAssetSubCategory:[''],
      txtAssetType:[''],
      txtTotalPopulation:[''],
      txtAssetStatus:[''],
      txtAvgDischarge:[''],
      txtTotalHouseHold:[''],
      txtAvgMemberPerHouse:[''],
      txtRemarks:[''],
      numAssetId:[''],
      txtVolumeCapacity:[''],
      txtLoadCApacity:[''],
      txtTotalLength:[''],
      numTotalNo:[''],
      txtOtherInformationOne:[''],
      txtOtherInformationTwo:[''],
      txtOtherInformationThree:[''],
  })
  this.billingService.getAllCustomerTemplateService().subscribe(response => {
    debugger;
    console.log(response["branchList"]);
    this.branchList = response["branchList"];
    console.log(response["unionConcilList"]);
    this.unionCouncilList = response["unionConcilList"];
    console.log(response["subCategoryList"]);
    this.subCategoryList = response["subCategoryList"];
    console.log(response["serviceInfoList"]);
    this.serviceInfoList = response["serviceInfoList"];
    
    
  })
  }
  onSubmit(){    
    console.log(this.createHHAndPopulationForm.value); 
    debugger;
  }
  openSubmitDialog(){
    // this.dialog.open(SubmitModalComponent);
    const document= this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Submit ?',
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
  }
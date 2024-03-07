import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';
import { element } from 'protractor';

@Component({
  selector: "app-dashboard",
  templateUrl: './editWaterTesting.component.html'
})
export class EditWaterTestingComponent implements OnInit {

  Id: any = "";
  basicInfo: any;
  step = 0;
  arrayTestingType: string[];
  updateArrayTestingType: string[];
  toppingList: String[] = ['Chemical', 'Biological', 'WR'];
  editForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private billingService: BillingService, private route: ActivatedRoute, private router: Router) {
 
  }
  clearResultSubissionDate(){
  this.editForm.controls.txtResultSubmissionDate.reset('')
  }
  clearSamplingDate(){
    this.editForm.controls.txtSamplingDate.reset('')
    }
  testingType=new FormControl;
fakeTestingType:any;
branchList:any [] = [];
unionCouncilList:any [] = [];
  ngOnInit() {
    this.editForm = this.formbuilder.group({
      numWaterTestId: [''],
      numConsumerNo: [],
      // numLongitude: [],
      // numLatitude: [],
      txtComments: [''],
      txtConsumerType: [''],
      txtAssetType: [''],
      txtTestingAgency: [''],
      txtTestingType: [''],
      txtSamplingDate: [''],
      txtSamplingPoint: [''],
      txtConsumerName: [''],
      txtAddress: [''],
      txtStreetName: [''],
      txtTestResult: [''],
      serBranchId:[],
      serLocationId:[],
      // numLongitude: [''],
      // numLatitude: [''],
      txtBranchName:[''],
      txtLocationName: [''],
      txtResultSubmissionDate: [''],
      // testingType: ['']
    })
    this.billingService.getAllCustomerTemplateService().subscribe( response=>{
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];

      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
    })
    this.route.paramMap.subscribe((params) => {
      this.Id = +params.get("id");
    });
    // this.billingService.updateWaterTestServiceById(this.Id , this.basicInfo ).subscribe( response => {
    //   console.log(response)
    // })
    this.billingService.getWaterTestServiceById(this.Id).subscribe(response => {
      debugger;
      console.log(response);
      this.basicInfo = response;
      /*---------------------open convert comma seperated string in to array -------------------*/
      let stringTestingType = this.basicInfo.txtTestingType;
      this.arrayTestingType = stringTestingType.split(',');
      /*---------------------close convert comma seperated string in to array -------------------*/
      this.editForm.controls.numWaterTestId.patchValue(this.basicInfo.numWaterTestId);
      this.editForm.controls.txtTestingAgency.patchValue(this.basicInfo.txtTestingAgency);
      this.testingType.patchValue(this.arrayTestingType);
      this.editForm.controls.txtConsumerType.patchValue(this.basicInfo.txtConsumerType);
      this.editForm.controls.txtAssetType.patchValue(this.basicInfo.txtAssetType);
      this.editForm.controls.txtSamplingDate.patchValue(this.basicInfo.txtSamplingDate);
      this.editForm.controls.txtSamplingPoint.patchValue(this.basicInfo.txtSamplingPoint);
      this.editForm.controls.numConsumerNo.patchValue(this.basicInfo.numConsumerNo);
      this.editForm.controls.txtConsumerName.patchValue(this.basicInfo.txtConsumerName);
      this.editForm.controls.txtAddress.patchValue(this.basicInfo.txtAddress);
      // this.editForm.controls['txtBranchName'].patchValue(this.editForm.txtBranchName);
      // this.editForm.controls['txtLocationName'].patchValue(this.editForm.txtLocationName);
      this.editForm.controls.txtStreetName.patchValue(this.basicInfo.txtStreetName);
      this.editForm.controls.serBranchId.patchValue(this.basicInfo.serBranchId+'txtBranchName');
      this.editForm.controls.serLocationId.patchValue(this.basicInfo.serLocationId+'txtLocationName');
      this.editForm.controls['txtTestResult'].patchValue(this.basicInfo.txtTestResult);
      this.editForm.controls.txtResultSubmissionDate.patchValue(this.basicInfo.txtResultSubmissionDate);
      this.editForm.controls.txtComments.patchValue(this.basicInfo.txtComments);
    })
  }
  myArray:any[]=[];
  onUpdate() {
    debugger;
    this.myArray=  this.testingType.value;
    this.fakeTestingType= this.myArray.toString();

    this.editForm.controls['txtTestingType'].patchValue(this.fakeTestingType);
    this.billingService.updateWaterTestServiceById(this.Id, this.editForm.value).subscribe(response => {
      response["data"] = this.editForm.value;
      console.log("response");
      console.log(response.data);
    })
    this.router.navigate(['waterSupplyManagement/waterTesting']);
  }

  setStep(index: number) {
    this.step = index;
  }
  progressInfos = [];
  pppp = [];
  isFileShow = false;


  onChange(event) {

    this.isFileShow = true;
    var selectedFiles = event.target.files;

    for (var i = 0; i < selectedFiles.length; i++) {

      this.progressInfos[i] = { value: [i + 1], fileName: selectedFiles[i].name };
      this.pppp.push(this.progressInfos[i])
      // this.pppp.push({ value: [i+1], fileName: selectedFiles[i].name });
    }

  }


}
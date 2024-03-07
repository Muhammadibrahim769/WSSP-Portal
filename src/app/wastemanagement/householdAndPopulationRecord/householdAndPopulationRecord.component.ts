import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BillingService } from '@app/services/billing.service';
import { UtilsService } from '@app/_services/utils.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './householdAndPopulationRecord.component.html',
})
export class HouseholdAndPopulationRecordComponent implements OnInit {
  searchHouseholdAndPopulationForm: FormGroup
  step = 0;
  constructor(private formBuilder: FormBuilder, private utilService: UtilsService, public dialog: MatDialog, private billingService: BillingService) { }
  houseHoldColumns: string[] = ['serBranchId', 'unionCouncil', 'noOfMainholes', 'numTotalSewerageLines', 'numTotalHouseHold', 'avgMemberPerHouse', 'totalPopulation', 'Actions'];
  houseHold = new MatTableDataSource();
  @ViewChild("houseHoldSort", { static: true }) houseHoldSort: MatSort;
  @ViewChild("houseHoldPaginator", { static: true }) houseHoldPaginator: MatPaginator;
  ngAfterViewInit() { }
  clearDate() {
    this.searchHouseholdAndPopulationForm.controls.txtMonth.reset('');
  }
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  ngOnInit(): void {
    this.searchHouseholdAndPopulationForm = this.formBuilder.group({
      txtBranchName: [''],
      txtLocationName: ['']
    })
    this.billingService.getAllCustomerTemplateService().subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];
      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];
    })
    this.onGet();
  }
  onGet() {
    this.billingService.getHouseHoldService().subscribe(response => {
      console.log(response.data);
      // this.waterTestListData = response.data;
      debugger;
      this.houseHold = new MatTableDataSource(response.data);
      this.houseHold.sort = this.houseHoldSort;
      this.houseHold.paginator = this.houseHoldPaginator;
    })
  }
  responseList: any[] = [];
  selectStatusList: any[] = [];
  onSubmit() {
    debugger;
    console.log(this.searchHouseholdAndPopulationForm.value)
    let brachID = this.searchHouseholdAndPopulationForm.controls.txtBranchName.value;
    let UcID = this.searchHouseholdAndPopulationForm.controls.txtLocationName.value;
    this.billingService.searchHouseHoldListServiceByCode(brachID, UcID).subscribe(response => {
      debugger;
      this.selectStatusList = [];
      console.log(response);
      this.responseList = response["data"]
      this.responseList.forEach(element => {
        debugger;
        this.selectStatusList.push(element)
        this.houseHold = new MatTableDataSource(this.selectStatusList);
        this.houseHold.sort = this.houseHoldSort;
        this.houseHold.paginator = this.houseHoldPaginator;
      });
    })
  }
  setStep(index: number) {
    this.step = index;
  }
}

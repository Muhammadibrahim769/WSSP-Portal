import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup,FormBuilder } from '@angular/forms';
import { BillingService } from '@app/services/billing.service';



@Component({
  selector: 'app-dashboard',
  templateUrl:'./suspension.component.html'
})
export class SuspensionComponent implements AfterViewInit { 

  reportDtoList: any = [];
  customer: any = "";

  step = 0;
  searchSuspendForm: FormGroup;

  branchList:any [] = [];
  unionCouncilList:any [] = [];
  connectionTypeList:any [] = [];

  statusList:any [] = [];
  responseList: any [] = [];

  suspensionColumns: string[] = [ 'txtCustomerCode', 'branch.name', 'unionCouncil.name', 'txtConnectionType', 'suspensionDate', 'Actions'];
  suspensionListData = new MatTableDataSource();
  @ViewChild("suspensionSort", { static: true }) suspensionSort: MatSort;
  @ViewChild("suspensionPaginator", { static: true }) suspensionPaginator: MatPaginator;

  ngAfterViewInit() {
  }
  
  clearSuspenionDate(){
    this.searchSuspendForm.controls.suspensionDate.reset('');
  }

  Id: any = "";

  constructor(private formBuilder: FormBuilder, private billingService: BillingService) { }


  ngOnInit(): void {
    this.searchSuspendForm = this.formBuilder.group({
      txtCustomerCode: [''],
      branch: [''],
      unionCouncil: [''],
      txtConnectionType:[''],
      suspensionDate: ['']
    })

    this.billingService.getAllCustomerService().subscribe( 
      response => { 
        debugger;
        console.log("getAllCustomerService")
        console.log(response.data)
        response.data.forEach(element => {
          debugger;
          if(element.txtStatus === "SUSPENSION"){
            this.statusList.push(element)
            
          }
        });
        this.suspensionListData = new MatTableDataSource(this.statusList);
        this.suspensionListData.sort = this.suspensionSort;
        this.suspensionListData.paginator = this.suspensionPaginator;
    })
    
    this.billingService.getAllCustomerTemplateService().subscribe( response=>{
      debugger;
      console.log(response["branchList"]);
      this.branchList = response["branchList"];

      console.log(response["unionConcilList"]);
      this.unionCouncilList = response["unionConcilList"];

      console.log(response["connectionTypeList"]);
      this.connectionTypeList = response["connectionTypeList"];
    })

  }


  onSubmit(){
    debugger;
    console.log(this.searchSuspendForm.value)
    let formValue = this.searchSuspendForm.value;
    formValue.branch = {"id": + this.searchSuspendForm.controls.branch.value }
    formValue.unionCouncil = { "id": +this.searchSuspendForm.controls.unionCouncil.value }
    let code = this.searchSuspendForm.controls.txtCustomerCode.value;
    let brachID = this.searchSuspendForm.controls.branch.value;
    let UcID = this.searchSuspendForm.controls.unionCouncil.value;
    let connType = this.searchSuspendForm.controls.txtConnectionType.value;
    let suspendDate = this.searchSuspendForm.controls.suspensionDate.value;

    this.billingService.searchSuspendCustomerListServiceByCode(code, brachID, UcID, connType ,suspendDate).subscribe(response =>{
      debugger;
      console.log(response);
      this.statusList = [];
      this.responseList = response["data"];
      this.responseList.forEach(element => {
        if(element.txtStatus === "SUSPENSION"){
          this.statusList.push(element)
        }
        this.suspensionListData = new MatTableDataSource(this.statusList);
        this.suspensionListData.sort = this.suspensionSort;
        this.suspensionListData.paginator = this.suspensionPaginator;
      })
    })    
  }
}


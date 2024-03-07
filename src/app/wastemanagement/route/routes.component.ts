import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BillingService } from '@app/services/billing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl:'./routes.component.html',
    styleUrls: ['./routes.component.css']

}) 
export class RoutesComponent implements OnInit {
    searchForm: FormGroup;
    model: NgbDateStruct;
    page = 1;
    pageSize = 7;
    users = []
    isDisplay = false;
    step = 0;
    user: any = "";
    getBranchId = [];
    selectStatusList: any[] = [];
    responseList: any[] = [];
    branchList: any;
    setStep(index: number) {
        this.step = index;
    }
    constructor( private billingService: BillingService, private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder) {
     
    }
    routesColumn: string[] =  [ 'branch.name', 'location.name', 'route_no', 'route_name',
    'distance', 'Actions'];
    // 'startPoint', 'endPoint'
    routesListData = new MatTableDataSource();
    @ViewChild("routeSort", { static: true }) routeSort: MatSort;
    @ViewChild("routePaginator", { static: true }) routePaginator: MatPaginator;
    // branchList: any[] = [];
    unionCouncilList: any[] = [];
    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            serBranchId: [],
            serLocationId: [''],
            txtRouteNo: [""],
            txtRouteName: [""],
            txtDistance: [""],
            // txtStartPoint: [""],
            // txtEndPoint: [""],
            txtDistanceKm: [""],
            txtDescription: [""] ,
            code:[''],
            name:['']
        })
        this.user = JSON.parse(sessionStorage.getItem('user'));
        debugger;
        console.log(this.user);
        this.getBranch();
    
        this.searchForm.controls['serBranchId'].valueChanges.subscribe((value) => {
          this.billingService.getBranchIdForRoutes(value).subscribe(response => {
            debugger;
            console.log(response["routesLIst"]);
            this.branchList = response;
            for (let getBranch of this.branchList) {
              this.getBranchId.push(getBranch);
            }
            debugger;
            console.log(this.getBranchId);
           
          })
          
        });
        this.onGet();
        
        this.user = JSON.parse(sessionStorage.getItem('user'));
        debugger;
        console.log(this.user);
        this.getBranch();
    }
    
// onGet(){
//     this.billingService.getWaterTestService().subscribe(response => {
//       console.log(response.data);
      
//       debugger;
//       this.waterTestListData = new MatTableDataSource(response.data);
//       this.waterTestListData.sort = this.waterTestSort;
//       this.waterTestListData.paginator = this.waterTestPaginator;
//     })
//   }

onGet(){ 
    let pageSize ;
    let rowPerPage;
    this.billingService.getRoutesTableService().subscribe(response => {
      console.log(response.data);      
      debugger;
      this.routesListData = new MatTableDataSource(response.data);
      this.routesListData.sort = this.routeSort;
      this.routesListData.paginator = this.routePaginator;
    })
  }
  getBranch() {
    debugger;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    debugger;
    console.log("user id " + this.user.serUserId);
    this.billingService.getBranchService(this.user.serUserId).subscribe(response => {
      debugger;
      console.log(response["branchList"]);
      this.branchList = response;
      this.selectStatusList = [];
      console.log(response);
      this.responseList = response.data
    })
  }
onSubmit() {
    console.log(this.searchForm.value);
}
// getUsers() {
// this.busyGetUser = this._userApi.getUsers().subscribe(users => {
// this.users = users;
// });
// }

onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
this.users.forEach((user, idx) => {
    user.order = idx + 1;
});
    }
    redirect() {
        this.router.navigate( ['/fleet/routes/editRoutes']);
    }
}
// get items(){
// return this.addForm.get('items') as FormArray;
// }


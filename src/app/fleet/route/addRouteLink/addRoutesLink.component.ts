import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './addRoutesLink.component.html',
  styleUrls: ['./addRoutesLink.component.css'],
})
export class AddRoutesLinkComponent implements OnInit {
  routesform: FormGroup;
  total = 0;
  id: any;
  addRoutesDragArray = [];
  getBranchId = [];
  selectStatusList: any[] = [];
  getRouteId: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private billingService: BillingService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  openSubmitDialog() {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Submit ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        console.log('Dialog is closed');
        this.router.navigate(['fleet/routes']);
      }
    });
  }
  openDeleteDialog(i) {
    // this.dialog.open(SubmitModalComponent);
    const document = this.dialog.open(RejectModalComponent, {
      data: {
        message: 'Are you sure want to Delete ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    document.afterClosed().subscribe((confirmed: boolean) => {
      debugger;
      if (confirmed) {
        if (this.routeDetails.length == 1) {
          return false;
        } else {
          this.routeDetails.removeAt(i);
        }

        // console.log("Dialog is closed");
        // this.router.navigate(['fleet/routes']);
      }
    });
  }
  // branchList: any[] = [];
  unionCouncilList: any[] = [];
  ngOnInit(): void {
    // Main Form of Add Routes
    this.routesform = this.formBuilder.group({
      // branch: ['', Validators.required],
      // location: ['', Validators.required],
      totalDistance: [],
      id: [],
      // num_distance: [],
      routeDetails: this.formBuilder.array([]),
      // ser_branch_id: [],
      serLocationId: [''],
      ser_route_id: [this.id],
      code: [''],
      txt_description: ['string'],
      name: [''],
      serBranchId: [],
      txtRouteType: ['']
    });

    this.user = JSON.parse(sessionStorage.getItem('user'));
    debugger;
    console.log(this.user);
    this.getBranch();

    this.routesform.controls['serBranchId'].valueChanges.subscribe((value) => {
      this.billingService.getBranchIdForRoutes(value).subscribe(response => {
        debugger;
        console.log(response["routesLIst"]);
        this.branchLIst = response;
        for (let getBranch of this.branchLIst) {
          this.getBranchId.push(getBranch);
        }
        debugger;
        console.log(this.getBranchId);

      })

    });
    this.routesform.controls['routeDetails'].valueChanges.subscribe((value) => {
      this.total = 0;
      value.forEach((currentValue) => {
        this.total = this.total + currentValue.routeDistance;
        if (this.total > 0) {
          debugger;
          this.routesform.patchValue({ totalDistance: this.total.toString() });
        }
        console.log(this.findInvalidControls());
        console.log(this.routesform.controls.totalDistance.errors);
      });
    });
    this.routeDetails.push(
      this.formBuilder.group({
        latitude: 0,
        longitude: 0,
        routeDistance: [],
        // num_sequence_number: [],
        ser_route_detail_id: [],
        txt_name: [''],
      })
    );
    debugger;
    this.billingService.getRoutesService('1', '10').subscribe((response) => {
      debugger;
      this.getRouteId = response['data'];
      for (let getId of this.getRouteId) {
        this.id = getId.ser_route_id;
        console.log('Reoute ID ' + this.id);
      }
    });
  }
  onSubmitRoute() {
    debugger;
    console.log(this.routesform.value);
    this.billingService
      .addRoutesService(this.routesform.value)
      .subscribe((response) => {
        debugger;
        response.data = this.routesform.value;

      });
    this.router.navigate(['/fleet/routes']);
  }
  branchList: any;
  responseList: any[] = [];
  user: any = "";
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


  // deleteRow(i){
  //   if(this.route_detail.length==1){
  //     return false;
  //   }
  //   else{
  //     this.route_detail.removeAt(i)
  //   }

  // }
  get routeDetails(): FormArray {
    return this.routesform.get('routeDetails') as FormArray;
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.routesform.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
    // console.log(this.findInvalidControls())
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.routeDetails.controls,
      event.previousIndex,
      event.currentIndex
    );
    this.addRoutesDragArray.forEach((items, index) => {
      items = index + 1;
    });
  }
  branchLIst: any;
  addRows() {
    debugger;

    this.routeDetails.push(
      this.formBuilder.group({
        latitude: 0,
        longitude: 0,
        routeDistance: [],
        // num_sequence_number: 0,
        ser_route_detail_id: null,
        txt_name: [''],
      })
    );

  }

}


// for(let i=0; i<this.route_detail.length; i++){
//   this.distance+=this.route_detail
// }

// Model Form
// Add Routes Array

// Change Distance
// onChangeDistance(e,i){
//   debugger;
//   // newarray.push(this.addRoutes[i][j]);
//   console.log("Function called !!! " + e.target.value  + " For i Values " + i)

//   for (i = i; i < this.route_detail.length; i++) {
//     this.total+=e.target.value;
//     this.routesform.controls.distance.patchValue(this.total);
//   }
// }
// (document.getElementById('addButton') as HTMLButtonElement).disabled=false;
// console.log(currentValue.num_distance)
// console.log(index);
// const y = +currentValue.num_distance;

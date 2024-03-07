import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BillingService } from '@app/services/billing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './editRoutes.component.html',
})
export class EditRoutesComponent implements OnInit {
  routesform: FormGroup;
  
  total = 0;
  Id: any;
  routesLIst: any[] = [];
  getAllNameCode = [];
  id: any;
  txt_name: any;
  txt_code: any;
  editRoutes: any
  addRoutesDragArray = [];
  getRouteId: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private billingService: BillingService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  step = 0;
  getBranchId = [];
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
  unionCouncilList: any[] = [];
  ngOnInit(): void {
    // Main Form of Add Routes
    this.routesform = this.formBuilder.group({
      // branch: ['', Validators.required],
      // location: ['', Validators.required],
      distance: [],
      id: [this.Id],
      totalDistance: [],
      routeDetails: this.formBuilder.array([]),
      serBranchId: [],
      serLocationId: [''],
      ser_route_id: [],
      code: [''],
      txt_description: [''],
      name: [''],      
      txtRouteType:['']
      
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
    // this.route.queryParamMap.subscribe((queryParams) => {
    //   this.txt_code = queryParams.get("txt_code");
    //   this.txt_name = queryParams.get("txt_name");
    // });
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
        num_sequence_number: [],
        ser_route_detail_id: [],
        txt_name: [''],
      })
    );
    this.billingService.getRoutesService('1', '10').subscribe((response) => {     
      this.getRouteId = response['data'];
      for (let getId of this.getRouteId) {
        this.id = getId.ser_route_id;
        console.log('Reoute ID ' + this.id);
      }
    });
    this.route.paramMap.subscribe((params) => {
      this.Id = +params.get("id");
    });
    this.getRouteList();
  
    this.onEdit();
  }
  
  branchLIst: any;
  branchList:any;
  responseList:any[]=[];
  selectStatusList:any[]=[];
  user:any  = "";
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
  onEdit(){    
  this.billingService.getrouteServiceById(this.Id).subscribe(response =>{
      debugger;
      console.log(response);
      this.editRoutes = response;
      this.editRoutes.routeDetails.forEach(element => {
        console.log("element")
        console.log(element.txt_name)
        this.routeDetails.push(
          this.formBuilder.group({
            latitude: element.latitude,
            longitude: element.longitude,
            routeDistance: element.routeDistance,
            num_sequence_number: element.num_sequence_number,
            ser_route_detail_id:element.ser_route_detail_id,
            txt_name: element.txt_name,
          })
        );        
        console.log(this.routesform.controls["routeDetails"].value)
        // this.routesform.controls.txt_code.patchValue(element.txt_name);         
      });
        // this.routesform.controls['txt_code'].patchValue(this.editRoutes.controls.txt_code.value);
      this.routesform.controls.ser_route_id.patchValue(this.editRoutes.id);
      this.routesform.controls.code.patchValue(this.editRoutes.code);
      this.routesform.controls.totalDistance.patchValue(this.editRoutes.totalDistance);  
      this.routesform.controls.serBranchId.patchValue(this.editRoutes.serBranchId+'');
      this.routesform.controls.serLocationId.patchValue(this.editRoutes.serLocationId+'');
      this.routesform.controls['txtRouteType'].patchValue(this.editRoutes.txtRouteType);
      this.routesform.controls.name.patchValue(this.editRoutes.name);
  })
  }
  getRouteList() {
    debugger;
   
    this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
      debugger;console.log("routesLIst");
      console.log(response["data"]);
      this.routesLIst = response["data"];
      for (let getTxtNameCode of this.routesLIst) {
        this.getAllNameCode.push(getTxtNameCode);
      }
    })
  }
  onUpdateRoute() {
    debugger;
    this.routesform.controls.ser_route_id.patchValue(this.Id);
    this.routesform.controls.id.patchValue(this.Id);  
    console.log(this.routesform.value);
    this.billingService
      .updateRoutes(this.Id,this.routesform.value)
      .subscribe((response) => {
        debugger;
        console.log(response.data);
      });
    this.router.navigate(['fleet/routes']);
  }
  // onSubmit() {
  //   debugger;
  //   console.log(this.routesform.value);
  //   if (this.editRoutes.ser_route_id == null) {
  //     this.routesform.controls['ser_route_id'].patchValue(this.editRoutes.ser_route_id);
  //   }
  
  //   this.billingService
  //     .updateRouteListServiceByID(this.id, this.routesform.value)
  //     .subscribe((response) => {
  //       debugger;
  //       response.data = this.routesform.value;
  //     });
  // }
  addRows() {
    debugger;
    this.routeDetails.push(
      this.formBuilder.group({
        latitude: [],
        longitude: [],
        routeDistance: [],
        num_sequence_number: 0,
        ser_route_detail_id: null,
        txt_name: [''],
      })
    );
  }
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
}
// this.routesform.controls["routeDetails"].patchValue(element.txt_name);

// console.log(this.routesform.controls["routeDetails"].value)
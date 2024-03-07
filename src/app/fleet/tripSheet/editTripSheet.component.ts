// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RejectModalComponent } from '@app/modals/rejectModal.component';
// import { BillingService } from '@app/services/billing.service';
// import { User } from '@app/_models';

// import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({  
//   selector: 'app-dashboard',
//   templateUrl:'./editTripSheet.component.html',
// })
// export class EditTripSheetComponent implements OnInit { 
//     editTripSheetForm: FormGroup;
//     addForm: FormGroup;
//     user: any = "";
//     getAllNameCode = [];
//     getAllBatchCode = [];
//     getBatchCode = [];
//     selectStatusList: any[] = [];
//     responseList: any[] = [];
//     branchList: any;
//     driverName: any;
//     model: NgbDateStruct;
//     constructor(public dialog: MatDialog, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private billingService: BillingService) {
//     }
//     clearTimeOut() {
//       this.editTripSheetForm.controls.txtVehicleTimeOut.reset('');
//     }
//     clearTimeIn() {
//       this.editTripSheetForm.controls.txtVehicleTimeIn.reset('');
//     }
//     open(content) {
//       this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
//     }
//     step = 0;
//     setStep(index: number) {
//       this.step = index;
//     }
//     OnlyNumbersAllowed(event): boolean {
  
//       const charcode = (event.which) ? event.which : event.keycode;
  
//       if (charcode > 31 && (charcode < 48 || charcode > 57)) {
//         return false;
//       }
  
//       return true;
//     }
//     openSubmitDialog() {
//       const document = this.dialog.open(RejectModalComponent, {
//         data: {
//           message: 'Are you sure want to Submit ?',
//           buttonText: {
//             ok: 'Yes',
//             cancel: 'No'
//           }
//         }
//       });
//       document.afterClosed().subscribe((confirmed: boolean) => {
//         debugger;
//         if (confirmed) {
//           console.log("Dialog is closed");
//           this.router.navigate(['fleet/TripSheet']);
//         }
//       });
//     }
//     routesLIst: any[] = [];
//     batchLIst: any[] = [];
//     ngOnInit() {
//       this.editTripSheetForm= this.formBuilder.group({
    
//         txt_route_no: ['', Validators.required],
//         numOdometerOut: [],
//         numOdometerIn: [''],
//         dteDate: ['2021-05-06'],
//         dteTimeout: [''],
//         dteTimein: [],
//         numRouteDistance: [],
//         numCoveredDistance: [],
//         numGarbageDisposed: [],
//         serBranchId: [],
//         blnStatus: [true],
//         serBatchNo: [''],
//         txtDriverName: ['']
//       })
//       this.getBranch();
//       this.getRouteList();
      
//       this.editTripSheetForm.controls['numOdometerIn'].valueChanges.subscribe((value) => {
//         debugger;
//         if (value <= 0) {
//           alert('Enter Value greater than numOdometerIn')
//         }
//         else {
//           let amount = this.editTripSheetForm.controls['numOdometerIn'].value - this.editTripSheetForm.controls['numOdometerOut'].value
//           this.editTripSheetForm.patchValue({
//             numCoveredDistance: amount
//           });
//           console.log(amount);
//           console.log("result")
//           console.log(this.editTripSheetForm.controls.numCoveredDistance.value)
//         }
//       })
//       this.onChange("sd");
//     }
//     onSubmit() {
//       console.log(this.editTripSheetForm.value.txtTestingType);
//       console.log(this.editTripSheetForm.value.txtTestingType);
//       this.billingService.createTripSheetService(this.editTripSheetForm.value).subscribe(response => {
//         debugger;
//         response.data = this.editTripSheetForm.value;
//       })
  
//       this.router.navigate(['/fleet/tripSheet']);
//     }
//     getBranch() {
//       debugger;
//       this.user = JSON.parse(sessionStorage.getItem('user'));
//       debugger;
//       console.log("user id " + this.user.serUserId);
//       this.billingService.getBranchService(this.user.serUserId).subscribe(response => {
//         debugger;
  
//         this.branchList = response;
//         console.log("this.branchList");
//         console.log(this.branchList);
//         this.selectStatusList = [];
//         console.log(response);
//         this.responseList = response.data
      
//       })
//     }
//     clearWEFD() {
//       this.editTripSheetForm.controls.dteDate.reset('');
//     }
//     getRouteList() {
//       debugger;
//       this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
//         debugger;
//         console.log(response["routesLIst"]);
//         this.batchLIst = response["data"];
//         for (let getTxtNameCode of this.batchLIst) {
//           this.getBatchCode.push(getTxtNameCode);
//         }
//       })
//     }
//     onSave(addForm: any) {
//       console.log(this.addForm.value);
//     }
//     onChange(event) {
//       debugger
//       this.billingService.getBatchService(this.editTripSheetForm.controls['serBatchNo'].value).subscribe(response => {
//         debugger;
//         console.log("response");
//         debugger;
//         console.log(response["routesLIst"]);
//         this.batchLIst = response["data"];
//         if (this.batchLIst.length != 0) {
//           for (let getTxtBatchCode of this.batchLIst) {
//             this.getBatchCode.push(getTxtBatchCode);
//           }
//           debugger;
//           console.log(this.getBatchCode);
//           this.getBatchCode.forEach((element) => {
//             this.driverName = '';
//             this.driverName = element.txt_employee_name;
//           });
//         }
//         else {
//           this.billingService.getBatchedService(this.editTripSheetForm.controls['serBatchNo'].value).subscribe(response => {
//             debugger;
//             console.log("response");
//             debugger;
//             console.log(response["routesLIst"]);
//             this.batchLIst = response;
//             if (this.batchLIst != null) {
//                 this.editTripSheetForm.controls.txtDriverName.patchValue(this.batchLIst["txtEmployeeName"]);
//                 this.editTripSheetForm.controls['serBranchId'].patchValue(this.batchLIst["serBranchId"]);
  
//                 console.log(this.editTripSheetForm.controls.value)
//             }
//           })
//         }
//       })
//       }
//         onChangeRoute(event){
//           debugger;
//           this.billingService.getAllRouteslistOfCodeAndName().subscribe(response => {
//             debugger;
//             console.log(response["routesLIst"]);
//             this.batchLIst = response["data"];
//             for (let getTxtNameCode of this.batchLIst) {
//               this.getBatchCode.push(getTxtNameCode);
//             }
  
//             debugger;
//             console.log(this.getBatchCode);
//             this.getBatchCode.forEach((element) => {
//               if (event.value == element.txt_code) {
//                 this.editTripSheetForm.controls["numRouteDistance"].patchValue(element.num_distance);
//               }
//             })
//           })
//         }
//       }
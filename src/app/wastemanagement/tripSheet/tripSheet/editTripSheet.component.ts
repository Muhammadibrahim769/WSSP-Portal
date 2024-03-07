// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RejectModalComponent } from '@app/modals/rejectModal.component';
// import { User } from '@app/_models';

// import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({  selector: 'app-dashboard',

//   templateUrl: './editTripSheet.component.html',
// })
// export class EditTripSheetComponent implements OnInit { 
//   form: FormGroup;
//   addForm: FormGroup;
//   user: User;
//   model: NgbDateStruct;
//   routeNo="B";
//   constructor(public dialog: MatDialog,private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) {
    
//   }
//   clearTimeOut(){
//     this.form.controls.txtVehicleTimeOut.reset('');
//   }
//   clearTimeIn(){
//     this.form.controls.txtVehicleTimeIn.reset('');
//   }

//   open(content) {
//     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size : 'xl'})
//   }
//   step = 0;

//   setStep(index: number) {
//     this.step = index;
//   }
//   OnlyNumbersAllowed(event): boolean {

//     const charcode = (event.which) ? event.which : event.keycode;

//     if (charcode > 31 && (charcode < 48 || charcode > 57)) {
//       return false;

//     }

//     return true;
//   }
//   openUpdateDialog(){
//     const document= this.dialog.open(RejectModalComponent, {
//       data: {
//         message: 'Are you sure want to Update ?',
//         buttonText: {
//           ok: 'Yes',
//           cancel: 'No'
//         }
//       }
//     });
//     document.afterClosed().subscribe((confirmed: boolean) => {
//       debugger;
//       if (confirmed) {
//         console.log("Dialog is closed");
//         this.router.navigate(['fleet/tripSheet']);
//       }
//     });
//       }


//   ngOnInit() {
//     this.form = this.formBuilder.group({
     
//       txtOdoMeterOut:[''],
//       txtOdoMeterIn:[''],
//       txtRouteNo:[''],
//       txtWithEffectFrom:[''],  
//       txtVehicleId:['',] , 
//       txtVehicleTimeIn:[''],
//       txtVehicleTimeOut:[''],
//       txtDistanceCovered:['']
//     })
//     }

//     onSubmit(form: any) {
//       console.log(this.form.value);
//     }
//     onSave(addForm: any) {
//       console.log(this.addForm.value);
//     }

// }
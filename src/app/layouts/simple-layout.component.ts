import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  hide = true;
  users: any[] = [];
  breadcrumbs: Array<Object>;
  subMenues: any = [];
  constructor(private dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private alert: MatSnackBar) {

  }

  ngOnInit() {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   // this.roles = this.tokenStorage.getUser().roles;
    // }
    // this.form = this.formBuilder.group({
    //   username: [''],
    //   password: [''],
    // });
  }

  // onRegister(){
  //   debugger;
  //   this.router.navigate(['management/user/register']);
  // }

  // onSubmit() {
  //   this.authService.authenticateService(this.form.value).subscribe(
  //     data => {

  //       debugger;
  //       this.tokenStorage.saveToken(data["data"]["jwt"]);
  //       this.tokenStorage.saveUser(data["data"]["user"]);
  //       this.tokenStorage.saveIp(this.authService.getIp());
  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.tokenStorage.getUser().roles;
  //       let userType = this.authService.getUserType()
  //       if (userType === "OFFICER" || userType === "ADMIN") {
  //         // this.officerService.activeTenderService({}).subscribe(
  //         //   response => {
  //         //     debugger;
  //         //     // this.openAlert(response["message"]);
  //         //   });
  //         this.router.navigate(['/ep/officer/alltenders']);
  //         // this.router.navigate(['/ep/officer']);
  //       } else if (userType === "BIDDER") {
  //         this.router.navigate(['/ep/bidder']);
  //       }
  //     },
  //     error => {
  //       if (error.status == 409) {
  //         if (error.error.errors !== null && error.error.errors !== "") {
  //           for (const property in error.error.errors) {
  //             this.openAlert(error.error.errors[property]);
  //           }
  //           // for (let mess of Object.values(error.error.errors).toString()) {
  //           //   this.alert.open(mess);
  //           // }
  //         } else {
  //           this.openAlert(error.error.message);
  //         }

  //       }
  //       this.isLoginFailed = true;
  //     }
  //   );
  // }
  /* -----------------------------------------------------------------------------------------------------------------
                                             Alert Message
    --------------------------------------------------------------------------------------------------------------------*/
  // openAlert(message: string) {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     data: {
  //       message: message,
  //       buttonText: {
  //         cancel: 'OK'
  //       }
  //     },
  //   });
  // }

}

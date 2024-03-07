import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AlertService } from '@app/_services';
import { BillingService } from '@app/services/billing.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-dashboard',
    templateUrl: './login.component.html'
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    // addAdminForm: FormGroup;
    // password: FormControl;
    // confPass: FormControl;
    // passmsg: string;
    submitted = false;
    returnUrl: string;
    hide = true;
    private formSubmitAttempt: boolean;
    constructor(
        private http: HttpClient,
        // private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private billingService: BillingService
    ) { }
    formValidationMessages = {
        txtUserId: [{
          type: "required",
          message: "User Name is required"
        }],
        txtPassword: [{
          type: "required",
          message: "Password is required"
        }]
       
      }
    ngOnInit() {
        // this.createFormGroup();
        this.loginForm = this.formBuilder.group({
            txtUserId: ['', Validators.required],
            txtPassword:  ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
         
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // createFormGroup() {    
    //     this.addAdminForm = new FormGroup({
    //       password: new FormControl('', [Validators.required]),
    //       confPass: new FormControl('', [Validators.required]),
    //     })
    //   }
    //   checkPassSame() {
    //     let pass = this.addAdminForm.value.password;
    //     let passConf = this.addAdminForm.value.confPass;
    //     if(pass == passConf && this.addAdminForm.valid === true) {
    //       this.passmsg = "";
    //       return false;
    //     }else {
    //       this.passmsg = "Password did not match.";
    //       return true;
    //     }
    //   }
    get f() { return this.loginForm.controls; }
Message='Please Enter Valid User Name or Password'
    onSubmit() {
        if (this.loginForm.invalid ) {
            debugger;
            return 
            // this.Message;
        }
        else if(this.loginForm.valid){
        debugger;
        this.submitted = true;
        this.alertService.clear();
       
        
        this.billingService.loginService(this.loginForm.controls['txtUserId'].value,this.loginForm.controls['txtPassword'].value)
        .subscribe(response=>{
            debugger;
            window.sessionStorage.setItem('user', JSON.stringify(response));

            this.loading = true;
            
          this.router.navigate(['/dashboard']);
        })
    }
    }
}
﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    accountService: any;
    constructor(
        private router: Router,
        
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}
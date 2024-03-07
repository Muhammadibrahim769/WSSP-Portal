import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../management/login.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent
    ]
})
export class AccountModule { }
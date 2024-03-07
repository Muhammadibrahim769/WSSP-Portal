import { NgModule } from '@angular/core';
import { LoginComponent } from '@app/management/login.component';
import { UserService } from './management.service';
import { ManagementRoutingModule } from './management-routing.module';
import { SharedModule } from '@app/_helpers/shared.module';



@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers: [
    UserService,
  ]
})

export class ManagementModule { }

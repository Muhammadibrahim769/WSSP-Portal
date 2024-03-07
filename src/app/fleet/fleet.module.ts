import { NgModule } from '@angular/core';
import { SharedModule } from '@app/_helpers/shared.module';
import { VehicleRegistrationComponent } from '.';
import { FleetRoutingModule } from './fleet-routing.module';
import { AddRoutesLinkComponent } from './route';
import { EditRoutesComponent } from './route/editRouteslinks/editRoutes.component';
import { RoutesComponent } from './route/routes.component';
import { ViewRoutesComponent } from './route/viewRoutes/viewRoutes.component';
import { AddTripSheetComponent } from './tripSheet/addtripSheet/addTripSheet.component';
import { TripSheetComponent } from './tripSheet/tripSheet.component';
import { ViewTripSheetComponent } from './tripSheet/viewTripSheet.component';
import { CreateVehicleComponent } from './vehicleRegistration/createVehicle/createVehicle.component';
import { VehicleService } from './vehicleRegistration/vehicle-service';
import { EditFleetComponent } from './viewVehicleRegistration/editFleet/editFleet.component';
import { ViewVehicleRegistrationComponent } from './viewVehicleRegistration/viewVehicleRegistration.component';
import { MaintenanceSheetComponent } from './maintenanceSheet/maintenanceSheet.component';
import { MaintenanceStandardComponent } from './maintenanceStandard';
import { CreateMaintenanceStandardComponent } from './maintenanceStandard/createMaintenanceStandard/createMaintenanceStandard.component';
import { EditMaintenanceStandardComponent } from './maintenanceStandard/editMaintenanceStandard/editMaintenanceStandard.component';
import { CreateMaintenanceSheetComponent } from './maintenanceSheet/createMaintenanceSheet/createMaintenanceSheet.component';



@NgModule({
  declarations: [
    VehicleRegistrationComponent,
    VehicleRegistrationComponent,
    CreateVehicleComponent,
    EditFleetComponent,
    TripSheetComponent,
    ViewVehicleRegistrationComponent,
    TripSheetComponent,
    ViewTripSheetComponent,
    AddTripSheetComponent,
    RoutesComponent,
    EditRoutesComponent,
    ViewRoutesComponent,
    AddRoutesLinkComponent,    
    MaintenanceSheetComponent,
    CreateMaintenanceSheetComponent,
    MaintenanceStandardComponent,
    CreateMaintenanceStandardComponent,
    EditMaintenanceStandardComponent
    ],
  imports: [    
  
    FleetRoutingModule,
    SharedModule
  
  ],
  providers: [
    VehicleService
  ]
})
export class FleetModule { }

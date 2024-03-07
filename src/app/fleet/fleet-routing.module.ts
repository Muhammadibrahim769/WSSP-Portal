import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { VehicleRegistrationComponent } from '.';
import { CreateVehicleComponent } from './vehicleRegistration/createVehicle/createVehicle.component';
import { AddRoutesLinkComponent } from './route';
import { EditRoutesComponent } from './route/editRouteslinks/editRoutes.component';
import { RoutesComponent } from './route/routes.component';
import { ViewRoutesComponent } from './route/viewRoutes/viewRoutes.component';
import { AddTripSheetComponent } from './tripSheet/addtripSheet/addTripSheet.component';
import { TripSheetComponent } from './tripSheet/tripSheet.component';
import { ViewTripSheetComponent } from './tripSheet/viewTripSheet.component';
import { EditFleetComponent } from './viewVehicleRegistration/editFleet/editFleet.component';
import { ViewVehicleRegistrationComponent } from './viewVehicleRegistration/viewVehicleRegistration.component';
import { MaintenanceSheetComponent } from './maintenanceSheet/maintenanceSheet.component';
import { MaintenanceStandardComponent } from './maintenanceStandard';
import { CreateMaintenanceStandardComponent } from './maintenanceStandard/createMaintenanceStandard/createMaintenanceStandard.component';
import { EditMaintenanceStandardComponent } from './maintenanceStandard/editMaintenanceStandard/editMaintenanceStandard.component';
import { CreateMaintenanceSheetComponent } from './maintenanceSheet/createMaintenanceSheet/createMaintenanceSheet.component';
import { ReportsComponent } from '@app/wastemanagement/reports/reports.component';

const routes: Routes = [
  {
    path: 'vehicleRegistration',
    component: VehicleRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicleRegistration',
    component: VehicleRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicleRegistration/createVehicle',
    component: CreateVehicleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicleRegistration/edit',
    component: EditFleetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tripSheet',
    component: TripSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicleRegistration/ViewVehicleRegistration',
    component: ViewVehicleRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wasteManagement/tripSheet',
    component: TripSheetComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'tripSheet/editTripSheet',
  //   component: EditTripSheetComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'tripSheet/viewTripSheet',
    component: ViewTripSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'TripSheet/addTripSheet',
    component: AddTripSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'routes',
    component: RoutesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'routes/editRoutes/:id',
    component: EditRoutesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'routes/viewRoutes/:id',
    component: ViewRoutesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'routes/addRoutesLink',
    component: AddRoutesLinkComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'maintenanceSheet',
    component: MaintenanceSheetComponent
  },
  {
    path: 'report',
    component: ReportsComponent
  },
  {
    path: 'maintenanceSheet/createMaintenanceSheet',
    component: CreateMaintenanceSheetComponent,
    
  },
  {
    path: 'maintenanceStandard',
    component: MaintenanceStandardComponent    
  },
  {
    path: 'maintenanceStandard/createMaintenanceStandard',
    component: CreateMaintenanceStandardComponent    
  },
  {
    path: 'maintenanceStandard/editMaintenanceStandard',
    component: EditMaintenanceStandardComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }

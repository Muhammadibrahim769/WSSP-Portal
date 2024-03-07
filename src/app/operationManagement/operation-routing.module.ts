import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { FilterationPlantComponent } from './filterationPlant/filterationPlant.component';
import { ViewFilterartionPlantComponent } from './filterationPlant/viewFilterationPlant.component';
import { CreateHHAndPopulationRecordComponent } from './householdAndPopulationRecord/createHHAndPopulationRecord/createHHAndPopulationRecord.component';
import { EditHHAndPopulationRecordComponent } from './householdAndPopulationRecord/editHHAndPopulationRecord/editHHAndPopulationRecord.component';
import { HouseholdAndPopulationRecordComponent } from './householdAndPopulationRecord/householdAndPopulationRecord.component';
import { ViewHHAndPopulationRecordComponent } from './householdAndPopulationRecord/viewHHAndPopulationRecord/viewHHAndPopulationRecord.component';
import { OperationBasicInformationComponent } from './operationBasicInformation/operationBasicInformation.component';
import { ViewOperationBasicInfoComponent } from './operationBasicInformation/viewOperationBasicInfo/viewOperationBasicInfocomponent';
// import { ViewOperationBasicInfoComponent } from './operationBasicInformation/viewOperationBasicInfo/viewOperationBasicInfocomponent';
 import { OverHeadTanksComponent } from './overHeadTanks/overHeadTanks.component';
 import { ViewOverHeadTanksComponent } from './overHeadTanks/viewOverHeadTanks.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';

const routes: Routes = [

  
  {
    path: 'overHeadTanks',
     component: OverHeadTanksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewOverHeadTanks/:id',
    component: ViewOverHeadTanksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filterationPlant',
    component: FilterationPlantComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'viewFilterationPlant/:id',
    component: ViewFilterartionPlantComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'operationBasicInformation',
    component: OperationBasicInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewOperationBasicInfo/:id',
    component: ViewOperationBasicInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'householdAndPopulationRecord',
    component: HouseholdAndPopulationRecordComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'householdAndPopulationRecord/createHHAndPopulationRecord',
    component: CreateHHAndPopulationRecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'householdAndPopulationRecord/editHHAndPopulationRecord/:id',
    component: EditHHAndPopulationRecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'householdAndPopulationRecord/viewHHAndPopulationRecord/:id',
    component: ViewHHAndPopulationRecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generalOperation',
    component: GeneraloperationComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'generalOperation/viewGeneralOperation',
    component: ViewGeneralOperationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addmaintenance',
    component: AddMaintenanceComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule{ }

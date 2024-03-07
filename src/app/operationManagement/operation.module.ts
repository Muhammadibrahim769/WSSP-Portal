import { NgModule } from '@angular/core';
import { FilterationPlantComponent } from './filterationPlant/filterationPlant.component';
import { ViewFilterartionPlantComponent } from './filterationPlant/viewFilterationPlant.component';
import { CreateHHAndPopulationRecordComponent } from './householdAndPopulationRecord/createHHAndPopulationRecord/createHHAndPopulationRecord.component';
import { EditHHAndPopulationRecordComponent } from './householdAndPopulationRecord/editHHAndPopulationRecord/editHHAndPopulationRecord.component';
import { HouseholdAndPopulationRecordComponent } from './householdAndPopulationRecord/householdAndPopulationRecord.component';
import { ViewHHAndPopulationRecordComponent } from './householdAndPopulationRecord/viewHHAndPopulationRecord/viewHHAndPopulationRecord.component';
import { OperationBasicInformationComponent } from './operationBasicInformation/operationBasicInformation.component';
import { ViewOperationBasicInfoComponent } from './operationBasicInformation/viewOperationBasicInfo/viewOperationBasicInfocomponent';
import { SharedModule } from '@app/_helpers/shared.module';
import { ServicesStatusComponent } from './servicesStatus/servicesStatus.component';
import { OperationComponent } from './operation.component';
import { OperationRoutingModule } from './operation-routing.module';
import { OverHeadTanksComponent } from './overHeadTanks/overHeadTanks.component';
import { ViewOverHeadTanksComponent } from './overHeadTanks/viewOverHeadTanks.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';
import { EditGeneralOperationComponent } from '@app/modals/editGeneralOperation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';
import { EditMaintenanceComponent } from '@app/modals/editMaintenance.component';
@NgModule({
  declarations: [
    OperationComponent,
    FilterationPlantComponent,
    ViewFilterartionPlantComponent,
    HouseholdAndPopulationRecordComponent,
    CreateHHAndPopulationRecordComponent,
    EditHHAndPopulationRecordComponent,
    ViewHHAndPopulationRecordComponent,
    OperationBasicInformationComponent,
    ViewOperationBasicInfoComponent,
    ServicesStatusComponent,
    ViewOverHeadTanksComponent,
    OverHeadTanksComponent,
    GeneraloperationComponent,  
    ViewGeneralOperationComponent,
    EditGeneralOperationComponent,
    MaintenanceComponent,
    AddMaintenanceComponent,
    EditMaintenanceComponent
  ],

  imports: [
    SharedModule,
    OperationRoutingModule

  ]
})
export class OperationModule { }

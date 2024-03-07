import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditWaterTestingComponent } from '@app/operationManagement/waterTesting/editWaterTesting/editWaterTesting.component';
import { NewTestComponent } from '@app/operationManagement/waterTesting/newTest/newTest.component';
import { ViewWaterTestDetailComponent } from '@app/operationManagement/waterTesting/viewWaterTestDetail/viewWaterTestDetail.component';
import { WaterTestingComponent } from '@app/operationManagement/waterTesting/waterTesting.component';
import { SharedModule } from '@app/_helpers/shared.module';
import { waterSupplyManagementRoutingModule } from './waterSupplyManagement-routing.module';
import { UpdateConnectionComponent } from './updateConnection/updateConnection.component';
import { UpdateConnectionListComponent } from './updateConnection/updateConnectionList.component';
import { ConnectionListComponent } from './newconnection/connectionList.component';
import { CreateConnectionComponent } from './newconnection/createConnection.component';
import { ViewAllConnectionInformationComponent } from './newconnection/viewAllConnectionInformation.component';
import { ViewConnectionInformationComponent } from './newconnection/viewConnectionInformation.component';
import { UpdateComponent } from './updateConnection/update/update.component';
import { viewNewConnectionInformationComponent } from './newconnection/viewNewConnectionInformation.component';
import { WaterRunningSourceComponent } from './waterRunningSource/waterRunningSource.component';
import { ViewWaterRunningSourceComponent } from './waterRunningSource/viewWaterRunningSource/viewWaterRunningSource.component';
import { EditWaterFilterationPlantModalComponent } from '@app/modals/editWaterFilterationPlantModal.component';
import { ViewWaterOperationBasicInfoComponent } from './operationBasicInformation/viewWaterOperationBasicInfo/viewWaterOperationBasicInfo.component';
import { WaterOperationBasicInformationComponent } from './operationBasicInformation/waterOperationBasicInformation.component';
import { ViewWaterProductionFilterationPlantComponent } from './WaterFilterationPlant/viewWaterProductionFilterationPlant.component';
import { WaterProductionFilterationPlantComponent } from './WaterFilterationPlant/waterProductionFilterationPlant.component';
import { WaterFilterationPlantComponent } from './filterationPlant/waterFilterationPlant.component';
import { ViewWaterFilterationPlantComponent } from './filterationPlant/viewWaterFilterationPlant.component';
import { TubewellProductionReportComponent } from './tubewellProductionReport/tubewellProductionReport.component';
import { FilterationProductionReportComponent } from './WaterFilterationPlant/filterationProductionReport/filterationProductionReport.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { WaterGeneralOperationModalComponent } from '@app/modals/waterGeneralOperationModal.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';





@NgModule({
  declarations: [
    ViewWaterRunningSourceComponent,
    WaterTestingComponent,
    WaterRunningSourceComponent,
    NewTestComponent,
    ViewWaterTestDetailComponent,
    EditWaterTestingComponent, 
    UpdateConnectionComponent,
    UpdateConnectionListComponent,
    ConnectionListComponent,
    CreateConnectionComponent,
    ViewAllConnectionInformationComponent,
    ViewConnectionInformationComponent,
    viewNewConnectionInformationComponent,
    UpdateComponent,
    ViewWaterFilterationPlantComponent,
    WaterProductionFilterationPlantComponent,
    EditWaterFilterationPlantModalComponent,
    WaterOperationBasicInformationComponent,
    ViewWaterOperationBasicInfoComponent,
    WaterFilterationPlantComponent,
    TubewellProductionReportComponent,
    ViewWaterProductionFilterationPlantComponent,
    FilterationProductionReportComponent,
    GeneraloperationComponent,
    ViewGeneralOperationComponent,
    WaterGeneralOperationModalComponent    
    
  ],
  imports: [
    waterSupplyManagementRoutingModule,
    SharedModule
  ]
})
export class waterSupplyManagementModule { }

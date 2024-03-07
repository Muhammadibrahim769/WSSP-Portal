import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWaterTestingComponent } from '@app/operationManagement/waterTesting/editWaterTesting/editWaterTesting.component';
import { NewTestComponent } from '@app/operationManagement/waterTesting/newTest/newTest.component';
import { ViewWaterTestDetailComponent } from '@app/operationManagement/waterTesting/viewWaterTestDetail/viewWaterTestDetail.component';
import { WaterTestingComponent } from '@app/operationManagement/waterTesting/waterTesting.component';

import { AuthGuard } from '@app/_helpers';
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
import { WaterOperationBasicInformationComponent } from './operationBasicInformation/waterOperationBasicInformation.component';
import { ViewWaterOperationBasicInfoComponent } from './operationBasicInformation/viewWaterOperationBasicInfo/viewWaterOperationBasicInfo.component';
import { WaterProductionFilterationPlantComponent } from './WaterFilterationPlant/waterProductionFilterationPlant.component';
import { ViewWaterProductionFilterationPlantComponent } from './WaterFilterationPlant/viewWaterProductionFilterationPlant.component';
import { WaterFilterationPlantComponent } from './filterationPlant/waterFilterationPlant.component';
import { ViewWaterFilterationPlantComponent } from './filterationPlant/viewWaterFilterationPlant.component';
import { TubewellProductionReportComponent } from './tubewellProductionReport/tubewellProductionReport.component';
import { FilterationProductionReportComponent } from './WaterFilterationPlant/filterationProductionReport/filterationProductionReport.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';



const routes: Routes = [

  {
    path: 'tubeWell',
    component: WaterOperationBasicInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewWaterOperationBasicInfo/:id',
    component: ViewWaterOperationBasicInfoComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'waterProduction',
    component: WaterRunningSourceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'waterProduction/viewwaterProduction',
    component: ViewWaterRunningSourceComponent,
    canActivate: [AuthGuard]
  },
 
  
  {
    path: 'filterationPlantProduction',
    component: WaterProductionFilterationPlantComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'waterProduction/viewWaterProdFilterationPlant',
    component: ViewWaterProductionFilterationPlantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'waterFilterationPlant',
    component: WaterFilterationPlantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewWaterFilterationPlant/:id',
    component: ViewWaterFilterationPlantComponent,
    canActivate: [AuthGuard]
  },  
  // {
  //   path: 'viewWaterOverHeadTanks/:id',
  //   component: ViewWaterOverHeadTanksComponent,
  //   canActivate: [AuthGuard]
  // },  
  // {
  //   path: 'waterOverHeadTanks',
  //   component: WaterOverHeadTanksComponent,
  //   canActivate: [AuthGuard]
  // },  
  {
    path: 'monthlyReport',
    component: TubewellProductionReportComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'filterationReport',
    component: FilterationProductionReportComponent,
    canActivate: [AuthGuard]  

  },

  {
    path: 'waterTesting',
    component: WaterTestingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newTest',
    component: NewTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewWaterTestDetail/:id',
    component: ViewWaterTestDetailComponent
  },
  {
    path: 'editWaterTesting/:id',
    component: EditWaterTestingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateConnection',
    component: UpdateConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateConnectionList',
    component: UpdateConnectionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'connectionList',
    component: ConnectionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createConnection',
    component: CreateConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewAllConnectionInformation/:id',
    component: ViewAllConnectionInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generalOperation',
    component: GeneraloperationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewGeneralOperation',
    component: ViewGeneralOperationComponent,
    canActivate: [AuthGuard]
  },

  /*
   ,
    ViewGeneralOperationComponent,
    EditGeneralOperationComponent
  */
  {
    path: 'viewConnectionInfo',
    component: ViewConnectionInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewNewConnectionInformation/:id',
    component: viewNewConnectionInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update',
    component: UpdateComponent,
    canActivate: [AuthGuard]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class waterSupplyManagementRoutingModule { }

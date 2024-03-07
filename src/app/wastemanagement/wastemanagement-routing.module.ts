import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '@app/fleet/route/routes.component';
import { AuthGuard } from '@app/_helpers';
import { ViewTripSheetComponent } from '@app/fleet/tripSheet/viewTripSheet.component';
import { EditRoutesComponent } from '@app/fleet/route/editRouteslinks/editRoutes.component';
import { ViewRoutesComponent } from '@app/fleet/route/viewRoutes/viewRoutes.component';
import { AddRoutesLinkComponent } from './route';
import { HouseholdAndPopulationRecordComponent } from '@app/operationManagement/householdAndPopulationRecord/householdAndPopulationRecord.component';
import { CreateHHAndPopulationRecordComponent } from '@app/operationManagement/householdAndPopulationRecord/createHHAndPopulationRecord/createHHAndPopulationRecord.component';
import { EditHHAndPopulationRecordComponent } from '@app/operationManagement/householdAndPopulationRecord/editHHAndPopulationRecord/editHHAndPopulationRecord.component';
import { ViewHHAndPopulationRecordComponent } from '@app/operationManagement/householdAndPopulationRecord/viewHHAndPopulationRecord/viewHHAndPopulationRecord.component';
import { TripSheetComponent } from '@app/fleet/tripSheet/tripSheet.component';
import { AddTripSheetComponent } from '@app/fleet/tripSheet/addtripSheet/addTripSheet.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateWasteCollectionComponent } from './waste-collection/create-waste-collection/create-waste-collection.component';
import { WasteCollectionComponent } from './waste-collection/waste-collection.component';
import { ViewWasteCollectionComponent } from './waste-collection/view-waste-collection/view-waste-collection.component';
import { CreateDesiltationActivitiesComponent } from './desiltationActivities/createDesiltationActivities/createDesiltationActivities.component';
import { ViewDesiltationActivitiesComponent } from './desiltationActivities/viewDesiltationActivities/viewDesiltationActivities.component';
import { DesiltationActivityComponent } from './desiltationActivities/desiltationActivity.component';
import { CreateSweepingScheduleComponent } from './sweepingSchedule/createSweepingSchedule/createSweepingSchedule.component';
import { ViewSweepingScheduleComponent } from './sweepingSchedule/viewSweepingSchedule/viewSweepingSchedule.component';
import { SweepingScheduleComponent } from './sweepingSchedule/sweepingSchedule.component';
import { GasCollectionSheetComponent } from './gasCollectionSheet/gasCollectionSheet.component';
import { CreateGasCollectionComponent } from './gasCollectionSheet/createGasCollection/createGasCollection.component';
import { ViewGasCollectionComponent } from './gasCollectionSheet/viewGasCollection/viewGasCollection.component';
import { WasteDiversionSheetComponent } from './wasteDiversionSheet/wasteDiversionSheet.component';
import { ViewWasteDiversionSheetComponent } from './wasteDiversionSheet/viewWasteDiversionSheet/viewWasteDiversionSheet.component';
import { StpComponent } from './stp/stp.component';
import { CreateStpComponent } from './stp/createStp/createStp.component';
import { AddItemRecoveredComponent } from './itemRecovered/addItemRecovered/addItemRecovered.component';
import { SaleRecoveredItemComponent } from './itemRecovered/sale/saleRecoveredItem/saleRecoveredItem.component';
import { QuantityRecoveredItemListComponent } from './itemRecovered/quantity/quantityRecoveredItemList/quantityRecoveredItemList.component';
import { ViewQauntityRecoveredComponent } from './itemRecovered/quantity/viewQauntityRecovered/viewQauntityRecovered.componrnt';
import { SaleRecoveredItemListComponent } from './itemRecovered/sale/saleRecoveredItemList/saleRecoveredItemList.component';
import { ViewSaleItemComponent } from './itemRecovered/sale/viewSaleItem/viewSaleItem.component';
// import { EditSaleItemComponent } from './itemRecovered/sale/editSaleItem/editSaleItem.component';
// import { EditRecoveredItemComponent } from './itemRecovered/quantity/editRecoveredItem/editRecoveredItem.component';
import { ViewStpComponent } from './stp/viewStp/viewStp.component';
import { RdfComponent } from './rdf/rdf.component';
import { CreateRdfComponent } from './rdf/createRdf/createRdf.component';
import { ViewRdfComponent } from './rdf/viewRdf/viewRdf.component';
import { CreateWasteDiversionSheetComponent } from './wasteDiversionSheet/createWasteDiversionSheet/createWasteDiversionSheet.component';
import { CompostComponent } from './compost/compost.component';
import { CreateCompostComponent } from './compost/createCompost/createCompost.component';
import { ViewCompostComponent } from './compost/ViewCompost/viewCompost.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';
const routes: Routes =
 [
  {
    path: 'tripSheet',
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
    path: 'report',
    component:ReportsComponent,
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
    path: 'desiltationActivity',
    component: DesiltationActivityComponent,
    canActivate: [AuthGuard]
  },
   
  {
    path: 'wasteCollection',
    component: WasteCollectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wasteCollection/viewWasteCollection/:id',
    component: ViewWasteCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wasteCollection/viewDesiltationActivities/:id',
    component: ViewDesiltationActivitiesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createWasteCollection',
    component: CreateWasteCollectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createSweepingSchedule',
    component: CreateSweepingScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wasteCollection/viewSweepingSchedule/:id',
    component: ViewSweepingScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sweepingSchedule',
    component: SweepingScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gasCollection',
    component: GasCollectionSheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createGasCollection',
    component: CreateGasCollectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gasCollection/viewGasCollection/:id',
    component: ViewGasCollectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createDesiltationActivity',
    component: CreateDesiltationActivitiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wasteDiversionSheet',
    component: WasteDiversionSheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wasteDiversionSheet/viewWasteDiversionSheet/:id',
    component: ViewWasteDiversionSheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'itemRecovered',
    component: AddItemRecoveredComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quantityRecoveredItem',
    component: QuantityRecoveredItemListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saleRecoveredItemList',
    component: SaleRecoveredItemListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saleRecoveredItemList/viewSaleItem/:id',
    component: ViewSaleItemComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'saleRecoveredItemList/editSaleItem/:id',
  //   component: EditSaleItemComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'quantityRecoveredItem/editQauntityRecovered/:id',
  //   component: EditRecoveredItemComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'quantityRecoveredItem/viewQauntityRecovered/:id',
    component: ViewQauntityRecoveredComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saleRecoveredItem',
    component: SaleRecoveredItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createWasteDiversionSheet',
    component: CreateWasteDiversionSheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generalOperation/viewGeneralOperation',
    component: ViewGeneralOperationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compost',
    component: CompostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createCompost',
    component: CreateCompostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compost/viewDetails/:id',
    component: ViewCompostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stp',
    component: StpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stp/ctreateStp',
    component: CreateStpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stp/viewStp/:id',
    component: ViewStpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rdf',
    component: RdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rdf/createRdf',
    component: CreateRdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rdf/viewRdf/:id',
    component: ViewRdfComponent,
    canActivate: [AuthGuard]
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WastemanagementRoutingModule { }

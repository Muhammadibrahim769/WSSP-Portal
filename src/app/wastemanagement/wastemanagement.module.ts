import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WastemanagementRoutingModule } from './wastemanagement-routing.module';
import { SharedModule } from '@app/_helpers/shared.module';
import { AddTripSheetComponent } from './tripSheet/addtripSheet/addTripSheet.component';
import { AddRoutesLinkComponent } from './route';
import { ViewRoutesComponent } from './route/viewRoutes/viewRoutes.component';
import { EditRoutesComponent } from './route/editRouteslinks/editRoutes.component';
import { RoutesComponent } from './route/routes.component';
import { ViewTripSheetComponent } from './tripSheet/viewTripSheet.component';
import { TripSheetComponent } from './tripSheet/tripSheet.component';
import { HouseholdAndPopulationRecordComponent } from './householdAndPopulationRecord/householdAndPopulationRecord.component';
import { EditHHAndPopulationRecordComponent } from './householdAndPopulationRecord/editHHAndPopulationRecord/editHHAndPopulationRecord.component';
import { CreateHHAndPopulationRecordComponent } from './householdAndPopulationRecord/createHHAndPopulationRecord/createHHAndPopulationRecord.component';
import { ViewHHAndPopulationRecordComponent } from './householdAndPopulationRecord/viewHHAndPopulationRecord/viewHHAndPopulationRecord.component';
import { ReportsComponent } from './reports/reports.component';
import { WasteCollectionComponent } from './waste-collection/waste-collection.component';
import { CreateWasteCollectionComponent } from './waste-collection/create-waste-collection/create-waste-collection.component';
import { ViewWasteCollectionComponent } from './waste-collection/view-waste-collection/view-waste-collection.component';
import { CreateDesiltationActivitiesComponent } from './desiltationActivities/createDesiltationActivities/createDesiltationActivities.component';
import { ViewDesiltationActivitiesComponent } from './desiltationActivities/viewDesiltationActivities/viewDesiltationActivities.component';
import { DesiltationActivityComponent } from './desiltationActivities/desiltationActivity.component';
import { SweepingScheduleComponent } from './sweepingSchedule/sweepingSchedule.component';
import { CreateSweepingScheduleComponent } from './sweepingSchedule/createSweepingSchedule/createSweepingSchedule.component';
import { ViewSweepingScheduleComponent } from './sweepingSchedule/viewSweepingSchedule/viewSweepingSchedule.component';
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
// import { WasteCollectionComponent } from './desiltationActivities/waste-collection.component';
import { GeneraloperationComponent } from './generaloperation/generaloperation.component';
import { ViewGeneralOperationComponent } from './generaloperation/view-general-operation/view-general-operation.component';
import { EditGeneralOperationWasteComponent } from '@app/modals/editGeneralOperationWaste.component';


@NgModule({
  declarations: [
    ViewTripSheetComponent,
    TripSheetComponent,
    AddTripSheetComponent,
    HouseholdAndPopulationRecordComponent,
    EditHHAndPopulationRecordComponent,
    CreateHHAndPopulationRecordComponent,
    RoutesComponent,
    ViewRoutesComponent,
    EditRoutesComponent,
    ViewHHAndPopulationRecordComponent,
    AddRoutesLinkComponent,
    ReportsComponent,
    WasteCollectionComponent,
    CreateWasteCollectionComponent,
    ViewWasteCollectionComponent,
    CreateDesiltationActivitiesComponent,
    ViewDesiltationActivitiesComponent,
    DesiltationActivityComponent,
    SweepingScheduleComponent,
    ViewSweepingScheduleComponent,
    CreateSweepingScheduleComponent,
    GasCollectionSheetComponent,
    CreateGasCollectionComponent,
    ViewGasCollectionComponent,
    WasteDiversionSheetComponent,
    CreateWasteDiversionSheetComponent,
    ViewWasteDiversionSheetComponent,
    StpComponent,
    CreateStpComponent,
    ViewWasteDiversionSheetComponent,
    AddItemRecoveredComponent,
    SaleRecoveredItemComponent,
    QuantityRecoveredItemListComponent,
    ViewQauntityRecoveredComponent,
    SaleRecoveredItemListComponent,
    ViewSaleItemComponent,
    // EditSaleItemComponent,
    // EditRecoveredItemComponent,
    ViewStpComponent,
    RdfComponent,
    CreateRdfComponent,
    ViewRdfComponent,
    CompostComponent,
    CreateCompostComponent,
    ViewCompostComponent,
    GeneraloperationComponent,
    ViewGeneralOperationComponent,
    EditGeneralOperationWasteComponent
  ],
  imports: [
    SharedModule,
    WastemanagementRoutingModule 
  ]
})
export class WastemanagementModule { } 

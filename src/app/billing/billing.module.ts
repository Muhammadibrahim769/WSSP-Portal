import { NgModule } from '@angular/core';
import { SuspensionComponent } from './suspension/suspension.component';
import { BilladjustmentComponent } from './billadjustment/billadjustment.component';
import { InstallmentComponent } from './installment/installment.component';
import { ConnectionresumptionComponent } from './connectionresumption/connectionresumption.component';
import { UpdateConnectionComponent } from './updateConnection/updateConnection.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateSuspensionComponent } from './suspension/createSuspension/createSuspension.component';
import { SearchSuspensionComponent } from './suspension/searchSuspension/searchSuspension.component';
import { UpdateComponent } from './updateConnection/update/update.component';
import { SharedModule } from '@app/_helpers/shared.module';
import { UpdateConnectionListComponent } from './updateConnection/updateConnectionList.component';
import { SuspendedListComponent } from './suspension/suspendedList.component';
import { SuspendConnectionComponent } from './suspension/suspendConnection.component';
import { ConnectionListComponent } from './newconnection/connectionList.component';
import { ViewBillInstallmentComponent } from './installment/viewBillInstallment/viewBillInstallment.component';
import { NewInstallmentComponent } from './installment/newInstallment/newInstallment.component';
import { ResumeConnectionComponent } from './connectionresumption/resumeConnection/resumeConnection.component';
import { ViewBillAdjustmentComponent } from './billadjustment/viewBillAdjustment/viewBillAdjustment.component';
import { NewAdjustmentComponent } from './billadjustment/newAdjustment/newAdjustment.component';
import { ConsumerupdateComponent } from './consumerupdate/consumerupdate.component';
import { CreateConnectionComponent } from './newconnection/createConnection.component';
import { BillingService } from '@app/services/billing.service';
import { BillingRoutingModule } from './billing-routing.module';
import { BillAdjustmentModalComponent } from '@app/modals/billAdjustmentModal.component';
import { BillInstallmentModalComponent } from '@app/modals/billInstallmentModal.component';
import { ViewAllConnectionInformationComponent } from './newconnection/viewAllConnectionInformation.component';
import { viewNewConnectionInformationComponent } from './newconnection/viewNewConnectionInformation.component';
import { ViewSuspendInfoComponent } from './suspension/viewSuspendInfo.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CreateScheduleComponent } from './scheduler/createSchedule/createSchedule.component';
import { ViewScheduleComponent } from './scheduler/viewSchedule/viewSchedule.component';
import { CloseConnectionComponent } from './closure/closeConnection/closeConnection.component';
import { ClosedConnectionListComponent } from './closure/closedConnectionList.component';
import { EditScheduleComponent } from './scheduler/editSchedule/editSchedule.component';
import { ViewBillComponent } from './newconnection/viewBill.component';
import { DateFormatDirective } from '@app/_helpers/dateFormat.directive';
import { YearMonthFormatDirective } from '@app/_helpers/yearMonthFormat.directive';
import { EditBillInfoComponent } from './editbill/editBillInfo.component';
import { EditBillModalComponent } from '@app/modals/editBillModal.component';
import { DocumentUploadDialogComponent } from '@app/modals/documentUploadModal.component';
import { EditUpdatedConnectionComponent } from './updateConnection/editUpdatedConnection.component';
import { ViewUpdatedConnectionComponent } from './updateConnection/viewUpdatedConnection.component';
import { ViewCurrentBillComponent } from './editbill/viewCurrentBill.copmonent';
import { EditBillComponent } from './editbill/editBill.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ViewMultipleBillsComponent } from './editbill/viewMultipleBills.component';
import { AdvancePaymentListComponent } from './advancePayment/advancePaymentList.component';
import { NewAdvancePaymentComponent } from './advancePayment/newAdvancePayment.component';
import { AdvancePaymentModalComponent } from '@app/modals/advancePaymentModal.component';
import { ViewAdvancePaymentComponent } from './advancePayment/viewAdvancePayment/viewAdvancePayment.component';
import { FundsTransferComponent } from './fundsTransfer/fundsTransfer.component';
import { ViewCloseComponent } from './closure/viewCloseConnection/viewCloseConnection.component';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';

@NgModule({
  declarations: [
    SuspensionComponent,
    BilladjustmentComponent,
    InstallmentComponent,
    ConnectionresumptionComponent,
    UpdateConnectionComponent,
    ReportsComponent,
    UpdateConnectionListComponent,
    SuspendedListComponent,
    SuspendConnectionComponent,
    CreateSuspensionComponent,
    SearchSuspensionComponent,
    SuspendConnectionComponent,
    ViewAllConnectionInformationComponent,
    viewNewConnectionInformationComponent,
    ConnectionListComponent,
    ViewBillInstallmentComponent,
    NewInstallmentComponent,
    CreateConnectionComponent,
    ConsumerupdateComponent,
    ViewBillAdjustmentComponent,
    NewAdjustmentComponent,
    ResumeConnectionComponent,
    UpdateComponent,
    ViewSuspendInfoComponent,
    CloseConnectionComponent,
    ClosedConnectionListComponent,  
    EditBillComponent,
    SchedulerComponent,
    CreateScheduleComponent,
    ViewScheduleComponent,
    EditScheduleComponent,
    ViewBillComponent,
    DateFormatDirective,
    YearMonthFormatDirective,
    EditBillInfoComponent,
    EditBillModalComponent,
    EditUpdatedConnectionComponent,
    ViewUpdatedConnectionComponent,
    ViewCurrentBillComponent,
    ViewMultipleBillsComponent,
    AdvancePaymentListComponent,
    NewAdvancePaymentComponent,
    AdvancePaymentModalComponent,
    ViewAdvancePaymentComponent,
    FundsTransferComponent,
    ViewCloseComponent,
    UploadCsvComponent
  ],

  imports: [    
    SharedModule,
    BillingRoutingModule
  ],
  providers: [
    BillingService,
  ],
  entryComponents: [
    BillAdjustmentModalComponent,
    BillInstallmentModalComponent
  ],
})
export class BillingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { BilladjustmentComponent } from './billadjustment/billadjustment.component';
import { NewAdjustmentComponent } from './billadjustment/newAdjustment/newAdjustment.component';
import { ViewBillAdjustmentComponent } from './billadjustment/viewBillAdjustment/viewBillAdjustment.component';
import { CloseConnectionComponent } from './closure/closeConnection/closeConnection.component';
import { ClosedConnectionListComponent } from './closure/closedConnectionList.component';
import { ConnectionresumptionComponent } from './connectionresumption/connectionresumption.component';
import { ResumeConnectionComponent } from './connectionresumption/resumeConnection/resumeConnection.component';
import { InstallmentComponent } from './installment/installment.component';
import { NewInstallmentComponent } from './installment/newInstallment/newInstallment.component';
import { ViewBillInstallmentComponent } from './installment/viewBillInstallment/viewBillInstallment.component';
import { ConnectionListComponent } from './newconnection/connectionList.component';
import { CreateConnectionComponent } from './newconnection/createConnection.component';
import { ViewAllConnectionInformationComponent } from './newconnection/viewAllConnectionInformation.component';
import { viewNewConnectionInformationComponent } from './newconnection/viewNewConnectionInformation.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchSuspensionComponent } from './suspension/searchSuspension/searchSuspension.component';
import { SuspendConnectionComponent } from './suspension/suspendConnection.component';
import { SuspendedListComponent } from './suspension/suspendedList.component';
import { ViewSuspendInfoComponent } from './suspension/viewSuspendInfo.component';
import { UpdateConnectionComponent } from './updateConnection/updateConnection.component';
import { UpdateConnectionListComponent } from './updateConnection/updateConnectionList.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CreateScheduleComponent } from './scheduler/createSchedule/createSchedule.component';
import { ViewScheduleComponent } from './scheduler/viewSchedule/viewSchedule.component';
import { EditScheduleComponent } from './scheduler/editSchedule/editSchedule.component';
import { ViewBillComponent } from './newconnection/viewBill.component';
import { EditBillComponent } from './editbill/editBill.component';
import { EditBillInfoComponent } from './editbill/editBillInfo.component';
import { EditUpdatedConnectionComponent } from './updateConnection/editUpdatedConnection.component';
import { ViewUpdatedConnectionComponent } from './updateConnection/viewUpdatedConnection.component';
import { ViewCurrentBillComponent } from './editbill/viewCurrentBill.copmonent';
import { ViewMultipleBillsComponent } from './editbill/viewMultipleBills.component';
import { AdvancePaymentListComponent } from './advancePayment/advancePaymentList.component';
import { NewAdvancePaymentComponent } from './advancePayment/newAdvancePayment.component';
import { ViewAdvancePaymentComponent } from './advancePayment/viewAdvancePayment/viewAdvancePayment.component';
import { FundsTransferComponent } from './fundsTransfer/fundsTransfer.component';
import { ViewCloseComponent } from './closure/viewCloseConnection/viewCloseConnection.component';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';

const routes: Routes = [
  {
    path: 'createConnection',
    component: CreateConnectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'connectionList',
    component: ConnectionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'connectionList/viewBill/:id',
    component: ViewBillComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewAllConnectionInformation/:id',
    component: ViewAllConnectionInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewNewConnectionInformation/:id',
    component: viewNewConnectionInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'suspendedList',
    component: SuspendedListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewSuspendInformation',
    component: ViewSuspendInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uploadcsv',
    component: UploadCsvComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'billAdjustment',
    component: BilladjustmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billAdjustment/viewBillAdjustment/:id',
    component: ViewBillAdjustmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bills/viewMultipleBill',
    component: ViewMultipleBillsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billAdjustment/newAdjustment',
    component: NewAdjustmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billInstallment/newInstallment',
    component: NewInstallmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billInstallment',
    component: InstallmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billInstallment/viewBillInstallment',
    component: ViewBillInstallmentComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'connectionResumption',
    component: ConnectionresumptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'connectionResumption/resumeConnection',
    component: ResumeConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateConnection',
    component: UpdateConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editUpadtedConnection/:id',
    component: EditUpdatedConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewUpdatedConnection/:id',
    component: ViewUpdatedConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateConnectionList',
    component: UpdateConnectionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'suspendedConnection',
    component: SuspendConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'suspendConnection/searchSuspension',
    component: SearchSuspensionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scheduler/createSchedule',
    component: CreateScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scheduler/viewSchedule/:id',
    component: ViewScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scheduler/editSchedule/:id',
    component: EditScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'closedConnectionList',
    component: ClosedConnectionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'closeConnection',
    component: CloseConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewCloseConnection',
    component: ViewCloseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bill',
    component: EditBillComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editBill/:id',
    component: EditBillInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewCurrentBill/:id',
    component: ViewCurrentBillComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'advancePaymentList',
    component: AdvancePaymentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'newAdvancePayment',
    component: NewAdvancePaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'advancePaymentView/:id',
    component: ViewAdvancePaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fundsTransfer',
    component: FundsTransferComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }

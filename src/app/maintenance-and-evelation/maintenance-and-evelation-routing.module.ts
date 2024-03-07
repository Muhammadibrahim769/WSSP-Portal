import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { MonthlyExpenseSheetComponent } from './monthly-expense-sheet/monthly-expense-sheet.component';
import { FactorComponent } from './factor/factor.component';
import { CreateKPIComponent } from './kpi/createKPI/createKPI.component';
import { KPIListComponent } from './kpi/kpiList.component';
import { ViewKPIComponent } from './kpi/viewKPI/viewKPI.component';
import { KpidashboardComponent } from './KPI Dashboard/kpidashboard/kpidashboard.component';
import { EditKpiComponent } from './kpi/editKpi.component';
import { ContainersComponent } from './containers/containers.component';
import { CreateContainersComponent } from './containers/createContainers/createContainers.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AddComplaintComponent } from './complaints/add-complaint/add-complaint.component';
import { MonthlyFactorValueComponent } from './monthly-factor-value/monthly-factor-value.component';

const routes: Routes = [

  {
    path: 'monthlyExpenseSheet',
    component: MonthlyExpenseSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monthlyFactorValue',
    component: MonthlyFactorValueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'factor',
    component: FactorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kpiList',
    component: KPIListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createKPI',
    component: CreateKPIComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editKPI/:id',
    component: EditKpiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewKPI',
    component: ViewKPIComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kpiDashboard',
    component: KpidashboardComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'container',
    component: ContainersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createContainer',
    component: CreateContainersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'complaints',
    component: ComplaintsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addcomplaints',
    component: AddComplaintComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceAndEvelationRoutingModule { }

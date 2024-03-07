import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceAndEvelationRoutingModule } from './maintenance-and-evelation-routing.module';
import { MonthlyExpenseSheetComponent } from './monthly-expense-sheet/monthly-expense-sheet.component';
import { SharedModule } from '@app/_helpers/shared.module';
import { FactorComponent } from './factor/factor.component';
import { CreateKPIComponent } from './kpi/createKPI/createKPI.component';
import { KPIListComponent } from './kpi/kpiList.component';
import { FormulaGeneratorComponent } from './kpi/createKPI/formulaGenerator.component';
import { ViewKPIComponent } from './kpi/viewKPI/viewKPI.component';
import { KpidashboardComponent } from './KPI Dashboard/kpidashboard/kpidashboard.component';
import { EditKpiComponent } from './kpi/editKpi.component';
import { ChartModalComponent } from '@app/modals/chartModal.component';
import { ContainersComponent } from './containers/containers.component';
import { CreateContainersComponent } from './containers/createContainers/createContainers.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AddComplaintComponent } from './complaints/add-complaint/add-complaint.component';
import { MonthlyFactorValueComponent } from './monthly-factor-value/monthly-factor-value.component';
// import { MonthlyExpenseSheetComponent } from './monthly-expense-sheet/monthly-expense-sheet.component';


@NgModule({
  declarations: [
    MonthlyExpenseSheetComponent,
    FactorComponent,    
    KPIListComponent,
    CreateKPIComponent,
    FormulaGeneratorComponent,
    ViewKPIComponent,
    KpidashboardComponent,
    EditKpiComponent,
    ContainersComponent,
    CreateContainersComponent,
    ComplaintsComponent,
    AddComplaintComponent,
    MonthlyFactorValueComponent
  ],
  imports: [
    MaintenanceAndEvelationRoutingModule,
    SharedModule
  ]
})
export class MaintenanceAndEvelationModule { }

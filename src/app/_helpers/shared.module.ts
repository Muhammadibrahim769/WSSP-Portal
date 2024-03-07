import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NgxMaskModule } from "ngx-mask";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { ApprovedModalComponent } from "@app/modals/approvedModal.component";
import { BillAdjustmentModalComponent } from "@app/modals/billAdjustmentModal.component";
import { BillInstallmentModalComponent } from "@app/modals/billInstallmentModal.component";
import { CancelModalComponent } from "@app/modals/cancelModal.component";
import { EditFilterationPlantModalComponent } from "@app/modals/editFilterationPlantModal.component";
import { EditModalComponent } from "@app/modals/editModal.component";
import { EditOverHeadTankComponent } from "@app/modals/editOverHeadTank.component";
import { EditWaterProductionModalComponent } from "@app/modals/editWaterProductionModal.component";
import { RejectModalComponent } from "@app/modals/rejectModal.component";
import { ResumeModalComponent } from "@app/modals/resumeModal.component";
import { SubmitModalComponent } from "@app/modals/submitModal.component";
import { SuspendModalComponent } from "@app/modals/suspendModal.component";
import { UpdateModalComponent } from "@app/modals/updateModal.component";
import { DateFormatPipe } from './date-format.pipe';
import { ConnectionApprovedComponent } from "@app/modals/connectionAproved.component";
import { ConnectionRejectedComponent } from "@app/modals/connectionRejected.component";
import { SuspendApprovedModalComponent } from "@app/modals/suspendApproveModal.component";
import { SuspendRejectModalComponent } from "@app/modals/suspendRejectModal.component";
import { ApproveCloseModalComponent } from "@app/modals/approveCloseModal.component";
import { RejectCloseModalComponent } from "@app/modals/rejectCloseModal.component";
import { PerformanceAreaModalComponent } from '@app/modals/performanceAreaModal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormControlPipe } from "./form-control.pipe";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DocumentUploadDialogComponent } from "@app/modals/documentUploadModal.component";

import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from 'echarts';
import { ChartModalComponent } from "@app/modals/chartModal.component";
import { NgxPaginationModule } from "ngx-pagination";
import { EditTabsModalComponent } from "@app/modals/editTabsModal.component";
import { DocumentDialogTestComponent } from "@app/modals/documentDialogTest.component.";


@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    ScrollingModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAS9UT3FFETF1gSHgxra2IkEAwSjMkJsnU',
      libraries: ['places']
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule.setLocale('ar-AE'),
    MatCardModule,
    HttpClientModule,
    MatMomentDateModule,
    MatTableExporterModule,
    MatInputModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ],
  declarations: [
    ApprovedModalComponent,
    EditWaterProductionModalComponent,
    BillAdjustmentModalComponent,
    BillInstallmentModalComponent,
    CancelModalComponent,
    EditFilterationPlantModalComponent,
    EditModalComponent,
    EditOverHeadTankComponent,
    RejectModalComponent,
    EditTabsModalComponent,
    ResumeModalComponent,
    SubmitModalComponent,
    SuspendModalComponent,
    UpdateModalComponent,
    DateFormatPipe,
    ConnectionApprovedComponent,
    ConnectionRejectedComponent,
    SuspendApprovedModalComponent,
    SuspendRejectModalComponent,
    ApproveCloseModalComponent,
    RejectCloseModalComponent,
    PerformanceAreaModalComponent,
    FormControlPipe,
    DocumentUploadDialogComponent,
    DocumentDialogTestComponent,
    ChartModalComponent
  ],
  exports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    NgxMaskModule,
    ScrollingModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    FormControlPipe,
    MatTableExporterModule,
    MatInputModule,
    DocumentDialogTestComponent,
    NgxEchartsModule,
    NgxPaginationModule
  ],
  providers: []
})
export class SharedModule { }

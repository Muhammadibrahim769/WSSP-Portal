import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceAreaModalComponent } from '@app/modals/performanceAreaModal.component';
import { FormulaGeneratorComponent } from './formulaGenerator.component';
import { BillingService } from '@app/services/billing.service';
import { Router } from '@angular/router';
import { CrudService } from '@app/_services/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './createKPI.component.html'
})
export class CreateKPIComponent implements OnInit {
  createkpiForm: FormGroup;
  step = 0;
  newFormula: any = '';
  constructor(private formBuilder: FormBuilder, private shared: CrudService, public dialog: MatDialog, private createKpi: BillingService, private router: Router, ) { }
  performanceArea: any[] = [];
  performanceAreaName: any[] = []
  formulaGenerator: any[] = []
  ngOnInit(): void {
    this.shared.newFormula.subscribe(
      formula => {
        this.newFormula = formula;
      });
    this.createkpiForm = this.formBuilder.group({
      serPerformanceAreaId: [''],
      txtKPICode: [""],
      txtKPIName: [""],
      txtFormula: [''],
      txtDescription: [""],
      numMinValue: [],
      numMaxValue: [],
      txtUom: [""],
      txtCostCenterName: [""],
      blnStatus: [true]
    })
    this.onGetPerformanceArea();
    this.getCostCentreName();
  }
  CostCentre: any;
  getCostCentreName() {
    this.createKpi.getCostCentreName().subscribe(response => {
      this.CostCentre = response;
    })
  }
  openPerformanceModal() {
    const performance = this.dialog.open(PerformanceAreaModalComponent, {
    })
    performance.afterClosed().subscribe(() => {
      this.onGetPerformanceArea();
    });
  }
  openFormulaGenerator() {
    const formula = this.dialog.open(FormulaGeneratorComponent, {
    })
    formula.afterClosed().subscribe(() => {
      this.createkpiForm.controls.txtFormula.patchValue(this.newFormula)
    });
  }
  onGetPerformanceArea() {
    this.createKpi.getPerformanceAreaService().subscribe(Response => {
      this.performanceArea = Response["data"];
    })
  }
  onSubmit() {
    this.createKpi.createKPIService(this.createkpiForm.value).subscribe(Response => {
      console.log(Response);
    })
    this.router.navigate(['/maintenanceAndEveluation/kpiList']);
  }
}

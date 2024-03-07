import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceAreaModalComponent } from '@app/modals/performanceAreaModal.component';
import { BillingService } from '@app/services/billing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '@app/_services/crud.service';
import { FormulaGeneratorComponent } from './createKPI/formulaGenerator.component';


@Component({
    selector: 'app-dashboard',
    templateUrl: './editKpi.component.html'
})
export class EditKpiComponent implements OnInit {
    step = 0;
    editkpiForm: FormGroup;
    Id: any = "";
    test = "";
    newFormula: any = '';
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private billingService: BillingService, private shared: CrudService, public dialog: MatDialog, private createKpi: BillingService, private router: Router, ) { }
    performanceArea: any[] = [];
    performanceAreaName: any[] = []
    formulaGenerator: any[] = []
    editKpiData: any;
    ngOnInit(): void {
        this.shared.newFormula.subscribe(
            formula => {
                this.newFormula = formula;
            });
        this.editkpiForm = this.formBuilder.group({
            serPerformanceAreaId: [''],
            txtKPICode: [""],
            txtKPIName: [""],
            txtFormula: [''],
            txtDescription: [""],
            numMinValue: [],
            numMaxValue: [],
            txtUom: [""],
            txtCostCenterName: [""],
            blnStatus: [true],
            serKpiDefinitionId:[]
        })
        this.route.paramMap.subscribe((params) => {
            this.Id = +params.get("id");
        });
        this.onGetPerformanceArea();
        this.getEditKpiById();
        this.getCostCentreName()
    }
    CostCentre: any;
    getCostCentreName() {
      this.billingService.getCostCentreName().subscribe(response => {
        this.CostCentre = response;
      })
    }
    getEditKpiById() {
        this.billingService.getKpiFindAllById(this.Id).subscribe(response => {
            debugger;
            this.editKpiData = response["data"][0]
            console.log("by Id")
            console.log(this.editKpiData)
            this.editkpiForm.controls.serPerformanceAreaId.patchValue(this.editKpiData.serPerformanceAreaId+'');
            this.editkpiForm.controls.txtKPIName.patchValue(this.editKpiData.txtKPIName);
            this.editkpiForm.controls.txtKPICode.patchValue(this.editKpiData.txtKPICode);
            this.editkpiForm.controls.txtFormula.patchValue(this.editKpiData.txtFormula);
            this.editkpiForm.controls.numMinValue.patchValue(this.editKpiData.numMinValue);
            this.editkpiForm.controls.numMaxValue.patchValue(this.editKpiData.numMaxValue);
            this.editkpiForm.controls.txtUom.patchValue(this.editKpiData.txtUom);
            this.editkpiForm.controls.txtCostCenterName.patchValue(this.editKpiData.txtCostCenterName);
            this.editkpiForm.controls.txtDescription.patchValue(this.editKpiData.txtDescription);
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
            this.editkpiForm.controls.txtFormula.patchValue(this.newFormula)
        });
    }
    onGetPerformanceArea() {
        this.createKpi.getPerformanceAreaService().subscribe(Response => {
            this.performanceArea = Response["data"];
        })
    }
    onSubmit() {
        this.editkpiForm.controls.serKpiDefinitionId.patchValue(this.Id);
        this.createKpi.createKPIService(this.editkpiForm.value).subscribe(Response => {
            console.log(Response);
        })
        this.router.navigate(['/maintenanceAndEveluation/kpiList']);
    }

}
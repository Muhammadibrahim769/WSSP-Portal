import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BillingService } from '@app/services/billing.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
export interface PeriodicElement {
  servicesType: string;
  servicesName:string;
  Rate: number;
  UOM: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Rate: 1000, servicesType: 'A', UOM: 1, servicesName: 'A'},
  {Rate: 2000, servicesType: 'B', UOM: 4, servicesName: 'B'},
  {Rate: 3000, servicesType: 'C', UOM: 6, servicesName: 'C'},
  {Rate: 4000, servicesType: 'D', UOM: 9, servicesName: 'D'}]

@Component({
  selector: 'app-dashboard',
  templateUrl: './consumerupdate.component.html'
})
export class ConsumerupdateComponent implements OnInit {

  basicInfo: any;
  updateForm: FormGroup;

  step = 0;
  displayedColumns: string[] = ['select', 'servicesType', 'UOM', 'servicesName','Rate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Rate + 1}`;
  }
  constructor(private formbuilder: FormBuilder , private billingService: BillingService) { }

  ngOnInit(): void {

    this.updateForm = this.formbuilder.group({
      txtConsumerId : ['', Validators.required]
    })
  }
}

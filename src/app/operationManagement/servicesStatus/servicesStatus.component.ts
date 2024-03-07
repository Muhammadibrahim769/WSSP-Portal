import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface PeriodicElement{
  date: string;
  
  Zone: string;
  unionCouncil: string;
  assetSubCategory: string;
  assetStatus: string;
  assetType: string;
  totalPopulation:string;
  avgDischarge:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { date: '12/04/2021', Zone: 'B', unionCouncil: 'B', assetSubCategory: 'B', assetStatus: 'A', assetType: 'A',totalPopulation:'1.2 billion',avgDischarge:'xyz'},
  { date: '23/02/2019', Zone: 'B', unionCouncil: 'A', assetSubCategory: 'A', assetStatus: 'A', assetType: 'A',totalPopulation:'1.7 billion',avgDischarge:'xyz'},
  { date: '23/07/2018', Zone: 'A', unionCouncil: 'B', assetSubCategory: 'B', assetStatus: 'A', assetType: 'A',totalPopulation:'1.7 billion',avgDischarge:'abc'},
  { date: '12/04/2018', Zone: 'A', unionCouncil: 'A', assetSubCategory: 'A', assetStatus: 'B', assetType: 'B',totalPopulation:'1.2 billion',avgDischarge:'abc'},
  { date: '12/04/2021', Zone: 'B', unionCouncil: 'A', assetSubCategory: 'A', assetStatus: 'B', assetType: 'A',totalPopulation:'1.4 billion',avgDischarge:'xyz'},

]

@Component({
  selector: 'app-dashboard',
    templateUrl: './servicesStatus.component.html',
  })
  export class ServicesStatusComponent implements OnInit {
    householdAndPopulationForm:FormGroup
    step = 0;
    constructor(private formBuilder: FormBuilder) { }
    displayedColumns: string[] = ['Zone', 'unionCouncil', 'assetSubCategory','assetType', 'assetStatus', 'date','totalPopulation','avgDischarge','Actions'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    clearDate(){
      this.householdAndPopulationForm.controls.txtDate.reset('');
    }
    ngOnInit(): void {
      this.householdAndPopulationForm = this.formBuilder.group({
        txtZone: [''],     
        txtUnionCouncil: [''],
        txtDate:[''],
        txtAssetSubCategory:[''],
        txtAssetType:[''],
        txtTotalPopulation:[''],
        txtAssetStatus:[''],
        txtAvgDischarge:['']
      })
    }
    
    setStep(index: number) {
      this.step = index;
      }
  
  }
  
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectModalComponent } from '@app/modals/rejectModal.component';
import { EditWaterProductionModalComponent } from '@app/modals/editWaterProductionModal.component';
import { BillingService } from '@app/services/billing.service';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import {default as _rollupMoment} from 'moment';
// const moment = _rollupMoment || _moment;

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-y',
  },
  display: {
    dateInput: 'MMM-y',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './monthly-expense-sheet.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthlyExpenseSheetComponent implements OnInit {
  monthlyExpenseSheetForm: FormGroup;
  selectStatusList: any[] = [];
  updateFilterData: any[] = [];
  totalRunning: String;
  total_a_expense = 0;
  total_b_expense = 0;
  total_c_expense = 0;
  total_d_expense = 0;
  constructor(
    private dateFormat: DateFormatPipe,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private billingService: BillingService
  ) {}
  public myDates: any = {};
  @ViewChild('picker') datePickerElement = MatDatepicker;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.monthlyExpenseSheetForm.controls.txtMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.monthlyExpenseSheetForm.controls.txtMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.monthlyExpenseSheetForm.controls.txtMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.monthlyExpenseSheetForm.controls.txtMonth.setValue(ctrlValue);
    console.log('ghjsdkasd');
    console.log(this.monthlyExpenseSheetForm.controls.txtMonth);
    datepicker.close();
  }
  blnIsActive: boolean;
  OnlyNumbersAllowed(event): boolean {
    const charcode = event.which ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
  clearPeriod() {
    this.monthlyExpenseSheetForm.controls.txtMonth.reset('');
  }
  branchList: any[] = [];
  unionCouncilList: any[] = [];
  monthlyExpenseSheetColumn: string[] = [
    'sr',
    'mainHead',
    'subHead',
    'costCenter',
    'headOffice',
    'zoneA',
    'zoneB',
    'zoneC',
    'zoneD',
  ];

  monthlyExpenseSheet = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.monthlyExpenseSheetForm = this.formBuilder.group({
      serExpanseDetailId: [],
      serExpanseId: [],
      txt_main_head: [''],
      txt_sub_head: [''],
      serCostCentreId: [],
      txtCostCentre: [''],
      ser_branch_ho_id: [],
      serBranchAId: [],
      serBranchBId: [],
      serBranchCId: [],
      txtMonth: [moment(), Validators.required],
      serBranchDId: [],
      numBranchHoExpanse: [],
      numBranchAExpanse: [],
      numBranchBExpanse: [],
      num_branchCExpanse: [],
      numBranchDExpanse: [],
      dteCreatedDate: [],
    });
    this.onGet();
    this.pdfImplementation();
  }
  responseList: any[] = [];
  monthlyExpenseSheetList: any = '';
  onGet() {
    let txtMonth = this.dateFormat.transform(this.monthlyExpenseSheetForm.controls.txtMonth.value)
    this.billingService
      .getAllMonthlyExpenseSheetDataService(txtMonth)
      .subscribe((response) => {
        debugger;
        this.monthlyExpenseSheetList = response;
        this.monthlyExpenseSheet = new MatTableDataSource(
          this.monthlyExpenseSheetList
        );
        this.monthlyExpenseSheet.sort = this.sort;
      });
  }
  onSubmit() {
    console.log(this.monthlyExpenseSheetForm.value);
    let txtMonth = this.dateFormat.transform(
      this.monthlyExpenseSheetForm.controls.txtMonth.value
    );
    // let txt_main_head = this.monthlyExpenseSheetForm.controls.txt_main_head.value;
    // let txt_sub_head = this.monthlyExpenseSheetForm.controls.txt_sub_head.value;
    console.log(txtMonth);
    this.billingService
      .searchMonthlyExpenseSheetDataService(txtMonth)
      .subscribe((response) => {
        debugger;
        this.selectStatusList = [];
        if (response['data'].length === 0) {
          this.selectStatusList = [];
          this.monthlyExpenseSheet = new MatTableDataSource(
            this.selectStatusList
          );
          this.total_a_expense = 0;
          this.total_b_expense = 0;
          this.total_c_expense = 0;
          this.total_d_expense = 0;
          alert('No Record Found for ' + txtMonth);
          return;
        }
        this.responseList = response['data'];
        this.responseList.forEach((element) => {
          this.total_a_expense =
            this.total_a_expense + element.num_branch_a_expense;
          this.total_b_expense =
            this.total_b_expense + element.num_branch_b_expense;
          this.total_c_expense =
            this.total_c_expense + element.num_branch_c_expense;
          this.total_d_expense =
            this.total_d_expense + element.num_branch_d_expense;
          this.selectStatusList.push(element);
          this.monthlyExpenseSheet = new MatTableDataSource(
            this.selectStatusList
          );
          this.monthlyExpenseSheet.sort = this.sort;

          // this.monthlyExpenseSheet.paginator = this.monthlyExpenseSheetPaginator;
        });
        this.pdfImplementation();
      });
  }
  mainHeadFilter(v) {
    this.total_a_expense = 0;
    this.total_b_expense = 0;
    this.total_c_expense = 0;
    this.total_d_expense = 0;
    this.monthlyExpenseSheet.filter = v;
    debugger;
    this.updateFilterData = this.monthlyExpenseSheet.filteredData;
    this.updateFilterData.forEach((element) => {
      this.total_a_expense =
        this.total_a_expense + element.num_branch_a_expense;
      this.total_b_expense =
        this.total_b_expense + element.num_branch_b_expense;
      this.total_c_expense =
        this.total_c_expense + element.num_branch_c_expense;
      this.total_d_expense =
        this.total_d_expense + element.num_branch_d_expense;
    });
  }
  // myFunction() {
  //   var d = new Date();
  //   var n = d.getMonth();
  //   document.getElementById("demo").innerHTML = n.toString();
  // }
  mneDataList: any[] = [];
  mneReportDTOList: any[] = [];
  pdfImplementation() {
    // let txtBatchNo = this.searchForm.controls.txtBatchNo.value;
    // let serBranchId = this.searchForm.controls.serBranchId.value;
    // let serLocationId = this.searchForm.controls.serLocationId.value;
    // let txtCostCentre = this.searchForm.controls.txtCostCentre.value;
    // this.billingService.getAllRecordForTripSheet(serBranchId, serLocationId, txtCostCentre, txtBatchNo).subscribe(

    this.mneDataList = this.responseList;
    console.log('daownload data ');
    console.log(this.mneDataList);

    this.mneReportDTOList.push([
      { text: 'Sr#', bold: true },
      { text: 'Main Head', bold: true },
      { text: 'Sub Head', bold: true },
      { text: 'Cost Center', bold: true },
      { text: 'Head Office', bold: true },
      { text: 'Zone A', bold: true },
      { text: 'Zone B', bold: true },
      { text: 'Zone C', bold: true },
      { text: 'Zone D', bold: true },
    ]);
    this.mneDataList.forEach((mneDataList, i) => {
      this.mneReportDTOList.push([
        { text: (i + 1).toString(), alignment: 'right' },
        { text: mneDataList.txt_main_head, alignment: 'left' },
        { text: mneDataList.txt_sub_head, alignment: 'left' },
        { text: mneDataList.txtCostCentre, alignment: 'left' },
        { text: mneDataList.numBranchHoExpanse, alignment: 'left' },
        { text: mneDataList.numBranchAExpanse, alignment: 'right' },
        { text: mneDataList.numBranchBExpanse, alignment: 'right' },
        { text: mneDataList.num_branchCExpanse, alignment: 'right' },
        { text: mneDataList.numBranchDExpanse, alignment: 'right' },
      ]);
    });
  }
  downloadPDF() {
    console.log(this.selection);
    this.mneReportDTOList = [];
    let tableHeader: any[] = [];
    this.selection.value.forEach((element) => {
      if (element === 'sr') {
        tableHeader.push({
          text: 'Sr#',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'mainHead') {
        tableHeader.push({
          text: 'Main Head',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'subHead') {
        tableHeader.push({
          text: 'Sub Head',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'costCenter') {
        tableHeader.push({
          text: 'Cost Center',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'headOffice') {
        tableHeader.push({
          text: 'Head Office',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'zoneA') {
        tableHeader.push({
          text: 'Zone A',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'zoneB') {
        tableHeader.push({
          text: 'Zone B',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'zoneC') {
        tableHeader.push({
          text: 'Zone C',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      } else if (element === 'zoneD') {
        tableHeader.push({
          text: 'Zone D',
          bold: true,
          fillColor: '#dddddd',
          alignment: 'center',
        });
      }
    });
    this.mneReportDTOList.push(tableHeader);
    console.log(this.mneReportDTOList);
    this.mneDataList.forEach((mneDataList, i) => {
      let tableRows: any[] = [];
      this.selection.value.forEach((element) => {
        if (element === 'sr') {
          tableRows.push({ text: i + 1, alignment: 'right' });
        } else if (element === 'mainHead') {
          tableRows.push({
            text: mneDataList.txt_main_head,
            alignment: 'left',
          });
        } else if (element === 'subHead') {
          tableRows.push({ text: mneDataList.txt_sub_head, alignment: 'left' });
        } else if (element === 'costCenter') {
          tableRows.push({
            text: mneDataList.txtCostCentre,
            alignment: 'left',
          });
        } else if (element === 'headOffice') {
          tableRows.push({
            text: mneDataList.numBranchHoExpanse,
            alignment: 'left',
          });
        } else if (element === 'zoneA') {
          tableRows.push({
            text: mneDataList.numBranchAExpanse,
            alignment: 'left',
          });
        } else if (element === 'zoneB') {
          tableRows.push({
            text: mneDataList.numBranchBExpanse,
            alignment: 'left',
          });
        } else if (element === 'zoneC') {
          tableRows.push({
            text: mneDataList.num_branchCExpanse,
            alignment: 'left',
          });
        } else if (element === 'zoneD') {
          tableRows.push({
            text: mneDataList.numBranchDExpanse,
            alignment: 'left',
          });
        }
      });
      this.mneReportDTOList.push(tableRows);
    });

    const documentDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            // widths: [200, 170, 200, 170],
            body: [
              [
                {
                  image:
                    'data:image/png;base64,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',
                },
                [
                  {
                    text: 'M & E Report',
                    style: 'dateHeader',
                    alignment: 'center',
                    margin: [200, 60, 150, 0],
                    bold: true,
                    fontSize: 16,
                  },
                ],
                {
                  image:
                    'data:image/png;base64,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',
                  width: 100,
                  height: 100,
                  alignment: 'right',
                  margin: [0, 0, -80, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: this.mneReportDTOList,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
        },
        tableHeaderValue: {
          fontSize: 10,
          color: 'black',
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };

    pdfMake.createPdf(documentDefinition).download('M & E List.pdf');
  }

  tableColumn: string[] = [
    'sr',
    'mainHead',
    'subHead',
    'costCenter',
    'headOffice',
    'zoneA',
    'zoneB',
    'zoneC',
    'zoneD',
  ];
  selection = new FormControl([
    'sr',
    'mainHead',
    'subHead',
    'costCenter',
    'headOffice',
    'zoneA',
    'zoneB',
    'zoneC',
    'zoneD',
  ]);
  selectingColumns() {
    if (this.selection.value.length > 0) {
      this.tableColumn.forEach((singleColumn) => {
        let display = '';
        if (singleColumn !== 'sr') {
          let columnSelected = this.selection.value.findIndex(
            (x) => x === singleColumn
          );
          if (columnSelected >= 0) {
            display = 'table-cell';
          } else {
            display = 'none';
          }
          const slides = document.getElementsByClassName(
            'mat-column-' + singleColumn
          );
          for (let i = 0; i < slides.length; i++) {
            const slide = slides[i] as HTMLElement;
            slide.style.display = display;
          }
        }
      });
    }
  }
}

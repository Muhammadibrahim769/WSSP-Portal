import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceAreaModalComponent } from '@app/modals/performanceAreaModal.component';
import { BillingService } from '@app/services/billing.service';
import { CrudService } from '@app/_services/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './formulaGenerator.component.html',
  styleUrls: ['./formulaGenerator.component.css']
})
export class FormulaGeneratorComponent implements OnInit {
  formulaGeneratorList: any[] = [];
  factorListForm: FormGroup
  isLoading = true;
  dataSource = null;
  constructor(private formulaGenerator: BillingService, private formBuilder: FormBuilder,private shared :CrudService) { }
  ngOnInit() {
    this.factorListForm = this.formBuilder.group({
      txtFactorCode: []
    })
    this.onGetAllFactor();
  }
  onGetAllFactor() {
    this.formulaGenerator.getFactorFindAll().subscribe(Response => {
      this.formulaGeneratorList = Response["data"];
      this.isLoading = false;
      this.dataSource = Response["data"];
      console.log("Response");
      console.log(Response);
      // this.isLoading = false;
      // this.dataSource = Response["data"];
      // this.selectFactorList = [];

    })
  }

  fact = ''

  // onChange(event) {
  //   debugger
  //   let factor :any
   
  //   factor=this.factorListForm.controls.serFactorId.value;
  //   console.log("factor selected")
  //   console.log(factor[0])
  //   this.input += factor[0]

  // }
  input: string = '';
  result: string = '';


  pressNum(num: string) {
    //Do Not Allow . more than once
    // if (num==".") {
    //   if (this.input !="" ) {

    //     const lastNum=this.getLastNumber()
    //     console.log(lastNum.lastIndexOf("."))
    //     if (lastNum.lastIndexOf(".") >= 0) return;
    //   }
    // }

    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      // else if(this.input==this.factorListForm.controls['serFactorId'].value){
      //   this.input = this.input + this.factorListForm.controls['serFactorId'].value
      // }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }


  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '(' ) {
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }


  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
    if (this.fact != "") {
      this.fact = this.fact.substr(0, this.fact.length - 1)
    }

  }

  allClear() {
    this.result = '';
    this.input = '';
    this.fact = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    // this.result = eval(formula);
    this.shared.getFormula(formula);

  }
  onChange(event){
    let factor :any
   
    factor=this.factorListForm.controls.txtFactorCode.value;
    console.log("factor selected")
    console.log(factor[0])
    this.input += factor[0]
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    // this.result = eval(formula);
    this.shared.getFormula(formula);

  }
  

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    this.shared.changeMessage(this.input);
  }

}
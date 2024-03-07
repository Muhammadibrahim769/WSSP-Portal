import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '@app/_helpers/ApplicationHelperDTO';
import { environment } from '@environments/environment';
// import { env } from 'node:process';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) { }

//   createVehicle(createVehicle:any[]){
//     return this.httpClient.put(environment.apiUrl,createVehicle)
//   }
//   getData()
//   {
    
// return this.httpClient.get(environment.apiUrl);
    
//   }
  // editmodel(editWaterProductionModel:any[]){
  //   return this.httpClient.put(environment.apiUrl,editWaterProductionModel)
  // }
  debugger;
  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();


  changeMessage(message: any) {
    debugger;
    this.messageSource.next(message)
  }
  // registerVehicleService(registerVehicle: any) {
  //   return this.httpClient.post<ServiceResponse>(environment.apiUrl + "Vehicleregistration", registerVehicle);
  // }
  private formulaGenerator = new BehaviorSubject({});
    newFormula = this.formulaGenerator.asObservable();
  
    getFormula(formula: any) {
        this.formulaGenerator.next(formula);
    }
}

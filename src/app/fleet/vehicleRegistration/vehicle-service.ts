import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VehicleService {
    private editVehicle = new BehaviorSubject({});
    currentVehicle = this.editVehicle.asObservable();
    constructor() { }
    selectVehicle(vehicle: any) {
        this.editVehicle.next(vehicle);
    }
}
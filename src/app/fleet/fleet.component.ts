import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '@app/_services/crud.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';


export interface PeriodicElement {
  sNo:number; 
  Vehicle_Type:string;
  Brand:string;
  Model:number
  Asset_No:string;
Vehicle_Name:string;
Serial_No:number;
EngineNo:string;
Chassis_No:string;
colour:string;
Fuel_Type:string;
Fuel_Capacity:string;
Average_Fuel_Consumption:string;
Engine_Cylinder:string;
Engine_Size:string;
Load_Capacity:string;
Body_Type:string;
Current_Status:string;
Current_Condition:string;
With_Effect_From:string;
Servicable_Time:string;
Un_Servicable_Time:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sNo: 1, Vehicle_Type: 'A', Brand: "Toyota", Model: 2009, Asset_No:'kpk-2233',Vehicle_Name: 'Honda', Serial_No:7,
  EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'red',  Fuel_Type:'Cng',Fuel_Capacity:'16 liters',
  Average_Fuel_Consumption:'10 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
  Current_Status:'Non Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2120',Servicable_Time:'7 years',
  Un_Servicable_Time:'1 year'
},
{sNo: 2, Vehicle_Type: 'B', Brand: "Corolla", Model: 2015, Asset_No:'Riw-786',Vehicle_Name: 'XLI', Serial_No:453,
EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'Black',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2019',Servicable_Time:'16 years',
Un_Servicable_Time:'1 year'
},
{sNo: 3, Vehicle_Type: 'A', Brand: "Toyota", Model: 2010, Asset_No:'isld-786',Vehicle_Name: 'Honda', Serial_No:12,
  EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'gray',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
  Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
  Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
  Un_Servicable_Time:'3 year'
},
{sNo: 4, Vehicle_Type: 'B', Brand: "Corolla", Model: 2015, Asset_No:'Riw-786',Vehicle_Name: 'XLI', Serial_No:453,
EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'Black',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
Un_Servicable_Time:'1 year'
},
{sNo: 5, Vehicle_Type: 'A', Brand: "Toyota", Model: 2010, Asset_No:'kpk-5235',Vehicle_Name: 'Honda', Serial_No:12,
  EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'white',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
  Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
  Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
  Un_Servicable_Time:'1 year'
},
{sNo: 6, Vehicle_Type: 'B', Brand: "Corolla", Model: 2002, Asset_No:'Riw-786',Vehicle_Name: 'Mini Dumper', Serial_No:453,
EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'Black',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
Un_Servicable_Time:'1 year'
},
{sNo: 7, Vehicle_Type: 'A', Brand: "Toyota", Model: 2010, Asset_No:'isld-786',Vehicle_Name: 'Honda', Serial_No:12,
  EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'white',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
  Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
  Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
  Un_Servicable_Time:'1 year'
},
{sNo: 8, Vehicle_Type: 'B', Brand: "Corolla", Model: 2015, Asset_No:'Riw-786',Vehicle_Name: 'XLI', Serial_No:453,
EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'Black',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
Un_Servicable_Time:'1 year'
},
{sNo: 9, Vehicle_Type: 'A', Brand: "Toyota", Model: 2010, Asset_No:'isld-786',Vehicle_Name: 'Honda', Serial_No:12,
  EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'white',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
  Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
  Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
  Un_Servicable_Time:'1 year'
},
{sNo: 10, Vehicle_Type: 'B', Brand: "Corolla", Model: 2015, Asset_No:'Riw-786',Vehicle_Name: 'XLI', Serial_No:453,
EngineNo:'12234567hg',Chassis_No:'67568245gg',colour:'Black',  Fuel_Type:'Cng',Fuel_Capacity:'12 liters',
Average_Fuel_Consumption:'6 liters',Engine_Cylinder:'90',Engine_Size:'Nil',Load_Capacity:'15 tan',Body_Type:'A',
Current_Status:'Operational',Current_Condition:'Ok',With_Effect_From:'12/21/2121',Servicable_Time:'10 years',
Un_Servicable_Time:'1 year'
},
]
@Component({  selector: 'app-dashboard',
templateUrl: 'fleet.component.html' })
export class FleetComponent implements AfterViewInit {
  form: FormGroup;
  addForm: FormGroup;
  user: User;
  search:boolean=true;
    add:boolean=false;
    panelOpenState = true;
    page=1;
    pageSize=5;
  message: any;
  subscription: Subscription;
  createVehicle: any[] = [];
  displayedColumns: string[] = [ 'sNo', 'Vehicle_Type', 'Brand','Model','Asset_No','Vehicle_Name','Serial_No',
  'EngineNo','Chassis_No','colour','Fuel_Type','Fuel_Capacity','Average_Fuel_Consumption','Engine_Cylinder',
  'Engine_Size','Load_Capacity','Body_Type','Current_Status','Current_Condition','With_Effect_From',
  'Servicable_Time','Un_Servicable_Time'];
 
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor( private modalService: NgbModal, private formBuilder: FormBuilder, private shared:CrudService) {
 
  }
 
  
  // createVehicleData;

  // SubmitCompanydata(){
  //     this.createVehicleData = this.shared.sharedcreateVehicleInfo;   
  // }
  

  OnlyNumbersAllowed(event):boolean
  {

const charcode=(event.which)?event.which : event.keycode;

if(charcode > 31 &&(charcode <48 || charcode >57))
{
return false;

}

    return true;
  }

  


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  searchFunction(){
    
    
}

addFunction(){
    
}



  // formValidationMessages = {
  //   txtVehicleType:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtVehicleId:[{
  //     type: "required",
  //     message:"This field is required",
      
  //   }],
  //   txtVehicleName:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtbrand :[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtSerialNo:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtModel:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtEngineNo:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
  //   txtChassisNo:[{
  //     type: "required",
  //     message:"This field is required"
  //   }],
    
  //   txtWithEffectFromDate:[{
  //     type: "required",
  //     message:"This field is required"
  //   }]
  // }

  ngOnInit() {
    
    this.shared.currentMessage.subscribe(message =>{     
      this.createVehicle.push(message);     
    })

    
    this.form = this.formBuilder.group({
      txtMainCategory:[""],
      txtVehicleCategory:[""],
      txtVehicleSubCategory:[""],
      txtVehicleType:[''],
      txtVehicleId:[
        '',
        
      ],
      txtVehicleName:[
        '',
        
      ],
      txtSerialNo:[
        '',
        
      ],
      txtbrand:[""],
      txtVehicleMake:[""],
      txtVehicleModel:["",],
      txtEngineNo:[
        '',
        
      ],
      txtChassisNo:[
        '',
      
      ],
      txtVehicleColor:[""],
      txtVehicleStatus:[""], 
      txtFuelType:[""],
      txtFuelCapacity:[""],
      txtAverageFuel:[""],
      txtVehicleLoadCapcity:[""],
      txtDescription:[""],
      txtBranchId :[
        ""
      ],
      txtModel:['',],
      txtServicableTime:[""],
      txtUnServicableTime:[""],
      txtEngineCylinder:[""],
            txtWithEffectFromDate:['', ],
            txtBodyType:[""],
            txtBodySize:[""],
            txtCurrentStatus:[""],
            txtxCurrentCondition:[""],

            txtEngineSize:[""],
            txtReserveTankCapacity:[""],
            txtTotalRunning:[""],
            txtMeasurementUnit:[""],
            txtDriverDesignation:[""],
            txtWithEffectFrom:[""],
            txtDriverName:[""],
            txtDriverNo:[""],


      })
  }


  
  onSubmit(form: any) {
    // console.log(this.form.value);
    this.form.reset;
  }
  onSave() {
    // console.log(this.addForm.value);
  }
  // deleteFieldValue(index) {
    
  //   if(confirm('Do you want to delete this Row ?'))
  //       this.createVehicle.splice(index, 1);
  //   }
    onEdit(index){
console.log(this.createVehicle)
this.form.patchValue(index)
this.shared.changeMessage(this.createVehicle);


    }
// sweetAlert to show popup on delete button
openSweetAlert(index){
  // if(confirm('Do you want to delete this Row ?'))
  
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Row!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.createVehicle.splice(index, 1);
      Swal.fire(
        'Deleted!',
        'Your Row has been deleted.',
        'success'
      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your Row is safe :)',
        'error'
      )
    }
  })
}
}




//   createVehicle=
//   [
//     {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//   brand:"toyota corolla",
//   Model:"XLI-2019",
//   vehicle_No:"TC/XLI-18/1",
//   Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//   SerialNo:"kpk-123",
//   EngineNo:"",
//   ChassisNo:"",
//   colour:"white",
//   Fuel_Type:"",
//   FuelCapacity:"",
//   AverageFuelConsumption:"",
//   Engine_Cylinder:"",
//   Engine_Size:"",
//   LoadCapacity:"",
//   Current_Status:"",
//   Current_Condition:"",
//   With_Effect_From:"",
//   Servicable_Time:"",
//   Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//   brand:"toyota corolla",
//   Model:"XLI-2019",
//   vehicle_No:"TC/XLI-18/1",
//   Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//   SerialNo:"kpk-123",
//   EngineNo:"",
//   ChassisNo:"",
//   colour:"white",
//   Fuel_Type:"",
//   FuelCapacity:"",
//   AverageFuelConsumption:"",
//   Engine_Cylinder:"",
//   Engine_Size:"",
//   LoadCapacity:"",
//   Current_Status:"",
//   Current_Condition:"",
//   With_Effect_From:"",
//   Servicable_Time:"",
//   Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//     brand:"toyota corolla",
//     Model:"XLI-2019",
//     vehicle_No:"TC/XLI-18/1",
//     Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//     SerialNo:"kpk-123",
//     EngineNo:"",
//     ChassisNo:"",
//     colour:"white",
//     Fuel_Type:"",
//     FuelCapacity:"",
//     AverageFuelConsumption:"",
//     Engine_Cylinder:"",
//     Engine_Size:"",
//     LoadCapacity:"",
//     Current_Status:"",
//     Current_Condition:"",
//     With_Effect_From:"",
//     Servicable_Time:"",
//     Un_Servicable_Time:""
//   },
//   {type:"Motor Car",
//   brand:"toyota corolla",
//   Model:"XLI-2019",
//   vehicle_No:"TC/XLI-18/1",
//   Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
//   SerialNo:"kpk-123",
//   EngineNo:"",
//   ChassisNo:"",
//   colour:"white",
//   Fuel_Type:"",
//   FuelCapacity:"",
//   AverageFuelConsumption:"",
//   Engine_Cylinder:"",
//   Engine_Size:"",
//   LoadCapacity:"",
//   Current_Status:"",
//   Current_Condition:"",
//   With_Effect_From:"",
//   Servicable_Time:"",
//   Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
// {type:"Motor Car",
// brand:"toyota corolla",
// Model:"XLI-2019",
// vehicle_No:"TC/XLI-18/1",
// Name:"Toyota corolla/XLI 2019-TC/XLI-18/1",
// SerialNo:"kpk-123",
// EngineNo:"",
// ChassisNo:"",
// colour:"white",
// Fuel_Type:"",
// FuelCapacity:"",
// AverageFuelConsumption:"",
// Engine_Cylinder:"",
// Engine_Size:"",
// LoadCapacity:"",
// Current_Status:"",
// Current_Condition:"",
// With_Effect_From:"",
// Servicable_Time:"",
// Un_Servicable_Time:""
// },
//   ]



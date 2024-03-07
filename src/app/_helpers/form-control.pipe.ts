import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formControl'
})
export class FormControlPipe implements PipeTransform {

  transform(value: string): string {

    
    switch (value) {
       /*common Column*/
       case 'sr': return 'Sr '
       case 'txtBranchName': return 'Zone / Branch'
       case 'txtLocationName': return 'Union Council '
       case 'txtRouteNo': return 'Route No'
       case 'txtRouteName': return 'Route Name'
       /*common Column*/
 
      case 'VehicleType': return 'Asset Type '
      case 'VehicleId': return 'Asset No'
      case 'VehicleName': return 'Asset Name '
      case 'MaintenanceItem': return 'Maintenance Item'
      case 'Uom': return 'Uom'
      case 'Life': return 'Life'
      case 'ItemSubCategory': return 'Item Sub Category'
      case 'ItemName': return 'Item Name'
      case 'Quantity': return 'Quantity'
      case 'LifeUOM': return 'Life UOM'
      case 'Description': return 'Description'
       /* Route Column*/
       case 'distance': return 'Distance'

       /* Route Column*/
 
       /* Fleet Column*/   
    case 'txtVehicleType': return 'Vehicle Type'
    case 'txtBrand': return 'Brand'
    case 'txtModel': return 'Model'
    case 'txtAssetNo': return 'Asset No'
    case 'txtVehicleName': return 'Vehicle Name'
    case 'numSerialNo': return 'Serial No'
    case 'txtEngineNo': return ' Engine No'
    case 'txtChassisNo': return ' Chassis No'
    case 'txtColour': return ' Colour'
    case 'txtFuelType': return ' Fuel Type'
    case 'txtFuelCapacity': return 'Fuel Capacity'
    case 'txtAverageFuelConsumption': return 'Average Fuel Consumption'
    case 'txtEngineCylinder': return 'Engine Cylinder'
    case 'txtEngineSize': return 'Engine Size'
    case 'txtLoadCapacity': return 'Load Capacity'
    case 'txtBodyType': return 'Body Type'
    case 'txtCurrentStatus': return 'Current Status'
    case 'txtCurrentCondition': return 'Current Condition'
    case 'dteWithEffectFrom': return 'With Effect From'
    case 'dteServicableTime': return 'Servicable Time'
    case 'dteUnServicableTime': return 'Un Servicable Time'
    case 'txtRouteType': return 'Route Type'
    
      /* Fleet Column*/
      /* Trip Sheet Column*/
      case 'asset_no': return 'Vehicle No'
      case 'vehicle_name': return 'vehicle Name'
      case 'driver_name': return 'Driver Name'
      case 'route_distance': return 'Route Distance'
      case 'distance_covered': return 'Distance Covered'
      case 'trip_no': return 'trip No'
      case 'time_out': return 'Time Out'
      case 'odometer_out': return 'Odometer Out'
      case 'time_in': return 'Time In'
      case 'odometer_in': return 'Odometer In'
      case 'total_distance': return 'Total Distance'
      case 'total_load': return 'Total Load'
      case 'tripDate': return 'Trip Date'
      
      /* Trip Sheet Column*/
        /*M & E Column */
   
    case 'mainHead': return 'Main Head'
    case 'subHead': return 'Sub Head'
    case 'costCenter': return 'Cost Center'
    case 'headOffice': return 'Head Office'
    case 'zoneA': return 'Zone A'
    case 'zoneB': return 'Zone B'
    case 'zoneC': return 'Zone C'
    case 'zoneD': return 'Zone D'     
    case 'txtAreaName': return 'Area Name'
    case 'txtAreaCode': return 'Area Code'
    case 'txtKPICode': return 'KPI Code'
    case 'txtKPIName': return 'KPI Name'

  /*M & E Column */
  /*Factor Column */
  case 'numFactorCode': return 'Factor Code'
  case 'txtFactorName': return 'Factor Name'
  case 'txtDescription': return 'Description'
  /*Factor Column */
   /*KPI Column */
   case 'txtperformanceAreaName': return 'Performance Area Name'
   case 'txtperformanceAreaCode': return 'Performance Area Code'
   case 'numkpiCode': return 'KPI Code'
   case 'txtKpiName': return 'KPI Name'
   case 'numMinValue': return 'Min Value'
   case 'numMaxValue': return 'Max Value'
   case 'txtFormula': return 'Formula'
   case 'txtUom': return 'UOM'
   case 'txtCostCenter': return 'Cost Center'
   /*KPI Column */

/*Billing Column */
case 'txtCustomerCode': return 'Consumer Id'
case 'branch': return 'Zone / Branch'
case 'unionCouncil': return 'Union Council'
case 'txtConnectionType': return 'Connection Type'
case 'txtBusinessName': return 'Business Name'
case 'Category': return 'Category'
case 'connetionDate': return 'Connection Date'
case 'suspensionDate': return 'Suspension Date'
case 'txtBillNo': return 'Bill No'
case 'dteBillFrom': return 'Bill From'
case 'dteBillTo': return 'Bill To'
case 'numTotalAmount': return 'Total Bill Amount'
case 'numAdjustment': return 'Adjustment Amount'
case 'consumerId': return 'Consumer Id'
case 'billNo': return 'Bill No'
case 'billPeriod': return 'Bill Period'
case 'installmentAmount': return 'Total Installment Amount'
case 'totalBillAmount': return 'Total Bill Amount'
case 'totalNoOfInstallments': return 'No Of Installments'
case 'dteScheduleDate': return 'Schedule Date'
case 'referenceCodeStart': return 'Reference Code Start'
case 'billLastDate': return 'Bill Last Date'
case 'latePayment': return 'Late Payment'
case 'billFrom': return 'Bill From'
case 'billTo': return 'Bill To'
/*Billing Column */
/*Tubewell Column */
case 'txt_branch_name': return 'Zone / Branch'
case 'txt_location_name': return 'Union Council'
case 'txtProductCode': return 'Tubewell Number'
case 'txtProductName': return 'Tubewell Name'
case 'txtMeterType': return 'Meter Type'
case 'numOfConnections': return 'No Of Connections'
case 'AvgDischarge': return 'Avg Discharge Per Hour'
case 'numAvgDischargeVolume': return 'Avg Discharge Per Unit'
case 'blnIsFunctional': return 'Functional'
case 'blnIsMetered': return 'Metered Connection'
case 'txtProductCodeOH': return 'OverHead Number'
case 'txtProductNameOH': return 'OverHead Name'
case 'txtProductCodeF': return 'Filteration Number'  
case 'txtProductNameF': return 'Filteration Name'
case 'dteWarrenty': return 'Warrenty Date'
case 'txtTubewellRefNo': return 'Tubewell Ref No'


/*Tubewell Column */
/*House Hold & Population Column */
case 'serBranchId': return 'Zone / Branch'
case 'numOfPrimaryMainholes': return 'RPC Mainholes'
case 'numOfSecondaryMainholes': return 'RCC Mainholes'
case 'numOfTeriaryMainholes': return 'IronGrid Mainholes'
case 'numTotalSewerageLines': return 'Sewerage Lines'
case 'numDrainageLines': return 'Drainage Lines'
case 'totalPopulation': return 'Total Population'
case 'numTotalHouseHold': return 'Total HouseHold'
case 'avgMemberPerHouse': return 'Avg Member / House'
case 'numTotalSecondarySewerageLines': return 'Secondary Sewerage Lines (km)'


/*House Hold & Population Column */
/*General Operation Column */
case 'txtMonth': return 'Month'
case 'numPriMhCleaned': return 'RPC Mainholes Cleaned'
case 'numSecMhCleaned': return 'RCC Mainholes Cleaned'
case 'numTerMhCleaned': return 'IronGrid Mainholes Cleaned'
case 'numSewerageLinesCleaned': return 'Sewerage Lines Cleaned'
case 'numSewerageLinesRepaired': return 'Sewerage Lines Repair'
case 'numDrainageLinesRepaired': return 'Drainage Lines Repair'
case 'numDistributionLinesRepaired': return 'Distribution Line Repaired'
case 'numDistributionLinesCleaned': return 'Distribution Line Cleaned'
case 'numSewerageLineDiscelitation': return 'Sewerage Line Discelitation'
case 'numDrainageLinesDiscelitation': return 'Drainage Line Discelitation'
case 'numDistributionLinesDiscelitation': return 'Distribution Line Discelitation'
case 'numDrainageLinesCleaned': return 'Drainage Line Cleaned'
/*General Operation Column */
/* Water Production */

   case 'numTotalRunningHours': return 'Total Running Hours'
   case 'txtAverageDischargePerHour': return 'Average Discharge per Hour'
   case 'TotalRunningUnit': return 'Total Running Units'
   case 'numWaterProducedInHour': return 'Water Produced in Hour'
   case 'numWaterProducedInUnit': return 'Water Produced in Unit'
   case 'txtAverageDischargePerUnit': return 'Average Discharge per Unit'
   case 'numMonthlyBill': return 'Monthly Bill'

   /* Water Production*/
/* Water Testing*/
case 'txtAssetType': return 'Asset Type'
case 'txtConsumerType': return 'Consumer Type'
case 'numConsumerNo': return 'Consumer No'
case 'txtSamplingDate': return 'Sampling Date'
case 'txtSamplingPoint': return 'Sampling Point'
case 'txtTestingAgency': return 'Testing Agency'
case 'txtResultSubmissionDate': return 'Result Submission Date'
case 'txtTestResult': return 'Test Result'
case 'txtZone': return 'Zone'
case 'txtUnionCouncil': return 'Union Council'
case 'dteBillDueDate': return 'Bill Due Date'

case 'numPayableWithinDueDate': return 'Payable Within Due Date'
case 'txtCustomerCategory': return 'Customer Category'




/* Water Testing*/
default: return value;
    }
  }
}

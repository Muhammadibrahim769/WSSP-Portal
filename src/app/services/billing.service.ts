import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ServiceResponse } from './billing.model';

import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  public upload: any = [];

  constructor(private httpClient: HttpClient) {}

  /* LOGIN SERVICE */
  loginService(txtUserId: any, txtPassword: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtUserId', txtUserId);
    params = params.append('txtPassword', txtPassword);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/user/login',
      { params: params }
    );
  }

  getRolesService(serUserId: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('serUserId', serUserId);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/user/getRoles',
      { params: params }
    );
  }

  /* Branch Service */

  getBranchService(serUserId: any) {
    let params = new HttpParams();
    params = params.append('serUserId', serUserId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/branch/getBranchByUser',
      { params: params }
    );
  }

  /* FLEET SERVICES */

  createVehicleRegistrationService(createVehicle: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/vehicleRegistration',
      createVehicle
    );
  }

  addRoutesService(addRoutesDto: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route',
      addRoutesDto
    );
  }
  updateRoutes(id: any, addRoutesDto: any) {
    debugger;
    return this.httpClient.put<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route/' + id,
      addRoutesDto
    );
  }

  getBatchService(txtBatchNo: any) {
    console.log('test');
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    // params = params.append('tripDate', dteDate);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tripsheet/findByBatchNo',
      { params: params }
    );
  }
  getBatchFleetService(txtBatchNo: any) {
    console.log('test');
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    // params = params.append('tripDate', dteDate);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findByBatchNo',
      { params: params }
    );
  }

  getBatchedService(txtBatchNo: any) {
    console.log('test');
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    // params = params.append('tripDate', dteDate);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findByBatchNo',
      { params: params }
    );
  }
  getBatchByParam(txtBatchNo: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tripsheet',
      { params: params }
    );
  }
  getAllMaintenanceSheet(
    serBranchId: any,
    serLocationId: any,
    txtBatchNo: any,
    dteDateFrom: any,
    dteDateTo: any,
    txtItemCode: any,
    txtItemName: any,
    txtProductCode: any,
    txtProductName: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtBatchNo', txtBatchNo);
    params = params.append('dteDateFrom', dteDateFrom);
    params = params.append('dteDateTo', dteDateTo);
    params = params.append('txtItemCode', txtItemCode);
    params = params.append('txtItemName', txtItemName);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/maintainancesheet',
      { params: params }
    );
  }
  getKpiFindAllForMonth(
    txtAreaCode: any,
    txtAreaName: any,
    txtKPICode: any,
    txtKPIName: any,
    txtCostCenterName: any,
    txtMonth: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtAreaCode', txtAreaCode);
    params = params.append('txtAreaName', txtAreaName);
    params = params.append('txtKPICode', txtKPICode);
    params = params.append('txtKPIName', txtKPIName);
    params = params.append('txtMonth', txtMonth);
    params = params.append('txtCostCenterName', txtCostCenterName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findKpiDefinitionValueForMonth',
      { params: params }
    );
  }
  getMaintenanceSheetFindAll() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/maintainancesheet'
    );
  }
  getMaintenanceDueInMonthFindAll() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/getnearduemaintenance'
    );
  }
  getMaintenanceOverDueFindAll() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/getoverduemaintenance'
    );
  }
  createTripSheetService(createTripSheetService: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tripsheet/save',
      createTripSheetService
    );
  }
  saveItemRecovered(itemRecoveredDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/recoveredItem',
      itemRecoveredDTO
    );
  }
  saveSaleItemRecovered(saleItemRecoveredDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem',
      saleItemRecoveredDTO
    );
  }
  updateSaleItemRecovered(saleItemRecoveredDTO: any) {
    debugger;
    return this.httpClient.put<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem',
      saleItemRecoveredDTO
    );
  }
  getSaleRecoveredItemByParams(
    serBranchId: any,
    serLocationId: any,
    txtSoldDate: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtSoldDate', txtSoldDate);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem',
      { params: params }
    );
  }
  getSaleRecoveredItemFindAll() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem'
    );
  }
  getSaleItemItemByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem/' + id
    );
  }
  /* FLEET SERVICES */

  createWaterTestService(newTestForm: any) {
    debugger;
    // formData.append('file', files[0]);
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/save',
      newTestForm
    );
  }

  getWaterTestingDoc(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/' + id
    );
  }

  getAllRouteslistOfCodeAndName() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route'
    );
  }

  getBranchIdForRoutes(serBranchId: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/locations/branch/' + serBranchId
    );
  }
  getAllLocation() {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/locations/findAll'
    );
  }
  getNeighborhoodUnionCouncilForUnionCouncil(serLocationId: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/locations/' +
        serLocationId +
        '/neighborhoodunioncouncil'
    );
  }
  getBranchIdServiceForRoutes(serBranchNo: any) {
    // params = params.append('tripDate', dteDate);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/locations/branch/' + serBranchNo
    );
  }
  getDistinctAsset() {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findAssetType'
    );
  }
  getFleetByBranchId(serBranchId: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByBranchId',
      { params: params }
    );
  }
  getFleetByParam(
    serBranchId: any,
    serLocationId: any,
    txtBatchNo: any,
    txtAssetType: any,
    txtProductName: any,
    serBatchNo: any,
    txtEngineNo: any,
    txtChassisNo: any,
    txtBodyType: any,
    txtCurrentStatus: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtAssetType', txtAssetType);
    params = params.append('txtProductName', txtProductName);
    params = params.append('txtBatchNo', txtBatchNo);
    params = params.append('serBatchNo', serBatchNo);
    params = params.append('txtEngineNo', txtEngineNo);
    params = params.append('txtChassisNo', txtChassisNo);
    params = params.append('txtBodyType', txtBodyType);
    params = params.append('txtCurrentStatus', txtCurrentStatus);
    // params = params.append('txtCurrentCondition', txtCurrentCondition)
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByParam',
      { params: params }
    );
  }
  getFleetMaintenanceByParam(
    serBranchId: any,
    serLocationId: any,
    txtBatchNo: any,
    txtProductName: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductName', txtProductName);
    params = params.append('txtBatchNo', txtBatchNo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByParam',
      { params: params }
    );
  }
  getFleetByLocationId(serLocationId: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByLocationId',
      { params: params }
    );
  }
  getFleetByVehicleName(txtVehicleName: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtVehicleName', txtVehicleName);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByVehicleName',
      { params: params }
    );
  }
  getMaintenanceByTxtBatchNo(txtBatchNo: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByBatchNo',
      { params: params }
    );
  }
  getMaintenanceItemList() {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/getmaintainanceitem'
    );
  }
  getAllRecordForTripSheet(
    serBranchId: any,
    serLocationId: any,
    txtRouteNo: string,
    txtBatchNo: any,
    dteDate: any,
    txtRouteName: any,
    txtRouteType: any,
    dteDateEndTrip: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('dteDate', dteDate);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtBatchNo', txtBatchNo);
    params = params.append('txtRouteNo', txtRouteNo);
    params = params.append('txtRouteName', txtRouteName);
    params = params.append('txtRouteType', txtRouteType);
    params = params.append('dteDateEndTrip', dteDateEndTrip);

    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tripsheet',
      { params: params }
    );
  }
  getAllRecordForWasteCollection(
    serBranchId: any,
    serLocationId: any,
    txtDateServicePerformed: any,
    txtDateServicePerformedEnd: any,
    txtActivity: any
  ) {
    let params = new HttpParams();
    params = params.append('txtDateServicePerformed', txtDateServicePerformed);
    params = params.append(
      'txtDateServicePerformedEnd',
      txtDateServicePerformedEnd
    );
    params = params.append('txtActivity', txtActivity);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/WasteCollection',
      { params: params }
    );
  }
  getAllRecordForDesiltationByParam(
    serBranchId: any,
    serLocationId: any,
    txtDateServicePerformed: any,
    txtDateServicePerformedEnd: any,
    txtActivity: any,
    txtCategory: any
  ) {
    let params = new HttpParams();
    params = params.append('txtDateServicePerformed', txtDateServicePerformed);
    params = params.append('txtCategory', txtCategory);
    params = params.append(
      'txtDateServicePerformedEnd',
      txtDateServicePerformedEnd
    );
    params = params.append('txtActivity', txtActivity);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/WasteCollection',
      { params: params }
    );
  }
  getAllRecordCompost(
    serBranchId: any,
    serLocationId: any,
    txtCompostDate: any,
    txtCompostVender: any
  ) {
    let params = new HttpParams();
    params = params.append('txtCompostDate', txtCompostDate);
    params = params.append('txtCompostVender', txtCompostVender);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/compost/findAll',
      { params: params }
    );
  }
  getRecordByActivity(txtActivity: any) {
    let params = new HttpParams();
    params = params.append('txtActivity', txtActivity);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/WasteCollection',
      { params: params }
    );
  }
  getSweepingScheduleFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/sweepingSchedule'
    );
  }
  getScheduleFindAllByParams(serBranchId: any, serLocationId: any) {
    let params = new HttpParams();
    // params = params.append('txtCompostDate', txtCompostDate)
    // params = params.append('txtCompostVender', txtCompostVender)
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/schedule',
      { params: params }
    );
  }
  getCompostFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/compost/findAll'
    );
  }
  getGasCollectionFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/gasCollectionSheet'
    );
  }
  getRecoveredItemFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/recoveredItem'
    );
  }
  getwasteDiversionFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/wasteDiversionSheet'
    );
  }
  getSweepingScheduleFindByParams(
    serBranchId: any,
    serLocationId: any,
    txtDate: any,
    txtShift: any
  ) {
    let params = new HttpParams();
    params = params.append('txtDate', txtDate);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtShift', txtShift);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/sweepingSchedule',
      { params: params }
    );
  }
  getGasCollectionFindByParams(
    serBranchId: any,
    serLocationId: any,
    txtDate: any
  ) {
    let params = new HttpParams();
    params = params.append('txtDate', txtDate);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/gasCollectionSheet',
      { params: params }
    );
  }
  getRecoveredItemByParams(
    serBranchId: any,
    serLocationId: any,
    txtRecoveredDate: any,
    txtRouteType: any
  ) {
    let params = new HttpParams();
    params = params.append('txtRecoveredDate', txtRecoveredDate);
    params = params.append('txtRouteType', txtRouteType);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/recoveredItem',
      { params: params }
    );
  }
  getwasteDiversionFindByParams(
    serBranchId: any,
    serLocationId: any,
    txtDate: any
  ) {
    let params = new HttpParams();
    params = params.append('txtDate', txtDate);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/wasteDiversionSheet',
      { params: params }
    );
  }
  getAllWasteCollectionFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/WasteCollection'
    );
  }
  getWasteCollectionByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/WasteCollection/' + id
    );
  }
  getCompostByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/compost/' + id
    );
  }
  getSweepingScheduleByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/sweepingSchedule/' + id
    );
  }
  getGasCollectionByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gasCollectionSheet/' + id
    );
  }
  getQuantityRecoveredItemByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/recoveredItem/' + id
    );
  }
  getWasteDiversionByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wasteDiversionSheet/' + id
    );
  }
  getAllRecordForReportByParam(
    serBranchId: any,
    serLocationId: any,
    txtBatchNo: any,
    dteDate: any,
    dteDateEndTrip: any,
    txtRouteType: any,
    txtRouteName: any
  ) {
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtBatchNo', txtBatchNo);
    if (dteDate != null && dteDate != 'null') {
      params = params.append('dteDate', dteDate);
    }
    if (dteDateEndTrip != null && dteDateEndTrip != 'null') {
      params = params.append('dteDateEndTrip', dteDateEndTrip);
    }
    params = params.append('txtRouteType', txtRouteType);
    params = params.append('txtRouteName', txtRouteName);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tripsheet/tripReport',
      { params: params }
    );
  }
  getAllRecordReport() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tripsheet/tripReport'
    );
  }
  // getAllRecordReportByParam(){
  //   debugger;
  //   return this.httpClient.get<ServiceResponse>(environment.apiUrl + "/service/api/v1/tripsheet/tripReport");

  // }

  getAllRecordForTripSheetFindAll() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tripsheet'
    );
  }
  getRoutesService(page: any, rowPerPage: any) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('rowPerPage', rowPerPage);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route',
      { params: params }
    );
  }
  getRoutesTableService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route'
    );
  }
  getRoutesTableByParamService(
    ser_branch_id: any,
    ser_location_id: any,
    txt_code: any,
    txt_name: any,
    txt_route_type: any
  ) {
    let params = new HttpParams();
    params = params.append('ser_branch_id', ser_branch_id);
    params = params.append('ser_location_id', ser_location_id);
    params = params.append('txt_code', txt_code);
    params = params.append('txt_name', txt_name);
    params = params.append('txt_route_type', txt_route_type);

    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route',
      { params: params }
    );
  }
  updateRoutesService(txt_code: any, txt_name: any) {
    let params = new HttpParams();
    params = params.append('txt_code', txt_code);
    params = params.append('txt_name', txt_name);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route',
      { params: params }
    );
  }
  getrouteServiceById(ser_route_id: any) {
    let params = new HttpParams();
    params = params.append('ser_route_id', ser_route_id);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/route/findByRouteId',
      { params: params }
    );
  }

  getWaterTestService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting'
    );
  }
  getWaterTestServiceByParams(
    txtSamplingDate: any,
    dteDateTo: any,
    txtAssetType: any,
    serBranchId: any,
    serLocationId: any,
    txtConsumerType: any,
    txtTestResult: any,
    txtTestingAgency: any
  ) {
    let params = new HttpParams();
    params = params.append('txtSamplingDate', txtSamplingDate);
    params = params.append('dteDateTo', dteDateTo);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtAssetType', txtAssetType);
    params = params.append('txtConsumerType', txtConsumerType);
    params = params.append('txtTestResult', txtTestResult);
    params = params.append('txtTestingAgency', txtTestingAgency);

    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting',
      { params: params }
    );
  }

  saveWasteCollection(wasteDTO: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/WasteCollection',
      wasteDTO
    );
  }
  saveCompost(compostDTO: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/compost',
      compostDTO
    );
  }
  saveSweepingSchedule(sweepingDTO: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/sweepingSchedule',
      sweepingDTO
    );
  }
  saveGAsCollectionSheet(gasCollectionDTO: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gasCollectionSheet',
      gasCollectionDTO
    );
  }
  saveWasteDiversionSheet(wasteDiversionDTO: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wasteDiversionSheet',
      wasteDiversionDTO
    );
  }
  getWaterTestServiceById(numWaterTestId: any) {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/' + numWaterTestId
    );
  }

  deleteWaterTestServiceById(numWaterTestId: any) {
    return this.httpClient.delete<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/' + numWaterTestId
    );
  }

  deleteWaterTestDocumentById(numDocId: any) {
    debugger;
    return this.httpClient.delete<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/watertesting/deleteDocument/' +
        numDocId
    );
  }

  updateWaterTestServiceById(numWaterTestId: any, formdata: FormData) {
    debugger;
    return this.httpClient.put<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/' + numWaterTestId,
      formdata
    );
  }

  getAllCustomerService() {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers'
    );
  }

  getAllCustomerTemplateService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/template'
    );
  }

  getCategoryList() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/getCategoryList'
    );
  }

  getCustomerListService(CustomerDto: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers',
      CustomerDto
    );
  }
  getSuspensionCustomerByCode(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/findSuspensionByTxtCustomerCode/' +
        id
    );
  }
  getSuspendedCustomerByCode(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/findSuspendedByTxtCustomerCode/' +
        id
    );
  }
  getClosedCustomerByCode(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/findClosedByTxtCustomerCode/' +
        id
    );
  }

  getFilesUPdloadDownload() {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/currentbill/readFiles'
    );
  }

  uploadCSVRecordService(csvDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/billing/uploadDistributorCode',
      csvDTO
    );
  }

  /* Schedule Services*/
  createScheduleService(scheduleDto: any) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/schedule',
      scheduleDto
    );
  }
  getAllSchedulerService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/schedule'
    );
  }
  getScheduleServiceByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/schedule/' + id
    );
  }
  updateScheduleServiceById(serScheduleId: any, ScheduleDto: any) {
    return this.httpClient.put<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/schedule/' + serScheduleId,
      ScheduleDto
    );
  }
  deleteScheduleServiceById(serScheduleId: any) {
    return this.httpClient.delete<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/schedule/' + serScheduleId
    );
  }
  getCustomerListServiceByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers/' + id
    );
  }
  getCustomerRejectListServiceByCustomerCode(txtCustomerCode: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/rejectCustomer/' +
        txtCustomerCode
    );
  }
  connectionRejectedService(txtCustomerCode: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/rejectUpdateCustomer/' +
        txtCustomerCode
    );
  }
  getCustomerApproveListServiceByCustomerCode(txtCustomerCode: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/approveCustomer/' +
        txtCustomerCode
    );
  }
  connectionApprovedListService(txtCustomerCode: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/approveUpdateCustomer/' +
        txtCustomerCode
    );
  }

  checkCustomerByCodeService(txtCustomerCode: any) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers/checkduplicate',
      { params: params }
    );
  }

  getCustomerListServiceByCode(consumerCode: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl +
        '/service/api/v1/customers/findByCustomerCode/' +
        consumerCode
    );
  }

  searchCustomerDumpListServiceByCode(
    consumerCode: any,
    branchId: any,
    unionCouncilId: any,
    connectionType: any,
    connectionDate: any
  ) {
    let params = new HttpParams();
    params = params.append('consumerCode', consumerCode);
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('connectionDate', connectionDate);
    params = params.append('connectionType', connectionType);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/dump/customers',
      { params: params }
    );
  }

  searchCustomerListServiceByCode(
    consumerCode: any,
    branchId: any,
    unionCouncilId: any,
    connectionType: any,
    connectionDate: any
  ) {
    let params = new HttpParams();
    params = params.append('consumerCode', consumerCode);
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('connectionDate', connectionDate);
    params = params.append('connectionType', connectionType);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers',
      { params: params }
    );
  }

  searchSuspendCustomerListServiceByCode(
    consumerCode: any,
    branchId: any,
    unionCouncilId: any,
    connectionType: any,
    suspensionDate: any
  ) {
    let params = new HttpParams();
    params = params.append('consumerCode', consumerCode);
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('suspensionDate', suspensionDate);
    params = params.append('connectionType', connectionType);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers',
      { params: params }
    );
  }

  searchConnectionCustomerListServiceByCode(
    consumerCode: any,
    branchId: any,
    unionCouncilId: any,
    connectionType: any,
    status: any,
    txtProductName: any
  ) {
    let params = new HttpParams();
    params = params.append('consumerCode', consumerCode);
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('status', status);
    params = params.append('connectionType', connectionType);
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers',
      { params: params }
    );
  }

  searchConnectionCustomerDumpListServiceByCode(
    consumerCode: any,
    branchId: any,
    unionCouncilId: any,
    connectionType: any,
    status: any,
    txtProductName: any
  ) {
    let params = new HttpParams();
    params = params.append('consumerCode', consumerCode);
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('status', status);
    params = params.append('connectionType', connectionType);
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/dump/customers',
      { params: params }
    );
  }

  getDumpCustomerListServiceByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/dump/customers/' + id
    );
  }

  updateCustomerListServiceByID(id: any, dto) {
    return this.httpClient.put<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers/' + id,
      dto
    );
  }

  getProductService(
    page: any,
    product_family_name: any,
    product_name: any,
    rowPerPage: any
  ) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('product_family_name', product_family_name);
    params = params.append('product_name', product_name);
    params = params.append('rowPerPage', rowPerPage);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/product',
      { params: params }
    );
  }

  getFleetService(txtCustomerCode: any, txtBillNo: any) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('txtBillNo', txtBillNo);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findByParam',
      { params: params }
    );
  }
  getFleetByTxtBatchNo(txtBatchNo: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtBatchNo', txtBatchNo);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findByBatchNo',
      { params: params }
    );
  }
  getFleetByTxtAssetType(txtAssetType: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtAssetType', txtAssetType);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByVehicleType',
      { params: params }
    );
  }
  getFleetByTxtVehicleName(txtVehicleName: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtVehicleName', txtVehicleName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/fleet/findFleetByVehicleName',
      { params: params }
    );
  }
  getVehicleProductService(
    productFamilyName: any,
    productName: any,
    page: any,
    rowPerPage: any
  ) {
    let params = new HttpParams();
    params = params.append('product_family_name', productFamilyName);
    params = params.append('product_name', productName);
    params = params.append('page', page);
    params = params.append('rowPerPage', rowPerPage);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/product',
      { params: params }
    );
  }
  updateVehicleService(updateVehicle: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/saveAndUpdate',
      updateVehicle
    );
  }

  /*Billing Screens */
  getAllDumpCustomerService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/dump/customers'
    );
  }
  createNewConnectionService(createNewConnection: any) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/dump/customers',
      createNewConnection
    );
  }
  createNewConnectionServiceCus(createNewConnection: any) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers',
      createNewConnection
    );
  }
  saveFiles(formdata: FormData) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/uploadfiles',
      formdata
    );
  }
  createMaintainanceSheet(createMaintainanceSheet: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/fleet/createmaintainancesheet',
      createMaintainanceSheet
    );
  }
  rejectCustomerService(id: any, dto) {
    return this.httpClient.patch<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/customers/' + id,
      dto
    );
  }
  uploadFileNewConnectionService(documents: FormData) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers',
      documents
    );
  }
  getnewConnectionRequestServiceCus() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers'
    );
  }
  getAllCutomerService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers'
    );
  }

  getCurrentBillService(txtBillNo: any, txtCustomerCode: any) {
    let params = new HttpParams();
    params = params.append('txtBillNo', txtBillNo);
    params = params.append('txtCustomerCode', txtCustomerCode);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getCurrentBill',
      { params: params }
    );
  }

  findCurrentBillService(
    txtBillNo: any,
    txtCustomerCode: any,
    serBranchId: any,
    serLocationId: any,
    dteBillFrom: any,
    dteBillTo: any,
    txtStatus: any
  ) {
    let params = new HttpParams();
    params = params.append('txtBillNo', txtBillNo);
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('dteBillFrom', dteBillFrom);
    params = params.append('dteBillTo', dteBillTo);
    params = params.append('txtStatus', txtStatus);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/currentbill/getCurrentAndHistoryBillByParams',
      { params: params }
    );
  }
  findCurrentBillServiceBy3Param(
    serBranchId: any,
    dteBillFrom: any,
    dteBillTo: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('dteBillFrom', dteBillFrom);
    params = params.append('dteBillTo', dteBillTo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getCurrentBillByParams',
      { params: params }
    );
  }

  findBillByTxtCustomerCode(txtCustomerCode: any) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/currentbill/findBillByTxtCustomerCode',
      { params: params }
    );
  }

  findBillAdjustmentById(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/findBillAdjustmentById',
      { params: params }
    );
  }

  findAdvancePaymentById(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/findAdvancePaymentById',
      { params: params }
    );
  }

  createBillAdjustmentService(billAdjustmentDTO: any) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/billing/save',
      billAdjustmentDTO
    );
  }

  updateBillDiscount(
    txtCustomerCode,
    discount,
    dteBillDueDate,
    billFrom,
    billTo,
    payableWithinDueDate,
    payableAfterDueDate
  ) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('discount', discount);
    params = params.append('dteBillDueDate', dteBillDueDate);
    params = params.append('billFrom', billFrom);
    params = params.append('billTo', billTo);
    params = params.append('payableWithinDueDate', payableWithinDueDate);
    params = params.append('payableAfterDueDate', payableAfterDueDate);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/updateDiscount',
      { params: params }
    );
  }

  getAllAdjustmentsService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getBillAdjustments'
    );
  }

  getAdvancePaymentByParams(
    txtCustomerCode,
    serBranchId,
    serLocationId,
    numAdvancePayment
  ) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('numAdvancePayment', numAdvancePayment);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/currentbill/findAdvancePaymentByParams',
      { params: params }
    );
  }

  getAdvancePaymentByParamsReset() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/currentbill/findAdvancePaymentByParams'
    );
  }

  createBillInstallmentService(billInstallmentDTO: any) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/installments/save',
      billInstallmentDTO
    );
  }

  getCurrentOTBillService(txtCustomerCode: any) {
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getCurrentOTBill',
      { params: params }
    );
  }

  getNewConnectionBillService(txtCustomerCode: any, txtBillType: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtBillType', txtBillType);
    params = params.append('txtCustomerCode', txtCustomerCode);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/findBillByBillType',
      { params: params }
    );
  }

  /* operation Management System Services */
  updateGeneralOperation(dto) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gop/saveOperation',
      dto
    );
  }
  updateGeneralOperationWater(dto) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gop/saveWaterOperation',
      dto
    );
  }
  updateGeneralOperationWaste(dto) {
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gop/saveWasteOperation',
      dto
    );
  }
  getOperationBasicInfoService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findTubeWells'
    );
  }
  getLongLatByParams(serBranchId: any, serLocationId: any, assetType: any) {
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('assetType', assetType);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findByItemType',
      { params: params }
    );
  }
  getOperationBasicInfoServiceByParams(
    txtTubewellRefNo: any,
    blnIsFunctional: any,
    blnIsMetered: any,
    serBranchId: any,
    serLocationId: any,
    txtProductCode: any,
    txtProductName: any
  ) {
    let params = new HttpParams();
    params = params.append('txtTubewellRefNo', txtTubewellRefNo);

    params = params.append('blnIsFunctional', blnIsFunctional);
    params = params.append('blnIsMetered', blnIsMetered);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtProductName', txtProductName);

    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findTubeWells',
      { params: params }
    );
  }
  getOverHeadTankServiceByParams(
    blnIsFunctional: any,
    serBranchId: any,
    serLocationId: any,
    txtProductCode: any,
    txtProductName: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('blnIsFunctional', blnIsFunctional);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findoverheads',
      { params: params }
    );
  }
  getFiterationServiceByParams(
    blnIsFunctional: any,
    serBranchId: any,
    serLocationId: any,
    txtProductCode: any,
    txtProductName: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('blnIsFunctional', blnIsFunctional);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findfilterationplants',
      { params: params }
    );
  }
  getOverHeadTankService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findoverheads'
    );
  }
  getFilterationPlantoService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findfilterationplants'
    );
  }

  getOperationBasicInfoByID(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tubewells/findById/' + id
    );
  }
  updateBasicInfoServiceByID(dto) {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tubewells/save',
      dto
    );
  }
  getOperationBasicInfoListServiceByID(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tubewells/findById/' + id
    );
  }
  getMeterReading(txtMonth: any, serProductId: any, prevMonth: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('prevMonth', prevMonth);
    params = params.append('serProductId', serProductId);
    params = params.append('txtMonth', txtMonth);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/findMeterReading',
      { params: params }
    );
  }
  // water production services
  getServerDatetimeService() {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tripsheet/serDateTime'
    );
    // console.log(ServiceResponse);
  }
  searchWaterProductionListServiceByCode(
    dteDateTo: any,
    txtItemType: any,
    txtMonth: any,
    txtProductCode: any,
    txtProductName: any,
    serBranchId: any,
    serLocationId: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtItemType', txtItemType);
    params = params.append('dteDateTo', dteDateTo);
    params = params.append('txtMonth', txtMonth);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    // params = params.append('dteCreatedDate', dteCreatedDate);
    // , dteCreatedDate: any
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/findAll',
      { params: params }
    );
  }
  searchWaterProductionTubewell(
    txtItemType: any,
    txtMonth: any,
    txtProductCode: any,
    txtProductName: any,
    serBranchId: any,
    serLocationId: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtItemType', txtItemType);
    params = params.append('txtMonth', txtMonth);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    // params = params.append('dteCreatedDate', dteCreatedDate);
    // , dteCreatedDate: any
    params = params.append('txtProductName', txtProductName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/findAll',
      { params: params }
    );
  }
  tubeWellMonthlyReport(
    dteDateTo: any,
    txtItemType: any,
    txtMonth: any,
    serBranchId: any,
    serLocationId: any,
    txtProductName: any,
    txtProductCode: any,
    txtTubewellRefNo: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('dteDateTo', dteDateTo);
    params = params.append('txtItemType', txtItemType);
    params = params.append('txtMonth', txtMonth);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductName', txtProductName);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtTubewellRefNo', txtTubewellRefNo);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/findHistory',
      { params: params }
    );
  }
  WaterTubeWellMonthlyReport(
    dteDatefrom: any,
    dteDateTo: any,
    txtItemType: any,
    txtProductCode: any,
    txtProductName: any,
    txtTubewellRefNo: any,
    txtMonth: any,
    serBranchId: any,
    serLocationId: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('dteDateTo', dteDateTo);
    params = params.append('dteDatefrom', dteDatefrom);
    params = params.append('txtItemType', txtItemType);
    params = params.append('txtMonth', txtMonth);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtProductCode', txtProductCode);
    params = params.append('txtProductName', txtProductName);
    params = params.append('txtTubewellRefNo', txtTubewellRefNo);

    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/findHistory',
      { params: params }
    );
  }
  updateWSProductionService(dto) {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction',
      dto
    );
  }
  getAllWSProductionDataService(txtMonth: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtMonth', txtMonth);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/wSProduction/findAll',
      { params: params }
    );
  }

  getWaterProductionListServiceByID(id: any) {
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tubewells/findByProductId/' + id
    );
  }
  getWaterProductionByID(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/tubewells/findByProductId/' + id
    );
  }
  updateWaterProductionServiceByID(dto, id: any) {
    debugger;
    return this.httpClient.put<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/wSProduction/' + id,
      dto
    );
  }
  // house hold services
  getGeneralOperationByMonth(
    txtMonth: any,
    serBranchId: any,
    serLocationId: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtMonth', txtMonth);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gop/findAll',
      { params: params }
    );
  }
  getComplaint(txtMonth: any, serBranchId: any, serLocationId: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtMonth', txtMonth);
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/watertesting/findAllComplaints',
      { params: params }
    );
  }
  getHouseHoldService() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/population'
    );
  }
  getHouseHoldServiceByParams(serBranchId: any, serLocationId: any) {
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/population',
      { params: params }
    );
  }
  getHouseHoldListServiceByID(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/population/' + id
    );
  }
  getHouseHoldServiceById(serPopulationId: any) {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/population/' + serPopulationId
    );
  }
  updateHouseHoldServiceByDto(serPopulationIdServiceDto: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/population/save',
      serPopulationIdServiceDto
    );
  }
  searchHouseHoldListServiceByCode(brachName: any, UcName: any) {
    debugger;
    let params = new HttpParams();

    params = params.append('brachName', brachName);
    params = params.append('UcName', UcName);

    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/population',
      { params: params }
    );
  }
  getMaintanceList(
    serBranchId: any,
    serLocationId: any,
    txtLineType: any,
    txtReferenceNumber: any,
    dteDateFrom: any,
    dteDateTo: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    params = params.append('txtLineType', txtLineType);
    params = params.append('txtReferenceNumber', txtReferenceNumber);
    params = params.append('dteDateFrom', dteDateFrom);
    params = params.append('dteDateTo', dteDateTo);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/gis/findRepairMaintananceByParams',
      { params: params }
    );
  }
  getOperationBasicInfoServiceByParamsList(
    serBranchId: any,
    serLocationId: any
  ) {
    let params = new HttpParams();
    params = params.append('serBranchId', serBranchId);
    params = params.append('serLocationId', serLocationId);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/tubewells/findTubeWells',
      { params: params }
    );
  }
  addMaintainceService(maintainceDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/gop/saveMaintainance',
      maintainceDTO
    );
  }
  // M & E SERVICES
  getAllMonthlyExpenseSheetDataService(txtMonth: any) {
    debugger;
    let params = new HttpParams();

    params = params.append('txtMonth', txtMonth);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/kpi/findFactorValueForMonth',
      { params: params }
    );
  }
  searchMonthlyExpenseSheetDataService(txtMonth: any) {
    debugger;
    debugger;
    let params = new HttpParams();

    params = params.append('txtMonth', txtMonth);
    // params = params.append('txt_main_head', txt_main_head);
    // params = params.append('txt_sub_head', txt_sub_head);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/kpi/findFactorValueForMonth',
      { params: params }
    );
  }
  savePerformanceArea(dto) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/kpi/savePerformanceArea',
      dto
    );
  }
  getFactorFindAll() {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllFactors'
    );
  }
  getFactorByParams(serFactorId: any, txtFactorName: any) {
    debugger;
    let params = new HttpParams();

    params = params.append('serFactorId', serFactorId);
    params = params.append('txtFactorName', txtFactorName);

    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllFactors',
      { params: params }
    );
  }
  getKpiFindAllByParam(
    txtAreaCode: any,
    txtAreaName: any,
    txtKPICode: any,
    txtKPIName: any,
    txtCostCenterName: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtAreaCode', txtAreaCode);
    params = params.append('txtAreaName', txtAreaName);
    params = params.append('txtKPICode', txtKPICode);
    params = params.append('txtKPIName', txtKPIName);
    params = params.append('txtCostCenterName', txtCostCenterName);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllKpiDefinition',
      { params: params }
    );
  }
  getKpiFindAllById(serKPIDefinitionId: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('serKPIDefinitionId', serKPIDefinitionId);
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllKpiDefinition',
      { params: params }
    );
  }
  getKpiFindAll() {
    debugger;

    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllKpiDefinition'
    );
  }
  getPerformanceAreaService() {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findAllPerformanceArea'
    );
  }
  saveRefreshData() {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/monthlyfactor',
      null
    );
  }
  getRefreshData() {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/monthlyfactor',
      null
    );
  }
  getCostCentreName() {
    debugger;
    return this.httpClient.get<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/findCostCenter'
    );
  }
  createKPIService(dto) {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/kpi/saveKpiDefinition',
      dto
    );
  }
  // M & E Services
  // getOperationBasicInfoByID(id: any, dto) {
  //   debugger;
  //   return this.httpClient.patch<ServiceResponse[]>(environment.apiUrl + "/service/api/v1/tubewells/" + id, dto);
  // }

  suspendConnectionService(id: any, dto: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/suspendCustomer/' + id,
      dto
    );
  }

  approveSuspendConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/approveSuspension/' + id
    );
  }

  rejectSuspendConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/rejectSuspension/' + id
    );
  }

  resumeConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/resumeCustomer/' + id
    );
  }

  closeConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/closeCustomer/' + id
    );
  }
  closeConnectionByCodeService(id: any, colsedto: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/customers/closeCustomerByCode/' +
        id,
      colsedto
    );
  }
  approveCloseConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/approveClosuree/' + id
    );
  }

  rejectCloseConnectionService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/customers/rejectClosuree/' + id
    );
  }

  uploadMultiple(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      environment.apiUrl + '/service/api/v1/customers/post',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/service/api/v1/customers/getallfiles'
    );
  }

  uploadWaterTestingDoc(files: File, waterTestingId: any): Observable<any> {
    debugger;
    let params = new HttpParams();
    params = params.append('waterTestingId', waterTestingId);
    let queryParameter = '?waterTestingId=' + waterTestingId;
    const formData: FormData = new FormData();
    formData.append('file', files);
    const req = new HttpRequest(
      'POST',
      environment.apiUrl +
        '/service/api/v1/watertesting/uploadfiles/' +
        queryParameter,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.httpClient.request(req);

    // const req = new HttpRequest('POST', environment.apiUrl + "/service/api/v1/watertesting/uploadfiles/" + waterTestingId, formData, {
    //   formData.append('files', files);

    // return this.httpClient.get(environment.apiUrl + "/service/api/v1/customers/getallfiles");
  }

  // ****   STP Services   ****//
  createStpService(stpDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/stp',
      stpDTO
    );
  }
  addComplaintService(complaintDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/watertesting/saveComplaints',
      complaintDTO
    );
  }
  findStpService(
    branchId: any,
    unionCouncilId: any,
    dteStp: any,
    txtWaterQuality: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('dteStp', dteStp);
    params = params.append('txtWaterQuality', txtWaterQuality);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/stp/findall',
      { params: params }
    );
  }

  getStpByIdService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/stp/' + id
    );
  }

  // ****   RDF Services   ****//
  createRdfService(rdfDTO: any) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/rdf',
      rdfDTO
    );
  }

  findRdfService(
    branchId: any,
    unionCouncilId: any,
    dteRdf: any,
    txtSegregatedRecieved: any,
    txtVendor: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('branchId', branchId);
    params = params.append('unionCouncilId', unionCouncilId);
    params = params.append('dteRdf', dteRdf);
    params = params.append('txtSegregatedRecieved', txtSegregatedRecieved);
    params = params.append('txtVendor', txtVendor);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/rdf/findAll',
      { params: params }
    );
  }

  findAllStp() {
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/rdf/findAll'
    );
  }

  getRdfByIdService(id: any) {
    debugger;
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/rdf/' + id
    );
  }

  updateBillAdjustmentService(billAdjustmentDto) {
    debugger;
    // let params = new HttpParams();
    // params = params.append('txtCustomerCode', txtCustomerCode);
    // params = params.append('billFrom', billFrom);
    // params = params.append('billTo', billTo);
    // params = params.append('numAdjustment', numAdjustment);
    return this.httpClient.put<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/adjustbill',
      billAdjustmentDto
    );
  }

  advancePaymentService(advancePaymentDto) {
    debugger;
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/advancePayment',
      advancePaymentDto
    );
  }

  getBySaleRecoveredItem(txtSaleItem: any) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtSaleItem', txtSaleItem);

    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/saleRecoveredItem/findByItem',
      { params: params }
    );
  }

  findBillByTxtCustomerCodeBill(
    dteBillFrom: any,
    dteBillTo: any,
    txtCustomerCode: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('dteBillFrom', dteBillFrom);
    params = params.append('dteBillTo', dteBillTo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl +
        '/service/api/v1/currentbill/getCurrentAndHistoryBillByParams',
      { params: params }
    );
  }

  getCurrentBillByParams(
    dteBillFrom: any,
    dteBillTo: any,
    txtCustomerCode: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('dteBillFrom', dteBillFrom);
    params = params.append('dteBillTo', dteBillTo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getCurrentBillByParams',
      { params: params }
    );
  }

  fundsTransferService(transferDto: any) {
    return this.httpClient.post<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/fundsTransferService',
      transferDto
    );
  }

  getHistoryBillByParams(
    dteBillFrom: any,
    dteBillTo: any,
    txtCustomerCode: any
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('txtCustomerCode', txtCustomerCode);
    params = params.append('dteBillFrom', dteBillFrom);
    params = params.append('dteBillTo', dteBillTo);
    return this.httpClient.get<ServiceResponse>(
      environment.apiUrl + '/service/api/v1/currentbill/getHistoryBillByParams',
      { params: params }
    );
  }

  uploadBankScrollFile(documentDto: any) {
    debugger;
    return this.httpClient.post<ServiceResponse[]>(
      environment.apiUrl + '/service/api/v1/currentbill/uploadBankScroll',
      documentDto
    );
  }
}

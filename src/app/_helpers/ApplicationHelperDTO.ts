export class Alert {

    alert: any;
    messageAlert(type: string, message: string, delay: number) {
        this.alert = {
            type: type,
            msg: message,
            timeout: (delay === 3000) ? 6000 : delay,
        };
        return this.alert;
    }
}

export class ServiceResponse {

    code: number = 0;
    status: string = "";
    message: string = "";
    data: any[] = [];
}

/**
 * An object used to get page information from the server
 */
export class Page {

    defaultValue = JSON.parse(localStorage.getItem('currentUser'));
    //The number of elements in the page
    size: number = 10;
    //The total number of elements
    totalElements: number = 0;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    pageNumber: number = 0;

    branchId: string = (this.defaultValue) ? this.defaultValue.branchId : 0;

}


export class ServiceRequest {
    debugger;

    defaultValue = JSON.parse(localStorage.getItem('currentUser'));

    generateNo: any = {
        formTitle: '',   //PurchaseOrder
        branchId: '',
        formId: '',
        projectName: '',
        locationID: '',
        costCenterID: '',
        projectID: '',
        voucherType: ''
    }
    defaultValues: any = {
        machineIp: (this.defaultValue) ? this.defaultValue.machineIp : '192.168.1.36',
        userId: (this.defaultValue) ? this.defaultValue.userId : 0,
        createdUserId: (this.defaultValue) ? this.defaultValue.createdUserId : 0,
        modifiedUserId: (this.defaultValue) ? this.defaultValue.modifiedUserId : 0,
        branchId: (this.defaultValue) ? this.defaultValue.branchId : 0,
        companyId: (this.defaultValue) ? this.defaultValue.companyId : 1,
        status: (this.defaultValue) ? this.defaultValue.status : 'true',
        userName: (this.defaultValue) ? this.defaultValue.userName : 0
    }

    paginationObject: any = {
        allColumns: true,
        limitApplied: false,
        offset: -1,
        totalRecords: -1,
        lastIndex: -1,
        branchId: (this.defaultValue) ? this.defaultValue.branchId : 0
    }
    paginationObjectWithLimit: any = {
        allColumns: true,
        limitApplied: true,
        offset: 0,
        totalRecords: 1000,
        lastIndex: 0,
        branchId: (this.defaultValue) ? this.defaultValue.branchId : 0
    }
    searchObject: any = {
        branchId: this.defaultValues.branchId,
        accountTypeFilter: '',
        bankNameFilter: '',
        accountNoFilter: '',
        invoiceIdFilter: '',
        itemCodeFilter: '',
        statusFilter: '',
        supplierCodeFilter: '',
        dateFromFilter: '',
        dateToFilter: '',
        amountFilter: '',
        detailFilter: ''
    }
    chartOfAccountDTO: any = {
        branchId: this.defaultValues.branchId,
        txtAccountName: '',
        txtAccountNumber: '',
        bln_status: true,
        txtControlType: ''
    }
    employeeSearchDTO: any = {
        branchId: this.defaultValues.branchId,
        employeeIdFilter: '',
        employeeNameFilter: '',
        employeeFatherNameFilter: '',
        employeeDesignationFilter: ''
    }
    locationSearchDTO: any = {
        branchId: this.defaultValues.branchId,
    }
    chequeDTO: any = {
        txtChequeNo: '',
        bankAccountId: '',
        ser_branch_is: this.defaultValues.branchId,
        isUsed: 'false',
    }
    supplierSearchDTO: any = {
        branchId: this.defaultValues.branchId,
        supplierIdFilter: '',
        supplierCodeFilter: '',
        supplierNameFilter: '',
        categoryFilter: '',
        companyFilter: '',
    }
    productSearchDTO: any = {
        ser_product_branch_id: this.defaultValues.branchId,
        ser_product_id: null
    }
    accChartOfAccountDTO: any = {
        parentAccountCode: '',
        ser_chart_of_account_id: '',
        level: '',
        subsidiaryAccountType: '',
        ser_branch_id: this.defaultValues.branchId,
        branchId: this.defaultValues.branchId,
        serControlAccountId: '',
        parentId: '',
        txtAccountName: '',
        txtAccountNumber: '',
        crBalance: 0.0,
        drBalance: 0.0

    }

    bankHelperObject = {
        paginationDTO: {},
        accountSearchDTO: {
            bankBranchIdFilter: ''
        },
        bankSearchDTO: {
            ser_branch_id: this.defaultValues.branchId,
            serNoteHeadId: ''
        },
        chartOfAccountDTO: {},
        chequeDTO: {
            bankAccountId: ''
        },
        bankName: '',
        accountType: '',
        bankId: '',
        accountSetupStatus: '',
        accVoucherDTO: {},
        currencySearchDTO: {},
        accChequesDTO: [],
        listAccChequesDTO: [],
        accChequesDTOlist: [],
        accChartOfAccountDTO: {},
        lst_branch_list: [],
        balanceSheetHeadDetDTO: {}
    }

    setupHelperObject = {
        paginationDTO: this.paginationObject,
        invoiceCategorySearchDTO: {},
        customerCategorySearchDTO: {
            subsidiaryTypeFilter: '',
            branchId: ''

        },
        advanceTypeSearchDTO: {
            subsidiaryTypeFilter: '',
            typeNameFilter: '',

        },
        projectSearchDTO: {
            branchId: this.defaultValues.branchId
        },
        costCenterSearchDTO: {
            branchId: this.defaultValues.branchId
        },
        locationSearchDTO: {
            branchId: this.defaultValues.branchId
        },

        chartOfAccountDTO: {},
        employeeSearchDTO: {},
        storeSearchDTO: {},
        donorSearchDTO: {
            branchId: this.defaultValues.branchId
        },
        departmentSearchDTO: {
            branchId: this.defaultValues.branchId
        },
        currencySearchDTO: {},
        accAccountingCycleDTO: {},
        accChartOfAccountDTO: {},
        ledgerSearchDTO: {},
        ItemCategoryDTO: {},


    }
    payrollsetupHelperObject = {
        prlTblMonthlySalaryDTOExtend: [],
        payrollReportDTO: {},
        paginationDTO: this.paginationObject,
        employeeSearchDTO: {},
        monthlySalarySearchDTO: {},

        lstMonthlySalaryDto: [],
        lstprlTblEmployeeTaxLocalDTO: [],
        accPayrollDTO: {
            lstAccAccountsPayrollSetupLocalDTO: [],
            lstPrlTblAllowanceTypeDTO: [],
            lstPrlTblDeductionsDTO: [],
        },
        // hrEmployeeDTO:{

        // }



    }
    stockstoreHelperObject = {

        storeDTO: {},
        invTblStore: {},
        paginationDTO: {},
        storeSearchDTO: {
            branchId: this.defaultValues.branchId
        },
        employeeSearchDTO: {},
        countryName: '',
        stateId: '',
        locationSearchDTO: {},
        itemSearchDTO: {},
        itemCategoryDTO: {},
        productDTO: {},
        productSearchDTO: {},
        storeAdjustmentLocalDTO: {},
        storeAdjustmentSearchDTO: {},
        receiveDTO: {},
        issueDTO: {},

        lstInvIssue_Detail: [],
        lstReceiveBatches: [],
        lstReceive_detail: [],
        productFamilyDTO: {},
        lst_product_branch: [],
        lstAssociatedTaxItems: [],
        lstProductUoms: [],

        invIssueLocalDTO: {},
        invIssueDetail: [],
        storeTransferSearchDTO: {
            ser_product_id: ''
        },
        storeStockReportsDTO: {},
    }
    generalHelperObject = {
        paginationDTO: {},
        chartOfAccountDTO: {},
        accChartOfAccountDTO: {},
        invTblPartyAdvanceDetailLocalDTO: {}
    }
    supplierinvoiceSearchDTO = {
        branchId: this.defaultValues.branchId,
        expenseBillType: "",
        documentTypeID: "",
        txtInvoiceStatus: "",
        poNoFilter: "",
        statusFilter: "",
        supplierCodeFilter: "",
        dateFromFilter: "",
        dateToFilter: "",
        amountFilter: "",
        amountLogicFilter: "",
        supplierNameFilterField: "",
        productNameFilter: "",
        customerNameFilter: "",
        customerBusNameFilter: "",
        itemReferenceCodeFilter: "",
        billTypeFilter: "",
        serCreatedUserIdFilter: "",
        blnReceiptFilter: "",
        isChildBranchSearchFilter: "",
        orderByFilter: "",
        txtChequeEqualeFilter: "",
        noOfNewsPapersFilter: "",
        isSupplierinvoiceFilter: "",
    }

    purchaseHelperObject = {
        paginationDTO: {},
        productDTO: {},
        purchaseOrderSearchDTO: {},
        purchaseReportsDTO: {},
        invPurchaseOrderDTO: {},
        lstInvPurchaseOrderDetailDTO: [],
        lstInvTblInvoiceJournalEntryLocalDTO: [],
        lstPurchaseOrderDto: [],
        purchaseOrderStatus: '',
        supplierInvoiceSearchDTO: {
            invoiceId: ''
        },
        supplierSearchDTO: {},
        employeeSearchDTO: {},
        lstInvSupplierInvoiceDTO: [],
        lstInvSupplierInvoiceDetailsDTO: [],
        supplierinvoiceDTO: {},
        supplierInvoiceStatus: '',
        lstInvInvoiceDetailDTO: [],
        invSupplierInvoiceDTO: {},
        debitNoteSearchDTO: {},
        directPaymentStatus: '',
        invTblExpPaymentInfoLocalDTO: {},
        customerSearchDTO: {},
        supplierAdvanceSearchDTO: {},

        voucherStatus: '',
        partyInvoiceDTO: {},
        partyInvoiceDetDTO: {},
        lstPartyInvoiceDetail: [],
        lstInvoicePayment: [],
        paymentDTO: {},
        lst_supplier_customer_address_association: [],
        lstContactPersons: [],

        receiveDTO: {},
        issueDTO: {},
        invRecieveDetailDTO: {},
        lstinvTblDebitNoteLocalDTO: [],
        lstInvIssue_Detail: [],
        // lstDebitNoteDetail:[],
        lstinvTblDebitNoteDetailLocalDTO: [],
        lstTax_Detail: [],
        invSuppliersDTO: [],
        advanceSearchDTO: {},
        // lst_supplier_customer_address_association:[],
        // lstContactPersons:[],
        itemSearchDTO: {},
        lstSupplierBranch: [],
        lstAssociatedTaxItems: [],
        lstInvTblProductTaxDetailLocalDTO: [],

        lstaccTblProductTaxDetailLocalDTO: [],
        accVoucherDTO: {},
        lstAccVoucherDetailDTO: [],
        lstaccVoucherDTO: [],


        lstadvanceStatus: [],
        lstinvPartyAdvanceDTO: [],
        lstDocumentAdvances: [],
        listInvTblProductTaxDetailLocalDTO: [],
        invoicePaymentSearchDTO: {},
        purchaseOrderReportsDTO: {},

    }
    salesHelperObject = {
        paginationDTO: {},
        creditNoteSearchDTO: {},
        invIssueDetailLocalDTO: {},
        supplierInvoiceSearchDTO: {},
        customerInvoiceSearchDTO: {
            invoiceId: ''
        },
        salesOrderSearchDTO: {},
        lstSalesOrderDto: [],
        lstInvDemandDTO: [],
        salesOrderStatus: '',
        invSalesOrderDTO: {},
        lstInvSalesOrderDetailDTO: [],
        lstInvoiceDetail: [],
        lstItemDemanded: [],
        lstStatusInvoiceDetail: [],
        lstStatusItemDemanded: [],
        partyInvoiceDTO: {},
        partyInvoiceDetDTO: {},
        lstInvoicePayment: [],
        customerSearchDTO: {},
        lstAssociatedTaxItems: [],
        lst_supplier_customer_address_association: [],
        lstContactPersons: [],
        lstCustomerBranch: [],
        slsCustomerLocalDTO: [],

        invReceiveTransactionsDTO: {},
        invReceiveDTO: {},
        invTblCreditNoteLocalDTO: {},
        lstInvRecieveDetailDTO: [],
        lstInvTblCreditNoteDetailLocalDTO: [],
        lstInvTblProductTaxDetailLocalDTO: [],
        lsttaxDetailLocalDTO: [],
        listInvTblProductTaxDetailLocalDTO: [],
        salesReportsDTO: {},
    }

    financeHelperObject = {
        paginationDTO: this.paginationObject,
        voucherSearchDTO: {},
        ledgerSearchDTO: {},
        notesHeadSearchDTO: {},
        subNoteSearchDTO: {},
        bankReconcilationSearchDTO: {},

        accBankReconcilationDTO: {},
        lst_reconcilation_detail: [],
        financeReportsSearchDTO: {}
    }

    managementHelperObject = {
        paginationDTO: this.paginationObject,
        userDetailsDTO: {},
    }


    advanceHelperObject = {
        paginationDTO: {},
        // advanceSearchDTO: {
        //       advanceDetailFilter:{},  change for customer
        // },
        advanceSearchDTO: {
            advanceDetailFilter: ""
        },


        invTblPartyAdvanceLocalDTO: {},
        invTblPartyAdvanceDetailLocalDTO: {},
        lstProductTaxDetails: []

    }

    taxHelperObject = {


        taxSearchDTO: {
            txt_occurrence: ""
        },
        taxReportsDTO : {

        }

    }
    taxReportsDTO = {

    }

}
export class DefaultLists {

    pageSizeOptionsList: any = [10, 50, 100];
    bigPageSizeOptionsList: any = [25, 50, 100];
    legalStatusList = [
        { key: 'UNREGISTERED', value: 'Un-Registered' },
        { key: 'SOLEPROPRIETOR', value: 'Sole Proprietor' },
        { key: 'REGISTEREDPARTNERSHIP', value: 'Registered Partnership' },
        { key: 'REGISTEREDJOINTVENTURE', value: 'Registered Joint Venture' },
        { key: 'PRIVATELIMITED', value: 'Private Limited' },
        { key: 'PUBLICLIMITED', value: 'Public Limited' },
        { key: 'GUARANTEELIMITED', value: 'Guarantee Limited' },
        { key: 'OTHERS', value: 'Others' },
    ];
    businessTurnOverList = [

      { key: 'less than 1 Lakh / annum', value: 'less than 1 Lakh / annum' },
        { key: '1 Lakh / annum', value: '1 Lakh / annum' },
        { key: '1 Lakh To 1 Million / annum', value: '1 Lakh To 1 Million / annum' },
        { key: '1 Million To 10 Million / annum', value: '1 Million To 10 Million / annum' },
        { key: 'Greater 10 Million / annum', value: 'Greater 10 Million / annum' },
    ];
    businessNatureList = [
        { key: 'GOODS', value: 'General order & supplier' },
        { key: 'WORKSSERVICES', value: 'Work & Service' },
        { key: 'CONSULTING', value: 'Consulting' },
        { key: 'OTHERS', value: 'Other' },
    ];
    tenderTypeList = [
        { key: 'SINGLESTAGESINGLEENVELOPE', value: 'Single Stage, Single Envelop' },
        { key: 'SINGLESTAGETWOENVELOPES', value: 'Single Stage Two Envelops' },
    ];

    tenderDocumentList = [
        { key: 'FINANCIALDOCUMENT', value: 'Financial Document' },
        { key: 'BOQDOCUMENT', value: 'Bill of Quotation (BOQ)' },
        { key: 'TECHNICALDOCUMENT', value: 'Technical Document' },
        { key: 'CORRIGENDUM', value: 'Corrigendum' },
        { key: 'RFPDOCUMENT', value: 'Requesrt for Proposal (RFP)' },
        { key: 'OTHER', value: 'Other' },
    ];
    bidDocumentList = [
        { key: 'FINANCIALDOCUMENT', value: 'Financial Document' },
        { key: 'BOQDOCUMENT', value: 'Bill of Quotation (BOQ)' },
        { key: 'TECHNICALDOCUMENT', value: 'Technical Document' },
        { key: 'RFPDOCUMENT', value: 'Requesrt for Proposal (RFP)' },
        { key: 'OTHER', value: 'Other' },
    ];
    instrumentTypeList = [
        { key: 'DEMANDDRAFT', value: 'Demand Draft' },
        { key: 'PAYORDER', value: 'Pay Order' },
        // { key: 'BIDMONEY', value: 'Bid Money' },
        // { key: 'TENDERX', value: 'Tender X' },
        { key: 'OTHER', value: 'Other' },
    ];
    boqTypeList = [
        { key: 'ITEMRATE', value: 'Itemize Rate' },
        { key: 'FIXEDPERCENTAGE', value: 'Above/Below' },
    ];
    tenderStatusList = [
        { key: 'PUBLISHED', value: 'Open Tenders' },
        { key: 'ACTIVE', value: 'Active Tenders' },
        { key: 'TECHOPEN', value: 'Technical Opened Tenders' },
        { key: 'TECHEVALUATED', value: 'Technically Evaluated Tenders' },
        { key: 'FINOPEN', value: 'Financial Opened Tenders' },
        { key: 'FINEVALUATED', value: 'Financially Evaluated Tenders' },
        { key: 'AWARD', value: 'Awarded Tenders' },
        { key: 'CLOSED', value: 'Closed Tenders' },
        { key: 'CANCELLED', value: 'Canceled Tenders' },
        // { key: 'WITHHELD', value: 'Withheld Tenders' },
    ];
    documentTypeList = [
        { key: 'CORRIGENDUM', value: 'Corrigendum' },
        { key: 'TENDER', value: 'Tender' },

    ];
}


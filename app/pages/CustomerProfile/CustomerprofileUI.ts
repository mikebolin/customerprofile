import { CustomerProfile, Contact } from '../../models/CustomerProfile';
export class CustomerProfileUI {
  CustomerProfileUIModel: any;
  constructor(selectedEnterprse: CustomerProfile) {
    this.customerProfileID = selectedEnterprse.customerProfileID;
    this.enterpriseID = selectedEnterprse.enterpriseID;
    this.accountName = selectedEnterprse.accountName;
    this.accountNumber = selectedEnterprse.accountNumber;
    this.isProactive = selectedEnterprse.isProactive; // todo
    this.proactiveAuditNumber = selectedEnterprse.proactiveAuditNumber;
    this.proactiveStart = new Date(selectedEnterprse.proactiveStartDate);
    this.proactiveEnd = new Date(selectedEnterprse.proactiveEndDate);
    this.notificationVariance = selectedEnterprse.notificationVariance;
    this.edmName = selectedEnterprse.edmName;
    this.edmEmail = selectedEnterprse.edmEmail;
    this.esrEmail = selectedEnterprse.esrEmail;
    this.esrName = selectedEnterprse.esrName;
    this.allSettlementReasons = selectedEnterprse.allSettlementReasons; // todo, isAllSettlementReasons rename
    this.outboundShipments = selectedEnterprse.outboundShipments; // todo, is, can, has
    this.notifyAccountLocation = selectedEnterprse.notifyByAccountLocation; // todo, is, can, has
    this.proactiveNotes = selectedEnterprse.proactiveNotes;
    this.selectedValuesDocumentTypes = selectedEnterprse.notificationDocumnets;

    if (selectedEnterprse.contacts !== null && selectedEnterprse.contacts !== undefined) {
      this.contacts = selectedEnterprse.contacts.map(x => {
        return {
          name: x.name,
          email: x.email
        } as ContactUI;
      });
    }
    this.selectedValuesSettlement = selectedEnterprse.settlementReasons;
    switch (selectedEnterprse.notificationType) {
      case 'Individual':
        this.SelectedNotificationType = 'Individual';
        break;
      case 'Consolidated':
        this.SelectedNotificationType = 'Consolidated';
        break;
      case 'Weekly Consolidated':
        this.SelectedNotificationType = 'Weekly Consolidated';
        break;
      case 'Auto-Consolidated':
        this.SelectedNotificationType = 'Auto-Consolidated';
        break;
      default:
        break;
    }
    selectedEnterprse.isProactive ? (this.proactiveLabelText = 'Active') : (this.proactiveLabelText = 'Inactive');
    selectedEnterprse.allSettlementReasons
      ? (this.allSettlementReasonsLabelText = 'All Reasons')
      : (this.allSettlementReasonsLabelText = 'Disabled');
    selectedEnterprse.outboundShipments ? (this.outboundShipLabelText = 'Outbound') : (this.outboundShipLabelText = 'Disabled');
    selectedEnterprse.notifyByAccountLocation
      ? (this.notifyByAccountLabelText = 'Notify By Account Location')
      : (this.notifyByAccountLabelText = 'Disabled');
    selectedEnterprse.allSettlementReasons ? (this.isSettleMultiDisabled = false) : (this.isSettleMultiDisabled = true);
  }

  customerProfileID: number;
  enterpriseID: number;
  accountName: string;
  accountNumber: string;
  isProactive: boolean;
  proactiveAuditNumber: string;
  proactiveStart: Date;
  proactiveEnd: Date;
  contacts: ContactUI[];
  edmName: string;
  edmEmail: string;
  esrName: string;
  esrEmail: string;
  notificationVariance: number;
  allSettlementReasons: boolean;
  outboundShipments: boolean;
  notifyAccountLocation: boolean;
  proactiveNotes: string;
  referenceData: CustomerProfileRefDataResponseUI;
  selectedValuesDocumentTypes: Array<string> = [];
  SelectedNotificationType: string;
  selectedValuesSettlement: Array<string> = [];
  notificationTypes: Array<string> = [];
  notificationDocuments: Array<string> = [];
  settlementReasons: Array<string> = [];
  saveConfirmationDialog: boolean;
  deleteConfirmationDialog: boolean;
  selectedContactId: number;
  selectedContactName: string;
  selectedContactEmail: string;
  createEnterpriseID: number;
  createEnterpriseName: string;
  createEnterpriseAccount: string;
  queryParamsCustomerProfileID: number;
  currentProfile: any;
  proactiveLabelText: string;
  allSettlementReasonsLabelText: string;
  outboundShipLabelText: string;
  notifyByAccountLabelText: string;
  isSettleMultiDisabled: boolean;

  public newEnterprise() {
    const newProfile = new CustomerProfile();
    this.enterpriseID = this.createEnterpriseID;
    newProfile.accountName = this.createEnterpriseName;
    newProfile.accountNumber = this.createEnterpriseAccount;
    newProfile.isProactive = true;
    this.proactiveStart = new Date();
    this.proactiveEnd = new Date(9999, 12, 31, 23, 59, 59, 9999999);
    this.SelectedNotificationType = '';
    this.selectedValuesDocumentTypes = [];
    this.selectedValuesSettlement = [];
    this.contacts = new Array<ContactUI>();

    this.currentProfile = newProfile;
  }

  public setTextHandlers() {
    this.changeProactive();
    this.changeOutbound();
    this.changeAccountLocation();
  }

  changeProactive() {
    this.isProactive ? (this.proactiveLabelText = 'Active') : (this.proactiveLabelText = 'Inactive');
  }
  public changeSettlementReasons() {
    this.allSettlementReasons ? (this.allSettlementReasonsLabelText = 'All Reasons') : (this.allSettlementReasonsLabelText = 'Disabled');

    if (this.allSettlementReasons) {
      this.selectedValuesSettlement = ['All'];
      this.isSettleMultiDisabled = false;
    } else {
      this.selectedValuesSettlement = [];
      this.isSettleMultiDisabled = true;
    }
  }
  changeOutbound() {
    this.outboundShipments ? (this.outboundShipLabelText = 'Outbound') : (this.outboundShipLabelText = 'Disabled');
  }
  changeAccountLocation() {
    this.notifyAccountLocation
      ? (this.notifyByAccountLabelText = 'Notify By Account Location')
      : (this.notifyByAccountLabelText = 'Disabled');
  }
}

export class CustomerProfileRefDataResponseUI {
  notificationTypes: string[];
  documentTypes: string[];
  settlementReasons: string[];
}

export class ContactUI {
  name: string;
  email: string;
}

export class UpdateSaveCustomerProfile {
  constructor(CurrentValues: CustomerProfileUI) {
    this.customerProfileID = CurrentValues.customerProfileID;
    this.enterpriseID = CurrentValues.enterpriseID;
    this.accountName = CurrentValues.accountName;
    this.accountNumber = CurrentValues.accountNumber;
    this.isProactive = CurrentValues.isProactive;
    this.proactiveAuditNumber = CurrentValues.proactiveAuditNumber;
    this.proactiveStartDate = CurrentValues.proactiveStart;
    this.proactiveEndDate = CurrentValues.proactiveEnd;
    this.notificationVariance = CurrentValues.notificationVariance;
    this.contacts = CurrentValues.contacts;
    this.edmName = CurrentValues.edmName;
    this.edmEmail = CurrentValues.edmEmail;
    this.esrName = CurrentValues.esrName;
    this.esrEmail = CurrentValues.esrEmail;
    this.notificationType = CurrentValues.SelectedNotificationType;
    this.selectedValuesDocumentTypes = CurrentValues.selectedValuesDocumentTypes;
    this.selectedValuesSettlement = CurrentValues.selectedValuesSettlement;
    this.allSettlementReasons = CurrentValues.allSettlementReasons;
    this.outboundShipments = CurrentValues.outboundShipments;
    this.notifyAccountLocation = CurrentValues.notifyAccountLocation;
    this.proactiveNotes = CurrentValues.proactiveNotes;
  }
  selectedValuesDocumentTypes: Array<string> = [];
  selectedValuesSettlement: Array<string> = [];
  allSettlementReasons: boolean;
  outboundShipments: boolean;
  notifyAccountLocation: boolean;
  proactiveNotes: string;
  customerProfileID: number;
  enterpriseID: number;
  accountName: string;
  accountNumber: string;
  isProactive: boolean;
  proactiveAuditNumber: string;
  proactiveStartDate: Date;
  proactiveEndDate: Date;
  notificationVariance: number;
  contacts: ContactUI[];
  edmName: string;
  edmEmail: string;
  esrName: string;
  esrEmail: string;
  notificationType: string;
}

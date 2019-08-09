// used for grid - flat record
export interface CollectionItem {
  id: number;
  accountNumber: string;
  accountName: string;
  balanceSentToCollection: number;
  remainingBalance: number;
  statusID: number;
  status: string;
  agency: string;
  escalatedAgency: string;
  collector: string;
  dateWrittenOff: Date;
}
export class Enterprise {
    CustomerProfileID: string;
    EnterpriseID: string;
    AccountName: string;
    AccountNumber: string;
    ProactiveAuditNumber: string;
    isProactive: boolean;
    ProactiveStartDate: Date;
    ProactiveEndDate: Date;
    isOpenBook: boolean;
    OpenBookStartDate: Date;
    OpenBookEndDate: Date;
    OpenBookClickFeeAccessorial: string;
    NotificationVariance: number;
    ContactName: string;
    EmailAddressesList: string;
    NotificationType: string;
    NotifyDocuments: string;
    EmailTitle: string;
    EDMName: string;
    EDMEmail: string;
    ESRName: string;
    ESREmail: string;
    OutboundShipments: boolean;
    SettlementReasons: string;
    NotifyByAccountLocation: boolean;
    ProactiveNotes: string;
}
// save / updates
export class SaveCollection {
  id: number;
  dateWrittenOff: Date;
  statusID: number;
  collectorID: number;
  agencyID: number;
  escalatedAgencyID: number;
}
export class CreateNote {
  collectionID: number;
  note: string;
}
export class CreatePayment {
  collectionID: number;
  authorizationCode: string;
  paymentAmount: number;
  paymentDate: Date;
  agencyInvoiceNumber: string;
  agencyInvoiceAmount: number;
  agencyID: number;
  escalatedAgencyID: number;
  collectorID: number;
}
export class SavePayment {
  collectionID: number;
  authorizationCode: string;
  paymentAmount: number;
  paymentDate: Date;
  agencyInvoiceNumber: string;
  agencyInvoiceAmount: number;
}
export class SaveNote {
  collectionID: number;
  note: string;
}
export class PotentialCollection {
  amountOwed: number;
  invoiceCount: number;
  accountNumber: string;
}

export class CreateCollection {
  amountOwed: number;
  accountName: string;
  accountNumber: string;
  constructor(amountOwed: number, accountName: string, accountNumber: string) {
    this.amountOwed = amountOwed;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
  }
}

// used for update page
export interface Collection {
  id: number;
  accountName: string;
  accountNumber: string;
  statusID: number;
  agencyID: number;
  escalatedAgencyID: number;
  collectorID: number;
  balanceSentToCollection: number;
  remainingBalance: number;
  totalPayments: number;
  dateWrittenOff: Date;
  documents: CollectionDocument[];
  invoices: CollectionDocument[];
  notes: CollectionNote[];
  payments: CollectionPayment[];
  dateCreated: Date;
}
export interface CollectionDocument {
  id: number;
  fileLocation: string;
  fileName: string;
  documentTypeID: number;
  documentType: string;
  fileFormat: string;
  dateCreated: Date;
  userCreated: string;
}
export class CollectionNote {
  id: number;
  noteText: string;
  dateCreated: number;
  userCreated: string;
}
export class CollectionPayment {
  id: number;
  authorizationCode: string;
  paymentAmount: number;
  paymentDate: Date;
  agencyInvoiceNumber: string;
  agencyInvoiceAmount: number;
  agencyID: number;
  escalatedAgencyID: number;
  collectorID: number;
}

enum DocumentType {
  Unknown,
  Invoice,
  CustomerInvoice,
  BOL,
  POD,
  Email,
  Quote,
  CollectorInvoice
}

export interface EnterpriseChildDTO {
  enterpriseID: number;
  name: string;
  accountNumber: string;
  fullName: string;
}

// reference tables
export interface CollectionAgencyDTO {
  id: number;
  agency: string;
}
export interface CollectionStatusDTO {
  id: number;
  status: string;
}
export interface CollectionCollectorDTO {
  id: number;
  collector: string;
}
export interface DocumentTypeDTO {
  id: number;
  name: string;
}
export interface References {
  statuses: CollectionStatusDTO[];
  agencies: CollectionAgencyDTO[];
  escalatedAgencies: CollectionAgencyDTO[];
  collectors: CollectionCollectorDTO[];
  documentTypes: DocumentTypeDTO[];
}

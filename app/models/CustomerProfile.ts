export class CustomerProfile {
  customerProfileID: number;
  enterpriseID: number;
  accountName: string;
  accountNumber: string;
  proactiveAuditNumber: string;
  isProactive: boolean;
  proactiveStartDate: Date;
  proactiveEndDate: Date;
  notificationVariance: number;
  notificationType: string;
  edmName: string;
  edmEmail: string;
  esrName: string;
  esrEmail: string;
  outboundShipments: boolean;
  notifyByAccountLocation: boolean;
  allSettlementReasons: boolean;
  proactiveNotes: string;
  settlementReasons: Array<string> = [];
  notificationDocumnets: Array<string> = [];
  contacts: Array<Contact> = [];
  public constructor() {}
}

export class CustomerProfileRefDataResponse {
  notificationTypes: string[];
  documentTypes: string[];
  settlementReasons: string[];
}

export class Contact {
  name: string;
  email: string;
}

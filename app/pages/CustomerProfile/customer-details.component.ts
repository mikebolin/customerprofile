import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { CustomerProfileUI, ContactUI, UpdateSaveCustomerProfile, CustomerProfileRefDataResponseUI } from './CustomerprofileUI';
import { CustomerProfile, Contact, CustomerProfileRefDataResponse } from '../../models/CustomerProfile';
import { ActivatedRoute, Router } from '@angular/router';
//import { CustomerService } from '../../services/customer.service';
import { AlertMessageComponent } from '../../shared/alert-message/alert-message.component';
import { ValidateCanAddRow, ESREDMValidator, contactValidator, CustomerProfileValidation } from './validatecustom';
@Component({
  selector: 'app-customer-profile-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild(AlertMessageComponent)
  alertMessage: AlertMessageComponent;
  get f() {
    return this.registerForm.controls;
  }

  CustomerProfileUIModel: CustomerProfileUI;
  isValid: CustomerProfileValidation;
  PassedEnterprise: any;
  lookupError: boolean;
  referenceData: CustomerProfileRefDataResponseUI;
  registerForm: FormGroup;
  submitted = false;
  contactItemsArray: FormArray;
  toolTipString: string;

  public minProactiveStart: Date = new Date(2000, 0, 0);
  public maxProactiveStart: Date = new Date(2020, 12, 30);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
     private cdr: ChangeDetectorRef
  ) {
    this.CustomerProfileUIModel = new CustomerProfileUI({} as CustomerProfile);
    this.referenceData = new CustomerProfileRefDataResponse();
    this.referenceData.notificationTypes = new Array<string>();
    this.isValid = new CustomerProfileValidation();

    this.initForm();
  }

  ngOnInit() {
    this.setQueryParams();
    this.initUIModel();
  }
  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        fAuditNum: ['', Validators.required],
        fNotificationVariance: [0, Validators.required],
        fSettlementReasons: ['', Validators.required],
        fESRName: [''],
        fESREmail: [''],
        fEDMName: [''],
        fEDMEmail: [''],
        fNotificationDocuments: [null, Validators.required],
        fNotificationType: [null, Validators.required],
        fStartDate: [null, Validators.required],
        fEndDate: [null, Validators.required],
        contactItems: this.formBuilder.array([
          this.formBuilder.group(
            {
              name: 'test',
              email: 'test'
            },
            { validator: contactValidator }
          )
        ])
      },
      { validator: ESREDMValidator }
    );

    this.contactItemsArray = this.registerForm.get('contactItems') as FormArray;

     this.onChanges();
  }


  setQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.CustomerProfileUIModel.createEnterpriseID = params.enterpriseId;
      this.CustomerProfileUIModel.customerProfileID = 0;
      this.CustomerProfileUIModel.createEnterpriseName = params.name;
      this.CustomerProfileUIModel.createEnterpriseAccount = params.account;
      this.CustomerProfileUIModel.queryParamsCustomerProfileID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    });
  }

  removeInputConfirmation(index) {
    this.CustomerProfileUIModel.selectedContactId = index;
    this.CustomerProfileUIModel.selectedContactName = this.contactItemsArray.controls[index].get('name').value;
    this.CustomerProfileUIModel.selectedContactEmail = this.contactItemsArray.controls[index].get('email').value;
    this.contactItemsArray.controls[index].get('email').value === ''
      ? this.removeInput()
      : (this.CustomerProfileUIModel.deleteConfirmationDialog = true);
  }
  changeCheckboxHandlers() {
    this.CustomerProfileUIModel.setTextHandlers();
  }
  AllReasonsHandler() {
    this.CustomerProfileUIModel.changeSettlementReasons();
  }


  removeInput() {
    this.CustomerProfileUIModel.deleteConfirmationDialog = false;
    this.contactItemsArray.controls.splice(this.CustomerProfileUIModel.selectedContactId, 1);
  }

  addRow() {
    var numContacts = this.contactItemsArray.controls.length;
    const name = this.contactItemsArray.controls[numContacts - 1].get('name').value;
    const email = this.contactItemsArray.controls[numContacts - 1].get('email').value;
    ValidateCanAddRow(name, email)
      ? this.contactItemsArray.push(
          this.formBuilder.group({
            name: '',
            email: ''
          })
        )
      : this.alertMessage.showAlertMessage('An empty contact already exists', 'Error');
  }

  getProfile(profileID) {

        let dummy1 = new CustomerProfile();
  dummy1.customerProfileID = 14;
            dummy1.enterpriseID = 62629;
            dummy1.accountName = "Apogee Industries, Inc.";
            dummy1.accountNumber = "60101532";
            dummy1.proactiveAuditNumber = "ApogeeAuditNumber";
            dummy1.isProactive = true;
            dummy1.proactiveStartDate = new Date();
            dummy1.proactiveEndDate = new Date();
            dummy1.notificationVariance = 20.00;
            dummy1.notificationType = "Apogee Notification Type";
            dummy1.edmName = "ApogeeEDM";
            dummy1.edmEmail = "ApogeeEmail";
            dummy1.esrName = "ApogeeESR";
            dummy1.esrEmail = "ApogeeESREmail";
            dummy1.outboundShipments = true;
            dummy1.notifyByAccountLocation = true;
            dummy1.allSettlementReasons = true;
            dummy1.proactiveNotes = "Apogee Proactive Notes";
            dummy1.contacts = Array<Contact>();
            var dummycontact = new Contact(); 
            dummycontact.name = 'Mike Bolin';
            dummycontact.email = "mikebolin@gmail.com";


            this.CustomerProfileUIModel.currentProfile = dummy1;
                  this.InitalizeForEnterprise(this.CustomerProfileUIModel.currentProfile);

    /*
    this.pcService.GetSpecificCustomerProfile(profileID).subscribe((res: any) => {
      this.CustomerProfileUIModel.currentProfile = res;
      this.InitalizeForEnterprise(this.CustomerProfileUIModel.currentProfile);
    });
    */
  }

  initUIModel() {

    //simulate network call 
     this.referenceData = new CustomerProfileRefDataResponse();
     this.referenceData.documentTypes = ["Certificate-Insurance", "Commercial", "Delivery-Receipt", "Letter-Authority", "Lumper-Receipt", "On-Hand-Notice", "Quote-Document", "Tendered-BOL", "Weight-Inspection"]

     this.referenceData.notificationTypes = ["Individual", "Consolidated"];

     this.referenceData.settlementReasons = ["Additional Quantity", "Address Change", "After Hours", "Airport Delivery Fee", "Airport Pickup Fee", "Appointment Fee", "Blind Shipment Fee", "BOL Correction Fee", "Carpet Rate Applied", "Carrier Change", "Carrier Payable Only", "Class Corrected Per BOL", "Construction Site Delivery", "Construction Site Pickup", "Container Freight Station Delivery", "Container Freight Station Pickup", "Cubic Capacity Applied", "Detention Fee", "Distribution Center Delivery", "Dry Run Fee", "Freeze Protection", "Freight Given To Different Carrier", "Grocery Warehouse Delivery", "Guaranteed Delivery Fee", "Hand Unload fee", "HazMat Fee", "In-Bond Fee", "Inside Delivery", "Inside Pickup", "Inspection Fee", "Liftgate Delivery", "Liftgate Pickup", "Limited Access Delivery", "Limited Access Pickup", "Linear Footage Applied", "Lumper fee", "Military Site Delivery", "Non-Stack Fee", "Notify Consignee", "Over Dimension Fee", "Pallet Exchange Fee", "Port Charges", "Priority Service", "Reclass", "Reconsignment", "Reconsignment Fee", "Redelivery", "Redelivery Fee", "Residential Delivery", "Residential Pickup", "Return to Shipper", "Reweigh", "Reweigh Fee", "School Site Delivery", "Sort & Segregate Fee", "Special Delivery", "Storage Fee", "Sufferance", "Trade Show Delivery", "Trade Show Pickup", "Weight Corrected Per BOL", "Wrong Dest State", "Wrong Dest Zip Code", "Wrong Origin State", "Wrong Origin Zip Code"]; 
    /*
    this.pcService.getCustomerProfileReferenceData().subscribe(
      responseList => {
        this.referenceData = responseList;
      },
      error => {
        this.alertMessage.showAlertMessage('Error loading the reference records', 'Error');
      },
      () => this.setUIModel()
    );
    */

    this.setUIModel();
  }

  private setUIModel() {
    this.CustomerProfileUIModel.queryParamsCustomerProfileID !== 0
      ? this.getProfile(this.CustomerProfileUIModel.queryParamsCustomerProfileID)
      : this.setupForNewEnterprise();
  }
  private updateSaveProfileConfirmation() {
    this.CustomerProfileUIModel.saveConfirmationDialog = true;
  }

  private updateSaveProfile() {
    this.CustomerProfileUIModel.saveConfirmationDialog = false;
    const SaveCustomerProfileObj: UpdateSaveCustomerProfile = new UpdateSaveCustomerProfile(this.CustomerProfileUIModel);
    this.updateProfile(SaveCustomerProfileObj);
  }

  private updateProfile(profile: UpdateSaveCustomerProfile) {
            this.alertMessage.showAlertMessage('Successfully updated', 'Success');
    /*
    this.pcService.updateCustomerProfile(profile).subscribe(
      data => {
        this.alertMessage.showAlertMessage('Successfully updated', 'Success');
      },
      error => {
        this.alertMessage.showAlertMessage('Error updating', 'Error');
      }
    );
    */
  }


  InitalizeForEnterprise(selectedEnterprse: CustomerProfile) {
    this.CustomerProfileUIModel.customerProfileID === 0
      ? this.CustomerProfileUIModel.newEnterprise()
      : (this.CustomerProfileUIModel = new CustomerProfileUI(selectedEnterprse));
    this.CustomerProfileUIModel.notificationTypes = this.referenceData.notificationTypes;
    this.CustomerProfileUIModel.notificationDocuments = this.referenceData.documentTypes;
    this.CustomerProfileUIModel.settlementReasons = this.referenceData.settlementReasons;
  }

  createItem(test) {
    return (test === null)
      ? (this.formBuilder.group({
          name: '',
          email: ''
        }))
      : (this.formBuilder.group({
          name: test.name,
          email: test.email
        }));
  }

  closeDialog() {
    this.CustomerProfileUIModel.saveConfirmationDialog = false;
    this.CustomerProfileUIModel.deleteConfirmationDialog = false;
  }

  private setupForNewEnterprise() {
    this.InitalizeForEnterprise(this.CustomerProfileUIModel.currentProfile);
  }

  onSubmit() {
    console.log('form changing');
        this.isValid.setValidState(this.registerForm);
        this.cdr.detectChanges();
    return !this.registerForm.invalid ? (this.CustomerProfileUIModel.saveConfirmationDialog = true) : false;
  }
  onReset() {
    this.submitted = false;
  }
  
  public submitSave() {
    this.isValid.setValidState(this.registerForm);

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  onChanges(){
    this.registerForm.valueChanges.subscribe(val => {
        this.isValid.setValidState(this.registerForm);
  });
}

}

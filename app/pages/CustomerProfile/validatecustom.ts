import { FormBuilder, ValidatorFn, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { CustomerProfileUI, ContactUI, UpdateSaveCustomerProfile, CustomerProfileRefDataResponseUI } from './CustomerprofileUI';
import { Observable } from 'rxjs';

var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateCanAddRow(name, email) {
  const nameBool = name !== '' ? true : false;
  const emailBool = email !== '' ? true : false;
  return nameBool && emailBool ? true : false;
}
export const contactValidator = (control: AbstractControl) => {
  var contactName = control.get('name').value;
  var contactEmail = control.get('email').value;

  regexEmail.test(contactEmail)
    ? control.get('email').setErrors(null)
    : control.get('email').setErrors({ ContactEmailInvalid: 'Invalid Contact Email Address' });

  (contactName === null || contactName === undefined || contactName === '')
    ? control.get('name').setErrors({ ContactNameInvalid: 'Invalid Contact Name' })
    : control.get('name').setErrors(null);

 console.log('validator ', (contactName === null || contactName === undefined || contactName === ''));
  return;
};

export const ESREDMValidator = (control: AbstractControl) => {
  var edmEmailcontrol = control.get('fEDMEmail');
  var esrEmailcontrol = control.get('fESREmail');
  var edmNamecontrol = control.get('fEDMName');
  var esrNamecontrol = control.get('fESRName');
  var EDMEmail = edmEmailcontrol.value === null || edmEmailcontrol.value === undefined ? '' : edmEmailcontrol.value;
  var ESREmail = esrEmailcontrol.value === null || esrEmailcontrol.value === undefined ? '' : esrEmailcontrol.value;
  var ESRName = esrNamecontrol.value === null || esrNamecontrol.value === undefined ? '' : esrNamecontrol.value;
  var EDMName = edmNamecontrol.value === null || edmNamecontrol.value === undefined ? '' : edmNamecontrol.value;
  var isEdmEmailValid;
  var isEsrEmailValid;
  var isEdmNameValid;
  var isEsrNameValid;
  function setIndividualValidState() {
    regexEmail.test(EDMEmail) ? (isEdmEmailValid = true) : (isEdmEmailValid = false);
    regexEmail.test(ESREmail) ? (isEsrEmailValid = true) : (isEsrEmailValid = false);
    ESRName.length > 0 ? (isEsrNameValid = true) : (isEsrNameValid = false);
    EDMName.length > 0 ? (isEdmNameValid = true) : (isEdmNameValid = false);
  }
  function fullyValidateEDMEmail() {
    (isEsrEmailValid && isEsrNameValid && (EDMEmail === undefined || EDMEmail === '')) || isEdmEmailValid
      ? edmEmailcontrol.setErrors(null)
      : edmEmailcontrol.setErrors({ EDMEmailInvalid: 'Invalid EDM Email Address' });
  }
  function fullyValidateESREmail() {
    (isEdmEmailValid && isEdmNameValid && (ESREmail === undefined || ESREmail === '')) || isEsrEmailValid
      ? esrEmailcontrol.setErrors(null)
      : esrEmailcontrol.setErrors({ ESREmailInvalid: 'Invalid ESR Email Address' });
  }
  setIndividualValidState();
  fullyValidateEDMEmail();
  fullyValidateESREmail();
  isEdmEmailValid && isEdmNameValid && esrNamecontrol.setErrors(null);
  isEsrEmailValid && isEsrNameValid && edmNamecontrol.setErrors(null);

  return;
};

export class CustomerProfileValidation {
  constructor() {
    this.isAuduitNumValid = false;
    this.isNotificationVarianceValid = false;
    this.isSettlementReasons = false;
    this.isESRNameValid = false;
    this.isESREmailValid = false;
    this.isEDMNameValid = false;
    this.isEDMEmailValid = false;
    this.isNotificationDocValid = false;
    this.isNotificationTypeValid = false;
    this.isStartDateValid = false;
    this.isEndDateValid = false;

    this.FriendlyErrorMessages = [
      'Audit Number Cannot Be Empty',
      'Notification Variance Cannot Be Empty',
      'Settlement Reasons Cannot Be Empty',
      'ESR Name Cannot Be Empty',
      'ESR Email Must Be A Valid Email Address',
      'Notification Documents Cannot Be Empty',
      'Notification Type Cannot Be Empty',
      'Start Date Must Be A Valid Date',
      'End Date Must Be A Valid Date',
      'EDM Name Cannot Be Empty',
      'EDM Email Must Be A Valid Email Address'
    ];
  }
  public isAuduitNumValid: boolean;
  public isNotificationVarianceValid: boolean;
  public isSettlementReasons: boolean;
  public isESRNameValid: boolean;
  public isESREmailValid: boolean;
  public isEDMNameValid: boolean;
  public isEDMEmailValid: boolean;
  public isNotificationDocValid: boolean;
  public isNotificationTypeValid: boolean;
  public isStartDateValid: boolean;
  public isEndDateValid: boolean;

  //not done
  isNotificationDocumentsValid: boolean;
  controlKeys: Array<any>;
  private FriendlyErrorMessages: Array<string>;
  public ErrorsList: Array<string>;
  private ProfileForm: FormGroup;

  public buildErrorMessages() {
    this.ErrorsList = new Array<string>();
    for (var t = 0; t < this.controlKeys.length; t++) {
      this.controlKeys[t] !== null && this.ErrorsList.push(this.FriendlyErrorMessages[t]);
    }
    var foundContactNameError = false;
    var foundContactEmailError = false;
    var contactsArray = this.ProfileForm.get('contactItems') as FormArray;
    for (var t = 0; t < contactsArray.controls.length; t++) {
      contactsArray.controls[t].get('email').invalid === true && (foundContactEmailError = true);
      contactsArray.controls[t].get('name').invalid === true && (foundContactNameError = true);
    }
    foundContactNameError && this.ErrorsList.push('Contact Name Cannot Be Empty');
    foundContactEmailError && this.ErrorsList.push('Contact Email Must Be A Valid Email Address');
  }
  public setValidState(form: FormGroup) {
    this.ProfileForm = form;
    this.controlKeys = [
      form.controls.fAuditNum.errors,
      form.controls.fNotificationVariance.errors,
      form.controls.fSettlementReasons.errors,
      form.controls.fESRName.errors,
      form.controls.fESREmail.errors,
      form.controls.fNotificationDocuments.errors,
      form.controls.fNotificationType.errors,
      form.controls.fStartDate.errors,
      form.controls.fEndDate.errors,
      form.controls.fEDMName.errors,
      form.controls.fEDMEmail.errors
    ];
    this.updateBooleanValues();
    this.buildErrorMessages();
  }
  public updateBooleanValues() {
    this.controlKeys[0] === null ? (this.isAuduitNumValid = true) : (this.isAuduitNumValid = false);
    this.controlKeys[1] === null ? (this.isNotificationVarianceValid = true) : (this.isNotificationVarianceValid = false);
    this.controlKeys[2] === null ? (this.isSettlementReasons = true) : (this.isSettlementReasons = false);
    this.controlKeys[3] === null ? (this.isESRNameValid = true) : (this.isESRNameValid = false);
    this.controlKeys[4] === null ? (this.isESREmailValid = true) : (this.isESREmailValid = false);
    this.controlKeys[5] === null ? (this.isNotificationDocValid = true) : (this.isNotificationDocValid = false);
    this.controlKeys[6] === null ? (this.isNotificationTypeValid = true) : (this.isNotificationTypeValid = false);
    this.controlKeys[7] === null ? (this.isStartDateValid = true) : (this.isStartDateValid = false);
    this.controlKeys[8] === null ? (this.isEndDateValid = true) : (this.isEndDateValid = false);
    this.controlKeys[9] === null ? (this.isEDMNameValid = true) : (this.isEDMNameValid = false);
    this.controlKeys[10] === null ? (this.isEDMEmailValid = true) : (this.isEDMEmailValid = false);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { CustomerProfile, CustomerProfileRefDataResponse } from '../models/CustomerProfile';
import { CustomerProfileUI, ContactUI, UpdateSaveCustomerProfile} from '../pages/CustomerProfile/CustomerprofileUI';

@Injectable()
export class CustomerService {
  public proactiveRecordGrid: CustomerProfile[];
  public proactiveProfileSelected: CustomerProfile;

  public getCustomerProfileReferenceData(): Observable<CustomerProfileRefDataResponse> {
return Observable.of<CustomerProfileRefDataResponse>();
  }

  GetSpecificCustomerProfile(id: number): Observable<CustomerProfile> {
    return Observable.of<CustomerProfile>();
  }

  getCustomerProfiles(): Observable<CustomerProfile[]> {
    return Observable.of<CustomerProfile[]>();
  }

  constructor(private http: HttpClient) {}

  private handleError(res: HttpErrorResponse) {
    return observableThrowError(res.error || 'Server error');
  }

  public updateCustomerProfile(profile: UpdateSaveCustomerProfile) {
    return this.http.put(`${'test'}v1/customerprofile/update/profile`, profile);
  }



}

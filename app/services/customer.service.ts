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
/*
    return this.http
      .get<CustomerProfileRefDataResponse>(`${'test'}v1/customerprofile/CustomerProfile`)
      .pipe(catchError(this.handleError));
      */
  }

  GetSpecificCustomerProfile(id: number): Observable<CustomerProfile> {
    return Observable.of<CustomerProfile>();
    /*
    return this.http
      .get<CustomerProfile>(`${'test'}v1/customerprofile/${id}`)
      .map(data => (this.proactiveProfileSelected = data))
      .pipe(catchError(this.handleError));
      */
  }

  getCustomerProfiles(): Observable<CustomerProfile[]> {
    return Observable.of<CustomerProfile[]>();
    /*
    return this.http
      .get<CustomerProfile[]>(`${'test'}v1/customerprofile/`)
      .map(data => (this.proactiveRecordGrid = data))
      .pipe(catchError(this.handleError));
      */
  }

  constructor(private http: HttpClient) {}

  private handleError(res: HttpErrorResponse) {
    return observableThrowError(res.error || 'Server error');
  }

  public updateCustomerProfile(profile: UpdateSaveCustomerProfile) {
    return this.http.put(`${'test'}v1/customerprofile/update/profile`, profile);
  }



}

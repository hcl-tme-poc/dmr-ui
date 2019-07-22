import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EligibilityCheckResponse } from '../models/eligibility-check-response.model';

@Injectable({
  providedIn: 'root'
})
export class EligibilityCheckService {

  eligibilityData: EligibilityCheckResponse;

  constructor(private http: HttpClient) { }


  preCheckDriver(driverLicenseNumber: string, trilliumNumber: string, postalCode: string, dob: string) {

    const URL = environment.SERVER_URL+'GUEST-DRIVER/ELIGIBILITY-CHECK';

    const options = { params: new HttpParams().append('driverLicenseNumber', driverLicenseNumber)
            .append('trilliumNumber', trilliumNumber).append('postalCode', postalCode)
            .append('dob', dob) };

    return this.http.post(URL, {}, options)
      .pipe(
        catchError((err) => this.handleError(err))
      );

  }

  checkEligibilityQuestioner(driverLicenseNumber: string, driverEmail: string, musclePain: string,
          drivingHabitsStatus: string, cardiacStatus: string, breathStatus: string, 
          eyeVisionStatus: string, accidentStatus: string) {
    
    const URL = environment.SERVER_URL+'GUEST-DRIVER/ELIGIBILITY-QUESTION-CHECK';

    const options = { params: new HttpParams().append('driverLicenseNumber', driverLicenseNumber)
            .append('driverEmail', driverEmail).append('musclePain', musclePain)
            .append('drivingHabitsStatus', drivingHabitsStatus)
            .append('cardiacStatus', cardiacStatus).append('breathStatus', breathStatus)
            .append('eyeVisionStatus', eyeVisionStatus).append('accidentStatus', accidentStatus) };

    return this.http.post(URL, {}, options)
      .pipe(
        tap((data) => {
          this.eligibilityData = data as EligibilityCheckResponse;
        }),
        catchError((err) => this.handleError(err))
      );

  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}

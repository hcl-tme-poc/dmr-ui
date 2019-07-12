import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { of, Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  allUsers: UserModel[] = [
    {
      firstName: 'Alex', 
      lastName: 'Dough',
      email: 'alex@gmail.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._GMk5xvOliwC0qOUsqCXcQlVhBrhgLEM0S3rsMRUQQI',
      driverLicenseNumber: 'A1234-12345-12345',
      trilliumNumber: '1234567',
      postalCode: 'M1E1W7',
      dob: '1984-05-04'
    },
    {
      firstName: 'John', 
      lastName: 'Smith',
      email: 'john@hotmail.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.Q_w2AVguPRU2KskCXwR7ZHl09TQXEntfEA8Jj2_Jyew',
      driverLicenseNumber: 'A7869-78965-78965',
      trilliumNumber: '68992390',
      postalCode: 'M1E1W9',
      dob: '1979-05-04'
    },
  ]

  currentUser: UserModel | undefined;
  _currentUser$: BehaviorSubject<UserModel | {}> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {

    if(loginInfo.loginId === loginInfo.password || loginInfo.loginId === 'user1' || loginInfo.loginId === 'user2') {

      const user = (loginInfo.loginId === 'aaa' || loginInfo.loginId === 'user1') ? this.allUsers[0] : this.allUsers[1];

      this.currentUser = user;
      this._currentUser$.next(user);

      return of(user).pipe(
        delay(500)
      );
    }else {

      this.currentUser = undefined;
      this._currentUser$.next({});

      return throwError('Login id or password invalid');
    }

  }

  logoff() {

    this.currentUser = undefined;
    this._currentUser$.next({});
    
  }

  setCurrentUser(currentUser: UserModel | undefined) {

    this.currentUser = currentUser;
    this._currentUser$.next(currentUser ? currentUser : {});

  }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }
}

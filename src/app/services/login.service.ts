import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { of, Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: UserModel | undefined;
  _currentUser$: BehaviorSubject<UserModel | {}> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {

    const options = { params: new HttpParams().append('userName', loginInfo.loginId)
            .append('password', loginInfo.password)};

    return this.httpClient.post<any>(environment.LOGIN_URL, {responseType: "json"}, options)
    .pipe(map(user => {
      if (user)
      {
        this.currentUser = user ;
        this._currentUser$.next(user);
        return user;
      }
      else {

        this.currentUser = undefined;
        this._currentUser$.next({});
  
        return throwError('Login id or password invalid');
      }
    }));

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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, switchMap, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataResponse } from '../http/http.model';
import { ThisReceiver } from '@angular/compiler';
import { BLANK_USER, IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpService {
  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  private _userState$: BehaviorSubject<IUser> = new BehaviorSubject(BLANK_USER);

  // get user state

  getUserState(){
    return this._userState$.getValue();
  }

  //get user
  getUser$() {
    console.log(this._userState$.asObservable());
    return this._userState$.asObservable();
  }

  //set user
  setUser$(user: IUser) {
    this._userState$.next(user);
  }

  //login
  signin$(username: string, password: string) {
    const url = this.baseUrl + '/api/users/signin';
    const body = {
      username,
      password,
    };
    return this.submitItem(url, body).pipe(
      switchMap((res: any) => {
        console.log(res);
        if (res) {
          this.setUser$(res.value);
        }
        return of(res);
      })
    );
  }

  //signup
  signup$(username: string, email: string, phone: string, password: string,) {
    const url = this.baseUrl + '/api/users/signup';
    console.log(url);
    const body = {
      username,
      email,
      phone,
      password,
    };
    return this.submitItem<IUser>(url, body);
  }
}

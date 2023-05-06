import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, switchMap, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataResponse } from '../http/http.model';
import { ThisReceiver } from '@angular/compiler';
import { BLANK_USER, IUser, User } from '../models/user.model';
import { IAdmin } from '../models/admin';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpService {

  public _admin: IAdmin = {
    maAdmin: 0,
    tenAdmin: '',
    email: '',
    password: ''
  }
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

  createAccount(account:User){
    const url = this.baseUrl + '/api/users/signup';
    const body = {
      username:account.username,
      email:account.email,
      phone:account.phone,
      password:account.password,
      avatar:account.avatar,
      apartment:account.apartment,
      street:account.street,
      city:account.city,
      country:account.country,
      zip:account.zip,
      isAdmin:account.isAdmin,
      is_active:true,

    }
    return this.submitItem<IUser>(url,body);
  }
}


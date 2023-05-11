import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, switchMap, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataResponse } from '../http/http.model';
import { ThisReceiver } from '@angular/compiler';
import { BLANK_USER, IUser, User } from '../models/user.model';
import { IAdmin } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpService {

  public _admin: IAdmin = {
    _id: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
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
    return this.submitItem(url, body);
    //   switchMap((res: any) => {
    //     console.log(res);
    //     if (res.message === 'Sign in successfully') {
    //       this.setUser$(res.value);
    //     } else {

    //     }
    //     return of(res);

    //   })
    // );
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

  //logout
  logout$() {
    // set user state to blank user
    this.setUser$(BLANK_USER);
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

  getAllUsers(){
    const url = this.baseUrl + '/api/users/';
    return this.getItems<IUser>(url)
  }

getUserById(id:string){
  const url = this.baseUrl + '/api/users/';
  return this.getItem<IUser>(url+id);
}

// update user

updateUser(id:any, user:any){
  const url = this.baseUrl + '/api/users/' + id;
  const body = {
    username:user.username,
    email:user.email,
    phone:user.phone,
    password:user.password,
    avatar:user.avatar,
    apartment:user.apartment,
    street:user.street,
    city:user.city,
    country:user.country,
  }
  console.log(url);
  console.log(body);
  return this.editItem<IUser>(url,body);
}
}


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, switchMap, tap } from 'rxjs';
import { HttpService } from './../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataResponse } from '../http/http.model';
import { ThisReceiver } from '@angular/compiler';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpService {
  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  private _userState$: Subject<IUser | null> = new Subject();

  //get user
  getUser$() {
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
          this.setUser$(res);
          return of(true);
        }
        return of(false);
      })
    );
  }

  //signup
  signup$(username: string, email: string, password: string, phone: string) {
    const url = this.baseUrl + '/api/users/signup';
    console.log(url);
    const body = {
      username,
      email,
      password,
      phone,
    };
    return this.submitItem<IUser>(url, body);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from './../http/http.service';
import { HttpHeaders } from "@angular/common/http";
import { OdataResponse } from "../http/http.model";
import { ThisReceiver } from "@angular/compiler";

@Injectable({ providedIn: "root" })
export class UserService extends HttpService {
  private userStates$ = new BehaviorSubject<IUser | null>(null);
  public currUser$ = this.userStates$.asObservable();

  login(user: IUser) {
    if (user.name && user.password) {
      this.userStates$.next(user)
      this.getItems<IUser>('http://localhost:3000/users', null, { name: user.name, password: user.password })

    }
  }
}

export interface IUser {
  name: string,
  password: string
}

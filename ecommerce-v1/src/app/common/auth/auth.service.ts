import { Injectable } from "@angular/core";
import { of, delay, Subject } from "rxjs";
import { IUser, BLANK_USER } from '@common/models';
import { HttpClient } from "@angular/common/http";
import { IAdmin } from "../models/admin";
import { AdminService } from "../services/admin.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private __user: IUser = BLANK_USER
  private _admins: Array<IAdmin> = [];
  private __isLogged$: Subject<boolean> = new Subject();

  constructor(private _http: HttpClient, private adminService: AdminService) {

  }
  get currentUser() {
    return this.__user;
  }

  setUser(newUser: IUser) {
    this.__user = newUser;
  };

  isLoggedIn() {

  }
  isAdminLoggedIn() {
    if (this.adminService._admin.maAdmin != 0) {
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  hasPermissions() {
    return of(false).pipe(delay(300));
  }
}

import { Injectable } from "@angular/core";
import { of, delay, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAdmin } from "../models/user.model";
import { AdminService } from "../services/admin.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _admins: Array<IAdmin> = [];
  private __isLogged$: Subject<boolean> = new Subject();

  constructor(private _http: HttpClient, private adminService: AdminService) {

  }

  isLoggedIn() {

  }
  isAdminLoggedIn() {
    if (this.adminService._admin._id != '') {
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  hasPermissions() {
    return of(false).pipe(delay(300));
  }
}

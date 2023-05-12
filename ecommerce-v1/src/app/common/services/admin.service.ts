import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { BLANK_ADMIN, BLANK_USER, IAdmin } from '../models/user.model';
import { IUser } from '../models/user.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpService {

  public _admins: Array<IAdmin> = [];
  public adminRemember= {
    username: '',
    password: ''
  }
  public _admin: any;
  setAdmin(admin: IAdmin) {
    this._admin = admin;
  }
  setAdminRemember(username: string, password: string){
    this.adminRemember.username = username;
    this.adminRemember.password = password;
  }
  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  // login(data: any) {
  //   return new Observable((observer) => {
  //     let errMessage = '';
  //     errMessage = this._admins.every(admin => admin.email != data.email)  ? 'Email không tồn tại' : errMessage;
  //     errMessage = this._admins.find(admin => admin.email == data.email && admin.password != data.password) ? 'Mật khẩu không đúng' : errMessage;
  //     if (errMessage == '') {
  //       this._admin = (this._admins.find((admin: IUser) => admin.email == data.email && admin.password == data.password)) as IAdmin;
  //     }
  //     observer.next(errMessage);
  //     observer.complete();
  //   })
  // }
  signin$(username: string, password: string) {
    const url = 'https://freshie-nrvr.onrender.com' + '/api/users/signin';
    const body = {
      username,
      password,
      isAdmin: true,
    };
    return this.submitItem<IAdmin>(url, body)

  }
  getAdmin(){
    const url = this.baseUrl + '/api/users/';
    return this.getItems<IAdmin>(url+this._admin._id).pipe(
      map((res: any) => {
        this._admins = res.value;
        return res.value;
      }),
      catchError(this.handleError)
    );
  }
  updateAccount$(admin: IAdmin) {
    const url = this.baseUrl + '/api/users/';
    return this.editItem(url + admin._id, admin).pipe(
      map((res: any) => {
        this._admin = res.value;
        return res.value;
      }),
      catchError(this.handleError)
    );}
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}


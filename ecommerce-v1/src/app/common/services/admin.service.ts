import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAdmin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public _admins: Array<IAdmin> = [];
  public _admin: IAdmin = {
    maAdmin: 0,
    tenAdmin: '',
    email: '',
    password: ''
  }
  constructor(private _http: HttpClient, private _router: Router) {
    this._http.get('../assets/mockupData/admin.json').subscribe((data: any) => {
      this._admins = data;
    })
  }
  login(data: any) {
    return new Observable((observer) => {
      let errMessage = '';
      errMessage = this._admins.every(admin => admin.email != data.email)  ? 'Email không tồn tại' : errMessage;
      errMessage = this._admins.find(admin => admin.email == data.email && admin.password != data.password) ? 'Mật khẩu không đúng' : errMessage;
      if (errMessage == '') {
        this._admin = (this._admins.find((admin: IAdmin) => admin.email == data.email && admin.password == data.password)) as IAdmin;
      }
      observer.next(errMessage);
      observer.complete();
    })
  }
}


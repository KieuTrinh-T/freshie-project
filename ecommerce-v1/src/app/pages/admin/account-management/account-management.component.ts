import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {

  constructor(private _router: Router) { }
  createAccount(){
    this._router.navigate(['admin/account/create'])
  }

}

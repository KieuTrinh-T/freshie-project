import { Component } from '@angular/core';
import { SharedService } from '@common/services';
import {UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$ = this._userService.getUser$();

  constructor(private _userService: UserService) { }


}

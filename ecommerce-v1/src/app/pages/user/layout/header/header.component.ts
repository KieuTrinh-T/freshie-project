import { Component } from '@angular/core';
import { SharedService } from '@common/services';
import {UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // khai bao bien user$ de lay gia tri user tu userService, gia tri nay duoc lay tu BehaviorSubject<IUser> = new BehaviorSubject(BLANK_USER);
  user$ = this._userService.getUser$();


  constructor(private _userService: UserService) { }

}

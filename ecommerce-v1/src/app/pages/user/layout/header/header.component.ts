import { Component } from '@angular/core';
import { SharedService } from '@common/services';
import { IUser, UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currUser!: IUser | null
  constructor(private _sharedService: SharedService, private userService: UserService) {
    this._sharedService.sharedData$.subscribe((value) => {
      console.log(value)
    })

  this.userService.currUser$.subscribe({
      next: (value) => {
        console.log('new value...', value)
        this.currUser = value;
      }
    })
  }
}

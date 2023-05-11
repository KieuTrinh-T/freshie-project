import { Component } from '@angular/core';
import { IUser } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'ec-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: any;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    street: new FormControl('', Validators.required),
    apartment: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });
  constructor(
    private _userService: UserService
  ) {
    this.getUser();
   }

  getUser(){
    return this._userService.getUser$().subscribe(
      res => {
        this.user = res;
      }
    )
  }
}

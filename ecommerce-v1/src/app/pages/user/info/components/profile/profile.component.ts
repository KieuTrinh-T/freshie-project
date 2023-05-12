import { Component } from '@angular/core';
import { IUser } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Router } from '@angular/router';

// custom validator to check confirm password
export function confirmPasswordValidator(control: FormControl): ValidationErrors | null {
  const confirmPassword = control.value;
  const newPassword = control.root.get('newPassword');
  return newPassword && confirmPassword === newPassword.value ? null : { confirmPassword: true };
}

@Component({
  selector: 'ec-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  user: any;

  userID?: string = '';


  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),

    street: new FormControl(''),
    apartment: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator]),
  });
  constructor(
    private _userService: UserService,
    private router : Router
  ) {
    this.getUser();
    this.getUserState();
   }

  ngOnInit(): void {
    this.profileForm.patchValue({
      email: this.user?.email,
      phone: this.user?.phone,
      street: this.user?.street,
      apartment: this.user?.apartment,
      city: this.user?.city,
      country: this.user?.country,
    })
  }
  getUser(){
    return this._userService.getUser$().subscribe(
      res => {
        this.user = res;
      }
    )
  }

  // get user state
  getUserState(){
    this.userID = this._userService.getUserState()?._id;
  }

  updateUser(){
    const user = this.profileForm.value;
    console.log(user);
    this._userService.updateUser(this.userID,user).subscribe(
      res => {
        alert('Update user successfully!');
      },
      err => {
        alert('Update user failed!');
      }
    )
  }

  changePassword(){
    const password = this.changePasswordForm.value.newPassword;
    const user = {
      password: password
    }
    this._userService.updateUser(this.userID,user).subscribe(
      res => {
        alert('Change password successfully!');
        // router to login
        this.router.navigate(['/info/sign-in']);
      },
      err => {
        alert('Change password failed!');
      }
    )
  }

}

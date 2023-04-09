import { Component } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private userService: UserService) {

  }
  login() {
    this.userService.login({
      name: "TMP",
      password: "123213Anh"
    })
  }
}

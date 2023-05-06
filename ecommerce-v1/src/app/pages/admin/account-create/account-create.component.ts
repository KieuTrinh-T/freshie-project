import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser, User } from '@common/models';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent {
  message: string = '';
account = new User();
  constructor(private _serviec: UserService, private snackBar: MatSnackBar) { }

  chooseAvatar(event:any){
    console.log(event.target.files[0]);
    this.account.avatar = event.target.files[0];
  }
createAccount(){
  console.log(this.account);
  if(this.account.username == '' || this.account.password == '' || this.account.email == '' ){
    this.message = 'Please fill all the fields';

}
else{
  this._serviec.createAccount(this.account).subscribe(
    {next:(res)=>{
      console.log(res);
      this.message = res['message'];
    }}
  )

}
}
}

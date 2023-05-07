import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user.model';
import { AdminService } from 'src/app/common/services/admin.service';

@Component({
  selector: 'ec-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {

  admin = new User;

  constructor(private _router: Router,private _service:AdminService) {
    this._service.getAdmin().subscribe(
      {next:(res)=>{
        this.admin = res;
      }}
    )
   }
  createAccount(){
    this._router.navigate(['admin/account/create'])
  }
  updateAccount(){
    this._service.updateAccount$(this.admin).subscribe(
      {next:(res)=>{
        console.log(res);
      }}
    )
  }
  onFileSelected(event:any, admin: User){
    let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         admin.avatar= reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }


}

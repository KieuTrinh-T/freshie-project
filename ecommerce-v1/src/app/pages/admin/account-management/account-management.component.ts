import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user.model';
import { AdminService } from 'src/app/common/services/admin.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'ec-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {

  admin = new User;

  constructor(private _router: Router,private _service:AdminService, private dialog: MatDialog) {
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
        this.dialog.open(DialogComponent, {data: {title: "Cập nhật thông tin", content: "Đã cập nhật thông tin thành công!"}});
      }}
    )
  }
  onFileSelected(event:any, admin: User){
    let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         admin.avatar = reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }


}

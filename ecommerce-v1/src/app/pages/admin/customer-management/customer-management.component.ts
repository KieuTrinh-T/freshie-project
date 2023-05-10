import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IUser } from '@common/models';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent {
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>()
  public displayedColumns: string[] = ['name', 'email', 'date', 'status','action'];
  constructor(private _service:UserService, private _router:Router) {
    this._service.getAllUsers().subscribe(
      {next:(res)=>{this.dataSource.data = res.value},
      error:(err)=>{console.log(err)}}
    )
   }

   onDelete(id:string){
   }
    onEdit(id:string){
    }

}

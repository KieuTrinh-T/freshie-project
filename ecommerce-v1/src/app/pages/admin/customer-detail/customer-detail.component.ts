import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IUser, User } from '@common/models';
import { UserService } from 'src/app/common/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { IOrder } from 'src/app/common/models/order';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'ec-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {

  public user: IUser = new User();
  public orderList: Array<IOrder> = [];
  constructor(private _service:UserService,
    private _orderService:OrderService,
    private _activatedRoute:ActivatedRoute,
    private dialog: MatDialog
  ) {

    this._activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        if(id){
          this._service.getUserById(id).subscribe(
            {next:(res)=>{this.user = res.value},
            error:(err)=>{
              this.openDialog("Không thể lấy thông tin khách hàng. Lỗi: " + err.statusText);
            }}
          )
          this._orderService.loadOrderByUser$(id).subscribe(
            {next:(res)=>{this.orderList = res.value},
            error:(err)=>{
              this.openDialog("Không thể lấy thông tin đơn hàng. Lỗi: " + err.statusText);
            }
          })
        }
      })
   }

   openDialog(message:string): void {
    this.dialog.open(DialogComponent, {
      data: {title: 'Thông báo', message: message},
    });
  }
}

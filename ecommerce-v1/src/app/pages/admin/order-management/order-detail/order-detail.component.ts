import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IOrder, IOrderView, Order, OrderView } from 'src/app/common/models/order';
import { IOrderItemView } from 'src/app/common/models/orderItem';
import { OrderService } from 'src/app/common/services/order.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'ec-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  message:string = '';

  public order: IOrderView = new OrderView();
  displayedColumns: string[] = ['thumb', 'name','price', 'quantity'];
  public dataSource: MatTableDataSource<IOrderItemView> = new MatTableDataSource<IOrderItemView>()
  constructor(private _service: OrderService, private _activatedRoute: ActivatedRoute,public dialog: MatDialog ) {
    this._activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        if(id){
          this._service.viewOrder$(id).subscribe(
            {next:(res)=>{this.order = res.value,
              this.dataSource.data = res.value.orderItems},
            error:(err)=>{console.log(err)}}
          )

        }

      }
    )
   }
onAccept(){
  this.order.status = 'Shipping';
  this._service.updateOrder$(this.order._id,this.order.status).subscribe(
    {next:(res)=>{
      this.openDialog("Đã cập nhật trạng thái đơn hàng");},
    error:(err)=>{
      this.openDialog("Không thể cập nhật trạng thái đơn hàng. Lỗi; " + err.statusText);}}
  )

}
onComplete(){
  this.order.status = 'Completed';
  this._service.updateOrder$(this.order._id,this.order.status).subscribe(
    {next:(res)=>{
      this.openDialog("Đã cập nhật trạng thái đơn hàng");},
    error:(err)=>{
      this.openDialog("Không thể cập nhật trạng thái đơn hàng. Lỗi; " + err.statusText);}}
  )
}

openDialog(message:string): void {
    this.dialog.open(DialogComponent, {
      data: {title: 'Thông báo', message: message},
    });

  }
}


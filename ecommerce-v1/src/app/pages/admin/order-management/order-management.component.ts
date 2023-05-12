import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/common/models/order';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'ec-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent {
  public options = [
    {value: 'all', viewValue: 'Tất cả'},
    { value: 'today', viewValue: 'Hôm nay' },
    { value: 'yesterday', viewValue: 'Hôm qua' },
    { value: 'thismonth', viewValue: 'Tháng này' },
  ]
  displayedColumns: string[] = ['id', 'date', 'total', 'status', 'action'];
  labels: any = ['Tất cả', 'Chờ xác nhận','Đang vận chuyển', 'Đã hủy', 'Đã hoàn thành']
  public dataSource = Array<IOrder>();
  tabIndex: number = 1;
  query:string = '';
  public status: string = 'Pending';
constructor(private _service: OrderService, private _router: Router) {
  this.loadItems(this.query);

 }
 changeChip(value: string) {
  switch (value) {
    case 'all':
      this.query = '';
      break;
    case 'today':
      this.query = 'day=' + new Date().toISOString().split('T')[0];
      break;
    case 'yesterday':
      this.query = 'day=' + new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
      break;
    case 'thismonth':
      this.query = 'thismonth';
      break;
  }
  this.loadItems(this.query);
}
 changeTab(tabChangeEvent: MatTabChangeEvent): void{
  this.tabIndex = tabChangeEvent.index;
  switch (this.tabIndex) {
    case 0:
      this.status = '';
      break;
    case 1:
      this.status = 'Pending';
      break;
    case 2:
      this.status = 'Shipping';
      this.loadItems(this.query);
    break;
    case 3:
      this.status = 'Cancelled';
      break;
    case 4:
      this.status = 'Completed';
      break;
    }
    console.log(this.status);
  }
loadItems(query: string) {
  this._service.filterOrders$(query).subscribe(
    { next: (res) => { this.dataSource = res.value } }
  )
}
viewDetail(id: string) {
this._router.navigate(['admin/orders/', id])}


}

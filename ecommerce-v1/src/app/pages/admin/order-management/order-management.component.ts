import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'date', 'total', 'status', 'action'];
  labels: any = ['Tất cả', 'Chờ xác nhận','Đang vận chuyển', 'Đã hủy', 'Đã hoàn thành']
  public dataSource = Array<IOrder>();
  tabIndex: number = 1;
  query:string = 'status=Pending';
constructor(private _service: OrderService, private _router: Router) {
  this.loadItems(this.query);

 }
 changeTab(tabChangeEvent: MatTabChangeEvent): void{
  this.tabIndex = tabChangeEvent.index;
  switch (this.tabIndex) {
    case 0:
      this.query = ``;
      this.loadItems(this.query);
      break;
    case 1:
      this.query = `status=Pending`;
      this.loadItems(this.query);
      break;
    case 2:
      this.query = `status=Shipping`;
      this.loadItems(this.query);
    break;
    case 3:
      this.query = `status=Cancelled`;
      this.loadItems(this.query);
      break;
    case 4:
      this.query = `status=Completed`;
      this.loadItems(this.query);
      break;
    }
    console.log(this.tabIndex)
    console.log(this.query)
    console.log(this.dataSource)
  }
loadItems(query: string) {
  this._service.filterOrders$(query).subscribe(
    { next: (res) => { this.dataSource = res.value } }
  )
}
viewDetail(id: string) {
this._router.navigate(['admin/orders/', id])}


}

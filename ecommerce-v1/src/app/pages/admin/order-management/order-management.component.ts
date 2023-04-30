import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/common/models/order';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'ec-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent {
  displayedColumns: string[] = ['id', 'date', 'total', 'status', 'action'];
  public dataSource: MatTableDataSource<IOrder> = new MatTableDataSource<IOrder>()
constructor(private _service: OrderService) {
  this.loadItems();
 }
loadItems() {
  this._service.loadOrders$().subscribe(
    { next: (res) => { this.dataSource.data = res.value } }
  )
}}

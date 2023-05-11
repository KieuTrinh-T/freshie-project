import { Component } from '@angular/core';
import { OrderService } from '../../../common/services/order.service';
import { IOrder, OrderView } from '../../../common/models/order';
import { UserService } from 'src/app/common/services/user.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'ec-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

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

  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.getOrders();
    console.log(this.dataSource);
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

  userId = this._userService.getUserState()!._id;
  // get orders by user
  getOrders() {
    if(this.userId) {
      this._orderService.getOrdersByUser$(this.userId).subscribe(
        { next: (res) => {
          this.dataSource = res.value;
        }}
      )
    }
  }
  // view order detail
  viewDetail(id: string) {
    this._router.navigate(['user/history/', id])
  }
}

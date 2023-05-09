import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IOrder, IOrderView, Order, OrderView } from 'src/app/common/models/order';
import { IOrderItemView } from 'src/app/common/models/orderItem';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'ec-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  public order: IOrderView = new OrderView();
  displayedColumns: string[] = ['thumb', 'name', 'quantity'];
  public dataSource: MatTableDataSource<IOrderItemView> = new MatTableDataSource<IOrderItemView>()
  constructor(private _service: OrderService, private _activatedRoute: ActivatedRoute ) {
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
   }


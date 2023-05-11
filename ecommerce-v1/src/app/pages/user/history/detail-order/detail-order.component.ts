import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderView, OrderView } from '../../../../common/models/order';
import { IOrderItemView } from 'src/app/common/models/orderItem';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/common/services/order.service';


@Component({
  selector: 'ec-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {
  message:string = '';

  public order: IOrderView = new OrderView();
  displayedColumns: string[] = ['thumb', 'name','price', 'quantity'];
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { IOrder, IOrderView } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpService {

  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  loadOrders$() {
    const url = this.baseUrl + '/api/orders';
    return this.getItems<IOrder>(url);
  }
  filterOrders$(query: string) {
    const url = this.baseUrl + `/api/orders?${query}`;
    return this.getItems<IOrder>(url);
  }
  loadOrderByUser$(id: string) {
    const url = this.baseUrl + `/api/orders`;
    const params = { user: id };
    return this.getItems<IOrder>(url,null,params);
  }
  viewOrder$(id: string) {
    const url = this.baseUrl + `/api/orders/${id}`;
    return this.getItem<IOrderView>(url);
  }
  updateOrder$(id: string, status: string) {
    const url = this.baseUrl + `/api/orders/${id}`;
    return this.editItem(url, { status });
  }
  deleteOrder$(id: string) {
    const url = this.baseUrl + `/api/orders/${id}`;
    return this.deleteItem(url);
  }

}

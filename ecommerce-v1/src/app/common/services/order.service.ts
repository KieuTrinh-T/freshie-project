import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { IOrder, IOrderView } from '../models/order';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpService {

  constructor(protected override _http: HttpClient,
    private _userService: UserService) {
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
    const url = this.baseUrl + `/api/orders/user/${id}`;
    const params = { user: id };
    return this.getItems<IOrder>(url,null);
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

  // get user state
  getUserState() {
    this._userService.getUserState();
  }
  // create order
  createOrder(orderItems: Array<{ product: string, quantity: number }>,
    recipientName: string,
    shippingAddress1: string,
    shippingAddress2: string,
    city: string,
    phone: string,
    shipping: number,
    tax: number
    ) {
    const url = this.baseUrl + '/api/orders';
    const user = this._userService.getUserState()?._id;
    const body = {
      orderItems,
      recipientName,
      shippingAddress1,
      shippingAddress2,
      city,
      phone,
      user,
      shipping,
      tax,
    };
    console.log(body);
    return this.submitItem(url, body);

  }

  getOrdersByUser$(id: string) {
    const url = this.baseUrl + `/api/orders/user/${id}`;
    return this.getItems<IOrder>(url);
  }
}

import { Component, importProvidersFrom } from '@angular/core';
import { Order } from '../../../common/models/order';
import { IOrderItem } from "../../../common/models/orderItem";
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'ec-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  order = new Order();
  orderItems = Array<IOrderItem>();
  totalPrice = 0;

  deliveryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),

  });
  constructor() {
    this.orderItems = this.getOrderList();
    console.log(this.orderItems);
    this.order.orderItems = this.orderItems;
    this.orderItems.forEach(item => {
      this.totalPrice += item.quantity * item.product.price;
    });
  }
  // get order list from local storage
  getOrderList() {
    let orderList = localStorage.getItem('orderItems');
    if (orderList) {
      return JSON.parse(orderList);
    }
    return [];
  }
}

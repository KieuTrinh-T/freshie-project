import { Component, importProvidersFrom } from '@angular/core';
import { Order } from '../../../common/models/order';

import { IOrderItemView } from "../../../common/models/orderItem";
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { OrderService } from '../../../common/services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../../common/services/cart.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ec-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderList: IOrderItemView[] = [];
  orderItems = Array<{
    product: string,
    quantity: number
  }>();
  totalPrice = 0;

  deliveryForm = new FormGroup({
    recipientName: new FormControl('', Validators.required),
    shippingAddress1: new FormControl('', Validators.required),
    shippingAddress2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });

  constructor(
    private _orderService: OrderService,
    private router: Router,
    private _cartService: CartService,
  ) {
    this.getOrderList();
    this.getTotalPrice();
  }
  // get order list from local storage
  getOrderList() {
    this.orderList = JSON.parse(localStorage.getItem('orderItems') || '[]');
    this.orderItems = this.orderList.map(item => {
      return {
        product: item.product._id,
        quantity: item.quantity
      }
    }
    );
  }
  // calculate total price
  getTotalPrice() {
    this.totalPrice = this.orderList.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  // create order
  createOrder() {
    if(this.deliveryForm.invalid) {
      return;
    }
    const { recipientName, shippingAddress1, shippingAddress2, city, phone } = (this.deliveryForm.value as any);
    const total = this.totalPrice;
    const shipping = 0;
    const tax = 0;
    this._orderService.createOrder(this.orderItems, recipientName, shippingAddress1, shippingAddress2, city, phone, shipping, tax
      ).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.removeItem('orderItems');
        this.orderList = [];
        this.orderItems = [];
        this.totalPrice = 0;
        this.deliveryForm.reset();
        // remove order items from cart
        // this._cartService.removeOrderItems();
        // show dialog
        alert('Order created successfully!');
        this.router.navigate(['/shop']);
      }
    )

  }
}

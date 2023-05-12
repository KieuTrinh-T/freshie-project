import { Injectable } from '@angular/core';
import { HttpService } from './../http/http.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable, finalize, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends HttpService {
  constructor(
    protected override _http: HttpClient,
    private _userService: UserService
  ) {
    super(_http);
  }

  // get user state
  getUserState() {
    return this._userService.getUserState();
  }

  // save carts from local storage to server
  saveCarts$(user_id: string) {
    console.log(user_id);
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const url =  this.baseUrl + '/api/carts/' +  user_id;
    let request$: Observable<any>[] = [];
    if(carts.length > 0){
      console.log(carts);
      carts.forEach((cart: any) => {
      const body = {
        product_id: cart.product_id,
        quantity: cart.quantity,
      };
      request$.push(this.submitItem(url, body));
    });
    }
    return forkJoin(request$).subscribe((res: any) => {
      console.log(res);
      localStorage.removeItem('carts');
    });
  }

  getCartItems$() {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const user_id = this._userService.getUserState()?._id;
    if (!this._userService.getUserState()?._id) {
      return of(carts);
    } else {
      const url =  this.baseUrl + '/api/carts/' +  user_id;
      console.log(url);
      return this.getItems(url);
    }
  }

  addToCart$(product_id: string, quantity: number) {

    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const user_id = this._userService.getUserState()?._id;
    console.log(user_id);
    console.log(product_id, quantity);

    const url =  this.baseUrl + '/api/carts/' +  user_id;
    console.log(url);

    let request$: Observable<any>[] = [];
    if (!this._userService.getUserState()?._id) {
      // TODO: add to local storage
      const cart = carts.find((cart: any) => cart.product_id === product_id);
      if (cart) {
        cart.quantity += quantity;
      } else {
        // get product info from server by product_id
        const url = this.baseUrl + '/api/products/' + product_id;
        this.getItem(url).subscribe((res: any) => {
          console.log(res);
          const product = res.value;
          carts.push({
            product_id,
            quantity,
            product,
          });
          localStorage.setItem('carts', JSON.stringify(carts));
        });
      }
      return of(carts);
    } else {

        const body = {
          product_id,
          quantity,
        };
        console.log(body);
        return this.submitItem(url, body);
      }

  }

  // add order item
  addOrderItem(cart: any) {
    const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    const orderItem = orderItems.find(
      (orderItem: any) => orderItem._id === cart._id
    );
    if (!orderItem) {
      orderItems.push(cart);
      localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }
  }

  removeOrderItem(cart: any) {
    const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    const orderItem = orderItems.find(
      (orderItem: any) => orderItem._id === cart._id
    );
    if (orderItem) {

      const index = orderItems.indexOf(orderItem);
      orderItems.splice(index, 1);

      localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }
  }
}

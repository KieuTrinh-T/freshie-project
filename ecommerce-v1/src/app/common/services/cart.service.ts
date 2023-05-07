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
    const url = this.baseUrl + '/api/carts/' + this.getUserState()?._id || '';
    return this.getItems(url);
  }

  addToCart$(product_id: string, quantity: number) {

    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const user_id = this._userService.getUserState()?._id;
    console.log(user_id);

    const url =  this.baseUrl + '/api/carts/' +  user_id;
    console.log(url);

    let request$: Observable<any>[] = [];
    if (!this._userService.getUserState()?._id) {
      // TODO: add to local storage
      const cart = carts.find((cart: any) => cart.product_id === product_id);
      if (cart) {
        cart.quantity += quantity;
      } else {
        carts.push({ product_id, quantity });
      }
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
        const body = {
          product_id,
          quantity,
        };
        this.submitItem(url, body)
        .subscribe((res: any) => {
          console.log(res);
        }
        );
      }
  }
}

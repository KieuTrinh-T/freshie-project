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

  getCartItems$() {
    const url = this.baseUrl + 'api/carts/:user_id';
    return this.getItems(url);
  }

  addToCart$(product_id: string, quantity: number) {

    const carts = JSON.parse(localStorage.getItem('carts') || '[]');

    const url = this.baseUrl + 'api/carts/:user_id';

    let request$: Observable<any>[] = [];
    if (!this._userService.getUserState()?.user_id) {
      // TODO: add to local storage
      const cart = carts.find((cart: any) => cart.product_id === product_id);
      if (cart) {
        cart.quantity += quantity;
      } else {
        carts.push({ product_id, quantity });
      }
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      if (carts.length) {
        carts.forEach((cart: any) => {
          const body = {
            product_id: cart.product_id,
            quantity: cart.quantity,
          };
          request$.push(this.submitItem(url, body));
        });
      } else {
        const body = {
          product_id,
          quantity,
        };
        request$.push(this.submitItem(url, body));
      }
    }

    if (request$.length) {
      return forkJoin(request$).pipe(finalize(() => localStorage.removeItem('carts')));
    } else return of(null);
  }
}

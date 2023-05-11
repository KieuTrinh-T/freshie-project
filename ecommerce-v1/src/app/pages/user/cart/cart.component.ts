import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, BLANK_USER} from '@common/models';
import { ICart } from 'src/app/common/models/cart.model';
import { CartService } from 'src/app/common/services/cart.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  carts = Array<ICart>();

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.getCartItems();
  }

  // get user state
  getUserState() {
    return this._userService.getUserState();
  }

  // get cart items
  getCartItems() {
    this._cartService.getCartItems$().subscribe((res: any) => {
      this.carts = res.cartItems;
      console.log(this.carts);
    });
  }
}

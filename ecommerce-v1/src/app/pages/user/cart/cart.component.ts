import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/common/services/cart.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _userService: UserService
  ) {}

  // get user state
  getUserState() {
    return this._userService.getUserState();
  }
}

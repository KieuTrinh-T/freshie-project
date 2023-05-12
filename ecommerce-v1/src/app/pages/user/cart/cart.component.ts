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

    // get user state
    const user = this.getUserState();
    // if user is not logged in
    if (!user?._id) {
      // get cart items from local storage
      const carts = JSON.parse(localStorage.getItem('carts') || '[]');
      this.carts = carts;
      // if cart items is not empty
    } else {
      // get cart items from server
    this._cartService.getCartItems$().subscribe((res: any) => {
      this.carts = res.cartItems;
      console.log(this.carts);
    });
  }
  }

  // check box change event
  onCheckBoxChange(event: any, cart: ICart) {
    // if check box is checked, add item to order list
    if (event.target.checked) {
      this._cartService.addOrderItem(cart);
    }
    // if check box is unchecked, remove item from order list
    else {
      this._cartService.removeOrderItem(cart);
    }
  }
  // order button click event
  onOrderButtonClick() {
    // get user state
    const user = this.getUserState();
    console.log(user);
    // if user is not logged in
    if (!user?._id) {
      // redirect to login page
      alert('Please login to order');
      this._router.navigate(['info/sign-in']);
    } else {
      // redirect to order page
      this._router.navigate(['order']);
    }
  }

}

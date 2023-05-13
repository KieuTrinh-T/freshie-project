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
  check_list = Array<ICart>();
  public total: number = 0;

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.getCartItems();
    this.caculateTotalPrice();
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
  caculateTotalPrice() {
    this.total = 0;
    this.check_list.forEach((cart) => {
      this.total += cart.quantity * cart.product.price;
    });
  }

  // check box change event
  onCheckBoxChange(event: any, cart: ICart) {
    // if check box is checked, add item to order list
    if (event.target.checked) {
      this._cartService.addOrderItem(cart);
      this.check_list.push(cart);
    }
    // if check box is unchecked, remove item from order list
    else {
      this._cartService.removeOrderItem(cart);
      this.check_list = this.check_list.filter((item) => item !== cart);
    }
    this.caculateTotalPrice();
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
  onQuantityChange(cart: ICart, quantity: number) {
      cart.quantity+=quantity;
      // update cart item
      // update cart items in local storage
      localStorage.setItem('carts', JSON.stringify(this.carts));
      // update cart items in server
      if(this.getUserState()?._id){
        this._cartService.addToCart$(cart.product.id,quantity).subscribe((res) => {
          console.log(res);
        });
    }
    this.caculateTotalPrice();
  }
  onRemoveButtonClick(cart: ICart) {
    // remove cart item
    // remove cart item from local storage
    this.carts = this.carts.filter((item) => item !== cart);
    localStorage.setItem('carts', JSON.stringify(this.carts));
    this.check_list = this.check_list.filter((item) => item !== cart);
    // remove cart item from server

    this.caculateTotalPrice();
  }


}

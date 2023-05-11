import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@common/services';
import { CartService } from 'src/app/common/services/cart.service';

@Component({
  selector: 'ec-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        data => {
          this.product = data.value;
          console.log(this.product);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    console.log(this.quantity);
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addToCart$(this.product._id, this.quantity);
  }
}

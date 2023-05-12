import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '@common/services';
import { CartService } from 'src/app/common/services/cart.service';
import { debounceTime } from 'rxjs';
import { IProductList } from 'src/app/common/models/product';

@Component({
  selector: 'ec-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProductList[] = [];
  selectedValue: any;
  categories = [
    {id: 1594, name:"hygiene"},
    {id: 1591, name:"haircare"},
    {id: 1584, name:"makeup"},
    {id: 1595, name:"perfume"},
    {id:1582, name:"skincare"}
  ]
  limit:number = 12;
  page:number = 1;
  category_id:any;
  min_price:number =  0;
  max_price:number = 5000000;
  search: string = '';

  priceRange = new FormGroup({
    priceMin: new FormControl(),
    priceMax: new FormControl()
  });

  constructor(
    private _productService: ProductService,
    private router: Router,
    private _cartService: CartService
  ) {
    this.priceRange.patchValue({
      priceMin: this.min_price,
      priceMax: this.max_price
    })
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const keyword: string | undefined = this.router.url.split('=').pop()?.toString();
        const decodedKeyword: string = keyword ? this.decodeUnicode(keyword) : '';
      // Use keyword to search products
      this.getProductsSearch(decodedKeyword);
      }
    });
  }

  ngAfterViewInit() {

  }

  onValueChange(){
    this.min_price = this.priceRange.value.priceMin;
    this.max_price = this.priceRange.value.priceMax;
    this._productService.filterProducts({limit:this.limit,page:this.page,category_id:this.category_id,min_price:this.min_price, max_price:this.max_price}).subscribe((response) => {
      response.value.forEach((product: IProductList) => {
        product.discount = Math.floor(
          ((product.original_price - product.price) / product.original_price) *
            100
        );
      });
      this.products = response.value;
    }
    )
  }

  changePage(numChange:number){
    this.page = this.page + numChange;
    console.log(this.page);
    this._productService.filterProducts({limit:this.limit,page:this.page}).subscribe((response) => {
      response.value.forEach((product: IProductList) => {
        product.discount = Math.floor(
          ((product.original_price - product.price) / product.original_price) *
            100
        );
      });
      this.products = response.value;
    }
    )
  }

  getAllProducts() {
    this._productService.getAllProducts({limit:12}).subscribe((response) => {
      response.value.forEach((product: IProductList) => {
        product.discount = Math.floor(
          ((product.original_price - product.price) / product.original_price) *
            100
        );
      });
      this.products = response.value;
    });
  }

  getProductsSearch(search: string) {
    if(search == ''){
      this.getAllProducts();
      return;
    }
    this._productService.searchProducts({ search: search }).subscribe((response) => {
      response.value.forEach((product: IProductList) => {
        product.discount = Math.floor(
          ((product.original_price - product.price) / product.original_price) *

            100
        );
      });
      this.products = response.value;
    });
    console.log(search);
  }

  viewDetail(id: string) {
    console.log(id);
    this.router.navigate([`/product-detail/${id}`])
  }

  addToCart(product_id: string) {
    console.log(product_id, 1);
    this._cartService.addToCart$(product_id, 1).subscribe((response) => {
      console.log(response);
    });
  }

  decodeUnicode(str: string) {
    return decodeURIComponent(str.replace(/\\u([\dA-F]{2,4})/gi, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }
}

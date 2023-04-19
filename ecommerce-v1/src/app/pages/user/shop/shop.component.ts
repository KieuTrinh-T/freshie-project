import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { Router } from '@angular/router';
import { ProductService } from '@common/services';
import { debounceTime } from 'rxjs';
import { IProduct } from 'src/app/common/models/product';

@Component({
  selector: 'ec-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];

  typeOfCategories = ['Skincare', 'Make up', 'Haircare', 'Perfume', 'Hygiene'];

  filterForm = new FormGroup({
    categories: new FormControl(),
    price: new FormControl('Low to High'),
  });

  @ViewChild('category') category!: MatSelectionList;

  constructor(
    private _productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.products);
  }

  ngAfterViewInit() {
    console.log(this.category.registerOnChange);
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
    });
  }

  onSelection(
    $event: MatSelectionListChange,
    arg1: SelectionModel<MatListOption>
  ) {
    console.log($event);
    console.log(arg1.selected.map((option) => option.value));
    this.filterForm.patchValue({
      categories: arg1.selected.map((option) => option.value),
    });
    console.log(this.filterForm.value);
  }

  getAllProducts() {
    this._productService.getAllProducts({ limit: 12 }).subscribe((response) => {
      response.value.forEach((product: IProduct) => {
        product.discount = Math.floor(
          ((product.original_price - product.price) / product.original_price) *
            100
        );
      });
      this.products = response.value;
    });
  }

  viewDetail(id: string) {
    console.log(id);
    this.router.navigate([`/user/product-detail.${id}`])
  }

  addToCart(id: string) {
    console.log(id);
  }
}

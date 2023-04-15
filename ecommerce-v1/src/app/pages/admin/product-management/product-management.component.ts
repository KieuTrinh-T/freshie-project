import { Component } from '@angular/core';
import { IProduct } from 'src/app/common/models/product';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'ec-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {

  public data: Array<IProduct> = []
  constructor(private _productService: ProductService) {
    this.loadItems()
  }
  loadItems() {
    this._productService.getAllProducts().subscribe(
      { next: (res) => { this.data = res.value } }
    )
  }
}

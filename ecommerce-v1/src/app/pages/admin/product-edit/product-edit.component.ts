import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@common/services';
import { IProductDetail } from 'src/app/common/models/product';

@Component({
  selector: 'ec-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  id: string = "";
  product:any
  formGroup: FormGroup = new FormGroup({});
  constructor(private activateRoute: ActivatedRoute, private _productService: ProductService ) {
    this.activateRoute.params.subscribe(
      (params) => {this.id = params['id']}
    )
    this.loadItem();
   }
   loadItem(){
    this._productService.getProductById(this.id).subscribe(
      {next:(res)=>{this.product = res.value}}
    )
   }


}

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProductList } from 'src/app/common/models/product';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'ec-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {

  public dataSource:MatTableDataSource<IProductList> = new MatTableDataSource<IProductList>()
  displayedColumns: string[] = ['thumb', 'id', 'name', 'sold','action'];
  page:number = 1;

  constructor(private _productService: ProductService, private _router: Router) {
    this.loadItems()
  }
  loadItems() {
    this._productService.filterProducts({limit:3,page:this.page}).subscribe(
      { next: (res) => { this.dataSource.data = res.value } }
    )
  }
  changePage(numChange:number){
    this.page = this.page + numChange;
    console.log(this.page);
    this.loadItems();
  }

  editProduct(id:string){
    this._router.navigate(['admin/products/edit',id])
  }



}

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
  displayedColumns: string[] = ['thumb', 'name', 'sold','inventory','action'];
  page:number = 1;
  limit:number = 10;
  categories = [
    {id: 1594, name:"hygiene"},
    {id: 1591, name:"haircare"},
    {id: 1584, name:"makeup"},
    {id: 1595, name:"perfume"},
    {id:1582, name:"skincare"}
  ]
  category_id:any;


  constructor(private _productService: ProductService, private _router: Router) {
    this.loadItems()

  }
  loadItems() {

    this._productService.filterProducts({limit:this.limit,page:this.page}).subscribe(
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
  onValueChange(){
    this._productService.filterProducts({limit:this.limit,page:this.page,category_id:this.category_id}).subscribe(
      { next: (res) => { this.dataSource.data = res.value } }
    )
  }

  addProduct(){
    this._router.navigate(['admin/products/add'])
  }
  search(event:any){
    this._productService.filterProducts({search:event.target.value}).subscribe(
      { next: (res) => { this.dataSource.data = res.value } }
    )

  }
}

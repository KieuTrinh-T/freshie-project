import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private _productService: ProductService) {
    this.loadItems(this.page)
  }
  loadItems(page:number) {
    this._productService.getAllProducts({limit:10,page:this.page}).subscribe(
      { next: (res) => { this.dataSource.data = res.value } }
    )
  }
  changePage(event:any){
    this.page = event.pageIndex + 1;
    this.loadItems(this.page);
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { IProductDetail, IProductList, ProductDetail } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService{

  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  getAllProducts(params:{limit?:number,offset?:number} = {}){
    return this.getItems<IProductList>(this.baseUrl + '/api/products',null,params);
  }
  filterProducts(params:{category_id?:string,brand_id?:string,search?:string,min_price?:number, max_price?:number,
    min_rating?:number,sort?:string,
    limit?:number,page?:number} = {}){
    return this.getItems<IProductList>(this.baseUrl + '/api/products',null,params);
  }
  getProductById(id:string){
    return this.getItem<IProductDetail>(this.baseUrl + '/api/products/' + id);
  }
  updateProduct(id:string,product:ProductDetail){
    return this.editItem<ProductDetail>(this.baseUrl + '/api/products/' + id,product);
  }
  searchProducts(params:{search?:string} = {}){
    return this.getItems<IProductList>(this.baseUrl + '/api/products/',null,params);
  }

}

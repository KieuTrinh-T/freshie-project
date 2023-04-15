import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService{

  constructor(protected override _http: HttpClient) {
    super(_http);
  }
  getAllProducts(){
    return this.getItems<IProduct>(this.baseUrl + '/api/products');
  }
}

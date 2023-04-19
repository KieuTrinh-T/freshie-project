import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product';


@Component({
  selector: 'ec-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  @Input() products: IProduct[] = [];
  @Output() viewDetail = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();
  constructor() { }

}

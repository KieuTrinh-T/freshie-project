import { IProductShort } from "./product";
import { IProduct } from "./cart.model";

export interface IOrderItem {
  _id: string;
  product: IProduct;
  quantity: number;
}

export interface IOrderItemView {
  _id: string;
  product: IProductShort;
  quantity: number;
}

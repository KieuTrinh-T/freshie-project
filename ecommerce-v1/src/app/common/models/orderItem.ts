import { IProductShort } from "./product";

export interface IOrderItem {
  _id: string;
  product: string;
  quantity: number;
}

export interface IOrderItemView {
  _id: string;
  product: IProductShort;
  quantity: number;
}

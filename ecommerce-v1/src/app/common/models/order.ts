import { IOrderItem } from "./orderItem";

export interface IOrder{
  _id: string;
  orderItems: Array<IOrderItem>;
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  country: string;
  phone: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  user: string;
  date_ordered: Date;


}

import { IOrderItem, IOrderItemView } from "./orderItem";

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
export class Order implements IOrder{
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
  constructor(){
    this._id = '';
    this.orderItems = [];
    this.shippingAddress1 = '';
    this.shippingAddress2 = '';
    this.city = '';
    this.country = '';
    this.phone = '';
    this.status = '';
    this.subtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.total = 0;
    this.user = '';
    this.date_ordered = new Date();
  }
}
export interface IOrderView{
  _id: string;
  orderItems: Array<IOrderItemView>;
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
  user: {
    _id: string;
    phone: string;
  };
  date_ordered: Date;}
export class OrderView implements IOrderView{
  _id: string;
  orderItems: Array<IOrderItemView>;
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
  user: {
    _id: string;
    phone: string;
  };
  date_ordered: Date;
  constructor(){
    this._id = '';
    this.orderItems = [];
    this.shippingAddress1 = '';
    this.shippingAddress2 = '';
    this.city = '';
    this.country = '';
    this.phone = '';
    this.status = '';
    this.subtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.total = 0;
    this.user = {
      _id: '',
      phone: ''
    };

    this.date_ordered = new Date();
  }
}

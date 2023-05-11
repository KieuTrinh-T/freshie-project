export class CartItem {
    constructor(
      public product_id: string = "",
      public quantity: number = 0,
    )
    {}
}

export interface ICart {
  _id: string;
  quantity: number;
  product: IProduct;
}

export interface IProduct {
  id: string;
  original_price: number;
  price: number;
  product_name: string;
  thumb: string;
}

export interface IProductDetail {
  _id: string;
  brand_id: string;
  brand_name: string;
  slug: string;
  image_1: string;
  image_2: string;
  image_3: string;
  thumb: string;
  description: string;
  product_name: string;
  category_id: string;
  brand: string;
  original_price: number;
  price: number;
  sold: number;
  rating_average: number;
  rating_count: number;
  category_name: string;
  inventory_num: number;
}
export interface IProductList {
  _id: string;
  product_name: string;
  thumb: string;
  description: string;
  category_id: string;
  original_price: number;
  price: number;
  sold: number;
  rating_average: number;
  rating_count: number;
  inventory_num: number;
  discount: number;
}

export class ProductDetail {

  constructor(
   public _id: string = "",
   public brand_id: string = "",
   public brand_name: string = "",
   public slug: string = "",
   public image_1: string = "",
   public image_2: string = "",
    public image_3: string = "",
    public thumb: string = "",
    public description: string = "",
    public product_name: string = "",
    public category_id: string = "",
    public brand: string = "",
    public original_price: number = 0,
    public price: number = 0,
    public sold: number = 0,
    public rating_average: number = 0,
    public rating_count: number = 0,
    public category_name: string = "",
    public inventory_num: number = 0,

  )
  {}
}
export interface IProductShort{
_id: string;
product_name: string;
thumb: string;
original_price: number;
  price: number;
}

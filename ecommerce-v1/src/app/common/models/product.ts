export interface IProductDetail {
  product_id: string;
  brand_id: string;
  brand_name: string;
  slug: string;
  imgage_1: string;
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
}
export interface IProduct {
  product_id: string;
  brand_name: string;
  thumb: string;
  product_name: string;
  brand_id: string;
  brand: string;
  original_price: number;
  price: number;
  sold: number;
  rating_average: number;
  rating_count: number;
  category_id: string;
  category_name: string;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselProductComponent } from './carousel-product/carousel-product.component';
import { SwiperModule } from "swiper/angular";
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    CarouselProductComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MatIconModule
  ],
  exports: [
    CarouselProductComponent
  ]
})
export class CarouselProductModule {

 }

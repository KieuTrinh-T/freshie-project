import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselProductComponent } from './carousel-product/carousel-product.component';
import { SwiperModule } from "swiper/angular";
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from "../../pipe/truncate.pipe";
@NgModule({
    declarations: [
        CarouselProductComponent
    ],
    exports: [
        CarouselProductComponent
    ],
    imports: [
        CommonModule,
        SwiperModule,
        MatIconModule,
        TruncatePipe
    ]
})
export class CarouselProductModule {

 }

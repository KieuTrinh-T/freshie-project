import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselProductComponent } from './carousel-product/carousel-product.component';
import { SwiperModule } from "swiper/angular";
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from "../../pipe/truncate.pipe";
import { MatButtonModule } from '@angular/material/button';
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
        TruncatePipe,
        MatButtonModule,
        MatIconModule
    ]
})
export class CarouselProductModule {

 }

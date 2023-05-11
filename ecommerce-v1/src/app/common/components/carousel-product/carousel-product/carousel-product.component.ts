import { Component, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import SwiperCore, { A11y, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { IProductList } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

SwiperCore.use([EffectFade]);


@Component({
  selector: 'ec-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: ['./carousel-product.component.scss']
})
export class CarouselProductComponent {
  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    scrollbar: { draggable: true },
  };

  @ViewChild('swiper') swiper!: SwiperComponent;

  slideNext() {
    this.swiper.swiperRef.slideNext(300);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(300);
  }

  constructor(
    private _productService: ProductService,
  ) {
    this.getAllProducts();
  }

  ngOnInIt(): void {
    this.getAllProducts();
  }

  products: IProductList[] = [];

  getAllProducts() {
    this._productService.getAllProducts({limit:6}).subscribe((response) => {
      this.products = response.value;
    });
  }
}

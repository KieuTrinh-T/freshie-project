import { Component, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import SwiperCore, { A11y, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

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

  Products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
    {
      id: 2,
      name: 'Product 2',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
    {
      id: 3,
      name: 'Product 3',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
    {
      id: 4,
      name: 'Product 4',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
    {
      id: 5,
      name: 'Product 5',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
    {
      id: 6,
      name: 'Product 6',
      price: 100,
      discount: 80,
      image: 'https://picsum.photos/200/300',
      voteCount: 5,
      voteAverage: 4
    },
  ]
}

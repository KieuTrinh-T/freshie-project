import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CarouselProductModule } from 'src/app/common/components/carousel-product/carousel-product.module';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  }
]
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    CarouselProductModule
  ]
})
export class HomeModule { }

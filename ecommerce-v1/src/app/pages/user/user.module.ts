import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: "shop",
        loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule)
      },
      {
        path: "product-detail",
        loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
      },
      {
        path: "info",
        loadChildren: () => import('./info/info.module').then((m) => m.InfoModule)
      }
    ]
  },

]

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatIconModule
  ]
})
export class UserModule { }

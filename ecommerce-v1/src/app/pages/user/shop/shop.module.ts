import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:"",
    component: ShopComponent,
  }
]


@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }

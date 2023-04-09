import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';

const routes: Routes = [
  {
    path: "",
    component: ProductManagementComponent,
    canActivate: [AuthenticationGuard],


  }
]

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductManagementModule { }

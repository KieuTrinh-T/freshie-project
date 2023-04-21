import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: "",
    component: ProductManagementComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {path:"",redirectTo:"list",pathMatch:"full"},

]
  }
]

@NgModule({
  declarations: [
    ProductManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ]
})
export class ProductManagementModule { }

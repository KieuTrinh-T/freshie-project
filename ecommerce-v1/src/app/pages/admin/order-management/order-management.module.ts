import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';
import { MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {  MatCardModule } from '@angular/material/card';
import {  MatChipsModule } from '@angular/material/chips';

const routes: Routes = [
  {
    path: "",
    component: OrderManagementComponent,
    canActivate: [AuthenticationGuard]

  },
  {
    path: ":id",
    component: OrderDetailComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  declarations: [
    OrderManagementComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule

  ]
})
export class OrderManagementModule { }

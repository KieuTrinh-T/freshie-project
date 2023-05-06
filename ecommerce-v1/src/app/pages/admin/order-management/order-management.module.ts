import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';
import { MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [
  {
    path: "",
    component: OrderManagementComponent,
    canActivate: [AuthenticationGuard]

  }
]

@NgModule({
  declarations: [
    OrderManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class OrderManagementModule { }

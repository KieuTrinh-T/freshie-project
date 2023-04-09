import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';

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
    RouterModule.forChild(routes)
  ]
})
export class OrderManagementModule { }

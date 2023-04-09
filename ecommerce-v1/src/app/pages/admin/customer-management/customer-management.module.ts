import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from './customer-management.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';

const routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    component: CustomerManagementComponent
  }
]

@NgModule({
  declarations: [
    CustomerManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerManagementModule { }

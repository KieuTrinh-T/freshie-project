import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';

const routes = [
  {
    path: '',
    canAtivate: [AuthenticationGuard],
    component: AccountManagementComponent
  }
]

@NgModule({
  declarations: [
    AccountManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountManagementModule { }

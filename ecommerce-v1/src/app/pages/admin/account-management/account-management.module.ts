import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@common/auth';
import { MatButtonModule } from '@angular/material/button';

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
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class AccountManagementModule { }

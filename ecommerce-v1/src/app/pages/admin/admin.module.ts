import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LayoutModule } from './layout/layout.module';
import { AuthenticationGuard } from '@common/auth';
import { SnackBarComponent } from './snackbar/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashBoardModule)
      },
      {
        path: "products",
        loadChildren: () => import('./product-management/product-management.module').then((m) => m.ProductManagementModule)
      },
      {
        path: "orders",
        loadChildren: () => import('./order-management/order-management.module').then((m) => m.OrderManagementModule)
      },
      {
        path: "customers",
        loadChildren: () => import('./customer-management/customer-management.module').then((m) => m.CustomerManagementModule)
      },
      {
        path: "account",
        loadChildren: () => import('./account-management/account-management.module').then((m) => m.AccountManagementModule)
      },
    ]
  },
  {
    path: "auth",
    loadChildren: () => import('./admin-login/admin-login.module').then((m) => m.AdminLoginModule)
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    SnackBarComponent,
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class AdminModule { }

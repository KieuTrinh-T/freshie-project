import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LayoutModule } from './layout/layout.module';
import { AuthenticationGuard } from '@common/auth';
import { SnackBarComponent } from './snackbar/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AccountCreateComponent } from './account-create/account-create.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

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
      {
        path: "account/create",
        component:AccountCreateComponent
      },
      {
        path:"products/edit/:id",
        component:ProductEditComponent
      },
      {
        path:"products/add",
        component:ProductEditComponent
      },
      {
        path:"customers/:id",
        component:CustomerDetailComponent
      }

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
    ProductEditComponent,
    AccountCreateComponent,
    DialogComponent,
    CustomerDetailComponent

  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    AngularEditorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class AdminModule { }

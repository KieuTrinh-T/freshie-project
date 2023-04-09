import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full"
  },
  {
    path: "sign-in",
    component: SigninComponent
  },
  {
    path: "sign-up",
    component: SignupComponent
  },
]

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,


  ]
})
export class AdminLoginModule { }

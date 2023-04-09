import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule } from '@common/components/loading';

const routes: Routes = [
  {
    path: "",
    component: AppShellComponent,
    pathMatch: "full"
  }
];


@NgModule({
  declarations: [
    AppShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoadingModule
  ]
})
export class AppShellModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotFoundComponent
  }
]
@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }

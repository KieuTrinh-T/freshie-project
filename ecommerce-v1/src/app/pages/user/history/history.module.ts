import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import {  MatCardModule } from '@angular/material/card';
import {  MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailOrderComponent } from './detail-order/detail-order.component';

const routes: Routes = [
  {
    path: "",
    component: HistoryComponent,
  },
  {
    path: ":id",
    component: DetailOrderComponent,
  }
]

@NgModule({
  declarations: [
    HistoryComponent,
    DetailOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class HistoryModule { }

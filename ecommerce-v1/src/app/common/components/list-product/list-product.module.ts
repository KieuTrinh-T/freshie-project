import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product.component';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from '../../pipe/truncate.pipe';

@NgModule({
  declarations: [ListProductComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TruncatePipe
  ],
  exports: [
    ListProductComponent
  ]
})
export class ListProductModule { }

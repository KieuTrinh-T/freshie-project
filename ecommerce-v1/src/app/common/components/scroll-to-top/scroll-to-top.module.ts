import { NgModule } from "@angular/core";
import { ScrollToTopComponent } from './scroll-to-top.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ScrollToTopComponent],
  imports: [
    CommonModule
  ],
  exports: [ScrollToTopComponent]
})
export class ScrollToTopModule { }
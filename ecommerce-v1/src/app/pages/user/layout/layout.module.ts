import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollToTopModule } from '@common/components/scroll-to-top';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ScrollToTopModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }

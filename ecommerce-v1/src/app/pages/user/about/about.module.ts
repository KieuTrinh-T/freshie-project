import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  }
];

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    MatTabsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    AboutComponent
  ]
})

export class AboutModule { }

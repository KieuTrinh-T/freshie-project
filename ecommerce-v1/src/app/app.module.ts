import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { provideStateConfigs } from './common/state/state.provider';
import { INITIAL_STATE } from './app.state';
import { LoadingModule } from '@common/components/loading';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [
    provideStateConfigs({
      initialState: INITIAL_STATE
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

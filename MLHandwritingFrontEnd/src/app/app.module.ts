import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClipboardModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations/';
import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { LayoutModule } from './theme/layout/layout.module';
import { LOCALE_ID } from '@angular/core';
// import Components
import { AppComponent } from './app.component';

// import Services
import { JwtService } from './shared/services/jwt.service';
import { ApiService } from './shared/services/api.service';
import { GlobalState } from './shared/global.state';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    routing
  ],
  providers: [
    JwtService,
    GlobalState,
    ApiService,
    { provide: LOCALE_ID, useValue: "th-TH" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

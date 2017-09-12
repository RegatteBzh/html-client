import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { YagaModule } from '@yaga/leaflet-ng2';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import {Http} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';
import { MapComponent } from './map/map.component';
import { CompassComponent } from './compass/compass.component';
import { LoginComponent } from './login/login.component';

import { RaceService } from './race/race.service';
import { MapService } from './map/map.service';
import { ConfigService } from './services/config/config.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { LanguageService } from './services/language/language.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RaceComponent,
    MapComponent,
    CompassComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    YagaModule,
    HttpClientModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: customTranslateLoader,
      deps: [Http]
  }),
  ],
  providers: [
    ConfigService,
    RaceService,
    MapService,
    AuthInterceptorService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
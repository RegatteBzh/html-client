import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { YagaModule } from '@yaga/leaflet-ng2';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import {Http} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { CompassComponent } from './components/compass/compass.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RaceComponent } from './views/race/race.component';
import { MapComponent } from './views/map/map.component';
import { LoginComponent } from './views/login/login.component';

import { RaceService } from './services/race/race.service';
import { MapService } from './services/map/map.service';
import { ConfigService } from './services/config/config.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthService} from './services/auth/auth.service';
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
    AuthInterceptor,
    AuthService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
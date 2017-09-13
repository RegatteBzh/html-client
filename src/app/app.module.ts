import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { YagaModule } from '@yaga/leaflet-ng2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { CompassComponent } from './components/compass/compass.component';
import { MapComponent } from './components/map/map.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RaceComponent } from './views/race/race.component';
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
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
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

export function createTranslateLoader(http: Http) {
  return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

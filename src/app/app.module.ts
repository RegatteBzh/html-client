import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

// Services
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthService} from './services/auth/auth.service';
import { BoatService } from './services/boat/boat.service';
import { ConfigService } from './services/config/config.service';
import { LanguageService } from './services/language/language.service';
import { MapService } from './services/map/map.service';
import { MeService } from './services/me/me.service';
import { PolarService } from './services/polar/polar.service';
import { RaceService } from './services/race/race.service';
import { SkipperService } from './services/skipper/skipper.service';
import { TrigoService } from './services/trigo/trigo.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AuthInterceptor,
    AuthService,
    BoatService,
    ConfigService,
    LanguageService,
    MapService,
    MeService,
    PolarService,
    RaceService,
    SkipperService,
    TrigoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

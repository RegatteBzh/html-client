import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../services/auth/auth.interceptor";
import {TrigoService} from "../services/trigo/trigo.service";
import {SkipperService} from "../services/skipper/skipper.service";
import {RaceService} from "../services/race/race.service";
import {PolarService} from "../services/polar/polar.service";
import {PlayerService} from "../services/player/player.service";
import {MeService} from "../services/me/me.service";
import {MapService} from "../services/map/map.service";
import {LanguageService} from "../services/language/language.service";
import {ConfigService} from "../services/config/config.service";
import {BoatService} from "../services/boat/boat.service";
import {AuthService} from "../services/auth/auth.service";
import {LoginPage} from '../pages/login/login';
import {DashboardPage} from "../pages/dashboard/dashboard.component";
import {SkipperPage} from "../pages/skipper/skipper.component";
import {ComponentsModule} from "../components/components.module";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    SkipperPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: LoginPage, name: 'LoginPage', segment: '', loadChildren: '', defaultHistory: [], priority: ''},
        {component: LoginPage, name: 'LoginPage', segment: 'login', loadChildren: '', defaultHistory: [], priority: ''},
        {
          component: LoginPage,
          name: 'LoginTokenPage',
          segment: 'login/:token',
          loadChildren: '',
          defaultHistory: [],
          priority: ''
        },
        {component: DashboardPage, name: 'DashboardPage', segment: 'dashboard', loadChildren: '', defaultHistory: [], priority: ''},
        {component: SkipperPage, name: 'SkipperPage', segment: 'skipper/:id', loadChildren: '', defaultHistory: [], priority: ''},
      ]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    SkipperPage
  ],
  providers: [
    AuthInterceptor,
    AuthService,
    BoatService,
    ConfigService,
    LanguageService,
    MapService,
    MeService,
    PlayerService,
    PolarService,
    RaceService,
    SkipperService,
    TrigoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

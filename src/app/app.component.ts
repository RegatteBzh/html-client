import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from './services/config/config.service';

import {LanguageService} from './services/language/language.service';
import {TranslateService} from 'ng2-translate';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewChecked {

  public languageSubscriber: Subscription;

  public isConnected: boolean;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private cdRef: ChangeDetectorRef,
  ) {

    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.languageSubscriber = this.languageService.get().subscribe( l => {
        if (l) {
            this.translateService.use(l);
        } else {
          this.languageService.set(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
    });

  }

  public disconnect () {
    this.configService.setToken(null);
    this.router.navigate(['/login']);

  }

  ngAfterViewChecked() {
    const hasToken = !!this.configService.getToken()
    if (this.isConnected !== hasToken) {
      this.isConnected = hasToken;
      this.cdRef.detectChanges();
    }
  }

}

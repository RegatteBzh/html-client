import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {environment} from "../../environments/environment";
import {AuthService} from '../../services/auth/auth.service';
import {GooglePlus} from "@ionic-native/google-plus";
import {TranslateService} from '@ngx-translate/core';
import {MeService} from "../../services/me/me.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  urlPrefix: string;
  desktop: boolean;

  constructor(public meService: MeService,
              public platform: Platform, private googlePlus: GooglePlus, private authService: AuthService, private navParams: NavParams,
              private navCtrl: NavController, public toastCtrl: ToastController, private translate: TranslateService) {
  }

  ngOnInit() {
    this.authService.setToken(null);
    this.urlPrefix = environment.apiUrl;

    let token = this.navParams.get('token');
    if (token) {
      this.authService.setToken(token);
      this.navCtrl.setRoot('DashboardPage');
    }

    this.desktop = this.platform.is("core");
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '83973204363-76443ipa9hhqs09cq1k455u5ttnmffuv.apps.googleusercontent.com'
    }).then(res => {


      this.meService.authGoogleCheckout(res).first().subscribe(r => {
        this.authService.setToken(r.token);
        this.navCtrl.setRoot('DashboardPage');
      });


    })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: this.translate.instant('login.google_error'),
          duration: 3000
        });
        toast.present();
      });
  }

}
